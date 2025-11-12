'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, type Locale } from '@/i18n'

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname()

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return `/${locale}`

    // Split pathname and find the locale segment
    const segments = pathname.split('/').filter(Boolean)

    // Check if first segment is a locale
    if (segments.length > 0 && i18n.locales.includes(segments[0] as Locale)) {
      segments[0] = locale
    } else {
      // If no locale in path, add it
      segments.unshift(locale)
    }

    return '/' + segments.join('/')
  }

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-semibold">Language:</span>
      {i18n.locales.map((locale) => {
        return (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className={`px-3 py-1 rounded ${lang === locale
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
