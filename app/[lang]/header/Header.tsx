import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default async function Header({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <nav className="flex gap-4">
        <Link href={`/${lang}`}>{dict.navigation.home}</Link>
        <Link href={`/${lang}/about`}>{dict.navigation.about}</Link>
        <Link href={`/${lang}/dummy1`}>{dict.navigation.dummy1}</Link>
        <Link href={`/${lang}/dummy2`}>{dict.navigation.dummy2}</Link>
        <Link href={`/${lang}/dummy3`}>{dict.navigation.dummy3}</Link>
      </nav>
      <LanguageSwitcher lang={lang} />
    </header>
  );
}
