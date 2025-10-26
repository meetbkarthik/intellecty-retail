"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Brain, 
  Calendar, 
  Target, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from "lucide-react"
import { toast } from "sonner"

export default function ForecastingPage() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [forecastHorizon, setForecastHorizon] = useState("30")
  const [isGenerating, setIsGenerating] = useState(false)
  const [forecastData, setForecastData] = useState<any>(null)

  // Mock products data
  const products = [
    { id: "1", name: "Industrial Bearing - SKF 6205", category: "Industrial", sku: "SKF-6205" },
    { id: "2", name: "Fashion T-Shirt - Summer Collection", category: "Apparel", sku: "TSH-SUM-001" },
    { id: "3", name: "Mechanical Seal - Type A", category: "Industrial", sku: "MS-TYPE-A" },
    { id: "4", name: "Denim Jeans - Classic Blue", category: "Apparel", sku: "DJ-CL-BLU" },
    { id: "5", name: "Hydraulic Pump - Model HP-200", category: "Industrial", sku: "HP-200" }
  ]

  const handleGenerateForecast = async () => {
    if (!selectedProduct) {
      toast.error("Please select a product")
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock forecast data
      const mockForecast = {
        productId: selectedProduct,
        productName: products.find(p => p.id === selectedProduct)?.name || "",
        modelType: "INTELLECT_ENSEMBLE",
        accuracy: 0.92,
        forecast: [
          { date: "2024-01-15", quantity: 45, confidence: 0.95 },
          { date: "2024-01-16", quantity: 48, confidence: 0.94 },
          { date: "2024-01-17", quantity: 52, confidence: 0.93 },
          { date: "2024-01-18", quantity: 49, confidence: 0.92 },
          { date: "2024-01-19", quantity: 46, confidence: 0.91 },
          { date: "2024-01-20", quantity: 44, confidence: 0.90 },
          { date: "2024-01-21", quantity: 47, confidence: 0.89 }
        ],
        externalFactors: {
          weather: { impact: 0.05, description: "Mild weather conditions" },
          economic: { impact: 0.02, description: "Stable economic indicators" },
          trends: { impact: 0.08, description: "Positive market trends" }
        }
      }
      
      setForecastData(mockForecast)
      toast.success("Forecast generated successfully!")
    } catch (error) {
      toast.error("Failed to generate forecast")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Forecasting</h1>
          <p className="text-gray-600">Generate intelligent demand forecasts using proprietary AI models</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Brain className="mr-1 h-3 w-3" />
            IntellectTemporal-Net Active
          </Badge>
        </div>
      </div>

      {/* Forecast Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span>Generate New Forecast</span>
          </CardTitle>
          <CardDescription>
            Select a product and configure parameters for AI-powered demand forecasting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horizon">Forecast Horizon</Label>
              <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Actions</Label>
              <Button 
                onClick={handleGenerateForecast}
                disabled={isGenerating || !selectedProduct}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Forecast
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Results */}
      {forecastData && (
        <div className="space-y-6">
          {/* Forecast Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Forecast Results</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {Math.round(forecastData.accuracy * 100)}% Accuracy
                </Badge>
              </CardTitle>
              <CardDescription>
                AI-powered forecast for {forecastData.productName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {forecastData.forecast.reduce((sum: number, f: any) => sum + f.quantity, 0)}
                  </div>
                  <div className="text-sm text-blue-800">Total Forecasted Units</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(forecastData.forecast.reduce((sum: number, f: any) => sum + f.quantity, 0) / forecastData.forecast.length)}
                  </div>
                  <div className="text-sm text-green-800">Average Daily Demand</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {forecastData.modelType}
                  </div>
                  <div className="text-sm text-purple-800">AI Model Used</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {forecastData.forecast.length}
                  </div>
                  <div className="text-sm text-orange-800">Forecast Periods</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Forecast Breakdown</CardTitle>
              <CardDescription>Detailed daily predictions with confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {forecastData.forecast.map((day: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold text-lg">{day.quantity}</div>
                        <div className="text-sm text-gray-500">units</div>
                      </div>
                      <div className="w-20">
                        <div className="text-sm text-gray-600 mb-1">
                          {Math.round(day.confidence * 100)}% confidence
                        </div>
                        <Progress value={day.confidence * 100} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* External Factors */}
          <Card>
            <CardHeader>
              <CardTitle>External Factors Analysis</CardTitle>
              <CardDescription>Impact of external factors on forecast accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Weather Impact</span>
                    <Badge variant={forecastData.externalFactors.weather.impact > 0 ? "default" : "secondary"}>
                      {forecastData.externalFactors.weather.impact > 0 ? (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(forecastData.externalFactors.weather.impact * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{forecastData.externalFactors.weather.description}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Economic Impact</span>
                    <Badge variant={forecastData.externalFactors.economic.impact > 0 ? "default" : "secondary"}>
                      {forecastData.externalFactors.economic.impact > 0 ? (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(forecastData.externalFactors.economic.impact * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{forecastData.externalFactors.economic.description}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Trend Impact</span>
                    <Badge variant={forecastData.externalFactors.trends.impact > 0 ? "default" : "secondary"}>
                      {forecastData.externalFactors.trends.impact > 0 ? (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(forecastData.externalFactors.trends.impact * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{forecastData.externalFactors.trends.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Forecasts</CardTitle>
          <CardDescription>Your latest AI-generated forecasts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sku}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold">45 units</div>
                    <div className="text-sm text-gray-500">7-day forecast</div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    92% accuracy
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
