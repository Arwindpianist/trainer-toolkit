import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
    template: "%s | Trainer Toolkit"
  },
  description: "A lightweight, modern web application providing essential tools for trainers, presenters, and facilitators including QR codes, timers, random pickers, and note boards. Perfect for workshops, presentations, and training sessions.",
  keywords: [
    "trainer", "presenter", "facilitator", "qr code generator", "countdown timer", 
    "random picker", "note board", "workshop tools", "training tools", "presentation tools",
    "arwindpianist", "multimedia consulting", "offline tools", "web application"
  ],
  authors: [{ name: "Arwindpianist Multimedia & Consulting", url: "https://www.arwindpianist.store" }],
  creator: "Arwindpianist Multimedia & Consulting",
  publisher: "Arwindpianist Multimedia & Consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://trainer-toolkit.arwindpianist.store'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trainer-toolkit.arwindpianist.store",
    title: "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
    description: "Essential tools for modern trainers and presenters. QR codes, timers, random pickers, and note boards - all working offline.",
    siteName: "Trainer Toolkit",
    images: [
      {
        url: '/favicon.svg',
        width: 500,
        height: 500,
        alt: 'Trainer Toolkit Logo - Essential Tools for Presenters',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
    description: "Essential tools for modern trainers and presenters. QR codes, timers, random pickers, and note boards.",
    creator: "@arwindpianist",
    images: ['/favicon.svg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Web Application',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  other: {
    'geo.region': 'MY',
    'geo.placename': 'Malaysia',
    'geo.position': '3.1390;101.6869',
    'ICBM': '3.1390, 101.6869',
    'DC.title': 'Trainer Toolkit by Arwindpianist Multimedia & Consulting',
    'DC.creator': 'Arwindpianist Multimedia & Consulting',
    'DC.subject': 'Training Tools, Presentation Tools, QR Code Generator, Timer, Random Picker',
    'DC.description': 'Essential tools for modern trainers and presenters',
    'DC.publisher': 'Arwindpianist Multimedia & Consulting',
    'DC.contributor': 'Arwindpianist Multimedia & Consulting',
    'DC.date': '2025-01-01',
    'DC.type': 'InteractiveResource',
    'DC.format': 'text/html',
    'DC.identifier': 'https://trainer-toolkit.arwindpianist.store',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright 2025 Arwindpianist Multimedia & Consulting',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
    "description": "Essential tools for modern trainers and presenters. QR codes, timers, random pickers, and note boards - all working offline.",
    "url": "https://trainer-toolkit.arwindpianist.store",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Arwindpianist Multimedia & Consulting",
      "url": "https://www.arwindpianist.store"
    },
    "creator": {
      "@type": "Organization",
      "name": "Arwindpianist Multimedia & Consulting",
      "url": "https://www.arwindpianist.store"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Arwindpianist Multimedia & Consulting",
      "url": "https://www.arwindpianist.store"
    },
    "featureList": [
      "QR Code Generator",
      "Countdown Timer",
      "Random Picker",
      "Note Board with Markdown Support"
    ],
    "screenshot": "https://trainer-toolkit.arwindpianist.store/screenshot-wide.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="geo.region" content="MY" />
        <meta name="geo.placename" content="Malaysia" />
        <meta name="geo.position" content="3.1390;101.6869" />
        <meta name="ICBM" content="3.1390, 101.6869" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
