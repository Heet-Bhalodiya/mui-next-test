'use client';

import { ThemeProvider } from './ThemeProvider';

export default function ClientThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: 'light' | 'dark';
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      {children}
    </ThemeProvider>
  );
}
