import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-primary', '#1a1a1a');
      root.style.setProperty('--bg-secondary', '#2d2d2d');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b0b0b0');
      root.style.setProperty('--border-color', '#404040');
      localStorage.setItem('theme', 'dark');
    } else {
      root.style.setProperty('--bg-primary', '#f5f6fa');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--text-primary', '#2c3e50');
      root.style.setProperty('--text-secondary', '#7f8c8d');
      root.style.setProperty('--border-color', '#e1e8ed');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 12px',
        backgroundColor: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {isDark ? '☀️' : '🌙'} {isDark ? 'Claro' : 'Oscuro'}
    </button>
  );
} 