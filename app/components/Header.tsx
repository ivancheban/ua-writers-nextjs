'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const params = useParams();
  // Safely get the language, defaulting to 'en' if not found
  const lang = (params?.lang as string) || 'en';

  const menuItems = {
    en: [
      { label: 'Blog', href: `/${lang}` },
      { label: 'About', href: `/${lang}/about` },
      { label: 'Contribute', href: `/${lang}/contribute` },
    ],
    uk: [
      { label: 'Блог', href: `/${lang}` },
      { label: 'Про нас', href: `/${lang}/about` },
      { label: 'Як опублікувати', href: `/${lang}/contribute` },
    ]
  };

  const currentMenuItems = lang === 'uk' ? menuItems.uk : menuItems.en;

  return (
    <header className="bg-card border-b border-border-color sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`} className="flex items-center">
              <Image
                src="/logo.svg"
                alt="UA Writers' Space Logo"
                width={187}
                height={40}
                className="w-[187px] h-[40px]"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="border-l border-border-color pl-6 ml-2">
              <LanguageSwitcher lang={lang} />
            </div>
          </nav>

          {/* Mobile Menu Button Placeholder */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher lang={lang} />
            <button className="text-text-secondary hover:text-primary p-2">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;