import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n";

export default async function About({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{dict.about.title}</h1>
      <p>{dict.about.description}</p>
    </main>
  );
}
