import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, TrendingUp, Shield, Zap, Globe, BarChart3, Target, CheckCircle, Leaf, Lightbulb, Lock, Users, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900">
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
            <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent bg-secondary text-secondary-foreground mb-4">
              🚀 The World's First Adaptive Retail Intelligence Platform
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Intelligence That <span className="text-blue-600">Understands</span><br />Retail
          </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From corner stores to global chains, Intellecty Retail unifies every retail signal — sales, inventory, supply, weather, and market dynamics — into one adaptive, learning system.<br />
              <span className="font-semibold text-gray-900">No setup. No data team. Just intelligence that grows with your business.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button className="h-10 px-6 w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" className="h-10 px-6 w-full sm:w-auto">
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">Built for every retailer. Designed for every scale.</p>
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section id="vision" className="py-20 bg-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">💡 The Vision</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            <strong className="text-blue-600">Intellecty Retail</strong> was built to make <strong className="text-blue-600">AI-driven retail intelligence</strong> accessible to everyone — from micro retailers to multinational brands.
            <br /><br />
            It understands your category, your customers, and your conditions — blending internal data with real-world signals like economics, climate, and raw material costs to help you make the right decisions faster.
          </p>
          <blockquote className="mt-10 text-2xl italic font-semibold text-gray-700 max-w-2xl mx-auto border-l-4 border-blue-500 pl-4">
            "We believe retail success should be powered by intelligence — not complexity."
          </blockquote>
        </div>
      </section>

      {/* Why Intellecty Exists */}
      <section id="why-intellecty" className="py-20 bg-blue-50 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">🎯 Why Intellecty Exists</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Retailers today face real and rising challenges:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              "Fragmented systems that don't connect",
              "Unpredictable demand and wasted inventory",
              "Rising input and material costs",
              "Missed opportunities due to lack of visibility",
              "Increasing pressure to grow sustainably"
            ].map((point, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 flex items-center space-x-4">
                  <ArrowRight className="text-blue-500 flex-shrink-0" size={24} />
                  <p className="text-lg font-medium">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed mt-12">
            <strong className="text-blue-600">Intellecty Retail</strong> simplifies this reality.
            It transforms data into foresight, connecting every part of your business — from store to supplier — and delivering real-time, actionable intelligence.
          </p>
        </div>
      </section>

      {/* Capabilities That Matter */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">⚙️ Capabilities That Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={<CheckCircle className="text-blue-500" size={36} />}
              title="Unified Retail Intelligence"
              description="Bring all your sales, inventory, and supplier data together in one place — no IT team needed. Intellecty automatically validates and organizes your data to deliver meaningful insights instantly."
              value="Eliminate guesswork and gain a single, trustworthy view of your entire business."
            />
            <FeatureCard
              icon={<TrendingUp className="text-green-500" size={36} />}
              title="Adaptive Demand Forecasting"
              description="Predict demand accurately using AI that learns from your unique patterns, market behavior, and product seasonality. It works just as well for retailers, wholesalers, and manufacturers with raw material dependencies."
              value="Plan proactively, reduce stockouts, and minimize costly overproduction."
            />
            <FeatureCard
              icon={<Lightbulb className="text-yellow-500" size={36} />}
              title="Context-Aware Insights"
              description="Retail doesn't operate in isolation — neither does Intellecty. It continuously blends live data from weather, economics, social & market trends, and industrial factors."
              value="See what's driving demand and cost fluctuations before they affect your bottom line."
            />
            <FeatureCard
              icon={<Zap className="text-purple-500" size={36} />}
              title="Inventory Optimization for Growth"
              description="From FMCG to industrial parts, Intellecty helps you balance availability, cost, and risk. AI automatically identifies slow-moving stock, calculates optimal safety levels, and recommends replenishment quantities."
              value="Reduce waste, free up cash flow, and always stay ready to serve your customers."
            />
            <FeatureCard
              icon={<Users className="text-red-500" size={36} />}
              title="Smarter Promotions & Pricing"
              description="Know the impact of your pricing or discounts before you launch them. Intellecty simulates outcomes and helps you choose the strategies that actually boost revenue — not just sales volume."
              value="Run smarter promotions, protect your margins, and retain customers more effectively."
            />
            <FeatureCard
              icon={<Leaf className="text-teal-500" size={36} />}
              title="Sustainability Intelligence"
              description="Measure what matters — from product waste to carbon emissions. Intellecty integrates sustainability metrics into every decision, ensuring efficiency and environmental responsibility go hand in hand."
              value="Meet sustainability goals while improving profitability and brand trust."
            />
            <FeatureCard
              icon={<Brain className="text-indigo-500" size={36} />}
              title="Insights for Everyone — No Complexity"
              description="Zero learning curve. No setup delays. From store owners to executives, everyone can access personalized insights that make daily decisions simpler and smarter."
              value="Turn every team member into a data-driven decision-maker."
            />
            <FeatureCard
              icon={<Shield className="text-orange-500" size={36} />}
              title="Autonomous AI Operations"
              description="AI that manages itself — monitoring performance, detecting anomalies, and adapting automatically. Your business intelligence keeps running even when you're not watching."
              value="Reliable, always-on insights that keep you ahead, not just informed."
            />
          </div>
        </div>
      </section>

      {/* Designed for Every Business */}
      <section id="designed-for-business" className="py-20 bg-blue-50 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">💼 Designed for Every Business</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            <strong className="text-blue-600">From MSMEs to Enterprises — Scalable, Secure, and Affordable.</strong>
            <br /><br />
            Many small and mid-sized businesses struggle to access advanced analytics because it's either too costly or too complex.
            <strong className="text-blue-600">Intellecty Retail</strong> changes that — delivering enterprise-grade power through a simple, affordable, and secure cloud platform.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-medium text-gray-700">
            <p className="flex items-center"><CheckCircle className="text-blue-500 mr-2" size={20} /> Start free, grow flexibly</p>
            <p className="flex items-center"><CheckCircle className="text-blue-500 mr-2" size={20} /> Pay only for what you use</p>
            <p className="flex items-center"><CheckCircle className="text-blue-500 mr-2" size={20} /> Scale easily as your data grows</p>
            <p className="flex items-center"><CheckCircle className="text-blue-500 mr-2" size={20} /> Access everywhere, securely</p>
          </div>
          <blockquote className="mt-10 text-2xl italic font-semibold text-gray-700 max-w-2xl mx-auto border-l-4 border-blue-500 pl-4">
            "Intellecty Retail helps every business compete intelligently — regardless of size or budget."
          </blockquote>
        </div>
      </section>

      {/* Proven Business Outcomes */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">📊 Proven Business Outcomes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Impact Area</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Typical Results (Validated Range)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Forecast Accuracy</td>
                  <td className="border border-gray-300 px-4 py-3">+25–35% improvement</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Inventory Carrying Cost</td>
                  <td className="border border-gray-300 px-4 py-3">−25–45% reduction</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Waste & Overstock</td>
                  <td className="border border-gray-300 px-4 py-3">−15–30% reduction</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Planning Time</td>
                  <td className="border border-gray-300 px-4 py-3">−60–75% faster</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Decision Speed</td>
                  <td className="border border-gray-300 px-4 py-3">+50–65% faster</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Revenue Growth</td>
                  <td className="border border-gray-300 px-4 py-3">+10–20% increase</td>
                </tr>
              </tbody>
            </table>
          </div>
          <blockquote className="mt-8 text-xl italic font-semibold text-gray-700 text-center">
            Real results — delivered by data, not assumptions.
          </blockquote>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-blue-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">💬 What Retail Leaders Are Saying</h2>
          <blockquote className="text-lg text-gray-700 mb-6">
            "Intellecty Retail is the first platform that truly understands our business rhythm — from industrial demand cycles to global supply trends. It's intelligent, accessible, and genuinely transformative. For businesses like ours, it's a turning point."
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
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">💰 Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PricingCard
              tier="Free Tier"
              price="$0/month"
              description="Start Smart, Stay In Control"
              challenges="Most small retailers struggle with scattered spreadsheets, manual stock counts, and inconsistent reports. The Free Tier gives you structure, visibility, and clarity — the essential foundation to run your business intelligently."
              features={[
                "Unified dashboard for sales, stock, and suppliers (100 SKUs)",
                "7-day demand outlook to prevent short-term stockouts",
                "Basic alerts for overstock and low inventory",
                "Carbon and waste tracking for awareness",
                "Excel/CSV upload and mobile access",
                "PDF/Excel report exports"
              ]}
              buttonText="Get Started Free"
              buttonLink="/auth/signup"
              isPrimary={false}
            />
            <PricingCard
              tier="Growth Tier"
              price="$299/month"
              description="For Expanding Retailers"
              challenges="Growing retailers need smarter forecasting, better stock control, and awareness of external trends. The Growth Tier empowers you to make proactive, data-driven decisions every day."
              features={[
                "Full AI-powered demand forecasting",
                "Intelligent inventory optimization",
                "Real-time insights from weather, market, and material factors",
                "Smarter pricing and promotion guidance",
                "Multi-user collaboration with scheduled reports",
                "Full sustainability tracking and dashboards",
                "Secure cloud storage and user-level access control"
              ]}
              buttonText="Start Free Trial"
              buttonLink="/auth/signup"
              isPrimary={true}
            />
            <PricingCard
              tier="Premium Tier"
              price="$499/month"
              description="For Enterprise & Multi-Location Networks"
              challenges="Enterprises need control, scale, and security — with intelligent automation that keeps pace with their operations. The Premium Tier delivers enterprise-grade visibility and precision across every region and channel."
              features={[
                "AI-powered virtual assistant for instant answers",
                "Multi-location analytics and real-time control",
                "White-label branding and API integration",
                "Advanced sustainability and compliance reporting",
                "Dedicated account management and SLA-backed support",
                "Multi-tenant, zero-leakage architecture with enterprise-grade encryption"
              ]}
              buttonText="Contact Sales"
              buttonLink="#contact"
              isPrimary={false}
            />
          </div>
        </div>
      </section>

      {/* Technology & Architecture Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technology & Architecture Highlights</h2>
          <p className="text-lg text-gray-600 mb-8">Six Pillars of Intelligent Design</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="py-6">
              <CardContent className="px-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Intelligence</h3>
                <p className="text-sm text-gray-600">Adaptive forecasting and decision models that learn from your data and external signals in real time.</p>
              </CardContent>
            </Card>
            <Card className="py-6">
              <CardContent className="px-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Agentic & Autonomous Systems</h3>
                <p className="text-sm text-gray-600">Self-healing, self-optimizing systems that keep insights accurate and operations uninterrupted.</p>
              </CardContent>
            </Card>
            <Card className="py-6">
              <CardContent className="px-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Data-Driven Decisioning</h3>
                <p className="text-sm text-gray-600">Embedded intelligence connects sales, supply, economics, and industry dynamics.</p>
              </CardContent>
            </Card>
            <Card className="py-6">
              <CardContent className="px-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Secure Multi-Tenant Architecture</h3>
                <p className="text-sm text-gray-600">Enterprise-grade isolation and encryption ensure your data stays private, protected, and compliant.</p>
              </CardContent>
            </Card>
            <Card className="py-6">
              <CardContent className="px-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Scalable & Mobile-First Platform</h3>
                <p className="text-sm text-gray-600">Cloud-native infrastructure with mobile-ready design ensures fast performance and accessibility anywhere.</p>
              </CardContent>
            </Card>
            <Card className="py-6">
              <CardContent className="px-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Affordable, Sustainable, and Future-Ready</h3>
                <p className="text-sm text-gray-600">Cost-efficient SaaS with built-in sustainability intelligence and automatic scalability.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future-Ready Retail */}
      <section className="py-20 bg-blue-50 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">🌱 Future-Ready Retail</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Markets evolve. Supply shifts. Consumers adapt.
            <strong className="text-blue-600">Intellecty Retail</strong> evolves with you — learning continuously, improving automatically, and scaling seamlessly.
          </p>
          <blockquote className="text-xl italic font-semibold text-gray-700">
            A platform that grows with your business — intelligently and responsibly.
          </blockquote>
        </div>
      </section>

      {/* Ready to Experience */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Experience Intelligent Retail?</h2>
          <p className="text-xl text-blue-100 mb-8">Join forward-thinking retailers and manufacturers using Intellecty Retail to plan smarter, operate leaner, and grow faster — without complexity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button className="h-10 rounded-md px-6 w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" className="h-10 rounded-md px-6 w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </Link>
          </div>
          <p className="text-blue-100 mt-4">Start Free. Learn Fast. Grow Smarter.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to transform your retail operations?</h3>
              <p className="text-gray-600 mb-6">Our team of retail intelligence experts is here to help you get started. Schedule a personalized demo or reach out with any questions.</p>
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
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
                <CardDescription>Get personalized insights for your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
              <p className="text-gray-400">Adaptive Intelligence for Every Retailer.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#designed-for-business" className="hover:text-white transition-colors">Industries</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#vision" className="hover:text-white transition-colors">About</Link></li>
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
            <p>© 2025 Intellecty Retail — Adaptive Intelligence for Every Retailer.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, value }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <Card className="py-6 shadow-sm h-full">
      <CardHeader>
        <div className="flex items-center space-x-3">
          {icon}
          <CardTitle className="font-semibold text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <CardDescription className="text-muted-foreground text-sm mb-4">
          {description}
        </CardDescription>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium text-gray-900">Key Value:</p>
          <p className="text-sm text-gray-700">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Pricing Card Component
function PricingCard({ tier, price, description, challenges, features, buttonText, buttonLink, isPrimary }: {
  tier: string;
  price: string;
  description: string;
  challenges: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPrimary: boolean;
}) {
  return (
    <Card className={`py-6 shadow-sm relative ${isPrimary ? 'border-blue-500' : ''}`}>
      {isPrimary && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white">Most Popular</Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-xl">{tier}</CardTitle>
          <Badge className="bg-primary text-primary-foreground">${price}</Badge>
        </div>
        <CardDescription className="text-muted-foreground text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Challenges Solved:</h4>
          <p className="text-sm text-gray-600 mb-4">{challenges}</p>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <div className={`p-3 rounded mb-4 ${isPrimary ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <p className={`text-sm font-medium ${isPrimary ? 'text-blue-900' : 'text-gray-900'}`}>Key Value:</p>
          <p className={`text-sm ${isPrimary ? 'text-blue-800' : 'text-gray-700'}`}>
            {isPrimary ? 'Turn insight into action — reduce costs, increase revenue.' : 
             tier === 'Free Tier' ? 'Stop managing by guesswork. Start managing by insight.' :
             'Manage complexity at scale — intelligently, securely.'}
          </p>
        </div>
        <Link href={buttonLink}>
          <Button className={`w-full ${isPrimary ? '' : 'variant-outline'}`}>
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}