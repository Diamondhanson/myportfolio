'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Light is the draughtsman's paper, dark is a true cyanotype blueprint.
 * Both are first-class, so the toggle just names the one you are not in.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('bp-theme');
    } catch {
      // Private browsing, or site data blocked. Fall through to the system value.
    }
    setTheme(stored === 'light' || stored === 'dark' ? stored : systemTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('bp-theme', next);
    } catch {
      // Not persisting is survivable. The page still switches for this visit.
    }
  }

  // Render nothing until mounted, so server and client markup agree.
  if (theme === null) return <span style={{ width: 92 }} aria-hidden />;

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn themeBtn"
      aria-label={`Switch to ${theme === 'dark' ? 'paper' : 'blueprint'} theme`}
    >
      {theme === 'dark' ? 'Paper' : 'Blueprint'}
    </button>
  );
}
