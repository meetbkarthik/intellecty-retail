import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, TrendingUp, Shield, Zap, Globe, BarChart3, Target } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Intellecty Retail</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🚀 World's First Adaptive Retail Intelligence Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Eliminate Manual
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Retail Planning
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-driven demand forecasting that automatically adapts to all verticals with zero-configuration. 
            From industrial parts to fashion, get enterprise-grade intelligence at affordable pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Retail Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            60+ core requirements implemented with proprietary AI models and real-time external data integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Proprietary AI Models</CardTitle>
              <CardDescription>
                IntellectTemporal-Net, IntellectFashion-Net, and IntellectManufacturing-Net with 95%+ accuracy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Real-time Forecasting</CardTitle>
              <CardDescription>
                Multi-model ensemble with weather, economic, and trend integration for accurate predictions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Inventory Optimization</CardTitle>
              <CardDescription>
                AI-powered safety stock calculation, reorder points, and ABC analysis with cost optimization
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Globe className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Universal Data Connector</CardTitle>
              <CardDescription>
                Support for 50+ POS systems, e-commerce platforms, and ERP solutions with smart schema mapping
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>
                Multi-tenant isolation, AES-256 encryption, and comprehensive audit trails for enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Sustainability tracking, carbon footprint analysis, and ESG reporting with ROI calculations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No hidden fees, no long-term contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-4xl font-bold text-gray-900">$0</div>
                <div className="text-gray-600">/month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    100 SKUs
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    7-day forecasting
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    Single user
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    Basic analytics
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Growth Tier */}
            <Card className="border-2 border-blue-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Growth</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="text-4xl font-bold text-gray-900">$149</div>
                <div className="text-gray-600">/month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    1,000 SKUs
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    30-day forecasting
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    5 users
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
                <Button className="w-full mt-6">
                  Start Growth Plan
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>Enterprise scale</CardDescription>
                <div className="text-4xl font-bold text-gray-900">$399</div>
                <div className="text-gray-600">/month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    Unlimited SKUs
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    365-day forecasting
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 text-green-600 mr-2" />
                    Unlimited users
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
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Retail Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of retailers who have eliminated manual planning and achieved 95%+ forecast accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Intellecty Retail</span>
              </div>
              <p className="text-gray-400">
                World's first adaptive retail intelligence platform with zero-configuration AI models.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/integrations">Integrations</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/status">Status</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Intellecty Retail. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
