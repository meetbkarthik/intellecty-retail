import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '40.7128')
    const lon = parseFloat(searchParams.get('lon') || '-74.0060')
    const days = parseInt(searchParams.get('days') || '5')

    // Mock weather data for demo
    const mockWeatherData = {
      current: {
        temperature: 22,
        humidity: 65,
        precipitation: 0,
        windSpeed: 12,
        condition: "Clear",
        date: new Date().toISOString(),
        location: "New York"
      },
      forecast: Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temperature: { min: 18 + Math.random() * 5, max: 25 + Math.random() * 5 },
        humidity: 60 + Math.random() * 20,
        precipitation: Math.random() * 10,
        condition: ["Clear", "Cloudy", "Rain", "Sunny"][Math.floor(Math.random() * 4)]
      })),
      location: { lat, lon },
      fetchedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: mockWeatherData
    })

  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
