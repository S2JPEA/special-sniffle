"use client";

import React, { createContext, useEffect, useMemo, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'rrg-theme';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const preferred = getPreferredTheme();
    setThemeState(preferred);
    document.documentElement.dataset.theme = preferred === 'light' ? 'light' : undefined;
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    if (next === 'light') {
      document.documentElement.dataset.theme = 'light';
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
