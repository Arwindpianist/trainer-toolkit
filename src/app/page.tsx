import Link from 'next/link';
import { QrCode, Timer, Users, FileText, Sparkles, ArrowRight, Zap, Shield, Heart } from 'lucide-react';

const tools = [
  {
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, contacts, and WiFi networks instantly',
    icon: QrCode,
    href: '/qr',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Countdown Timer',
    description: 'Set custom timers with fullscreen display for presentations',
    icon: Timer,
    href: '/timer',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    name: 'Random Picker',
    description: 'Spin to randomly select names or items from your list',
    icon: Users,
    href: '/picker',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    name: 'Note Board',
    description: 'Create and display notes with Markdown support',
    icon: FileText,
    href: '/notes',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant tool access with no loading delays',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Shield,
    title: 'Works Offline',
    description: 'All tools function without internet connection',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Heart,
    title: 'Data Persistence',
    description: 'Your data is saved locally and persists across sessions',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="Trainer Toolkit Logo" className="h-10 w-10" />
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold text-foreground leading-tight">Trainer Toolkit</span>
                <span className="text-xs text-muted-foreground leading-tight">by Arwindpianist Multimedia & Consulting</span>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center space-x-4">
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-foreground">Trainer Toolkit</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Complete
              <span className="block bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Presentation Toolkit
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need for engaging presentations, workshops, and training sessions. 
              All tools work offline and save your data locally.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 lg:mb-20">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl ${tool.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 ${tool.iconColor}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Get started
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
              Why TrainerToolkit?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built with modern web technologies and designed for the best user experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-3 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-white/90 rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-4">
              Ready to enhance your presentations?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start using TrainerToolkit today and experience the difference in your training sessions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/qr"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                <QrCode className="mr-2 h-5 w-5" />
                Try QR Generator
              </Link>
              <Link
                href="/timer"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors border border-border"
              >
                <Timer className="mr-2 h-5 w-5" />
                Start Timer
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 bg-white/80 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/favicon.svg" alt="Trainer Toolkit Logo" className="h-8 w-8" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold text-foreground leading-tight">Trainer Toolkit</span>
                <span className="text-xs text-muted-foreground leading-tight">by Arwindpianist Multimedia & Consulting</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Essential tools for modern presenters and trainers
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              <a href="https://www.arwindpianist.store/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                arwindpianist.store
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
