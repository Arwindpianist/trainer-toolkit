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
  title: "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
  description: "A lightweight, modern web application providing essential tools for trainers, presenters, and facilitators including QR codes, timers, random pickers, and note boards.",
  keywords: ["trainer", "presenter", "facilitator", "qr code", "timer", "picker", "notes", "workshop", "training", "arwindpianist"],
  authors: [{ name: "Arwindpianist Multimedia & Consulting" }],
  creator: "Arwindpianist Multimedia & Consulting",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arwindpianist.store/",
    title: "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
    description: "A lightweight, modern web application providing essential tools for trainers, presenters, and facilitators.",
    siteName: "Trainer Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trainer Toolkit by Arwindpianist Multimedia & Consulting",
    description: "A lightweight, modern web application providing essential tools for trainers, presenters, and facilitators.",
  },
  robots: {
    index: true,
    follow: true,
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
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
