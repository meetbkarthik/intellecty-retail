/**
 * Customer Portal Layout
 * Customer-facing interface for retail intelligence platform
 */

import { CustomerSidebar } from "@/components/customer/sidebar"
import { CustomerHeader } from "@/components/customer/header"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerSidebar />
      <div className="lg:pl-64">
        <CustomerHeader />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
