import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const countryCode = searchParams.get('country') || 'US'

    // Mock economic data for demo
    const mockEconomicData = {
      indicators: {
        date: new Date().toISOString(),
        gdp: 2.5,
        inflation: 3.2,
        unemployment: 4.1,
        consumerConfidence: 85.5,
        retailSales: 2.8,
        manufacturingPMI: 52.3
      },
      commodities: [
        { symbol: "WTI", name: "West Texas Intermediate Oil", price: 75.50, change: 1.2, changePercent: 1.6, date: new Date().toISOString() },
        { symbol: "GOLD", name: "Gold", price: 1950.25, change: -5.75, changePercent: -0.3, date: new Date().toISOString() },
        { symbol: "SILVER", name: "Silver", price: 24.80, change: 0.15, changePercent: 0.6, date: new Date().toISOString() }
      ],
      country: countryCode,
      fetchedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockEconomicData
    })

  } catch (error) {
    console.error('Error fetching economic data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch economic data' },
      { status: 500 }
    )
  }
}
