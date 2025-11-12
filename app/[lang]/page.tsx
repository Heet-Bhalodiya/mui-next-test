import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n';

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
      <Stack spacing={2} direction="row">
        <Button variant="text">{dict.home.text}</Button>
        <Button variant="contained">{dict.home.contained}</Button>
        <Button variant="outlined">{dict.home.outlined}</Button>
      </Stack>
    </div>
  );
}