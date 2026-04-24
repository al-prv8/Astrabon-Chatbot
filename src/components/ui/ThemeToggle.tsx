'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  /** When true, uses white/light styling (for hero overlay). Otherwise adapts to scrolled state. */
  isOverHero?: boolean;
}

export function ThemeToggle({ isOverHero = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent hydration mismatch — render a placeholder with same dimensions
    return (
      <div className="w-9 h-9 rounded-xl" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group overflow-hidden border ${
        isOverHero
          ? 'border-white/20 bg-white/8 text-white hover:bg-white/15 hover:border-white/40'
          : 'border-border-subtle bg-surface-100 text-text-muted hover:text-text-primary hover:bg-surface-200 hover:border-primary/30'
      }`}
    >
      {/* Sun icon (shown when dark — click to go light) */}
      <Sun
        className={`w-4 h-4 absolute transition-all duration-300 ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      {/* Moon icon (shown when light — click to go dark) */}
      <Moon
        className={`w-4 h-4 absolute transition-all duration-300 ${
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        }`}
      />
    </button>
  );
}
