"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  TrendingUp,
  TrendingDown,
  Zap,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { toast } from "sonner"

export default function InventoryPage() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)

  // Mock inventory data
  const inventoryItems = [
    {
      id: "1",
      product: "Industrial Bearing - SKF 6205",
      sku: "SKF-6205",
      currentStock: 5,
      safetyStock: 10,
      reorderPoint: 15,
      reorderQuantity: 50,
      leadTime: 7,
      status: "low",
      category: "A"
    },
    {
      id: "2",
      product: "Fashion T-Shirt - Summer Collection",
      sku: "TSH-SUM-001",
      currentStock: 25,
      safetyStock: 20,
      reorderPoint: 30,
      reorderQuantity: 100,
      leadTime: 14,
      status: "optimal",
      category: "B"
    },
    {
      id: "3",
      product: "Mechanical Seal - Type A",
      sku: "MS-TYPE-A",
      currentStock: 45,
      safetyStock: 15,
      reorderPoint: 20,
      reorderQuantity: 75,
      leadTime: 10,
      status: "excess",
      category: "A"
    }
  ]

  const abcAnalysis = {
    totalValue: 125000,
    categories: {
      A: { count: 12, value: 100000, percentage: 80 },
      B: { count: 25, value: 20000, percentage: 16 },
      C: { count: 63, value: 5000, percentage: 4 }
    }
  }

  const handleOptimizeInventory = async () => {
    setIsOptimizing(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock optimization results
      const mockResults = {
        healthScore: 0.78,
        recommendations: [
          {
            productId: "1",
            action: "REORDER",
            priority: "HIGH",
            reason: "Current stock below reorder point",
            expectedImpact: { costSavings: 500, serviceLevelImprovement: 0.15 }
          },
          {
            productId: "3",
            action: "REDUCE",
            priority: "MEDIUM",
            reason: "Excess stock detected",
            expectedImpact: { costSavings: 200 }
          }
        ],
        totalSavings: 700
      }
      
      setOptimizationResults(mockResults)
      toast.success("Inventory optimization completed!")
    } catch (error) {
      toast.error("Failed to optimize inventory")
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Optimization</h1>
          <p className="text-gray-600">AI-powered inventory management and optimization recommendations</p>
        </div>
        <Button onClick={handleOptimizeInventory} disabled={isOptimizing}>
          {isOptimizing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Optimize Inventory
            </>
          )}
        </Button>
      </div>

      {/* Inventory Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Inventory Health Score</span>
          </CardTitle>
          <CardDescription>
            Overall health of your inventory management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-blue-600">78%</div>
            <div className="flex-1">
              <Progress value={78} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                Good inventory health with room for improvement
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Last updated</div>
              <div className="font-medium">2 hours ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Results */}
      {optimizationResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Optimization Results</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                ${optimizationResults.totalSavings} Potential Savings
              </Badge>
            </CardTitle>
            <CardDescription>
              AI recommendations for inventory optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationResults.recommendations.map((rec: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      rec.priority === "HIGH" ? "bg-red-100" : "bg-orange-100"
                    }`}>
                      {rec.action === "REORDER" ? (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{rec.action}</div>
                      <div className="text-sm text-gray-600">{rec.reason}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={rec.priority === "HIGH" ? "destructive" : "secondary"}>
                      {rec.priority} Priority
                    </Badge>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ${rec.expectedImpact.costSavings}
                      </div>
                      <div className="text-sm text-gray-500">Potential Savings</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="abc-analysis">ABC Analysis</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryItems.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {inventoryItems.filter(item => item.status === "low").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimal Stock</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {inventoryItems.filter(item => item.status === "optimal").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Well managed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Items Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Current stock levels and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.status === "low" ? "bg-red-100" : 
                        item.status === "excess" ? "bg-orange-100" : "bg-green-100"
                      }`}>
                        <Package className={`h-5 w-5 ${
                          item.status === "low" ? "text-red-600" : 
                          item.status === "excess" ? "text-orange-600" : "text-green-600"
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium">{item.product}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="font-bold">{item.currentStock}</div>
                        <div className="text-sm text-gray-500">Current</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{item.reorderPoint}</div>
                        <div className="text-sm text-gray-500">Reorder</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{item.leadTime}</div>
                        <div className="text-sm text-gray-500">Lead Time</div>
                      </div>
                      <Badge variant="outline" className={
                        item.category === "A" ? "bg-red-100 text-red-800" :
                        item.category === "B" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        Category {item.category}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Optimize
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abc-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ABC Analysis</CardTitle>
              <CardDescription>Product categorization based on value contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-red-800">Category A</span>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        {abcAnalysis.categories.A.count} items
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      ${abcAnalysis.categories.A.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-700">
                      {abcAnalysis.categories.A.percentage}% of total value
                    </div>
                    <div className="mt-2">
                      <Progress value={abcAnalysis.categories.A.percentage} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-yellow-800">Category B</span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {abcAnalysis.categories.B.count} items
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                      ${abcAnalysis.categories.B.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-yellow-700">
                      {abcAnalysis.categories.B.percentage}% of total value
                    </div>
                    <div className="mt-2">
                      <Progress value={abcAnalysis.categories.B.percentage} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800">Category C</span>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {abcAnalysis.categories.C.count} items
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-600">
                      ${abcAnalysis.categories.C.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-700">
                      {abcAnalysis.categories.C.percentage}% of total value
                    </div>
                    <div className="mt-2">
                      <Progress value={abcAnalysis.categories.C.percentage} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Recommendations</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• <strong>Category A:</strong> Focus on these high-value items. Ensure optimal stock levels and consider advanced forecasting.</li>
                    <li>• <strong>Category B:</strong> Monitor these medium-value items. Use standard inventory management practices.</li>
                    <li>• <strong>Category C:</strong> Consider reducing complexity for these low-value items. Use simple reorder points.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.filter(item => item.status === "low").map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium text-red-900">{item.product}</div>
                        <div className="text-sm text-red-700">Current stock: {item.currentStock} units</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold text-red-600">Reorder Now</div>
                        <div className="text-sm text-red-700">Below reorder point</div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Reorder
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
