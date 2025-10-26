/**
 * Synthetic Data Generator
 * Generates realistic retail data for AI model training and testing
 * Comprehensive data patterns across multiple verticals and scenarios
 */

import { faker } from '@faker-js/faker';

export interface SyntheticDataConfig {
  tenantId: string;
  categories: string[];
  timeRange: number; // days
  dataPoints: number;
  vertical?: 'apparel' | 'industrial' | 'general';
  includeExternalFactors?: boolean;
  seasonality?: boolean;
  trends?: boolean;
  anomalies?: boolean;
}

export interface SalesDataPoint {
  date: string;
  productId: string;
  productName: string;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalRevenue: number;
  location: string;
  channel: 'online' | 'store' | 'wholesale';
  customerSegment: string;
  externalFactors: {
    weather: {
      temperature: number;
      humidity: number;
      precipitation: number;
      condition: string;
    };
    economic: {
      gdp: number;
      inflation: number;
      unemployment: number;
      consumerConfidence: number;
    };
    trends: {
      searchVolume: number;
      socialSentiment: number;
      marketTrend: number;
    };
    seasonal: {
      holiday: boolean;
      season: string;
      dayOfWeek: number;
      month: number;
    };
  };
  metadata: {
    promotion: boolean;
    discount: number;
    stockLevel: number;
    leadTime: number;
    supplier: string;
  };
}

export interface InventoryDataPoint {
  date: string;
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  maxStock: number;
  leadTime: number;
  holdingCost: number;
  stockoutCost: number;
  supplier: string;
  location: string;
  abcCategory: 'A' | 'B' | 'C';
  velocity: 'fast' | 'medium' | 'slow';
  seasonality: number;
  trend: number;
}

export interface ProductData {
  productId: string;
  productName: string;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  description: string;
  unitPrice: number;
  cost: number;
  margin: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  attributes: {
    color?: string;
    size?: string;
    material?: string;
    style?: string;
    technology?: string;
  };
  lifecycle: 'introduction' | 'growth' | 'maturity' | 'decline';
  seasonality: number;
  trend: number;
  createdAt: string;
  updatedAt: string;
}

export class SyntheticDataGenerator {
  private apparelBrands = [
    'Fashion Forward', 'Style Elite', 'Trendy Threads', 'Urban Wear', 'Classic Couture',
    'Modern Mix', 'Street Style', 'Elegant Edge', 'Casual Comfort', 'Premium Picks'
  ];

  private industrialBrands = [
    'Industrial Solutions', 'Precision Parts', 'Heavy Duty', 'Tech Components', 'Reliable Systems',
    'Advanced Manufacturing', 'Quality Control', 'Professional Grade', 'Industrial Pro', 'System Solutions'
  ];

  private generalBrands = [
    'General Goods', 'Universal Products', 'Standard Supply', 'Common Items', 'Basic Brands',
    'Everyday Essentials', 'Standard Solutions', 'Common Components', 'Basic Supplies', 'General Items'
  ];

  private apparelCategories = [
    'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes', 'Bags', 'Jewelry'
  ];

  private industrialCategories = [
    'Bearings', 'Pumps', 'Valves', 'Motors', 'Sensors', 'Controllers', 'Tools', 'Fasteners'
  ];

  private generalCategories = [
    'Electronics', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Health', 'Beauty', 'Automotive'
  ];

  private locations = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
    'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco'
  ];

  private suppliers = [
    'Global Supply Co.', 'Premium Distributors', 'Quality Sources', 'Reliable Partners', 'Trusted Suppliers',
    'Professional Supply', 'Industrial Solutions', 'Commercial Partners', 'Wholesale Experts', 'Supply Chain Pro'
  ];

  private customerSegments = [
    'Premium', 'Standard', 'Budget', 'Bulk', 'Retail', 'Wholesale', 'Corporate', 'Individual'
  ];

  /**
   * Generate comprehensive synthetic retail data
   */
  async generateSyntheticData(config: SyntheticDataConfig): Promise<{
    salesData: SalesDataPoint[];
    inventoryData: InventoryDataPoint[];
    productData: ProductData[];
    summary: {
      totalProducts: number;
      totalSales: number;
      totalRevenue: number;
      dateRange: { start: string; end: string };
      categories: string[];
    };
  }> {
    console.log('🔄 Generating synthetic data for:', config);

    // Generate product catalog
    const productData = this.generateProductCatalog(config);
    
    // Generate sales data
    const salesData = this.generateSalesData(config, productData);
    
    // Generate inventory data
    const inventoryData = this.generateInventoryData(config, productData);
    
    // Calculate summary
    const summary = this.calculateSummary(salesData, productData, config);

    console.log('✅ Synthetic data generation completed:', summary);

    return {
      salesData,
      inventoryData,
      productData,
      summary
    };
  }

  /**
   * Generate product catalog
   */
  private generateProductCatalog(config: SyntheticDataConfig): ProductData[] {
    const products: ProductData[] = [];
    const productsPerCategory = Math.ceil(config.dataPoints / config.categories.length);

    config.categories.forEach(category => {
      for (let i = 0; i < productsPerCategory; i++) {
        const product = this.generateProduct(category, config.vertical || 'general');
        products.push(product);
      }
    });

    return products;
  }

  /**
   * Generate individual product
   */
  private generateProduct(category: string, vertical: string): ProductData {
    const brands = this.getBrandsForVertical(vertical);
    const categories = this.getCategoriesForVertical(vertical);
    
    const productId = faker.string.alphanumeric(8).toUpperCase();
    const productName = this.generateProductName(category, vertical);
    const brand = faker.helpers.arrayElement(brands);
    const sku = `${brand.substring(0, 3).toUpperCase()}-${faker.string.alphanumeric(6).toUpperCase()}`;
    
    const cost = this.generateCost(category, vertical);
    const margin = this.generateMargin(category, vertical);
    const unitPrice = cost * (1 + margin);
    
    const lifecycle = this.generateLifecycle();
    const seasonality = this.generateSeasonality(category);
    const trend = this.generateTrend(lifecycle);

    return {
      productId,
      productName,
      category,
      subcategory: this.generateSubcategory(category, vertical),
      brand,
      sku,
      description: this.generateDescription(productName, category),
      unitPrice: Math.round(unitPrice * 100) / 100,
      cost: Math.round(cost * 100) / 100,
      margin: Math.round(margin * 100) / 100,
      weight: this.generateWeight(category, vertical),
      dimensions: this.generateDimensions(category, vertical),
      attributes: this.generateAttributes(category, vertical),
      lifecycle,
      seasonality,
      trend,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString()
    };
  }

  /**
   * Generate sales data
   */
  private generateSalesData(config: SyntheticDataConfig, products: ProductData[]): SalesDataPoint[] {
    const salesData: SalesDataPoint[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - config.timeRange);

    for (let day = 0; day < config.timeRange; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + day);
      
      // Generate daily sales for each product
      products.forEach(product => {
        const dailySales = this.generateDailySales(product, currentDate, config);
        salesData.push(...dailySales);
      });
    }

    return salesData;
  }

  /**
   * Generate daily sales for a product
   */
  private generateDailySales(product: ProductData, date: Date, config: SyntheticDataConfig): SalesDataPoint[] {
    const sales: SalesDataPoint[] = [];
    const baseDemand = this.calculateBaseDemand(product);
    const seasonalFactor = this.calculateSeasonalFactor(product, date);
    const trendFactor = this.calculateTrendFactor(product, date);
    const externalFactor = config.includeExternalFactors ? this.calculateExternalFactor(date) : 1;
    
    const adjustedDemand = baseDemand * seasonalFactor * trendFactor * externalFactor;
    const dailyQuantity = Math.max(0, Math.round(adjustedDemand + faker.number.int({ min: -5, max: 5 })));

    // Generate sales across different channels
    const channels: Array<'online' | 'store' | 'wholesale'> = ['online', 'store', 'wholesale'];
    const channelWeights = [0.4, 0.5, 0.1]; // 40% online, 50% store, 10% wholesale

    let remainingQuantity = dailyQuantity;
    channels.forEach((channel, index) => {
      if (remainingQuantity <= 0) return;
      
      const channelQuantity = Math.round(remainingQuantity * channelWeights[index]);
      if (channelQuantity > 0) {
        const location = faker.helpers.arrayElement(this.locations);
        const customerSegment = faker.helpers.arrayElement(this.customerSegments);
        
        const promotion = Math.random() < 0.1; // 10% chance of promotion
        const discount = promotion ? faker.number.float({ min: 0.05, max: 0.3 }) : 0;
        const unitPrice = product.unitPrice * (1 - discount);
        
        sales.push({
          date: date.toISOString(),
          productId: product.productId,
          productName: product.productName,
          category: product.category,
          subcategory: product.subcategory,
          brand: product.brand,
          sku: product.sku,
          quantity: channelQuantity,
          unitPrice: Math.round(unitPrice * 100) / 100,
          totalRevenue: Math.round(channelQuantity * unitPrice * 100) / 100,
          location,
          channel,
          customerSegment,
          externalFactors: config.includeExternalFactors ? this.generateExternalFactors(date) : this.getDefaultExternalFactors(),
          metadata: {
            promotion,
            discount,
            stockLevel: faker.number.int({ min: 10, max: 1000 }),
            leadTime: faker.number.int({ min: 1, max: 30 }),
            supplier: faker.helpers.arrayElement(this.suppliers)
          }
        });
        
        remainingQuantity -= channelQuantity;
      }
    });

    return sales;
  }

  /**
   * Generate inventory data
   */
  private generateInventoryData(config: SyntheticDataConfig, products: ProductData[]): InventoryDataPoint[] {
    const inventoryData: InventoryDataPoint[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - config.timeRange);

    for (let day = 0; day < config.timeRange; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + day);
      
      products.forEach(product => {
        const inventory = this.generateInventoryPoint(product, currentDate);
        inventoryData.push(inventory);
      });
    }

    return inventoryData;
  }

  /**
   * Generate inventory point for a product
   */
  private generateInventoryPoint(product: ProductData, date: Date): InventoryDataPoint {
    const baseStock = this.calculateBaseStock(product);
    const seasonalAdjustment = this.calculateSeasonalAdjustment(product, date);
    const trendAdjustment = this.calculateTrendAdjustment(product, date);
    
    const currentStock = Math.max(0, Math.round(baseStock * seasonalAdjustment * trendAdjustment));
    const reorderPoint = Math.round(currentStock * 0.3);
    const maxStock = Math.round(currentStock * 1.5);
    
    const abcCategory = this.calculateABCCategory(product);
    const velocity = this.calculateVelocity(product);
    
    return {
      date: date.toISOString(),
      productId: product.productId,
      productName: product.productName,
      category: product.category,
      currentStock,
      reorderPoint,
      maxStock,
      leadTime: faker.number.int({ min: 1, max: 30 }),
      holdingCost: product.cost * 0.2, // 20% of cost
      stockoutCost: product.unitPrice * 0.5, // 50% of price
      supplier: faker.helpers.arrayElement(this.suppliers),
      location: faker.helpers.arrayElement(this.locations),
      abcCategory,
      velocity,
      seasonality: product.seasonality,
      trend: product.trend
    };
  }

  // Helper methods
  private getBrandsForVertical(vertical: string): string[] {
    switch (vertical) {
      case 'apparel': return this.apparelBrands;
      case 'industrial': return this.industrialBrands;
      default: return this.generalBrands;
    }
  }

  private getCategoriesForVertical(vertical: string): string[] {
    switch (vertical) {
      case 'apparel': return this.apparelCategories;
      case 'industrial': return this.industrialCategories;
      default: return this.generalCategories;
    }
  }

  private generateProductName(category: string, vertical: string): string {
    const adjectives = ['Premium', 'Professional', 'Advanced', 'Classic', 'Modern', 'Elite', 'Standard', 'Basic'];
    const nouns = ['Model', 'Series', 'Edition', 'Version', 'Type', 'Style', 'Design', 'Collection'];
    
    const adjective = faker.helpers.arrayElement(adjectives);
    const noun = faker.helpers.arrayElement(nouns);
    const number = faker.number.int({ min: 100, max: 9999 });
    
    return `${adjective} ${category} ${noun} ${number}`;
  }

  private generateCost(category: string, vertical: string): number {
    const baseCosts = {
      apparel: { min: 10, max: 200 },
      industrial: { min: 50, max: 1000 },
      general: { min: 5, max: 500 }
    };
    
    const range = baseCosts[vertical as keyof typeof baseCosts] || baseCosts.general;
    return faker.number.float({ min: range.min, max: range.max, fractionDigits: 2 });
  }

  private generateMargin(category: string, vertical: string): number {
    const baseMargins = {
      apparel: { min: 0.3, max: 0.7 },
      industrial: { min: 0.2, max: 0.5 },
      general: { min: 0.1, max: 0.6 }
    };
    
    const range = baseMargins[vertical as keyof typeof baseMargins] || baseMargins.general;
    return faker.number.float({ min: range.min, max: range.max, fractionDigits: 2 });
  }

  private generateLifecycle(): 'introduction' | 'growth' | 'maturity' | 'decline' {
    const weights = [0.1, 0.2, 0.6, 0.1]; // Most products in maturity
    const random = Math.random();
    let cumulative = 0;
    
    if (random < (cumulative += weights[0])) return 'introduction';
    if (random < (cumulative += weights[1])) return 'growth';
    if (random < (cumulative += weights[2])) return 'maturity';
    return 'decline';
  }

  private generateSeasonality(category: string): number {
    // Higher seasonality for certain categories
    const seasonalCategories = ['apparel', 'electronics', 'sports', 'toys'];
    const isSeasonal = seasonalCategories.some(cat => category.toLowerCase().includes(cat));
    
    return isSeasonal ? faker.number.float({ min: 0.3, max: 0.8 }) : faker.number.float({ min: 0.1, max: 0.4 });
  }

  private generateTrend(lifecycle: string): number {
    switch (lifecycle) {
      case 'introduction': return faker.number.float({ min: 0.1, max: 0.3 });
      case 'growth': return faker.number.float({ min: 0.2, max: 0.5 });
      case 'maturity': return faker.number.float({ min: -0.1, max: 0.1 });
      case 'decline': return faker.number.float({ min: -0.3, max: -0.1 });
      default: return 0;
    }
  }

  private generateSubcategory(category: string, vertical: string): string {
    const subcategories = {
      'Tops': ['T-Shirts', 'Shirts', 'Blouses', 'Tank Tops'],
      'Bottoms': ['Jeans', 'Pants', 'Shorts', 'Skirts'],
      'Electronics': ['Smartphones', 'Laptops', 'Tablets', 'Accessories'],
      'Bearings': ['Ball Bearings', 'Roller Bearings', 'Thrust Bearings', 'Linear Bearings']
    };
    
    const subcats = subcategories[category as keyof typeof subcategories] || ['Standard', 'Premium', 'Basic'];
    return faker.helpers.arrayElement(subcats);
  }

  private generateDescription(productName: string, category: string): string {
    return `High-quality ${category.toLowerCase()} product. ${productName} offers excellent performance and durability for professional use.`;
  }

  private generateWeight(category: string, vertical: string): number {
    const weights = {
      apparel: { min: 0.1, max: 2.0 },
      industrial: { min: 0.5, max: 50.0 },
      general: { min: 0.1, max: 10.0 }
    };
    
    const range = weights[vertical as keyof typeof weights] || weights.general;
    return faker.number.float({ min: range.min, max: range.max, fractionDigits: 2 });
  }

  private generateDimensions(category: string, vertical: string): { length: number; width: number; height: number } {
    const dimensions = {
      apparel: { min: 10, max: 100 },
      industrial: { min: 50, max: 500 },
      general: { min: 5, max: 200 }
    };
    
    const range = dimensions[vertical as keyof typeof dimensions] || dimensions.general;
    
    return {
      length: faker.number.float({ min: range.min, max: range.max, fractionDigits: 1 }),
      width: faker.number.float({ min: range.min, max: range.max, fractionDigits: 1 }),
      height: faker.number.float({ min: range.min, max: range.max, fractionDigits: 1 })
    };
  }

  private generateAttributes(category: string, vertical: string): any {
    const attributes: any = {};
    
    if (vertical === 'apparel') {
      attributes.color = faker.helpers.arrayElement(['Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Navy', 'Brown']);
      attributes.size = faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
      attributes.material = faker.helpers.arrayElement(['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Denim']);
      attributes.style = faker.helpers.arrayElement(['Casual', 'Formal', 'Sport', 'Vintage', 'Modern']);
    } else if (vertical === 'industrial') {
      attributes.material = faker.helpers.arrayElement(['Steel', 'Aluminum', 'Plastic', 'Ceramic', 'Composite']);
      attributes.technology = faker.helpers.arrayElement(['Standard', 'Advanced', 'Precision', 'Heavy Duty']);
    } else {
      attributes.color = faker.helpers.arrayElement(['Black', 'White', 'Silver', 'Blue', 'Red']);
      attributes.technology = faker.helpers.arrayElement(['Basic', 'Advanced', 'Smart', 'Professional']);
    }
    
    return attributes;
  }

  private calculateBaseDemand(product: ProductData): number {
    // Base demand based on product characteristics
    let baseDemand = 10;
    
    // Adjust based on lifecycle
    switch (product.lifecycle) {
      case 'introduction': baseDemand *= 0.5; break;
      case 'growth': baseDemand *= 1.5; break;
      case 'maturity': baseDemand *= 1.0; break;
      case 'decline': baseDemand *= 0.3; break;
    }
    
    // Adjust based on price
    if (product.unitPrice > 100) baseDemand *= 0.5;
    if (product.unitPrice < 20) baseDemand *= 1.5;
    
    return Math.max(1, Math.round(baseDemand));
  }

  private calculateSeasonalFactor(product: ProductData, date: Date): number {
    const month = date.getMonth();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    // Basic seasonal pattern
    const seasonalPattern = Math.sin((dayOfYear / 365) * 2 * Math.PI);
    return 1 + (product.seasonality * seasonalPattern);
  }

  private calculateTrendFactor(product: ProductData, date: Date): number {
    const daysSinceStart = (date.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24);
    return 1 + (product.trend * daysSinceStart / 365);
  }

  private calculateExternalFactor(date: Date): number {
    // Simulate external factors (weather, economic, etc.)
    return 0.9 + Math.random() * 0.2; // 90% to 110% variation
  }

  private generateExternalFactors(date: Date) {
    return {
      weather: {
        temperature: faker.number.float({ min: -10, max: 40 }),
        humidity: faker.number.float({ min: 20, max: 90 }),
        precipitation: faker.number.float({ min: 0, max: 50 }),
        condition: faker.helpers.arrayElement(['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Foggy'])
      },
      economic: {
        gdp: faker.number.float({ min: 1.0, max: 5.0 }),
        inflation: faker.number.float({ min: 1.0, max: 8.0 }),
        unemployment: faker.number.float({ min: 3.0, max: 12.0 }),
        consumerConfidence: faker.number.float({ min: 50, max: 120 })
      },
      trends: {
        searchVolume: faker.number.int({ min: 100, max: 10000 }),
        socialSentiment: faker.number.float({ min: -1, max: 1 }),
        marketTrend: faker.number.float({ min: -0.2, max: 0.2 })
      },
      seasonal: {
        holiday: Math.random() < 0.1, // 10% chance of holiday
        season: this.getSeason(date),
        dayOfWeek: date.getDay(),
        month: date.getMonth() + 1
      }
    };
  }

  private getDefaultExternalFactors() {
    return {
      weather: { temperature: 20, humidity: 50, precipitation: 0, condition: 'Sunny' },
      economic: { gdp: 2.5, inflation: 3.0, unemployment: 5.0, consumerConfidence: 85 },
      trends: { searchVolume: 1000, socialSentiment: 0, marketTrend: 0 },
      seasonal: { holiday: false, season: 'Spring', dayOfWeek: 1, month: 4 }
    };
  }

  private getSeason(date: Date): string {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  }

  private calculateBaseStock(product: ProductData): number {
    // Base stock based on product characteristics
    let baseStock = 100;
    
    // Adjust based on lifecycle
    switch (product.lifecycle) {
      case 'introduction': baseStock *= 0.3; break;
      case 'growth': baseStock *= 1.2; break;
      case 'maturity': baseStock *= 1.0; break;
      case 'decline': baseStock *= 0.5; break;
    }
    
    // Adjust based on price
    if (product.unitPrice > 100) baseStock *= 0.3;
    if (product.unitPrice < 20) baseStock *= 2.0;
    
    return Math.max(10, Math.round(baseStock));
  }

  private calculateSeasonalAdjustment(product: ProductData, date: Date): number {
    return this.calculateSeasonalFactor(product, date);
  }

  private calculateTrendAdjustment(product: ProductData, date: Date): number {
    return this.calculateTrendFactor(product, date);
  }

  private calculateABCCategory(product: ProductData): 'A' | 'B' | 'C' {
    const value = product.unitPrice * this.calculateBaseDemand(product);
    
    if (value > 10000) return 'A';
    if (value > 1000) return 'B';
    return 'C';
  }

  private calculateVelocity(product: ProductData): 'fast' | 'medium' | 'slow' {
    const demand = this.calculateBaseDemand(product);
    
    if (demand > 20) return 'fast';
    if (demand > 5) return 'medium';
    return 'slow';
  }

  private calculateSummary(salesData: SalesDataPoint[], productData: ProductData[], config: SyntheticDataConfig) {
    const totalProducts = productData.length;
    const totalSales = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRevenue = salesData.reduce((sum, sale) => sum + sale.totalRevenue, 0);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - config.timeRange);
    const endDate = new Date();
    
    return {
      totalProducts,
      totalSales,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      },
      categories: config.categories
    };
  }
}

export const syntheticDataGenerator = new SyntheticDataGenerator();

/**
 * Main function to generate synthetic data
 */
export async function generateSyntheticData(config: SyntheticDataConfig) {
  return await syntheticDataGenerator.generateSyntheticData(config);
}