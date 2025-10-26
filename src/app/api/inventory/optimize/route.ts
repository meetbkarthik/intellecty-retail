import { NextRequest, NextResponse } from 'next/server';
import { industrialProducts } from '@/lib/demo-data/industrial-data';
import { apparelProducts } from '@/lib/demo-data/apparel-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, currentStock, leadTimeDays = 14, horizon = 30 } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Find the product
    const allProducts = [...industrialProducts, ...apparelProducts];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Generate simple mock optimization
    const avgDailyDemand = 5; // Mock average daily demand
    const optimalReorderPoint = Math.round(avgDailyDemand * leadTimeDays * 1.2);
    const optimalSafetyStock = Math.round(avgDailyDemand * 7);
    const recommendedOrderQuantity = Math.round(
      Math.max(0, optimalReorderPoint + optimalSafetyStock - (currentStock || product.currentStock) + avgDailyDemand * 30)
    );

    return NextResponse.json({
      success: true,
      data: {
        productId,
        productName: product.name,
        productCategory: product.category,
        currentStock: currentStock || product.currentStock,
        leadTimeDays,
        optimalReorderPoint,
        optimalSafetyStock,
        recommendedOrderQuantity,
        wastePrediction: parseFloat((Math.random() * 10).toFixed(2)),
        carbonFootprintReduction: parseFloat((Math.random() * 20).toFixed(2)),
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error optimizing inventory:', error);
    return NextResponse.json(
      { error: 'Failed to optimize inventory' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const vertical = searchParams.get('vertical');

    // Get real product data
    const allProducts = [...industrialProducts, ...apparelProducts];
    
    // Filter products based on query parameters
    let filteredProducts = allProducts;
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (vertical) {
      filteredProducts = filteredProducts.filter(p => p.vertical === vertical.toUpperCase());
    }

    // Generate inventory data with optimization recommendations
    const inventoryData = filteredProducts.map(product => {
      const stockLevel = product.currentStock;
      const reorderPoint = product.reorderPoint;
      const safetyStock = product.safetyStock;
      const leadTime = product.leadTime;
      
      // Calculate stock status
      let status = 'healthy';
      if (stockLevel <= safetyStock) {
        status = 'critical';
      } else if (stockLevel <= reorderPoint) {
        status = 'low';
      }

      // Calculate days of stock remaining (based on average daily demand)
      const avgDailyDemand = 5; // Mock average daily demand
      const daysRemaining = Math.floor(stockLevel / avgDailyDemand);

      return {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        category: product.category,
        vertical: product.vertical,
        currentStock: stockLevel,
        reorderPoint,
        safetyStock,
        leadTime,
        status,
        daysRemaining,
        value: stockLevel * product.price,
        cost: stockLevel * product.cost,
        supplier: product.supplier,
        location: product.location,
        lastUpdated: new Date().toISOString()
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        products: inventoryData,
        summary: {
          totalProducts: inventoryData.length,
          totalValue: inventoryData.reduce((sum, p) => sum + p.value, 0),
          totalCost: inventoryData.reduce((sum, p) => sum + p.cost, 0),
          criticalItems: inventoryData.filter(p => p.status === 'critical').length,
          lowStockItems: inventoryData.filter(p => p.status === 'low').length,
          healthyItems: inventoryData.filter(p => p.status === 'healthy').length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}