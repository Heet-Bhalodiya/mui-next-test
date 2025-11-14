'use client';

import { ThemeProvider } from './ThemeProvider';
import { useEffect, useState } from 'react';
import { getThemeCookie } from '../actions/theme';

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Read theme from cookie on client side
    getThemeCookie().then(setTheme);
  }, []);

  return (
    <ThemeProvider initialTheme={theme}>
      {children}
    </ThemeProvider>
  );
}
