"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Upload, 
  Database, 
  Globe, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Trash2,
  Eye,
  Download
} from "lucide-react"
import { toast } from "sonner"

export default function DataSourcesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dataType, setDataType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock data sources
  const dataSources = [
    {
      id: "1",
      name: "Products_Inventory_2024.xlsx",
      type: "EXCEL",
      status: "ACTIVE",
      lastSync: "2024-01-15T10:30:00Z",
      recordCount: 1250,
      schemaMapping: {
        sku: "Product_ID",
        name: "Product_Name",
        category: "Category",
        price: "Unit_Price"
      }
    },
    {
      id: "2",
      name: "Sales_Data_2024.csv",
      type: "CSV",
      status: "ACTIVE",
      lastSync: "2024-01-15T09:15:00Z",
      recordCount: 8500,
      schemaMapping: {
        sku: "SKU",
        quantity: "Qty_Sold",
        date: "Sale_Date",
        price: "Unit_Price"
      }
    },
    {
      id: "3",
      name: "POS_System_API",
      type: "API",
      status: "ERROR",
      lastSync: "2024-01-14T16:45:00Z",
      recordCount: 0,
      schemaMapping: {}
    }
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success(`Selected file: ${file.name}`)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !dataType) {
      toast.error("Please select a file and data type")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('dataType', dataType)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setUploadProgress(100)
      toast.success("File uploaded and processed successfully!")
      
      // Reset form
      setSelectedFile(null)
      setDataType("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      toast.error("Failed to upload file")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
      case "ERROR":
        return <Badge variant="destructive">Error</Badge>
      case "SYNCING":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Syncing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "EXCEL":
      case "CSV":
        return <FileText className="h-5 w-5" />
      case "API":
        return <Globe className="h-5 w-5" />
      case "DATABASE":
        return <Database className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-600">Connect and manage your data sources for AI-powered insights</p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Data
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <span>Upload New Data Source</span>
          </CardTitle>
          <CardDescription>
            Upload CSV or Excel files to import your data into the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
                {selectedFile && (
                  <div className="text-sm text-gray-600">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="sales">Sales Data</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading and processing...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || !dataType || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload & Process
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources List */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Data Sources</CardTitle>
          <CardDescription>Manage your connected data sources and view their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getTypeIcon(source.type)}
                  </div>
                  <div>
                    <div className="font-medium">{source.name}</div>
                    <div className="text-sm text-gray-500">
                      {source.recordCount.toLocaleString()} records • 
                      Last sync: {new Date(source.lastSync).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(source.status)}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schema Mapping */}
      <Card>
        <CardHeader>
          <CardTitle>Schema Mapping</CardTitle>
          <CardDescription>View and edit how your data columns are mapped to standard fields</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SKU Field</Label>
                  <Select defaultValue="Product_ID">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product_ID">Product_ID</SelectItem>
                      <SelectItem value="SKU">SKU</SelectItem>
                      <SelectItem value="Item_Code">Item_Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Name Field</Label>
                  <Select defaultValue="Product_Name">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product_Name">Product_Name</SelectItem>
                      <SelectItem value="Name">Name</SelectItem>
                      <SelectItem value="Title">Title</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category Field</Label>
                  <Select defaultValue="Category">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Category">Category</SelectItem>
                      <SelectItem value="Type">Type</SelectItem>
                      <SelectItem value="Class">Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price Field</Label>
                  <Select defaultValue="Unit_Price">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unit_Price">Unit_Price</SelectItem>
                      <SelectItem value="Price">Price</SelectItem>
                      <SelectItem value="Cost">Cost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SKU Field</Label>
                  <Select defaultValue="SKU">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SKU">SKU</SelectItem>
                      <SelectItem value="Product_ID">Product_ID</SelectItem>
                      <SelectItem value="Item_Code">Item_Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantity Field</Label>
                  <Select defaultValue="Qty_Sold">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Qty_Sold">Qty_Sold</SelectItem>
                      <SelectItem value="Quantity">Quantity</SelectItem>
                      <SelectItem value="Amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Field</Label>
                  <Select defaultValue="Sale_Date">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sale_Date">Sale_Date</SelectItem>
                      <SelectItem value="Date">Date</SelectItem>
                      <SelectItem value="Order_Date">Order_Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price Field</Label>
                  <Select defaultValue="Unit_Price">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unit_Price">Unit_Price</SelectItem>
                      <SelectItem value="Price">Price</SelectItem>
                      <SelectItem value="Cost">Cost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SKU Field</Label>
                  <Select defaultValue="SKU">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SKU">SKU</SelectItem>
                      <SelectItem value="Product_ID">Product_ID</SelectItem>
                      <SelectItem value="Item_Code">Item_Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current Stock Field</Label>
                  <Select defaultValue="Current_Stock">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Current_Stock">Current_Stock</SelectItem>
                      <SelectItem value="Quantity">Quantity</SelectItem>
                      <SelectItem value="Stock">Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Reorder Point Field</Label>
                  <Select defaultValue="Reorder_Point">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reorder_Point">Reorder_Point</SelectItem>
                      <SelectItem value="Min_Stock">Min_Stock</SelectItem>
                      <SelectItem value="Threshold">Threshold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Lead Time Field</Label>
                  <Select defaultValue="Lead_Time">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lead_Time">Lead_Time</SelectItem>
                      <SelectItem value="Delivery_Time">Delivery_Time</SelectItem>
                      <SelectItem value="Days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Data Quality */}
      <Card>
        <CardHeader>
          <CardTitle>Data Quality Score</CardTitle>
          <CardDescription>Overall quality assessment of your data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Quality Score</span>
              <span className="text-2xl font-bold text-green-600">87/100</span>
            </div>
            <Progress value={87} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-sm text-green-700">Completeness</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">82%</div>
                <div className="text-sm text-blue-700">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">84%</div>
                <div className="text-sm text-purple-700">Consistency</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
