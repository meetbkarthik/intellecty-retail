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
    const { productId, horizon = 30, includeExternalFactors = true, location = "Los Angeles", vertical = "INDUSTRIAL" } = body;

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

    // Generate simple mock forecast
    const baseValue = vertical === 'APPAREL' ? 80 : vertical === 'INDUSTRIAL' ? 120 : 100;
    const forecast = Array.from({ length: horizon }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      quantity: Math.round(baseValue + Math.sin(i / 10) * 20 + Math.random() * 10),
      confidence: Math.max(0.7, 0.95 - (i / horizon) * 0.2),
      modelType: 'INTELLECT_ENSEMBLE',
      factors: includeExternalFactors ? ['weather', 'economic', 'trends'] : [],
      confidenceInterval: [baseValue * 0.9, baseValue * 1.1]
    }));

    return NextResponse.json({
      success: true,
      data: {
        productId,
        productName: product.name,
        forecast,
        generatedAt: new Date().toISOString(),
        horizon,
        modelType: 'INTELLECT_ENSEMBLE',
        mape: 7.5,
        insights: [
          `Demand shows stable trend for ${vertical.toLowerCase()} products`,
          'Seasonal patterns indicate moderate demand in upcoming weeks',
          'External factors suggest positive market conditions'
        ]
      }
    });

  } catch (error) {
    console.error('Error generating forecast:', error);
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const limit = parseInt(searchParams.get('limit') || '50');

    const filteredProducts = productId ? demoProducts.filter(p => p.id === productId) : demoProducts;

    const mockForecasts = filteredProducts.slice(0, Math.min(limit, 10)).map((product, i) => ({
      id: `forecast-${product.id}-${i}`,
      productId: product.id,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      horizon: 30,
      quantity: Math.floor(45 + Math.random() * 20),
      confidence: 0.85 + Math.random() * 0.1,
      modelType: 'INTELLECT_ENSEMBLE',
      modelVersion: '1.0',
      accuracy: 0.92,
      externalFactors: { factors: ['weather', 'economic'] },
      product: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        vertical: product.vertical,
      },
    }));

    return NextResponse.json({
      success: true,
      data: mockForecasts,
    });
  } catch (error) {
    console.error('Error fetching forecasts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forecasts' },
      { status: 500 }
    );
  }
}