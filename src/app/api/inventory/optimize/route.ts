import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, serviceLevel = 0.95, carryingCost = 0.2, stockoutCost = 100 } = body

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Mock inventory optimization for demo
    const mockRecommendation = {
      action: 'REORDER',
      quantity: 50,
      reason: 'Current stock below reorder point',
      priority: 'HIGH',
      expectedImpact: {
        costSavings: 500,
        serviceLevelImprovement: 0.15
      },
      confidence: 0.85
    }

    return NextResponse.json({
      success: true,
      data: {
        productId,
        productName: "Demo Product",
        currentStock: 5,
        recommendation: mockRecommendation,
        optimizedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error optimizing inventory:', error)
    return NextResponse.json(
      { error: 'Failed to optimize inventory' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Mock inventory data for demo
    const mockInventory = [
      {
        id: "1",
        currentStock: 5,
        safetyStock: 10,
        reorderPoint: 15,
        reorderQuantity: 50,
        leadTime: 7,
        recommendedAction: "REORDER",
        recommendationScore: 0.85,
        product: {
          id: "1",
          name: "Industrial Bearing - SKF 6205",
          sku: "SKF-6205",
          category: "Industrial"
        }
      },
      {
        id: "2",
        currentStock: 25,
        safetyStock: 20,
        reorderPoint: 30,
        reorderQuantity: 100,
        leadTime: 14,
        recommendedAction: "MAINTAIN",
        recommendationScore: 0.92,
        product: {
          id: "2",
          name: "Fashion T-Shirt - Summer Collection",
          sku: "TSH-SUM-001",
          category: "Apparel"
        }
      }
    ]

    const filteredInventory = action 
      ? mockInventory.filter(item => item.recommendedAction === action)
      : mockInventory

    return NextResponse.json({
      success: true,
      data: {
        inventory: filteredInventory,
        healthScore: 0.78,
        totalItems: filteredInventory.length,
        itemsNeedingAttention: filteredInventory.filter(item => 
          item.recommendedAction && item.recommendedAction !== 'MAINTAIN'
        ).length
      }
    })

  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}
