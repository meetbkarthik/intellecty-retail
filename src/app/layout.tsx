import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Intellecty Retail - Adaptive Retail Intelligence Platform",
  description: "World's first truly comprehensive retail intelligence platform that automatically adapts to all verticals with zero-configuration AI models",
  keywords: ["retail intelligence", "AI forecasting", "inventory optimization", "demand planning", "retail analytics"],
  authors: [{ name: "Intellecty Retail Team" }],
  creator: "Intellecty Retail",
  publisher: "Intellecty Retail",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://intellecty-retail.vercel.app"),
  openGraph: {
    title: "Intellecty Retail - Adaptive Retail Intelligence Platform",
    description: "World's first truly comprehensive retail intelligence platform that automatically adapts to all verticals with zero-configuration AI models",
    url: "https://intellecty-retail.vercel.app",
    siteName: "Intellecty Retail",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Intellecty Retail - Adaptive Retail Intelligence Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellecty Retail - Adaptive Retail Intelligence Platform",
    description: "World's first truly comprehensive retail intelligence platform that automatically adapts to all verticals with zero-configuration AI models",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
