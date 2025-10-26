import { NextRequest, NextResponse } from 'next/server';
import { IntellectAIService } from '@/lib/ai/IntellectAIService';
import { industrialProducts } from '@/lib/demo-data/industrial-data';
import { apparelProducts } from '@/lib/demo-data/apparel-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vertical = searchParams.get('vertical');
    const category = searchParams.get('category');

    // Initialize AI service
    const aiService = new IntellectAIService('demo-tenant');

    // Get real product data
    const allProducts = [...industrialProducts, ...apparelProducts];
    
    // Filter products based on query parameters
    let filteredProducts = allProducts;
    if (vertical) {
      filteredProducts = filteredProducts.filter(p => p.vertical === vertical.toUpperCase());
    }
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    // Prepare products for ABC analysis (add quantity based on current stock)
    const productsForAnalysis = filteredProducts.map(product => ({
      ...product,
      quantity: product.currentStock,
      value: product.currentStock * product.price,
      cost: product.currentStock * product.cost
    }));

    // Generate ABC analysis using AI service
    const abcAnalysis = await aiService.generateABCAnalysis(productsForAnalysis);

    // Calculate additional metrics
    const totalProducts = productsForAnalysis.length;
    const totalValue = productsForAnalysis.reduce((sum, p) => sum + p.value, 0);
    const totalCost = productsForAnalysis.reduce((sum, p) => sum + p.cost, 0);

    // Generate insights
    const insights = [
      `Category A products (${abcAnalysis.categoryA.length} items) represent ${abcAnalysis.analysis.categoryAPercentage.toFixed(1)}% of total inventory value`,
      `Category B products (${abcAnalysis.categoryB.length} items) represent ${abcAnalysis.analysis.categoryBPercentage.toFixed(1)}% of total inventory value`,
      `Category C products (${abcAnalysis.categoryC.length} items) represent ${abcAnalysis.analysis.categoryCPercentage.toFixed(1)}% of total inventory value`,
      `Focus on Category A products for maximum impact on inventory optimization`,
      `Consider reducing safety stock for Category C products to free up capital`
    ];

    // Generate recommendations
    const recommendations = [
      {
        category: 'A',
        title: 'High-Value Items Management',
        description: 'Implement strict inventory control and frequent monitoring for Category A products',
        impact: 'High',
        priority: 'Critical'
      },
      {
        category: 'B',
        title: 'Balanced Approach',
        description: 'Use moderate inventory control with regular reviews for Category B products',
        impact: 'Medium',
        priority: 'Important'
      },
      {
        category: 'C',
        title: 'Cost-Effective Management',
        description: 'Use simple inventory control methods and consider reducing safety stock for Category C products',
        impact: 'Low',
        priority: 'Standard'
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        analysis: {
          totalProducts,
          totalValue,
          totalCost,
          categoryAPercentage: abcAnalysis.analysis.categoryAPercentage,
          categoryBPercentage: abcAnalysis.analysis.categoryBPercentage,
          categoryCPercentage: abcAnalysis.analysis.categoryCPercentage
        },
        categories: {
          A: {
            products: abcAnalysis.categoryA,
            count: abcAnalysis.categoryA.length,
            percentage: abcAnalysis.analysis.categoryAPercentage,
            totalValue: abcAnalysis.categoryA.reduce((sum, p) => sum + p.value, 0),
            recommendations: recommendations.filter(r => r.category === 'A')
          },
          B: {
            products: abcAnalysis.categoryB,
            count: abcAnalysis.categoryB.length,
            percentage: abcAnalysis.analysis.categoryBPercentage,
            totalValue: abcAnalysis.categoryB.reduce((sum, p) => sum + p.value, 0),
            recommendations: recommendations.filter(r => r.category === 'B')
          },
          C: {
            products: abcAnalysis.categoryC,
            count: abcAnalysis.categoryC.length,
            percentage: abcAnalysis.analysis.categoryCPercentage,
            totalValue: abcAnalysis.categoryC.reduce((sum, p) => sum + p.value, 0),
            recommendations: recommendations.filter(r => r.category === 'C')
          }
        },
        insights,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error generating ABC analysis:', error);
    return NextResponse.json(
      { error: 'Failed to generate ABC analysis' },
      { status: 500 }
    );
  }
}