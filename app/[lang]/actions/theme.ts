'use server';

import { cookies } from 'next/headers';

export type ThemeMode = 'light' | 'dark' | 'system';

export async function setThemeCookie(theme: ThemeMode) {
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

export async function getThemeCookie(): Promise<ThemeMode> {
  try {
    const cookieStore = await cookies();
    const theme = cookieStore.get('theme')?.value as ThemeMode;
    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      return theme;
    }
    return 'system'; // Default to system preference
  } catch (error) {
    console.warn('Could not access cookies, using default theme');
    return 'system';
  }
}
