import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock tenant info for demo
    const mockTierInfo = {
      tenantId: "demo-tenant",
      tenantName: "Demo Company",
      tier: "FREE",
      features: {
        maxSKUs: 100,
        maxForecastHorizon: 30,
        maxDataConnectors: 3,
        hasAdvancedAnalytics: false,
        hasCustomModels: false,
        hasPrioritySupport: false
      },
      usage: {
        currentSKUs: 45,
        currentDataConnectors: 2,
        currentForecastHorizon: 30
      },
      limits: {
        skuLimit: 100,
        forecastHorizonLimit: 30,
        dataConnectorLimit: 3
      }
    }

    return NextResponse.json({
      success: true,
      data: mockTierInfo
    })

  } catch (error) {
    console.error('Error getting tenant info:', error)
    return NextResponse.json(
      { error: 'Failed to get tenant information' },
      { status: 500 }
    )
  }
}
