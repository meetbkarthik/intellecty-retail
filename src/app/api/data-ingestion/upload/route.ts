import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    
    // Generate mock result for any request
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

    if (contentType?.includes('application/json')) {
      // Handle JSON requests (for testing)
      try {
        const body = await request.json()
      } catch (jsonError) {
        // If JSON parsing fails, continue with mock data
      }
      
      return NextResponse.json({
        success: true,
        data: mockResult
      })
    }

    // Handle form data requests
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File
      const dataType = formData.get('dataType') as string

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }

      // Validate file type
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ 
          error: 'Invalid file type. Please upload CSV or Excel files.' 
        }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        data: mockResult
      })
    } catch (formError) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

  } catch (error) {
    console.error('Error processing file upload:', error)
    return NextResponse.json(
      { error: 'Failed to process file upload' },
      { status: 500 }
    )
  }
}

