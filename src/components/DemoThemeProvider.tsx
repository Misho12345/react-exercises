import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';
type LocalThemeContextType = { theme: Theme; toggleTheme: () => void; isDark: boolean; toggle: () => void };

export const LocalThemeContext = createContext<LocalThemeContextType | undefined>(undefined);

export function DemoThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const isDark = theme === 'dark';
  const toggle = toggleTheme;

  const lightThemeVars = {
    '--bg-primary': '#fafafa',
    '--bg-secondary': '#ffffff',
    '--bg-tertiary': '#f5f5f5',
    '--bg-hover': '#f0f0f0',
    '--text-primary': '#0a0a0a',
    '--text-secondary': '#737373',
    '--border': '#e5e5e5',
    '--accent': '#6366f1',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  } as React.CSSProperties;

  const darkThemeVars = {
    '--bg-primary': '#0a0a0a',
    '--bg-secondary': '#171717',
    '--bg-tertiary': '#262626',
    '--bg-hover': '#2e2e2e',
    '--text-primary': '#fafafa',
    '--text-secondary': '#a3a3a3',
    '--border': '#2e2e2e',
    '--accent': '#818cf8',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
  } as React.CSSProperties;

  return (
    <LocalThemeContext.Provider value={{ theme, toggleTheme, isDark, toggle }}>
      <div style={theme === 'light' ? lightThemeVars : darkThemeVars}>
        {children}
      </div>
    </LocalThemeContext.Provider>
  );
}

export function useDemoTheme() {
  const ctx = useContext(LocalThemeContext);
  if (!ctx) throw new Error('useDemoTheme must be inside DemoThemeProvider');
  return ctx;
}
