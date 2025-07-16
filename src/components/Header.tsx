import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function Header({ title, subtitle, showBack = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBack && (
              <Link
                href="/"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            )}
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="Trainer Toolkit Logo" className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-foreground leading-tight">{title}</span>
                {subtitle && (
                  <span className="text-xs sm:text-sm text-muted-foreground leading-tight">{subtitle}</span>
                )}
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-colors"
          >
            Trainer Toolkit
          </Link>
        </div>
      </div>
    </header>
  );
} 