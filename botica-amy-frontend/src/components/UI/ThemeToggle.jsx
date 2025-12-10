import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-mode');
      root.style.setProperty('--bg-primary', '#0f0f0f');
      root.style.setProperty('--bg-secondary', '#1a1a1a');
      root.style.setProperty('--text-primary', '#f0f0f0');
      root.style.setProperty('--text-secondary', '#c0c0c0');
      root.style.setProperty('--border-color', '#333333');
      root.style.setProperty('--accent-color', '#5dade2');
      root.style.setProperty('--success-color', '#2ecc71');
      root.style.setProperty('--warning-color', '#f1c40f');
      root.style.setProperty('--error-color', '#e74c3c');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      root.style.setProperty('--bg-primary', '#f5f6fa');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--text-primary', '#2c3e50');
      root.style.setProperty('--text-secondary', '#7f8c8d');
      root.style.setProperty('--border-color', '#e1e8ed');
      root.style.setProperty('--accent-color', '#3498db');
      root.style.setProperty('--success-color', '#27ae60');
      root.style.setProperty('--warning-color', '#f39c12');
      root.style.setProperty('--error-color', '#e74c3c');
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
        backgroundColor: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: '500',
        transition: 'all 0.3s ease'
      }}
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {isDark ? '☀️' : '🌙'} {isDark ? 'Claro' : 'Oscuro'}
    </button>
  );
} 