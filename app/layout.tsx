import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mycrochetkit.com'),
  title: {
    default: 'My Crochet Kit - Free Crochet Pattern Tracker & Row Counter App',
    template: '%s | My Crochet Kit',
  },
  description: 'Free offline crochet app for pattern tracking, row counting, and yarn stash management. Works without internet. Perfect for crocheters who need a reliable pattern organizer, stitch counter, and project tracker.',
  keywords: [
    'crochet app',
    'crochet pattern tracker',
    'row counter app',
    'crochet counter',
    'yarn stash tracker',
    'crochet project manager',
    'offline crochet app',
    'free crochet app',
    'pattern organizer',
    'crochet tools',
    'amigurumi tracker',
    'crochet row counter',
    'knitting and crochet app',
    'yarn inventory app',
    'crochet pattern organizer',
    'stitch counter',
    'crochet helper app',
    'beginner crochet app',
  ],
  authors: [{ name: 'My Crochet Kit Team' }],
  creator: 'My Crochet Kit',
  publisher: 'My Crochet Kit',
  manifest: '/manifest.json',
  themeColor: '#D4A5A5',
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-crochet-kit.vercel.app',
    siteName: 'My Crochet Kit',
    title: 'My Crochet Kit - The Ultimate Crochet Companion App',
    description: 'Free offline-first crochet app. Track patterns, count rows, manage your yarn stash. Works without internet. Never lose your place again!',
    images: [
      {
        url: '/og-image.png', // We'll create this later
        width: 1200,
        height: 630,
        alt: 'My Crochet Kit - Crochet Pattern Tracker and Row Counter',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'My Crochet Kit - Free Crochet App for Pattern Tracking',
    description: 'The offline-first crochet companion. Track patterns, count rows, manage yarn stash. Free to start!',
    images: ['/twitter-image.png'], // We'll create this later
    creator: '@mycrochetkit', // Add your Twitter handle later
  },
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Crochet Kit',
  },
  
  // Icons
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  
  // Viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Changed from 1 to allow zoom for accessibility
    userScalable: true, // Changed to true for accessibility
  },
  
  // Additional SEO
  category: 'lifestyle',
  alternates: {
    canonical: 'https://my-crochet-kit.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon-192x192.png" />
      </head>
      <body className={`${inter.className} bg-cream min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
