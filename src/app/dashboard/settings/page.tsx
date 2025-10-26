"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Crown, 
  Users, 
  Package, 
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Brain,
  BarChart3,
  ArrowUpRight
} from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [tierInfo, setTierInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock tier info - in production, this would come from API
    const mockTierInfo = {
      tier: "FREE",
      limits: {
        maxSKUs: 100,
        maxUsers: 1,
        maxForecastDays: 7,
        features: [
          'basic_forecasting',
          'inventory_health',
          'excel_templates',
          'basic_analytics'
        ]
      },
      usage: {
        skus: { current: 45, limit: 100 },
        users: { current: 1, limit: 1 },
        forecastDays: { limit: 7 }
      }
    }
    
    setTimeout(() => {
      setTierInfo(mockTierInfo)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "FREE":
        return "bg-gray-100 text-gray-800"
      case "GROWTH":
        return "bg-blue-100 text-blue-800"
      case "PREMIUM":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "FREE":
        return <Package className="h-4 w-4" />
      case "GROWTH":
        return <TrendingUp className="h-4 w-4" />
      case "PREMIUM":
        return <Crown className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'basic_forecasting':
        return <Brain className="h-4 w-4" />
      case 'inventory_health':
        return <Package className="h-4 w-4" />
      case 'excel_templates':
        return <BarChart3 className="h-4 w-4" />
      case 'basic_analytics':
        return <BarChart3 className="h-4 w-4" />
      case 'full_ai_ensemble':
        return <Brain className="h-4 w-4" />
      case 'external_data_integration':
        return <Globe className="h-4 w-4" />
      case 'automated_replenishment':
        return <Zap className="h-4 w-4" />
      case 'advanced_analytics':
        return <BarChart3 className="h-4 w-4" />
      case 'api_access':
        return <Globe className="h-4 w-4" />
      case 'multi_user_collaboration':
        return <Users className="h-4 w-4" />
      case 'white_label_options':
        return <Shield className="h-4 w-4" />
      case 'custom_ai_models':
        return <Brain className="h-4 w-4" />
      case 'dedicated_support':
        return <Users className="h-4 w-4" />
      case 'sso_integration':
        return <Shield className="h-4 w-4" />
      case 'advanced_security':
        return <Shield className="h-4 w-4" />
      case 'custom_deployments':
        return <Globe className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getFeatureName = (feature: string) => {
    const featureNames: { [key: string]: string } = {
      'basic_forecasting': 'Basic Forecasting',
      'inventory_health': 'Inventory Health',
      'excel_templates': 'Excel Templates',
      'basic_analytics': 'Basic Analytics',
      'full_ai_ensemble': 'Full AI Ensemble',
      'external_data_integration': 'External Data Integration',
      'automated_replenishment': 'Automated Replenishment',
      'advanced_analytics': 'Advanced Analytics',
      'api_access': 'API Access',
      'multi_user_collaboration': 'Multi-User Collaboration',
      'white_label_options': 'White-Label Options',
      'custom_ai_models': 'Custom AI Models',
      'dedicated_support': 'Dedicated Support',
      'sso_integration': 'SSO Integration',
      'advanced_security': 'Advanced Security',
      'custom_deployments': 'Custom Deployments',
      'unlimited_forecasting': 'Unlimited Forecasting',
      'unlimited_users': 'Unlimited Users',
      'unlimited_skus': 'Unlimited SKUs'
    }
    return featureNames[feature] || feature
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and subscription</p>
        </div>
        <Badge className={getTierColor(tierInfo?.tier || "FREE")}>
          {getTierIcon(tierInfo?.tier || "FREE")}
          <span className="ml-1">{tierInfo?.tier || "FREE"} Plan</span>
        </Badge>
      </div>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTierIcon(tierInfo?.tier || "FREE")}
                <span>Current Plan: {tierInfo?.tier || "FREE"}</span>
              </CardTitle>
              <CardDescription>
                Your current subscription plan and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {tierInfo?.limits.maxSKUs === -1 ? "∞" : tierInfo?.limits.maxSKUs}
                  </div>
                  <div className="text-sm text-blue-700">Max SKUs</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {tierInfo?.limits.maxUsers === -1 ? "∞" : tierInfo?.limits.maxUsers}
                  </div>
                  <div className="text-sm text-green-700">Max Users</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {tierInfo?.limits.maxForecastDays === -1 ? "∞" : tierInfo?.limits.maxForecastDays}
                  </div>
                  <div className="text-sm text-purple-700">Max Forecast Days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Options */}
          <Card>
            <CardHeader>
              <CardTitle>Upgrade Your Plan</CardTitle>
              <CardDescription>
                Unlock more features and higher limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Growth Plan */}
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Growth Plan</h3>
                      <p className="text-gray-600">For growing businesses</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">$149</div>
                      <div className="text-sm text-gray-600">/month</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      1,000 SKUs
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      5 users
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      30-day forecasting
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      Full AI ensemble
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      External data integration
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Upgrade to Growth
                  </Button>
                </div>

                {/* Premium Plan */}
                <div className="p-6 border-2 border-purple-200 rounded-lg relative">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Most Popular
                  </Badge>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Premium Plan</h3>
                      <p className="text-gray-600">Enterprise scale</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">$399</div>
                      <div className="text-sm text-gray-600">/month</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      Unlimited SKUs
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      Unlimited users
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      365-day forecasting
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      White-label options
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      Custom AI models
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-green-600 mr-2" />
                      Dedicated support
                    </li>
                  </ul>
                  <Button className="w-full">
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>
                Current usage against your plan limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* SKU Usage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">SKUs</span>
                    <span className="text-sm text-gray-600">
                      {tierInfo?.usage.skus.current} / {tierInfo?.usage.skus.limit === -1 ? "∞" : tierInfo?.usage.skus.limit}
                    </span>
                  </div>
                  <Progress 
                    value={tierInfo?.usage.skus.limit === -1 ? 0 : (tierInfo?.usage.skus.current / tierInfo?.usage.skus.limit) * 100} 
                    className="h-3"
                  />
                </div>

                {/* User Usage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Users</span>
                    <span className="text-sm text-gray-600">
                      {tierInfo?.usage.users.current} / {tierInfo?.usage.users.limit === -1 ? "∞" : tierInfo?.usage.users.limit}
                    </span>
                  </div>
                  <Progress 
                    value={tierInfo?.usage.users.limit === -1 ? 0 : (tierInfo?.usage.users.current / tierInfo?.usage.users.limit) * 100} 
                    className="h-3"
                  />
                </div>

                {/* Forecast Days */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Forecast Days</span>
                    <span className="text-sm text-gray-600">
                      Up to {tierInfo?.usage.forecastDays.limit === -1 ? "∞" : tierInfo?.usage.forecastDays.limit} days
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Current limit: {tierInfo?.usage.forecastDays.limit === -1 ? "Unlimited" : `${tierInfo?.usage.forecastDays.limit} days`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Features</CardTitle>
              <CardDescription>
                Features included in your current plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tierInfo?.limits.features.map((feature: string) => (
                  <div key={feature} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      {getFeatureIcon(feature)}
                    </div>
                    <div>
                      <div className="font-medium">{getFeatureName(feature)}</div>
                      <div className="text-sm text-gray-500">Included</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <div className="mt-1 text-sm text-gray-600">Intellecty Retail Demo</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Industry</label>
                    <div className="mt-1 text-sm text-gray-600">Industrial & Apparel</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plan</label>
                    <div className="mt-1">
                      <Badge className={getTierColor(tierInfo?.tier || "FREE")}>
                        {tierInfo?.tier || "FREE"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Billing</label>
                    <div className="mt-1 text-sm text-gray-600">Monthly</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Account Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
