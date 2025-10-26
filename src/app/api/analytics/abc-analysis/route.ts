import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock ABC analysis data for demo
    const mockABCData = {
      abcAnalysis: {
        totalProducts: 100,
        totalValue: 125000,
        categoryStats: {
          A: {
            count: 12,
            totalValue: 100000,
            percentage: 80
          },
          B: {
            count: 25,
            totalValue: 20000,
            percentage: 16
          },
          C: {
            count: 63,
            totalValue: 5000,
            percentage: 4
          }
        },
        products: [
          { productId: "1", sku: "SKF-6205", name: "Industrial Bearing", annualValue: 15000, annualQuantity: 500, category: "A" },
          { productId: "2", sku: "TSH-SUM-001", name: "Fashion T-Shirt", annualValue: 12000, annualQuantity: 800, category: "A" },
          { productId: "3", sku: "MS-TYPE-A", name: "Mechanical Seal", annualValue: 8000, annualQuantity: 200, category: "B" }
        ]
      },
      healthScore: 0.78,
      recommendations: {
        categoryA: "Focus on these high-value items. Ensure optimal stock levels and consider advanced forecasting.",
        categoryB: "Monitor these medium-value items. Use standard inventory management practices.",
        categoryC: "Consider reducing complexity for these low-value items. Use simple reorder points."
      }
    }

    return NextResponse.json({
      success: true,
      data: mockABCData
    })

  } catch (error) {
    console.error('Error performing ABC analysis:', error)
    return NextResponse.json(
      { error: 'Failed to perform ABC analysis' },
      { status: 500 }
    )
  }
}
