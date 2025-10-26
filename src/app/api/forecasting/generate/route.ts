import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, horizon = 30, includeExternalFactors = true } = body

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Mock forecast data for demo
    const mockForecast = Array.from({ length: horizon }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      quantity: Math.floor(45 + Math.random() * 20 + Math.sin(i / 7) * 10),
      confidence: Math.max(0.7, 0.95 - (i / horizon) * 0.2),
      modelType: 'INTELLECT_ENSEMBLE',
      factors: includeExternalFactors ? ['weather', 'economic', 'trends'] : []
    }))

    return NextResponse.json({
      success: true,
      data: {
        productId,
        productName: "Demo Product",
        forecast: mockForecast,
        generatedAt: new Date().toISOString(),
        horizon,
        modelType: 'INTELLECT_ENSEMBLE'
      }
    })

  } catch (error) {
    console.error('Error generating forecast:', error)
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Mock forecast history for demo
    const mockForecasts = Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
      id: `forecast-${i}`,
      productId: productId || `product-${i}`,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      horizon: 30,
      quantity: Math.floor(45 + Math.random() * 20),
      confidence: 0.85 + Math.random() * 0.1,
      modelType: 'INTELLECT_ENSEMBLE',
      modelVersion: '1.0',
      accuracy: 0.92,
      externalFactors: { factors: ['weather', 'economic'] },
      product: {
        id: productId || `product-${i}`,
        name: `Product ${i + 1}`,
        sku: `SKU-${i + 1}`
      }
    }))

    return NextResponse.json({
      success: true,
      data: mockForecasts
    })

  } catch (error) {
    console.error('Error fetching forecasts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch forecasts' },
      { status: 500 }
    )
  }
}
