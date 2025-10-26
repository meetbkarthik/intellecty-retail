// src/lib/demo-data/industrial-data.ts
export const industrialProducts = [
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
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "High-quality deep groove ball bearing for industrial applications",
    specifications: {
      innerDiameter: "25mm",
      outerDiameter: "52mm",
      width: "15mm",
      loadRating: "14.0 kN",
      speedRating: "12000 rpm"
    }
  },
  {
    id: "IND-002",
    name: "Mechanical Seal Type A - Carbon/Silicon Carbide",
    category: "Seals",
    sku: "MS-A-CSC-50",
    price: 125.00,
    cost: 78.50,
    currentStock: 45,
    reorderPoint: 20,
    safetyStock: 10,
    leadTime: 21,
    supplier: "John Crane Inc",
    location: "Warehouse B",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "Premium mechanical seal for pump applications",
    specifications: {
      material: "Carbon/Silicon Carbide",
      pressure: "10 bar",
      temperature: "150°C",
      shaftSize: "50mm"
    }
  },
  {
    id: "IND-003",
    name: "Hydraulic Cylinder Seal Kit",
    category: "Hydraulics",
    sku: "HC-SK-80-200",
    price: 89.99,
    cost: 52.30,
    currentStock: 78,
    reorderPoint: 30,
    safetyStock: 15,
    leadTime: 10,
    supplier: "Parker Hannifin",
    location: "Warehouse A",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "Complete seal kit for hydraulic cylinders",
    specifications: {
      boreSize: "80mm",
      stroke: "200mm",
      pressure: "210 bar",
      temperature: "100°C"
    }
  },
  {
    id: "IND-004",
    name: "Industrial Chain 16B-1",
    category: "Chains & Sprockets",
    sku: "CH-16B-1-100",
    price: 156.75,
    cost: 95.20,
    currentStock: 32,
    reorderPoint: 15,
    safetyStock: 8,
    leadTime: 28,
    supplier: "Tsubaki Chain",
    location: "Warehouse C",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "Heavy-duty industrial chain for conveyor systems",
    specifications: {
      pitch: "25.4mm",
      width: "15.88mm",
      tensileStrength: "22.2 kN",
      length: "100 links"
    }
  },
  {
    id: "IND-005",
    name: "V-Belt A-65",
    category: "Belts & Pulleys",
    sku: "VB-A-65",
    price: 12.50,
    cost: 7.80,
    currentStock: 200,
    reorderPoint: 100,
    safetyStock: 50,
    leadTime: 7,
    supplier: "Gates Corporation",
    location: "Warehouse A",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "Standard V-belt for industrial machinery",
    specifications: {
      type: "A",
      length: "65 inches",
      width: "13mm",
      height: "8mm"
    }
  },
  {
    id: "IND-006",
    name: "Industrial Lubricant - ISO VG 68",
    category: "Lubricants",
    sku: "LUB-ISO68-20L",
    price: 89.99,
    cost: 55.60,
    currentStock: 15,
    reorderPoint: 8,
    safetyStock: 4,
    leadTime: 14,
    supplier: "Shell Lubricants",
    location: "Warehouse B",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "High-performance industrial lubricant",
    specifications: {
      viscosity: "ISO VG 68",
      volume: "20L",
      temperature: "-20°C to 120°C",
      baseOil: "Mineral"
    }
  },
  {
    id: "IND-007",
    name: "Steel Wire Rope 6x19 IWRC",
    category: "Wire Rope",
    sku: "WR-6x19-12mm-100m",
    price: 245.00,
    cost: 165.75,
    currentStock: 8,
    reorderPoint: 5,
    safetyStock: 2,
    leadTime: 21,
    supplier: "Wire Rope Industries",
    location: "Warehouse C",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "Heavy-duty steel wire rope for lifting applications",
    specifications: {
      construction: "6x19 IWRC",
      diameter: "12mm",
      length: "100m",
      breakingLoad: "8.5 tonnes"
    }
  },
  {
    id: "IND-008",
    name: "Industrial Filter Element",
    category: "Filtration",
    sku: "FE-HYD-10MIC",
    price: 35.75,
    cost: 22.40,
    currentStock: 95,
    reorderPoint: 40,
    safetyStock: 20,
    leadTime: 10,
    supplier: "Pall Corporation",
    location: "Warehouse A",
    vertical: "INDUSTRIAL",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    description: "High-efficiency hydraulic filter element",
    specifications: {
      micronRating: "10 micron",
      material: "Cellulose",
      pressure: "25 bar",
      flowRate: "50 L/min"
    }
  }
];

export const industrialSuppliers = [
  {
    id: "SUP-001",
    name: "SKF Bearings Ltd",
    contact: "John Smith",
    email: "john.smith@skf.com",
    phone: "+1-555-0123",
    address: "123 Industrial Ave, Detroit, MI 48201",
    category: "Bearings",
    rating: 4.8,
    leadTime: 14,
    reliability: 95
  },
  {
    id: "SUP-002",
    name: "John Crane Inc",
    contact: "Sarah Johnson",
    email: "sarah.johnson@johncrane.com",
    phone: "+1-555-0124",
    address: "456 Manufacturing Blvd, Chicago, IL 60601",
    category: "Seals",
    rating: 4.6,
    leadTime: 21,
    reliability: 92
  },
  {
    id: "SUP-003",
    name: "Parker Hannifin",
    contact: "Mike Davis",
    email: "mike.davis@parker.com",
    phone: "+1-555-0125",
    address: "789 Hydraulic St, Cleveland, OH 44101",
    category: "Hydraulics",
    rating: 4.7,
    leadTime: 10,
    reliability: 94
  }
];

export const industrialLocations = [
  {
    id: "LOC-001",
    name: "Warehouse A",
    address: "100 Industrial Park, Detroit, MI 48201",
    type: "Main Warehouse",
    capacity: 10000,
    currentStock: 7500,
    manager: "Tom Wilson"
  },
  {
    id: "LOC-002",
    name: "Warehouse B",
    address: "200 Manufacturing Dr, Chicago, IL 60601",
    type: "Secondary Warehouse",
    capacity: 5000,
    currentStock: 3200,
    manager: "Lisa Brown"
  },
  {
    id: "LOC-003",
    name: "Warehouse C",
    address: "300 Heavy Industry Ave, Cleveland, OH 44101",
    type: "Specialized Storage",
    capacity: 3000,
    currentStock: 1800,
    manager: "David Miller"
  }
];

export const industrialSalesHistory = [
  {
    productId: "IND-001",
    date: "2024-01-15",
    quantity: 25,
    revenue: 1137.50,
    customer: "Detroit Manufacturing Co"
  },
  {
    productId: "IND-001",
    date: "2024-01-20",
    quantity: 15,
    revenue: 682.50,
    customer: "Chicago Industrial Ltd"
  },
  {
    productId: "IND-002",
    date: "2024-01-18",
    quantity: 8,
    revenue: 1000.00,
    customer: "Pump Solutions Inc"
  },
  {
    productId: "IND-003",
    date: "2024-01-22",
    quantity: 12,
    revenue: 1079.88,
    customer: "Hydraulic Systems Co"
  },
  {
    productId: "IND-004",
    date: "2024-01-25",
    quantity: 5,
    revenue: 783.75,
    customer: "Conveyor Solutions Ltd"
  }
];

export const industrialForecasts = [
  {
    productId: "IND-001",
    forecastDate: "2024-02-01",
    horizon: 30,
    predictedDemand: 45,
    confidence: 0.92,
    mape: 8.5,
    factors: {
      weather: "Normal",
      economic: "Stable",
      seasonal: "Maintenance season approaching"
    }
  },
  {
    productId: "IND-002",
    forecastDate: "2024-02-01",
    horizon: 30,
    predictedDemand: 18,
    confidence: 0.88,
    mape: 12.3,
    factors: {
      weather: "Normal",
      economic: "Stable",
      seasonal: "Regular replacement cycle"
    }
  }
];
