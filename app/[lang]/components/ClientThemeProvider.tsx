'use client';

import { ThemeProvider } from './ThemeProvider';
import type { ThemeMode } from '../actions/theme';

export default function ClientThemeProvider({
  children,
  serverTheme,
}: {
  children: React.ReactNode;
  serverTheme: ThemeMode;
}) {
  return (
    <ThemeProvider serverTheme={serverTheme}>
      {children}
    </ThemeProvider>
  );
}
