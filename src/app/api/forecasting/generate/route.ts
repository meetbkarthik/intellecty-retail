import { NextRequest, NextResponse } from 'next/server';
import { IntellectAIService } from '@/lib/ai/IntellectAIService';
import { industrialProducts } from '@/lib/demo-data/industrial-data';
import { apparelProducts } from '@/lib/demo-data/apparel-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, horizon = 30, includeExternalFactors = true, location = "Los Angeles", vertical = "INDUSTRIAL" } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Initialize AI service
    const aiService = new IntellectAIService('demo-tenant');

    // Find the product
    const allProducts = [...industrialProducts, ...apparelProducts];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Generate forecast using AI service
    const forecastResult = await aiService.generateDemandForecast(
      productId,
      horizon,
      location,
      vertical as 'INDUSTRIAL' | 'APPAREL' | 'GENERAL'
    );

    const forecast = forecastResult.forecast.map((demand, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      quantity: Math.round(demand),
      confidence: Math.max(0.7, 0.95 - (i / horizon) * 0.2),
      modelType: 'INTELLECT_ENSEMBLE',
      factors: includeExternalFactors ? ['weather', 'economic', 'trends'] : [],
      confidenceInterval: forecastResult.confidenceInterval[i]
    }));

    return NextResponse.json({
      success: true,
      data: {
        productId,
        productName: product.name,
        productCategory: product.category,
        productVertical: product.vertical,
        forecast,
        generatedAt: new Date().toISOString(),
        horizon,
        modelType: 'INTELLECT_ENSEMBLE',
        accuracy: 100 - forecastResult.mape,
        mape: forecastResult.mape,
        insights: forecastResult.insights,
        externalFactors: includeExternalFactors ? forecastResult.externalFactors : null
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

    // Get real product data
    const allProducts = [...industrialProducts, ...apparelProducts];
    
    // Mock forecast history with real product data
    const mockForecasts = Array.from({ length: Math.min(limit, 10) }, (_, i) => {
      const product = allProducts[i % allProducts.length];
      return {
        id: `forecast-${i}`,
        productId: productId || product.id,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        horizon: 30,
        quantity: Math.floor(45 + Math.random() * 20),
        confidence: 0.85 + Math.random() * 0.1,
        modelType: 'INTELLECT_ENSEMBLE',
        modelVersion: '1.0',
        accuracy: 0.92,
        mape: 8.0 + Math.random() * 4,
        externalFactors: { factors: ['weather', 'economic', 'trends'] },
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          category: product.category,
          vertical: product.vertical,
          currentStock: product.currentStock,
          reorderPoint: product.reorderPoint
        }
      };
    });

    return NextResponse.json({
      success: true,
      data: mockForecasts
    });

  } catch (error) {
    console.error('Error fetching forecasts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forecasts' },
      { status: 500 }
    );
  }
}