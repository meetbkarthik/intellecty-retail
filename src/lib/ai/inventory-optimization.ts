import { prisma } from '@/lib/database/prisma'

export interface InventoryOptimizationInput {
  productId: string
  currentStock: number
  demandForecast: DemandForecast[]
  leadTime: number
  serviceLevel: number
  carryingCost: number
  stockoutCost: number
}

export interface DemandForecast {
  date: string
  quantity: number
  confidence: number
}

export interface InventoryRecommendation {
  action: 'REORDER' | 'REDUCE' | 'MAINTAIN' | 'PROMOTE' | 'DISCONTINUE'
  quantity?: number
  reason: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  expectedImpact: {
    costSavings?: number
    serviceLevelImprovement?: number
    riskReduction?: number
  }
  confidence: number
}

export interface SafetyStockCalculation {
  baseSafetyStock: number
  demandVariability: number
  leadTimeVariability: number
  serviceLevelFactor: number
  recommendedSafetyStock: number
}

export interface ABCAnalysis {
  category: 'A' | 'B' | 'C'
  products: ABCProduct[]
  totalValue: number
  percentage: number
}

export interface ABCProduct {
  productId: string
  sku: string
  name: string
  annualValue: number
  annualQuantity: number
  category: 'A' | 'B' | 'C'
}

class InventoryOptimizationService {
  async optimizeInventory(input: InventoryOptimizationInput): Promise<InventoryRecommendation> {
    try {
      // Calculate safety stock
      const safetyStock = await this.calculateSafetyStock(input)
      
      // Calculate reorder point
      const reorderPoint = await this.calculateReorderPoint(input, safetyStock)
      
      // Calculate economic order quantity
      const eoq = await this.calculateEOQ(input)
      
      // Generate recommendation
      const recommendation = await this.generateRecommendation(
        input,
        safetyStock,
        reorderPoint,
        eoq
      )

      // Save optimization results
      await this.saveOptimizationResults(input.productId, recommendation)

      return recommendation
    } catch (error) {
      console.error('Error optimizing inventory:', error)
      throw new Error('Failed to optimize inventory')
    }
  }

  private async calculateSafetyStock(input: InventoryOptimizationInput): Promise<SafetyStockCalculation> {
    // Calculate demand variability
    const demandValues = input.demandForecast.map(f => f.quantity)
    const meanDemand = demandValues.reduce((sum, val) => sum + val, 0) / demandValues.length
    const demandVariance = demandValues.reduce((sum, val) => sum + Math.pow(val - meanDemand, 2), 0) / demandValues.length
    const demandVariability = Math.sqrt(demandVariance)

    // Lead time variability (simplified - would use historical data in production)
    const leadTimeVariability = input.leadTime * 0.1 // 10% variability

    // Service level factor (Z-score for desired service level)
    const serviceLevelFactor = this.getServiceLevelFactor(input.serviceLevel)

    // Safety stock calculation using the formula:
    // Safety Stock = Z * √(LT * σ²D + D² * σ²LT)
    const baseSafetyStock = serviceLevelFactor * Math.sqrt(
      input.leadTime * Math.pow(demandVariability, 2) + 
      Math.pow(meanDemand, 2) * Math.pow(leadTimeVariability, 2)
    )

    return {
      baseSafetyStock,
      demandVariability,
      leadTimeVariability,
      serviceLevelFactor,
      recommendedSafetyStock: Math.ceil(baseSafetyStock)
    }
  }

  private getServiceLevelFactor(serviceLevel: number): number {
    // Z-scores for common service levels
    const zScores: { [key: number]: number } = {
      0.80: 0.84,
      0.85: 1.04,
      0.90: 1.28,
      0.95: 1.65,
      0.99: 2.33
    }
    return zScores[serviceLevel] || 1.28 // Default to 90% service level
  }

  private async calculateReorderPoint(
    input: InventoryOptimizationInput,
    safetyStock: SafetyStockCalculation
  ): Promise<number> {
    const meanDemand = input.demandForecast.reduce((sum, f) => sum + f.quantity, 0) / input.demandForecast.length
    return Math.ceil(meanDemand * input.leadTime + safetyStock.recommendedSafetyStock)
  }

  private async calculateEOQ(input: InventoryOptimizationInput): Promise<number> {
    // Economic Order Quantity formula: EOQ = √(2 * D * S / H)
    // Where D = annual demand, S = ordering cost, H = holding cost
    
    const annualDemand = input.demandForecast.reduce((sum, f) => sum + f.quantity, 0) * 12 // Annualize
    const orderingCost = 50 // Fixed ordering cost (would be configurable in production)
    const holdingCost = input.carryingCost

    if (holdingCost <= 0) return 0

    return Math.ceil(Math.sqrt((2 * annualDemand * orderingCost) / holdingCost))
  }

  private async generateRecommendation(
    input: InventoryOptimizationInput,
    safetyStock: SafetyStockCalculation,
    reorderPoint: number,
    eoq: number
  ): Promise<InventoryRecommendation> {
    const currentStock = input.currentStock
    const stockoutRisk = this.calculateStockoutRisk(input, safetyStock)
    const excessStock = this.calculateExcessStock(input, safetyStock)

    // Determine action based on current stock position
    if (currentStock <= reorderPoint) {
      return {
        action: 'REORDER',
        quantity: eoq,
        reason: `Current stock (${currentStock}) is at or below reorder point (${reorderPoint})`,
        priority: stockoutRisk > 0.3 ? 'HIGH' : 'MEDIUM',
        expectedImpact: {
          serviceLevelImprovement: Math.min(0.2, stockoutRisk),
          costSavings: this.calculateReorderSavings(input, eoq)
        },
        confidence: 0.85
      }
    } else if (excessStock > eoq * 2) {
      return {
        action: 'REDUCE',
        quantity: Math.ceil(excessStock / 2),
        reason: `Excess stock detected (${excessStock} units above optimal)`,
        priority: 'MEDIUM',
        expectedImpact: {
          costSavings: excessStock * input.carryingCost * 0.1
        },
        confidence: 0.75
      }
    } else if (stockoutRisk > 0.5) {
      return {
        action: 'PROMOTE',
        reason: 'High stockout risk detected - consider promotional activities',
        priority: 'HIGH',
        expectedImpact: {
          riskReduction: stockoutRisk * 0.3
        },
        confidence: 0.70
      }
    } else {
      return {
        action: 'MAINTAIN',
        reason: 'Current stock levels are optimal',
        priority: 'LOW',
        expectedImpact: {},
        confidence: 0.90
      }
    }
  }

  private calculateStockoutRisk(input: InventoryOptimizationInput, safetyStock: SafetyStockCalculation): number {
    const currentStock = input.currentStock
    const meanDemand = input.demandForecast.reduce((sum, f) => sum + f.quantity, 0) / input.demandForecast.length
    const daysOfStock = currentStock / meanDemand
    const leadTime = input.leadTime

    if (daysOfStock <= leadTime) {
      return 1.0 // High risk
    } else if (daysOfStock <= leadTime + 7) {
      return 0.7 // Medium risk
    } else {
      return 0.2 // Low risk
    }
  }

  private calculateExcessStock(input: InventoryOptimizationInput, safetyStock: SafetyStockCalculation): number {
    const currentStock = input.currentStock
    const optimalStock = safetyStock.recommendedSafetyStock + 
      (input.demandForecast.reduce((sum, f) => sum + f.quantity, 0) / input.demandForecast.length) * input.leadTime
    
    return Math.max(0, currentStock - optimalStock)
  }

  private calculateReorderSavings(input: InventoryOptimizationInput, eoq: number): number {
    const stockoutCost = input.stockoutCost
    const carryingCost = input.carryingCost
    return stockoutCost * 0.1 - carryingCost * eoq * 0.05 // Simplified calculation
  }

  private async saveOptimizationResults(productId: string, recommendation: InventoryRecommendation) {
    await prisma.inventory.updateMany({
      where: { productId },
      data: {
        recommendedAction: recommendation.action,
        recommendationScore: recommendation.confidence,
        lastUpdated: new Date()
      }
    })
  }

  async performABCAnalysis(tenantId: string): Promise<ABCAnalysis> {
    try {
      // Get all products with sales data for the tenant
      const products = await prisma.product.findMany({
        where: { tenantId },
        include: {
          sales: {
            where: {
              date: {
                gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Last year
              }
            }
          }
        }
      })

      // Calculate annual value for each product
      const productValues: ABCProduct[] = products.map(product => {
        const annualQuantity = product.sales.reduce((sum, sale) => sum + sale.quantity, 0)
        const annualValue = product.sales.reduce((sum, sale) => sum + (sale.quantity * sale.unitPrice), 0)
        
        return {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          annualValue,
          annualQuantity,
          category: 'C' // Will be updated below
        }
      })

      // Sort by annual value (descending)
      productValues.sort((a, b) => b.annualValue - a.annualValue)

      // Calculate total value
      const totalValue = productValues.reduce((sum, product) => sum + product.annualValue, 0)

      // Categorize products (80-15-5 rule)
      const categoryA: ABCProduct[] = []
      const categoryB: ABCProduct[] = []
      const categoryC: ABCProduct[] = []

      let cumulativeValue = 0
      let cumulativePercentage = 0

      productValues.forEach(product => {
        cumulativeValue += product.annualValue
        cumulativePercentage = (cumulativeValue / totalValue) * 100

        if (cumulativePercentage <= 80) {
          product.category = 'A'
          categoryA.push(product)
        } else if (cumulativePercentage <= 95) {
          product.category = 'B'
          categoryB.push(product)
        } else {
          product.category = 'C'
          categoryC.push(product)
        }
      })

      return {
        category: 'A',
        products: [...categoryA, ...categoryB, ...categoryC],
        totalValue,
        percentage: 100
      }
    } catch (error) {
      console.error('Error performing ABC analysis:', error)
      throw new Error('Failed to perform ABC analysis')
    }
  }

  async calculateInventoryHealthScore(tenantId: string): Promise<number> {
    try {
      const inventory = await prisma.inventory.findMany({
        where: { tenantId },
        include: { product: true }
      })

      if (inventory.length === 0) return 0

      let totalScore = 0
      let totalWeight = 0

      inventory.forEach(item => {
        const weight = 1 // Could be based on product value
        totalWeight += weight

        // Calculate health score for this item
        const stockoutRisk = this.calculateStockoutRiskForItem(item)
        const excessStock = this.calculateExcessStockForItem(item)
        const turnoverRate = this.calculateTurnoverRate(item)

        const itemScore = Math.max(0, 1 - stockoutRisk - excessStock + turnoverRate)
        totalScore += itemScore * weight
      })

      return totalWeight > 0 ? totalScore / totalWeight : 0
    } catch (error) {
      console.error('Error calculating inventory health score:', error)
      return 0
    }
  }

  private calculateStockoutRiskForItem(item: any): number {
    // Simplified stockout risk calculation
    const currentStock = item.currentStock
    const reorderPoint = item.reorderPoint
    
    if (currentStock <= reorderPoint) return 0.8
    if (currentStock <= reorderPoint * 1.2) return 0.4
    return 0.1
  }

  private calculateExcessStockForItem(item: any): number {
    // Simplified excess stock calculation
    const currentStock = item.currentStock
    const safetyStock = item.safetyStock
    
    if (currentStock > safetyStock * 3) return 0.3
    if (currentStock > safetyStock * 2) return 0.1
    return 0
  }

  private calculateTurnoverRate(item: any): number {
    // Simplified turnover rate calculation
    // In production, this would use actual sales data
    return 0.2 // Placeholder
  }
}

export const inventoryOptimizationService = new InventoryOptimizationService()
