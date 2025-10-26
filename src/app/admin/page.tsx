/**
 * Admin Dashboard
 * Comprehensive admin overview with system metrics and management tools
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Database,
  Globe,
  Shield
} from "lucide-react"

export default function AdminDashboard() {
  // Mock data - in real implementation, this would come from APIs
  const stats = {
    totalTenants: 247,
    activeUsers: 1843,
    monthlyRevenue: 125430,
    systemUptime: 99.9,
    activeAlerts: 3,
    aiModelsTrained: 12,
    dataConnections: 89,
    apiCallsToday: 156789
  }

  const recentActivity = [
    {
      id: 1,
      type: "tenant_registration",
      message: "New tenant 'TechCorp Solutions' registered",
      timestamp: "2 minutes ago",
      status: "success"
    },
    {
      id: 2,
      type: "payment_received",
      message: "Payment of $1,490 received from Fashion Forward Inc.",
      timestamp: "15 minutes ago",
      status: "success"
    },
    {
      id: 3,
      type: "system_alert",
      message: "High CPU usage detected on server-03",
      timestamp: "1 hour ago",
      status: "warning"
    },
    {
      id: 4,
      type: "model_training",
      message: "IntellectFashion-Net model training completed",
      timestamp: "2 hours ago",
      status: "success"
    },
    {
      id: 5,
      type: "api_error",
      message: "Weather API rate limit exceeded",
      timestamp: "3 hours ago",
      status: "error"
    }
  ]

  const systemHealth = [
    { name: "Database", status: "healthy", uptime: "99.9%" },
    { name: "Redis Cache", status: "healthy", uptime: "99.8%" },
    { name: "AI Models", status: "healthy", uptime: "99.7%" },
    { name: "External APIs", status: "degraded", uptime: "98.2%" },
    { name: "File Storage", status: "healthy", uptime: "99.9%" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage your Intellecty Retail platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Monitor the health of all system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((component, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${
                      component.status === 'healthy' ? 'bg-green-500' : 
                      component.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">{component.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{component.uptime}</span>
                    <Badge variant={component.status === 'healthy' ? 'default' : 'secondary'}>
                      {component.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Models & Data Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Models</span>
            </CardTitle>
            <CardDescription>Model training and performance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Trained Models</span>
                <span className="text-sm font-medium">{stats.aiModelsTrained}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Predictions</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Accuracy</span>
                <span className="text-sm font-medium">92.3%</span>
              </div>
              <Button size="sm" className="w-full mt-4">
                View Models
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Sources</span>
            </CardTitle>
            <CardDescription>Connected data sources and sync status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Active Connections</span>
                <span className="text-sm font-medium">{stats.dataConnections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sync Success Rate</span>
                <span className="text-sm font-medium">98.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Data Volume</span>
                <span className="text-sm font-medium">2.4TB</span>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4">
                Manage Sources
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>External APIs</span>
            </CardTitle>
            <CardDescription>Third-party API integrations and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">API Calls Today</span>
                <span className="text-sm font-medium">{stats.apiCallsToday.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Success Rate</span>
                <span className="text-sm font-medium">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Rate Limit Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-4">
                API Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Building2 className="h-6 w-6" />
              <span className="text-sm">Add Tenant</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Brain className="h-6 w-6" />
              <span className="text-sm">Train Models</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span className="text-sm">Security Audit</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
