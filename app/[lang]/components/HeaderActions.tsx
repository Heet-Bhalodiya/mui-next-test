'use client';

import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale } from '@/i18n';

export default function HeaderActions({ lang }: { lang: Locale }) {
  return (
    <div className="flex gap-4 items-center">
      <ThemeToggle />
      <LanguageSwitcher lang={lang} />
    </div>
  );
}
