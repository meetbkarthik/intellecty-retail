import axios from 'axios'

export interface WeatherData {
  temperature: number
  humidity: number
  precipitation: number
  windSpeed: number
  condition: string
  date: string
  location: string
}

export interface WeatherForecast {
  date: string
  temperature: {
    min: number
    max: number
  }
  humidity: number
  precipitation: number
  condition: string
}

class WeatherService {
  private apiKey: string
  private baseUrl = 'https://api.openweathermap.org/data/2.5'

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || ''
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      })

      const data = response.data
      return {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        precipitation: data.rain?.['1h'] || 0,
        windSpeed: data.wind.speed,
        condition: data.weather[0].main,
        date: new Date().toISOString(),
        location: data.name
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw new Error('Failed to fetch weather data')
    }
  }

  async getWeatherForecast(lat: number, lon: number, days: number = 5): Promise<WeatherForecast[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
          cnt: days * 8 // 8 forecasts per day (3-hour intervals)
        }
      })

      const forecasts: WeatherForecast[] = []
      const dailyData: { [key: string]: any[] } = {}

      // Group forecasts by date
      response.data.list.forEach((item: any) => {
        const date = item.dt_txt.split(' ')[0]
        if (!dailyData[date]) {
          dailyData[date] = []
        }
        dailyData[date].push(item)
      })

      // Calculate daily averages and extremes
      Object.entries(dailyData).forEach(([date, items]) => {
        const temperatures = items.map(item => item.main.temp)
        const humidities = items.map(item => item.main.humidity)
        const precipitations = items.map(item => item.rain?.['3h'] || 0)
        
        forecasts.push({
          date,
          temperature: {
            min: Math.min(...temperatures),
            max: Math.max(...temperatures)
          },
          humidity: humidities.reduce((a, b) => a + b, 0) / humidities.length,
          precipitation: precipitations.reduce((a, b) => a + b, 0),
          condition: items[Math.floor(items.length / 2)].weather[0].main
        })
      })

      return forecasts.slice(0, days)
    } catch (error) {
      console.error('Error fetching weather forecast:', error)
      throw new Error('Failed to fetch weather forecast')
    }
  }

  async getWeatherImpactScore(weatherData: WeatherData, productCategory: string): Promise<number> {
    // AI-powered weather impact scoring based on product category
    let impactScore = 0

    switch (productCategory.toLowerCase()) {
      case 'apparel':
      case 'clothing':
      case 'fashion':
        // Weather heavily impacts clothing sales
        if (weatherData.temperature < 10) {
          impactScore += 0.8 // High impact for cold weather items
        } else if (weatherData.temperature > 25) {
          impactScore += 0.6 // Moderate impact for summer items
        }
        if (weatherData.precipitation > 5) {
          impactScore += 0.4 // Rain affects outdoor clothing
        }
        break

      case 'outdoor':
      case 'sports':
        // Outdoor products highly weather-dependent
        if (weatherData.condition === 'Clear') {
          impactScore += 0.9
        } else if (weatherData.condition === 'Rain') {
          impactScore -= 0.7
        }
        break

      case 'food':
      case 'beverage':
        // Food and beverages have moderate weather correlation
        if (weatherData.temperature > 20) {
          impactScore += 0.3 // Cold drinks in hot weather
        }
        break

      case 'industrial':
      case 'mechanical':
        // Industrial parts have low weather correlation
        impactScore += 0.1
        break

      default:
        impactScore += 0.2 // Default moderate impact
    }

    return Math.max(0, Math.min(1, impactScore))
  }
}

export const weatherService = new WeatherService()
