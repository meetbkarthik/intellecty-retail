/**
 * Simplified AI Service for Demo Purposes
 * This service provides mock AI functionality without external API dependencies
 */

export class SimpleAIService {
  private tenantId: string;

  constructor(tenantId: string) {
    this.tenantId = tenantId;
  }

  /**
   * Generates a demand forecast for a given product
   */
  async generateDemandForecast(
    productId: string,
    horizonDays: number,
    location: string,
    productVertical: 'INDUSTRIAL' | 'APPAREL' | 'GENERAL'
  ): Promise<{ 
    forecast: number[]; 
    confidenceInterval: [number, number][]; 
    mape: number;
    insights: string[];
    externalFactors: any;
  }> {
    console.log(`Generating demand forecast for product ${productId} (${productVertical}) for ${horizonDays} days...`);

    // Generate mock forecast data
    const baseValue = productVertical === 'APPAREL' ? 80 : productVertical === 'INDUSTRIAL' ? 120 : 100;
    const forecast = Array.from({ length: horizonDays }, (_, i) => {
      const seasonalComponent = Math.sin(i / 10) * 20;
      const trendComponent = i * 0.5;
      const noiseComponent = (Math.random() - 0.5) * 10;
      return Math.max(0, baseValue + seasonalComponent + trendComponent + noiseComponent);
    });

    // Generate confidence intervals
    const confidenceInterval: [number, number][] = forecast.map(val => [val * 0.9, val * 1.1]);

    // Generate insights
    const insights = [
      `Demand shows ${Math.random() > 0.5 ? 'increasing' : 'stable'} trend for ${productVertical.toLowerCase()} products`,
      `Seasonal patterns indicate ${Math.random() > 0.5 ? 'higher' : 'lower'} demand in upcoming weeks`,
      `External factors suggest ${Math.random() > 0.5 ? 'positive' : 'neutral'} market conditions`
    ];

    // Mock external factors
    const externalFactors = {
      weather: { temperature: 20 + Math.random() * 10, condition: 'Clear' },
      economic: { gdp: 2.5 + Math.random() * 1, inflation: 3.2 + Math.random() * 0.5 },
      trends: { searchInterest: 50 + Math.random() * 20, socialMentions: 100 + Math.random() * 50 }
    };

    const mape = parseFloat((5 + Math.random() * 5).toFixed(2)); // 5-10% MAPE

    console.log(`Forecast generated for product ${productId}. MAPE: ${mape}%`);
    return { forecast, confidenceInterval, mape, insights, externalFactors };
  }

  /**
   * Provides inventory optimization recommendations
   */
  async getInventoryOptimization(
    productId: string,
    currentStock: number,
    leadTimeDays: number,
    demandForecast: number[]
  ): Promise<{
    optimalReorderPoint: number;
    optimalSafetyStock: number;
    recommendedOrderQuantity: number;
    wastePrediction: number;
    carbonFootprintReduction: number;
    costSavings: number;
    recommendations: string[];
  }> {
    console.log(`Optimizing inventory for product ${productId}...`);

    // Calculate optimization metrics
    const forecastedDemandSum = demandForecast.reduce((sum, val) => sum + val, 0);
    const avgDailyDemand = forecastedDemandSum / demandForecast.length;

    const optimalReorderPoint = Math.round(avgDailyDemand * leadTimeDays * 1.2); // 20% buffer
    const optimalSafetyStock = Math.round(avgDailyDemand * 7); // 1 week of safety stock
    const recommendedOrderQuantity = Math.round(
      Math.max(0, optimalReorderPoint + optimalSafetyStock - currentStock + avgDailyDemand * 30)
    );

    const wastePrediction = parseFloat((Math.random() * 10).toFixed(2)); // 0-10% waste
    const carbonFootprintReduction = parseFloat((Math.random() * 20).toFixed(2)); // 0-20% reduction
    const costSavings = parseFloat((Math.random() * 1000 + 500).toFixed(2)); // $500-1500 savings

    const recommendations = [
      `Reorder ${recommendedOrderQuantity} units to maintain optimal stock levels`,
      `Implement safety stock of ${optimalSafetyStock} units to prevent stockouts`,
      `Expected cost savings of $${costSavings} through optimized inventory management`,
      `Reduce waste by ${wastePrediction}% through better demand forecasting`
    ];

    return {
      optimalReorderPoint,
      optimalSafetyStock,
      recommendedOrderQuantity,
      wastePrediction,
      carbonFootprintReduction,
      costSavings,
      recommendations
    };
  }
}
