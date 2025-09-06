import Link from 'next/link';
// We are removing the 'Image' import
import Logo from './Logo'; // And importing our new Logo component
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ lang }: { lang: string }) {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center py-3">
          <Link href={`/${lang}`} className="flex items-center space-x-3">
            {/* We replace <Image ... /> with our new <Logo /> component */}
            <Logo className="w-10 h-10" />
            <span className="hidden sm:inline font-bold text-lg text-primary">
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