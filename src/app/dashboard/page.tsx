"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in production, this would come from API calls
  const stats = {
    totalProducts: 156,
    activeForecasts: 89,
    lowStockItems: 12,
    highAccuracyForecasts: 94
  }

  const recentForecasts = [
    {
      id: 1,
      product: "Industrial Bearing - SKF 6205",
      forecast: 45,
      confidence: 0.92,
      trend: "up",
      change: 12
    },
    {
      id: 2,
      product: "Fashion T-Shirt - Summer Collection",
      forecast: 78,
      confidence: 0.88,
      trend: "down",
      change: -5
    },
    {
      id: 3,
      product: "Mechanical Seal - Type A",
      forecast: 23,
      confidence: 0.95,
      trend: "up",
      change: 8
    }
  ]

  const inventoryAlerts = [
    {
      id: 1,
      product: "Industrial Bearing - SKF 6205",
      currentStock: 5,
      reorderPoint: 10,
      priority: "high"
    },
    {
      id: 2,
      product: "Fashion T-Shirt - Summer Collection",
      currentStock: 15,
      reorderPoint: 20,
      priority: "medium"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your retail operations.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Brain className="mr-2 h-4 w-4" />
            Run AI Analysis
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forecasts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeForecasts}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.highAccuracyForecasts}%</div>
            <p className="text-xs text-muted-foreground">
              Forecast accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Forecasts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Forecasts</CardTitle>
                <CardDescription>Latest AI-powered demand predictions</CardDescription>
              </div>
              <Link href="/dashboard/forecasting">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentForecasts.map((forecast) => (
                <div key={forecast.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{forecast.product}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg font-bold">{forecast.forecast}</span>
                      <span className="text-xs text-gray-500">units</span>
                      {forecast.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-xs ${forecast.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {forecast.change > 0 ? "+" : ""}{forecast.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {Math.round(forecast.confidence * 100)}% confidence
                    </div>
                    <Progress value={forecast.confidence * 100} className="w-16 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </div>
              <Link href="/dashboard/inventory">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.product}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">Current: {alert.currentStock}</span>
                      <span className="text-sm text-gray-600">Reorder: {alert.reorderPoint}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={alert.priority === "high" ? "destructive" : "secondary"}
                    >
                      {alert.priority === "high" ? "High Priority" : "Medium Priority"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <CardDescription>Intelligent recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Optimization Opportunity</span>
              </div>
              <p className="text-sm text-blue-700">
                Your industrial parts category shows 15% higher demand during maintenance seasons. 
                Consider increasing safety stock by 20% for Q2.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Trending Up</span>
              </div>
              <p className="text-sm text-green-700">
                Fashion items in your summer collection are trending 25% higher than forecasted. 
                Consider increasing production capacity.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-900">Risk Alert</span>
              </div>
              <p className="text-sm text-orange-700">
                Weather patterns suggest 30% higher demand for outdoor equipment. 
                Review your inventory levels for weather-dependent products.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/forecasting">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Generate Forecast</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/inventory">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Package className="h-6 w-6" />
                <span>Optimize Inventory</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/data-sources">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>Add Data Source</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Brain className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
