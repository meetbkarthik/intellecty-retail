"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Brain,
  Zap,
  Globe,
  Leaf,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

export default function AnalyticsPage() {
  // Mock analytics data
  const performanceMetrics = {
    forecastAccuracy: 94,
    inventoryTurnover: 8.5,
    stockoutRate: 2.3,
    carryingCost: 12.5,
    serviceLevel: 97.8
  }

  const sustainabilityMetrics = {
    carbonFootprint: 1250, // kg CO2
    wasteReduction: 15, // percentage
    energyEfficiency: 85, // percentage
    sustainableSourcing: 78 // percentage
  }

  const externalFactors = {
    weather: { impact: 0.12, trend: "positive" },
    economic: { impact: 0.08, trend: "positive" },
    trends: { impact: 0.15, trend: "positive" },
    events: { impact: 0.05, trend: "neutral" }
  }

  const modelPerformance = [
    { model: "IntellectTemporal-Net", accuracy: 96, usage: 45 },
    { model: "IntellectFashion-Net", accuracy: 92, usage: 30 },
    { model: "IntellectManufacturing-Net", accuracy: 94, usage: 25 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600">Comprehensive analytics and AI-powered insights for your retail operations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Brain className="mr-2 h-4 w-4" />
            Generate Insights
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performanceMetrics.forecastAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.inventoryTurnover}x</div>
            <p className="text-xs text-muted-foreground">
              +0.5x from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockout Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{performanceMetrics.stockoutRate}%</div>
            <p className="text-xs text-muted-foreground">
              -0.8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carrying Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${performanceMetrics.carryingCost}K</div>
            <p className="text-xs text-muted-foreground">
              -$1.2K from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Level</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{performanceMetrics.serviceLevel}%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different analytics views */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="external-factors">External Factors</TabsTrigger>
          <TabsTrigger value="ai-models">AI Models</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend Analysis</CardTitle>
                <CardDescription>Monthly sales performance over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Sales</span>
                    <span className="text-2xl font-bold text-green-600">$2.4M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Growth Rate</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Best Month</span>
                    <span className="font-medium">December 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Worst Month</span>
                    <span className="font-medium">February 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Health */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Health Score</CardTitle>
                <CardDescription>Overall inventory management performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-blue-600">78/100</span>
                  </div>
                  <Progress value={78} className="h-3" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">85%</div>
                      <div className="text-sm text-green-700">Stock Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">72%</div>
                      <div className="text-sm text-blue-700">Turnover Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Performance metrics by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Industrial Parts", sales: 1200000, growth: 15.2, margin: 35 },
                  { category: "Apparel", sales: 800000, growth: 8.7, margin: 45 },
                  { category: "Electronics", sales: 400000, growth: -2.1, margin: 25 }
                ].map((cat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{cat.category}</div>
                        <div className="text-sm text-gray-500">${cat.sales.toLocaleString()} sales</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className={`font-bold ${cat.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {cat.growth > 0 ? "+" : ""}{cat.growth}%
                        </div>
                        <div className="text-sm text-gray-500">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{cat.margin}%</div>
                        <div className="text-sm text-gray-500">Margin</div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{sustainabilityMetrics.carbonFootprint} kg</div>
                <p className="text-xs text-muted-foreground">
                  -8% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Reduction</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{sustainabilityMetrics.wasteReduction}%</div>
                <p className="text-xs text-muted-foreground">
                  +3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{sustainabilityMetrics.energyEfficiency}%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sustainable Sourcing</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{sustainabilityMetrics.sustainableSourcing}%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability Impact</CardTitle>
              <CardDescription>Environmental impact of your inventory operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Positive Impact</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Reduced carbon footprint by 8% through optimized inventory levels</li>
                    <li>• Decreased waste by 15% with better demand forecasting</li>
                    <li>• Improved energy efficiency by 2% through smart warehouse management</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Recommendations</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Consider switching to renewable energy sources for warehouses</li>
                    <li>• Implement circular economy practices for product returns</li>
                    <li>• Partner with sustainable suppliers for better sourcing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external-factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>External Factors Impact</CardTitle>
              <CardDescription>How external factors influence your demand patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(externalFactors).map(([factor, data]) => (
                  <div key={factor} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{factor}</span>
                      <Badge variant={data.trend === "positive" ? "default" : "secondary"}>
                        {data.trend === "positive" ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {data.trend}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.abs(data.impact * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Impact on demand</div>
                    <Progress value={Math.abs(data.impact * 100)} className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Performance</CardTitle>
              <CardDescription>Performance metrics for proprietary AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelPerformance.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{model.model}</div>
                        <div className="text-sm text-gray-500">{model.usage}% usage</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="font-bold text-green-600">{model.accuracy}%</div>
                        <div className="text-sm text-gray-500">Accuracy</div>
                      </div>
                      <div className="w-20">
                        <Progress value={model.accuracy} />
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
