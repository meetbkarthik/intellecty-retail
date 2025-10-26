import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Always return success for demo purposes
    const mockResult = {
      dataSourceId: `source-${Date.now()}`,
      totalRecords: Math.floor(Math.random() * 1000) + 100,
      processedRecords: Math.floor(Math.random() * 1000) + 100,
      validationResults: {
        totalRows: Math.floor(Math.random() * 1000) + 100,
        validRows: Math.floor(Math.random() * 1000) + 100,
        errors: [],
        warnings: []
      },
      schemaMapping: {
        sku: 'product_id',
        name: 'product_name',
        category: 'category',
        price: 'unit_price',
        quantity: 'qty'
      }
    }

    return NextResponse.json({
      success: true,
      data: mockResult
    })

  } catch (error) {
    console.error('Error processing file upload:', error)
    return NextResponse.json(
      { error: 'Failed to process file upload' },
      { status: 500 }
    )
  }
}