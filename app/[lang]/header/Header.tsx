import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n";
import HeaderActions from "../components/HeaderActions";

export default async function Header({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <header className="bg-gray-100 dark:bg-gray-500 p-4 flex justify-between items-center transition-colors">
      <nav className="flex gap-4">
        <Link href={`/${lang}`} className="hover:underline">{dict.navigation.home}</Link>
        <Link href={`/${lang}/about`} className="hover:underline">{dict.navigation.about}</Link>
        <Link href={`/${lang}/posts/getting-started`} className="hover:underline">Posts</Link>
        <Link href={`/${lang}/dummy1`} className="hover:underline">{dict.navigation.dummy1}</Link>
        <Link href={`/${lang}/dummy2`} className="hover:underline">{dict.navigation.dummy2}</Link>
        <Link href={`/${lang}/dummy3`} className="hover:underline">{dict.navigation.dummy3}</Link>
      </nav>
      <HeaderActions lang={lang} />
    </header>
  );
}
