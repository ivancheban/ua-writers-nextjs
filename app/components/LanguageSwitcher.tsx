'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname()

  // This function removes the current language prefix from the path
  const getPathWithoutLang = (currentPath: string) => {
    if (currentPath === `/${lang}`) return '/'
    return currentPath.replace(`/${lang}`, '')
  }

  const pathWithoutLang = getPathWithoutLang(pathname)
  const otherLang = lang === 'en' ? 'uk' : 'en'

  return (
    <div className="flex items-center space-x-2 text-sm font-semibold">
      <Link
        href={`/en${pathWithoutLang}`}
        className={`transition-colors ${
          lang === 'en'
            ? 'text-primary pointer-events-none'
            : 'text-secondary hover:text-primary'
        }`}
        aria-current={lang === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
      <span className="text-secondary">/</span>
      <Link
        href={`/uk${pathWithoutLang}`}
        className={`transition-colors ${
          lang === 'uk'
            ? 'text-primary pointer-events-none'
            : 'text-secondary hover:text-primary'
        }`}
        aria-current={lang === 'uk' ? 'page' : undefined}
      >
        UK
      </Link>
    </div>
  );
}