import { NextRequest, NextResponse } from 'next/server';

// Inline demo data to avoid import issues
const demoProducts = [
  {
    id: "IND-001",
    name: "SKF 6205 Deep Groove Ball Bearing",
    category: "Bearings",
    sku: "SKF-6205-2RS",
    price: 45.50,
    cost: 28.75,
    currentStock: 125,
    reorderPoint: 50,
    safetyStock: 25,
    leadTime: 14,
    supplier: "SKF Bearings Ltd",
    location: "Warehouse A",
    vertical: "INDUSTRIAL"
  },
  {
    id: "APP-001",
    name: "Classic Cotton T-Shirt",
    category: "Tops",
    sku: "TSH-001-BLK-M",
    price: 24.99,
    cost: 12.50,
    currentStock: 200,
    reorderPoint: 75,
    safetyStock: 30,
    leadTime: 7,
    supplier: "Fashion Forward Inc",
    location: "Warehouse B",
    vertical: "APPAREL"
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, currentStock, leadTimeDays = 14, horizon = 30 } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Find the product
    const product = demoProducts.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Generate simple mock optimization
    const avgDailyDemand = 5; // Mock average daily demand
    const optimalReorderPoint = Math.round(avgDailyDemand * leadTimeDays * 1.2);
    const optimalSafetyStock = Math.round(avgDailyDemand * 7);
    const recommendedOrderQuantity = Math.round(
      Math.max(0, optimalReorderPoint + optimalSafetyStock - (currentStock || product.currentStock) + avgDailyDemand * 30)
    );

    return NextResponse.json({
      success: true,
      data: {
        productId,
        productName: product.name,
        productCategory: product.category,
        currentStock: currentStock || product.currentStock,
        leadTimeDays,
        optimalReorderPoint,
        optimalSafetyStock,
        recommendedOrderQuantity,
        wastePrediction: parseFloat((Math.random() * 10).toFixed(2)),
        carbonFootprintReduction: parseFloat((Math.random() * 20).toFixed(2)),
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error optimizing inventory:', error);
    return NextResponse.json(
      { error: 'Failed to optimize inventory' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const vertical = searchParams.get('vertical');

    // Filter products based on query parameters
    let filteredProducts = demoProducts;
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (vertical) {
      filteredProducts = filteredProducts.filter(p => p.vertical === vertical.toUpperCase());
    }

    // Generate inventory data with optimization recommendations
    const inventoryData = filteredProducts.map(product => {
      const stockLevel = product.currentStock;
      const reorderPoint = product.reorderPoint;
      const safetyStock = product.safetyStock;
      const leadTime = product.leadTime;
      
      // Calculate stock status
      let status = 'healthy';
      if (stockLevel <= safetyStock) {
        status = 'critical';
      } else if (stockLevel <= reorderPoint) {
        status = 'low';
      }

      // Calculate days of stock remaining (based on average daily demand)
      const avgDailyDemand = 5; // Mock average daily demand
      const daysRemaining = Math.floor(stockLevel / avgDailyDemand);

      return {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        category: product.category,
        vertical: product.vertical,
        currentStock: stockLevel,
        reorderPoint,
        safetyStock,
        leadTime,
        status,
        daysRemaining,
        value: stockLevel * product.price,
        cost: stockLevel * product.cost,
        supplier: product.supplier,
        location: product.location,
        lastUpdated: new Date().toISOString()
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        products: inventoryData,
        summary: {
          totalProducts: inventoryData.length,
          totalValue: inventoryData.reduce((sum, p) => sum + p.value, 0),
          totalCost: inventoryData.reduce((sum, p) => sum + p.cost, 0),
          criticalItems: inventoryData.filter(p => p.status === 'critical').length,
          lowStockItems: inventoryData.filter(p => p.status === 'low').length,
          healthyItems: inventoryData.filter(p => p.status === 'healthy').length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}