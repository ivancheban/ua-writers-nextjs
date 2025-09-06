import Link from 'next/link';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export default function Header({ lang }: { lang: string }) {
  // REMOVED: "sticky top-0 z-10" from the className
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center py-3">
          <Link href={`/${lang}`} className="flex items-center space-x-3">
            <img 
              src="/logo.svg" 
              alt="UA Writers' Space Logo" 
              // Using the exact className you provided
              className="w-186 h-10"
            />
            <span 
              className="hidden sm:inline font-bold text-primary text-xl"
            >
              UA Writers' Space
            </span>
          </Link>
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link href={`/${lang}`} className="text-muted hover:text-primary transition-colors">Blog</Link>
            <Link href={`/${lang}/about`} className="text-muted hover:text-primary transition-colors">About</Link>
            <Link href={`/${lang}/contribute`} className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-semibold">
              Contribute
            </Link>
            <LanguageSwitcher lang={lang} />
          </nav>
        </div>
      </div>
    </header>
  );
}