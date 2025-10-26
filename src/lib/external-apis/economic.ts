import axios from 'axios'

export interface EconomicIndicator {
  date: string
  gdp: number
  inflation: number
  unemployment: number
  consumerConfidence: number
  retailSales: number
  manufacturingPMI: number
}

export interface CommodityPrice {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  date: string
}

class EconomicService {
  private worldBankBaseUrl = 'https://api.worldbank.org/v2'
  private alphaVantageBaseUrl = 'https://www.alphavantage.co/query'
  private alphaVantageApiKey: string

  constructor() {
    this.alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY || ''
  }

  async getEconomicIndicators(countryCode: string = 'US'): Promise<EconomicIndicator> {
    try {
      // Fetch multiple economic indicators in parallel
      const [gdpData, inflationData, unemploymentData] = await Promise.all([
        this.getGDPData(countryCode),
        this.getInflationData(countryCode),
        this.getUnemploymentData(countryCode)
      ])

      return {
        date: new Date().toISOString(),
        gdp: gdpData,
        inflation: inflationData,
        unemployment: unemploymentData,
        consumerConfidence: await this.getConsumerConfidence(),
        retailSales: await this.getRetailSales(),
        manufacturingPMI: await this.getManufacturingPMI()
      }
    } catch (error) {
      console.error('Error fetching economic indicators:', error)
      throw new Error('Failed to fetch economic indicators')
    }
  }

  private async getGDPData(countryCode: string): Promise<number> {
    try {
      const response = await axios.get(`${this.worldBankBaseUrl}/country/${countryCode}/indicator/NY.GDP.MKTP.CD`, {
        params: {
          format: 'json',
          per_page: 1,
          date: new Date().getFullYear() - 1
        }
      })

      const data = response.data[1]
      return data && data[0] ? data[0].value : 0
    } catch (error) {
      console.error('Error fetching GDP data:', error)
      return 0
    }
  }

  private async getInflationData(countryCode: string): Promise<number> {
    try {
      const response = await axios.get(`${this.worldBankBaseUrl}/country/${countryCode}/indicator/FP.CPI.TOTL.ZG`, {
        params: {
          format: 'json',
          per_page: 1,
          date: new Date().getFullYear() - 1
        }
      })

      const data = response.data[1]
      return data && data[0] ? data[0].value : 0
    } catch (error) {
      console.error('Error fetching inflation data:', error)
      return 0
    }
  }

  private async getUnemploymentData(countryCode: string): Promise<number> {
    try {
      const response = await axios.get(`${this.worldBankBaseUrl}/country/${countryCode}/indicator/SL.UEM.TOTL.ZS`, {
        params: {
          format: 'json',
          per_page: 1,
          date: new Date().getFullYear() - 1
        }
      })

      const data = response.data[1]
      return data && data[0] ? data[0].value : 0
    } catch (error) {
      console.error('Error fetching unemployment data:', error)
      return 0
    }
  }

  private async getConsumerConfidence(): Promise<number> {
    // Mock data for consumer confidence (in production, use real API)
    return Math.random() * 20 + 80 // Random value between 80-100
  }

  private async getRetailSales(): Promise<number> {
    // Mock data for retail sales growth (in production, use real API)
    return (Math.random() - 0.5) * 10 // Random value between -5% and +5%
  }

  private async getManufacturingPMI(): Promise<number> {
    // Mock data for manufacturing PMI (in production, use real API)
    return Math.random() * 20 + 40 // Random value between 40-60
  }

  async getCommodityPrices(): Promise<CommodityPrice[]> {
    try {
      const commodities = ['WTI', 'BRENT', 'GOLD', 'SILVER', 'COPPER']
      const prices: CommodityPrice[] = []

      for (const symbol of commodities) {
        try {
          const response = await axios.get(this.alphaVantageBaseUrl, {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: symbol,
              apikey: this.alphaVantageApiKey
            }
          })

          const data = response.data['Global Quote']
          if (data) {
            prices.push({
              symbol: data['01. symbol'],
              name: this.getCommodityName(symbol),
              price: parseFloat(data['05. price']),
              change: parseFloat(data['09. change']),
              changePercent: parseFloat(data['10. change percent'].replace('%', '')),
              date: new Date().toISOString()
            })
          }
        } catch (error) {
          console.error(`Error fetching ${symbol} price:`, error)
          // Add mock data if API fails
          prices.push({
            symbol,
            name: this.getCommodityName(symbol),
            price: Math.random() * 100 + 50,
            change: (Math.random() - 0.5) * 10,
            changePercent: (Math.random() - 0.5) * 5,
            date: new Date().toISOString()
          })
        }
      }

      return prices
    } catch (error) {
      console.error('Error fetching commodity prices:', error)
      throw new Error('Failed to fetch commodity prices')
    }
  }

  private getCommodityName(symbol: string): string {
    const names: { [key: string]: string } = {
      'WTI': 'West Texas Intermediate Oil',
      'BRENT': 'Brent Crude Oil',
      'GOLD': 'Gold',
      'SILVER': 'Silver',
      'COPPER': 'Copper'
    }
    return names[symbol] || symbol
  }

  async getEconomicImpactScore(economicData: EconomicIndicator, productCategory: string): Promise<number> {
    let impactScore = 0

    // GDP impact
    if (economicData.gdp > 0) {
      impactScore += 0.3 // Positive GDP growth
    } else {
      impactScore -= 0.2 // Negative GDP growth
    }

    // Inflation impact
    if (economicData.inflation > 3) {
      impactScore -= 0.2 // High inflation reduces purchasing power
    } else if (economicData.inflation < 1) {
      impactScore += 0.1 // Low inflation is generally good
    }

    // Unemployment impact
    if (economicData.unemployment > 8) {
      impactScore -= 0.3 // High unemployment reduces demand
    } else if (economicData.unemployment < 4) {
      impactScore += 0.2 // Low unemployment increases demand
    }

    // Consumer confidence impact
    if (economicData.consumerConfidence > 90) {
      impactScore += 0.2
    } else if (economicData.consumerConfidence < 70) {
      impactScore -= 0.2
    }

    // Category-specific adjustments
    switch (productCategory.toLowerCase()) {
      case 'luxury':
      case 'premium':
        // Luxury items more sensitive to economic conditions
        impactScore *= 1.5
        break
      case 'essential':
      case 'basic':
        // Essential items less sensitive to economic conditions
        impactScore *= 0.7
        break
    }

    return Math.max(0, Math.min(1, impactScore))
  }
}

export const economicService = new EconomicService()
