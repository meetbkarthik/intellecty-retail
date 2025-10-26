/**
 * Customer Sidebar Component
 * Navigation for customer portal with tier-based features
 */

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  BarChart3, 
  Database, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Users,
  FileText,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/customer", icon: LayoutDashboard, tier: "all" },
  { name: "Forecasting", href: "/customer/forecasting", icon: TrendingUp, tier: "all" },
  { name: "Inventory", href: "/customer/inventory", icon: Package, tier: "all" },
  { name: "Analytics", href: "/customer/analytics", icon: BarChart3, tier: "all" },
  { name: "Data Sources", href: "/customer/data-sources", icon: Database, tier: "all" },
  { name: "AI Insights", href: "/customer/ai-insights", icon: Zap, tier: "growth" },
  { name: "Team Management", href: "/customer/team", icon: Users, tier: "growth" },
  { name: "Reports", href: "/customer/reports", icon: FileText, tier: "growth" },
  { name: "Security", href: "/customer/security", icon: Shield, tier: "premium" },
  { name: "Settings", href: "/customer/settings", icon: Settings, tier: "all" },
  { name: "Help & Support", href: "/customer/support", icon: HelpCircle, tier: "all" },
]

export function CustomerSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  
  // Mock user tier - in real implementation, this would come from user context
  const userTier = "growth" // "free", "growth", "premium"

  const getTierBadge = (tier: string) => {
    if (tier === "growth") return <Badge variant="secondary" className="ml-2 text-xs">Growth</Badge>
    if (tier === "premium") return <Badge variant="default" className="ml-2 text-xs">Premium</Badge>
    return null
  }

  const isFeatureAvailable = (featureTier: string) => {
    const tierLevels = { free: 0, growth: 1, premium: 2 }
    return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[featureTier as keyof typeof tierLevels]
  }

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-all duration-300",
      collapsed && "w-16"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IR</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Intellecty Retail</h1>
                <p className="text-xs text-gray-500">Customer Portal</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Info */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">TechCorp Solutions</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Plan
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const isAvailable = isFeatureAvailable(item.tier)
            
            return (
              <Link
                key={item.name}
                href={isAvailable ? item.href : "#"}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : isAvailable
                    ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    : "text-gray-400 cursor-not-allowed"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-blue-500" : 
                    isAvailable ? "text-gray-400 group-hover:text-gray-500" : "text-gray-300"
                  )}
                />
                {!collapsed && (
                  <div className="flex items-center flex-1">
                    <span>{item.name}</span>
                    {getTierBadge(item.tier)}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Upgrade Banner */}
        {!collapsed && userTier !== "premium" && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Upgrade Available</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Unlock advanced features and higher limits
              </p>
              <Button size="sm" className="w-full text-xs">
                Upgrade Plan
              </Button>
            </div>
          </div>
        )}

        {/* System Status */}
        {!collapsed && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">System Healthy</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Last sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
