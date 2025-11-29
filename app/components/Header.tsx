'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Search from './Search';

interface HeaderProps {
  lang?: string;
}

const Header = ({ lang: langProp }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams();
  // Safely get the language, defaulting to 'en' if not found
  // Use the prop if provided, otherwise fall back to params
  const lang = langProp || (params?.lang as string) || 'en';

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
    <header className="bg-background border-b border-border-color sticky top-0 z-50">
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
                className="w-[140px] h-[30px] sm:w-[187px] sm:h-[40px]"
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
            
            <div className="flex items-center border-l border-border-color pl-6 ml-2 space-x-4">
              <Search />
              <LanguageSwitcher lang={lang} />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Search />
            <LanguageSwitcher lang={lang} />
            <button
              className="text-text-secondary hover:text-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border-color">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;