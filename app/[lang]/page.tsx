import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n';
import Link from 'next/link';

export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>{dict.home.title}</h1>
      <Stack spacing={2} direction="row" className='mb-8'>
        <Button variant="text">{dict.home.text}</Button>
        <Button variant="contained">{dict.home.contained}</Button>
        <Button variant="outlined">{dict.home.outlined}</Button>
      </Stack>

      <div className='mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg'>
        <h2 className='text-xl font-semibold mb-4'>Features Demo</h2>
        <ul className='space-y-2'>
          <li>✅ Light/Dark mode with cookie persistence</li>
          <li>✅ Multi-language support (i18n)</li>
          <li>✅ Dynamic routing with static generation</li>
          <li>
            <Link
              href={`/${lang}/posts/getting-started`}
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              View example posts →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}