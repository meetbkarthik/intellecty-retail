// src/lib/demo-data/apparel-data.ts
export const apparelProducts = [
  {
    id: "APP-001",
    name: "Classic Cotton T-Shirt - Summer Collection",
    category: "T-Shirts",
    sku: "TSH-COT-SUM-M",
    price: 24.99,
    cost: 12.50,
    currentStock: 150,
    reorderPoint: 75,
    safetyStock: 30,
    leadTime: 14,
    supplier: "Cotton Mills International",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    description: "Premium cotton t-shirt for summer season",
    specifications: {
      material: "100% Cotton",
      size: "M",
      color: "White",
      weight: "180 GSM",
      care: "Machine wash cold"
    },
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Gray", "Red"]
  },
  {
    id: "APP-002",
    name: "Denim Jeans - Classic Fit",
    category: "Jeans",
    sku: "JNS-DEN-CLF-32",
    price: 89.99,
    cost: 45.00,
    currentStock: 85,
    reorderPoint: 40,
    safetyStock: 20,
    leadTime: 21,
    supplier: "Denim Works Ltd",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
    description: "Classic fit denim jeans with premium quality",
    specifications: {
      material: "98% Cotton, 2% Elastane",
      waist: "32 inches",
      length: "32 inches",
      fit: "Classic",
      wash: "Medium Blue"
    },
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Medium Blue", "Dark Blue", "Black", "Light Blue"]
  },
  {
    id: "APP-003",
    name: "Wool Blend Sweater - Winter Collection",
    category: "Sweaters",
    sku: "SWT-WOL-WIN-L",
    price: 129.99,
    cost: 65.00,
    currentStock: 45,
    reorderPoint: 25,
    safetyStock: 12,
    leadTime: 28,
    supplier: "Wool Textiles Co",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
    description: "Warm wool blend sweater for winter season",
    specifications: {
      material: "70% Wool, 30% Acrylic",
      size: "L",
      color: "Charcoal",
      weight: "Medium",
      care: "Dry clean only"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Navy", "Camel", "Black", "Gray"]
  },
  {
    id: "APP-004",
    name: "Running Shoes - Athletic Collection",
    category: "Footwear",
    sku: "SHO-RUN-ATH-9",
    price: 149.99,
    cost: 75.00,
    currentStock: 60,
    reorderPoint: 30,
    safetyStock: 15,
    leadTime: 35,
    supplier: "Athletic Footwear Inc",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    description: "High-performance running shoes with advanced cushioning",
    specifications: {
      material: "Mesh upper, Rubber sole",
      size: "9",
      color: "White/Blue",
      type: "Running",
      features: "Cushioned, Breathable"
    },
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White/Blue", "Black/Red", "Gray/Orange", "White/Black"]
  },
  {
    id: "APP-005",
    name: "Leather Handbag - Premium Collection",
    category: "Accessories",
    sku: "BAG-LEA-PRM-ONE",
    price: 199.99,
    cost: 100.00,
    currentStock: 25,
    reorderPoint: 12,
    safetyStock: 6,
    leadTime: 42,
    supplier: "Leather Crafts Ltd",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    description: "Premium leather handbag with elegant design",
    specifications: {
      material: "Genuine Leather",
      size: "Medium",
      color: "Brown",
      compartments: "Multiple",
      closure: "Zipper"
    },
    sizes: ["Small", "Medium", "Large"],
    colors: ["Brown", "Black", "Tan", "Navy"]
  },
  {
    id: "APP-006",
    name: "Silk Scarf - Luxury Collection",
    category: "Accessories",
    sku: "SCF-SIL-LUX-ONE",
    price: 79.99,
    cost: 40.00,
    currentStock: 80,
    reorderPoint: 40,
    safetyStock: 20,
    leadTime: 21,
    supplier: "Silk Textiles International",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    description: "Luxury silk scarf with intricate patterns",
    specifications: {
      material: "100% Silk",
      size: "90x90 cm",
      color: "Multi-color",
      pattern: "Floral",
      care: "Dry clean only"
    },
    sizes: ["90x90 cm", "70x70 cm"],
    colors: ["Multi-color", "Blue", "Red", "Green", "Purple"]
  },
  {
    id: "APP-007",
    name: "Casual Dress - Spring Collection",
    category: "Dresses",
    sku: "DRS-CAS-SPR-M",
    price: 69.99,
    cost: 35.00,
    currentStock: 55,
    reorderPoint: 28,
    safetyStock: 14,
    leadTime: 21,
    supplier: "Fashion Forward Ltd",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
    description: "Elegant casual dress perfect for spring season",
    specifications: {
      material: "Polyester Blend",
      size: "M",
      color: "Floral Print",
      length: "Knee Length",
      style: "A-line"
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Print", "Solid Blue", "Solid Pink", "Striped"]
  },
  {
    id: "APP-008",
    name: "Baseball Cap - Sports Collection",
    category: "Accessories",
    sku: "CAP-BSB-SPT-ONE",
    price: 19.99,
    cost: 10.00,
    currentStock: 200,
    reorderPoint: 100,
    safetyStock: 50,
    leadTime: 14,
    supplier: "Sports Accessories Co",
    location: "Fashion Warehouse",
    vertical: "APPAREL",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop",
    description: "Classic baseball cap with adjustable fit",
    specifications: {
      material: "Cotton/Polyester",
      size: "One Size",
      color: "Black",
      closure: "Adjustable",
      features: "Curved Brim"
    },
    sizes: ["One Size"],
    colors: ["Black", "White", "Navy", "Red", "Gray"]
  }
];

export const apparelSuppliers = [
  {
    id: "SUP-APP-001",
    name: "Cotton Mills International",
    contact: "Emma Thompson",
    email: "emma.thompson@cottonmills.com",
    phone: "+1-555-0201",
    address: "100 Textile Ave, New York, NY 10001",
    category: "Cotton Products",
    rating: 4.7,
    leadTime: 14,
    reliability: 93
  },
  {
    id: "SUP-APP-002",
    name: "Denim Works Ltd",
    contact: "James Rodriguez",
    email: "james.rodriguez@denimworks.com",
    phone: "+1-555-0202",
    address: "200 Fashion Blvd, Los Angeles, CA 90210",
    category: "Denim Products",
    rating: 4.5,
    leadTime: 21,
    reliability: 90
  },
  {
    id: "SUP-APP-003",
    name: "Wool Textiles Co",
    contact: "Sophie Chen",
    email: "sophie.chen@wooltextiles.com",
    phone: "+1-555-0203",
    address: "300 Wool St, Boston, MA 02101",
    category: "Wool Products",
    rating: 4.8,
    leadTime: 28,
    reliability: 95
  }
];

export const apparelLocations = [
  {
    id: "LOC-APP-001",
    name: "Fashion Warehouse",
    address: "500 Fashion District, New York, NY 10001",
    type: "Main Fashion Warehouse",
    capacity: 15000,
    currentStock: 12000,
    manager: "Anna Martinez"
  },
  {
    id: "LOC-APP-002",
    name: "Seasonal Storage",
    address: "600 Seasonal Ave, Los Angeles, CA 90210",
    type: "Seasonal Storage",
    capacity: 8000,
    currentStock: 4500,
    manager: "Carlos Rodriguez"
  }
];

export const apparelSalesHistory = [
  {
    productId: "APP-001",
    date: "2024-01-15",
    quantity: 45,
    revenue: 1124.55,
    customer: "Fashion Forward Store"
  },
  {
    productId: "APP-001",
    date: "2024-01-20",
    quantity: 30,
    revenue: 749.70,
    customer: "Summer Styles Boutique"
  },
  {
    productId: "APP-002",
    date: "2024-01-18",
    quantity: 20,
    revenue: 1799.80,
    customer: "Denim Depot"
  },
  {
    productId: "APP-003",
    date: "2024-01-22",
    quantity: 15,
    revenue: 1949.85,
    customer: "Winter Wear Co"
  },
  {
    productId: "APP-004",
    date: "2024-01-25",
    quantity: 12,
    revenue: 1799.88,
    customer: "Athletic Gear Store"
  }
];

export const apparelForecasts = [
  {
    productId: "APP-001",
    forecastDate: "2024-02-01",
    horizon: 30,
    predictedDemand: 85,
    confidence: 0.89,
    mape: 11.2,
    factors: {
      weather: "Spring approaching",
      economic: "Stable",
      seasonal: "Summer collection launch",
      trends: "Casual wear trending"
    }
  },
  {
    productId: "APP-002",
    forecastDate: "2024-02-01",
    horizon: 30,
    predictedDemand: 35,
    confidence: 0.85,
    mape: 14.5,
    factors: {
      weather: "Spring approaching",
      economic: "Stable",
      seasonal: "Regular demand",
      trends: "Classic styles popular"
    }
  }
];

export const fashionTrends = [
  {
    date: "2024-01-01",
    trend: "Sustainable Fashion",
    impact: "High",
    category: "All",
    description: "Growing demand for eco-friendly and sustainable clothing"
  },
  {
    date: "2024-01-15",
    trend: "Athleisure",
    impact: "Medium",
    category: "Activewear",
    description: "Continued popularity of comfortable, versatile clothing"
  },
  {
    date: "2024-02-01",
    trend: "Vintage Revival",
    impact: "Medium",
    category: "Dresses, Accessories",
    description: "Retro styles making a comeback in mainstream fashion"
  }
];
