/**
 * Intellecty Retail - Public Portal Landing Page
 * Marketing-focused landing page with compelling content and CTAs
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, TrendingUp, Shield, Zap, Globe, Users, BarChart3, CheckCircle, Star, Play, Download, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PublicPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Intellecty Retail</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🚀 The World's First Adaptive Retail Intelligence Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Intelligence That
              <span className="text-blue-600"> Understands</span>
              <br />Retail
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From corner stores to global chains, Intellecty Retail unifies every retail signal — 
              sales, inventory, supply, weather, and market dynamics — into one adaptive, learning system.
              <br />
              <span className="font-semibold text-gray-900">No setup. No data team. Just intelligence that grows with your business.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Play className="mr-2 h-4 w-4" />
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Built for every retailer. Designed for every scale.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="demo" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            See Intellecty Retail in Action
          </h2>
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Product Demo Video</p>
                <p className="text-sm text-gray-500">2:30 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Vision</h2>
          <p className="text-lg text-gray-600 mb-8">
            Retail shouldn't need a data science department to think intelligently.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            <strong>Intellecty Retail</strong> was built to make <strong>AI-driven retail intelligence</strong> accessible to everyone — 
            from micro retailers to multinational brands.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            It understands your category, your customers, and your conditions — blending internal data with real-world signals 
            like economics, climate, and raw material costs to help you make the right decisions faster.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-lg font-semibold text-blue-900">
              We believe retail success should be powered by intelligence — not complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Why Intellecty Exists */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Intellecty Exists</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Retailers today face real and rising challenges:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Fragmented systems that don't connect
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Unpredictable demand and wasted inventory
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Rising input and material costs
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Missed opportunities due to lack of visibility
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Increasing pressure to grow sustainably
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Intellecty Retail simplifies this reality.</h3>
              <p className="text-gray-600 mb-4">
                It transforms data into foresight, connecting every part of your business — from store to supplier — 
                and delivering real-time, actionable intelligence.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Turn complexity into clarity, uncertainty into opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Capabilities That Matter</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                title: "Unified Retail Intelligence",
                description: "Bring all your sales, inventory, and supplier data together in one place — no IT team needed.",
                value: "Eliminate guesswork and gain a single, trustworthy view of your entire business."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-green-600" />,
                title: "Adaptive Demand Forecasting",
                description: "Predict demand accurately using AI that learns from your unique patterns, market behavior, and product seasonality.",
                value: "Plan proactively, reduce stockouts, and minimize costly overproduction."
              },
              {
                icon: <Globe className="h-8 w-8 text-purple-600" />,
                title: "Context-Aware Insights",
                description: "Continuously blends live data from weather, economics, social trends, and industrial factors.",
                value: "See what's driving demand and cost fluctuations before they affect your bottom line."
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-600" />,
                title: "Inventory Optimization",
                description: "AI automatically identifies slow-moving stock, calculates optimal safety levels, and recommends replenishment quantities.",
                value: "Reduce waste, free up cash flow, and always stay ready to serve your customers."
              },
              {
                icon: <Shield className="h-8 w-8 text-red-600" />,
                title: "Sustainability Intelligence",
                description: "Measure what matters — from product waste to carbon emissions.",
                value: "Meet sustainability goals while improving profitability and brand trust."
              },
              {
                icon: <Users className="h-8 w-8 text-indigo-600" />,
                title: "Insights for Everyone",
                description: "Zero learning curve. No setup delays. Everyone can access personalized insights.",
                value: "Turn every team member into a data-driven decision-maker."
              }
            ].map((capability, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {capability.icon}
                    <CardTitle className="text-lg">{capability.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{capability.description}</CardDescription>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-900">Key Value:</p>
                    <p className="text-sm text-gray-700">{capability.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Proven Business Outcomes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { metric: "Forecast Accuracy", improvement: "+25–35%", description: "improvement" },
              { metric: "Inventory Carrying Cost", improvement: "−25–45%", description: "reduction" },
              { metric: "Waste & Overstock", improvement: "−15–30%", description: "reduction" },
              { metric: "Planning Time", improvement: "−60–75%", description: "faster" },
              { metric: "Decision Speed", improvement: "+50–65%", description: "faster" },
              { metric: "Revenue Growth", improvement: "+10–20%", description: "increase" }
            ].map((outcome, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{outcome.improvement}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{outcome.metric}</div>
                  <div className="text-sm text-gray-600">{outcome.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-gray-900">
              Real results — delivered by data, not assumptions.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">What Retail Leaders Are Saying</h2>
          <Card className="p-8">
            <CardContent>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-6">
                "Intellecty Retail is the first platform that truly understands our business rhythm — 
                from industrial demand cycles to global supply trends. It's intelligent, accessible, 
                and genuinely transformative. For businesses like ours, it's a turning point."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">SR</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Syed Rahim</div>
                  <div className="text-gray-600">CEO, Al Kareem Industrial & Mechanical Spare Parts Trading</div>
                  <div className="text-gray-500">Fujairah, U.A.E.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Free Tier</CardTitle>
                  <Badge variant="secondary">$0/month</Badge>
                </div>
                <CardDescription>Start Smart, Stay In Control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Challenges Solved:</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Most small retailers struggle with scattered spreadsheets, manual stock counts, and inconsistent reports.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Unified dashboard (100 SKUs)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">7-day demand outlook</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Basic alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Carbon and waste tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Excel/CSV upload</span>
                  </li>
                </ul>
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <p className="text-sm font-medium text-gray-900">Key Value:</p>
                  <p className="text-sm text-gray-700">Stop managing by guesswork. Start managing by insight.</p>
                </div>
                <Link href="/auth/signup">
                  <Button className="w-full">Get Started Free</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Growth Tier */}
            <Card className="relative border-blue-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Growth Tier</CardTitle>
                  <Badge variant="default">$149/month</Badge>
                </div>
                <CardDescription>For Expanding Retailers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Challenges Solved:</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Growing retailers need smarter forecasting, better stock control, and awareness of external trends.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Full AI-powered forecasting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Intelligent inventory optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Real-time external insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Multi-user collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">1,000 SKUs, 30-day forecasting</span>
                  </li>
                </ul>
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="text-sm font-medium text-blue-900">Key Value:</p>
                  <p className="text-sm text-blue-800">Turn insight into action — reduce costs, increase revenue.</p>
                </div>
                <Link href="/auth/signup">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Premium Tier</CardTitle>
                  <Badge variant="outline">$399/month</Badge>
                </div>
                <CardDescription>For Enterprise & Multi-Location Networks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Challenges Solved:</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Enterprises need control, scale, and security with intelligent automation.
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">AI-powered virtual assistant</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Multi-location analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">White-label branding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Dedicated account management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Unlimited SKUs, 365-day forecasting</span>
                  </li>
                </ul>
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <p className="text-sm font-medium text-gray-900">Key Value:</p>
                  <p className="text-sm text-gray-700">Manage complexity at scale — intelligently, securely.</p>
                </div>
                <Link href="#contact">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technology & Architecture Highlights</h2>
          <p className="text-lg text-gray-600 mb-8">Six Pillars of Intelligent Design</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI-Powered Intelligence", description: "Adaptive forecasting and decision models that learn from your data and external signals in real time." },
              { title: "Agentic & Autonomous Systems", description: "Self-healing, self-optimizing systems that keep insights accurate and operations uninterrupted." },
              { title: "Data-Driven Decisioning", description: "Embedded intelligence connects sales, supply, economics, and industry dynamics." },
              { title: "Secure Multi-Tenant Architecture", description: "Enterprise-grade isolation and encryption ensure your data stays private, protected, and compliant." },
              { title: "Scalable & Mobile-First Platform", description: "Cloud-native infrastructure with mobile-ready design ensures fast performance and accessibility anywhere." },
              { title: "Affordable, Sustainable, and Future-Ready", description: "Cost-efficient SaaS with built-in sustainability intelligence and automatic scalability." }
            ].map((pillar, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-600">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Experience Intelligent Retail?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join forward-thinking retailers and manufacturers using Intellecty Retail to plan smarter, 
            operate leaner, and grow faster — without complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </Link>
          </div>
          <p className="text-blue-100 mt-4">
            Start Free. Learn Fast. Grow Smarter.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to transform your retail operations?</h3>
              <p className="text-gray-600 mb-6">
                Our team of retail intelligence experts is here to help you get started. 
                Schedule a personalized demo or reach out with any questions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">support@intellectyretail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Schedule a demo</span>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
                <CardDescription>Get personalized insights for your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Intellecty Retail</span>
              </div>
              <p className="text-gray-400">
                Adaptive Intelligence for Every Retailer.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Industries</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Intellecty Retail — Adaptive Intelligence for Every Retailer.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
