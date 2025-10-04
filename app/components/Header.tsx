'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export default function Header({ lang }: { lang: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center py-3">
          <Link href={`/${lang}`} className="flex items-center space-x-3 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="UA Writers' Space Logo"
              width={187}
              height={40}
              className="w-[187px] h-[40px]"
            />
          </Link>
          
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href={`/${lang}`} className="text-secondary hover:text-primary transition-colors">Blog</Link>
              <Link href={`/${lang}/about`} className="text-secondary hover:text-primary transition-colors">About</Link>
              <Link href={`/${lang}/contribute`} className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-semibold">
                Contribute
              </Link>
            </nav>

            <div className="ml-6">
              <LanguageSwitcher lang={lang} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-4 p-2 rounded-md text-secondary hover:text-primary hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-border-color">
            <Link href={`/${lang}`} onClick={() => setIsMenuOpen(false)} className="block py-2 text-secondary hover:text-primary transition-colors">Blog</Link>
            <Link href={`/${lang}/about`} onClick={() => setIsMenuOpen(false)} className="block py-2 text-secondary hover:text-primary transition-colors">About</Link>
            <Link href={`/${lang}/contribute`} onClick={() => setIsMenuOpen(false)} className="block mt-2 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm font-semibold text-center">
              Contribute
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
