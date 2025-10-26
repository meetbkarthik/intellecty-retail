/**
 * Customer Dashboard
 * Main dashboard for retail intelligence insights and actions
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Zap,
  BarChart3,
  Target
} from "lucide-react"

export default function CustomerDashboard() {
  // Mock data - in real implementation, this would come from APIs
  const metrics = {
    forecastAccuracy: 92.3,
    inventoryValue: 245000,
    monthlySales: 189000,
    wasteReduction: 15.2,
    stockouts: 3,
    overstock: 12,
    aiInsights: 8,
    costSavings: 12500
  }

  const recentInsights = [
    {
      id: 1,
      type: "forecast",
      title: "Electronics demand spike predicted",
      description: "AI detected 23% increase in electronics demand for next 2 weeks",
      impact: "high",
      action: "Increase stock levels",
      confidence: 94
    },
    {
      id: 2,
      type: "inventory",
      title: "Slow-moving stock identified",
      description: "15 products showing declining trend, consider markdown",
      impact: "medium",
      action: "Review pricing strategy",
      confidence: 87
    },
    {
      id: 3,
      type: "external",
      title: "Weather impact on sales",
      description: "Rainy weather expected to boost indoor product sales by 12%",
      impact: "medium",
      action: "Adjust marketing focus",
      confidence: 78
    },
    {
      id: 4,
      type: "optimization",
      title: "Replenishment opportunity",
      description: "Consolidate 3 purchase orders to save $2,400 in shipping",
      impact: "high",
      action: "Optimize orders",
      confidence: 96
    }
  ]

  const topProducts = [
    { name: "Wireless Headphones", sales: 245, trend: "up", change: 12.5 },
    { name: "Smart Watches", sales: 189, trend: "up", change: 8.3 },
    { name: "Laptop Cases", sales: 156, trend: "down", change: -3.2 },
    { name: "Phone Chargers", sales: 134, trend: "up", change: 15.7 },
    { name: "Tablet Stands", sales: 98, trend: "stable", change: 0.8 }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-green-600 bg-green-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down": return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your retail operations.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.forecastAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.inventoryValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              -5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.monthlySales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8.7% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Reduction</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.wasteReduction}%</div>
            <p className="text-xs text-muted-foreground">
              +3.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>Intelligent recommendations for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInsights.slice(0, 3).map((insight) => (
                <div key={insight.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className={`p-2 rounded-full ${getImpactColor(insight.impact)}`}>
                    <Zap className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium text-blue-600">{insight.action}</span>
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Insights
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Generate Forecast</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Package className="h-6 w-6" />
                <span className="text-sm">Optimize Inventory</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm">View Alerts</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Run Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best sellers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(product.trend)}
                    <span className={`text-sm font-medium ${
                      product.change > 0 ? 'text-green-600' : 
                      product.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {product.change > 0 ? '+' : ''}{product.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">Stockouts</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{metrics.stockouts}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Overstock Items</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{metrics.overstock}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">AI Insights Generated</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{metrics.aiInsights}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">Cost Savings</span>
                </div>
                <span className="text-sm font-medium text-gray-900">${metrics.costSavings.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">All systems operational</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Your retail intelligence platform is running smoothly with 99.9% uptime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
