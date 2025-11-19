'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setThemeCookie, type ThemeMode } from '../actions/theme';

type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
  children,
  serverTheme,
}: {
  children: React.ReactNode;
  serverTheme: ThemeMode;
}) {
  // Initialize from data attribute set by the script
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const htmlTheme = document.documentElement.getAttribute('data-theme') as ThemeMode;
      return htmlTheme || serverTheme;
    }
    return serverTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window !== 'undefined') {
      const currentClass = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      return currentClass;
    }
    return serverTheme === 'dark' ? 'dark' : 'light';
  });

  // Update resolved theme when theme changes or system preference changes
  useEffect(() => {
    const updateResolvedTheme = () => {
      const newResolvedTheme = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(newResolvedTheme);

      // Apply theme to document
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newResolvedTheme);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = newResolvedTheme;
    };

    updateResolvedTheme();

    // Listen for system theme changes only when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateResolvedTheme();

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const setTheme = async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    await setThemeCookie(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
