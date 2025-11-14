'use server';

import { cookies } from 'next/headers';

export async function setThemeCookie(theme: 'light' | 'dark') {
  try {
    const cookieStore = await cookies();
    cookieStore.set('theme', theme, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
  } catch (error) {
    console.error('Error setting theme cookie:', error);
  }
}

export async function getThemeCookie(): Promise<'light' | 'dark'> {
  try {
    const cookieStore = await cookies();
    const theme = cookieStore.get('theme')?.value;
    return theme === 'dark' ? 'dark' : 'light';
  } catch (error) {
    // During build time or when cookies are not available, return default
    console.warn('Could not access cookies, using default theme');
    return 'light';
  }
}
