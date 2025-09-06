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
    <div className="text-sm font-semibold">
      <span className={lang === 'en' ? 'text-primary' : 'text-muted'}>EN</span>
      <span className="mx-1 text-muted">/</span>
      <Link 
        href={`/${otherLang}${pathWithoutLang}`}
        className={lang === 'uk' ? 'text-primary hover:opacity-80' : 'text-muted hover:text-primary'}>
        UK
      </Link>
    </div>
  )
}