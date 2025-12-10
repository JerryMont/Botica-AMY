import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const checkTheme = () => {
      const saved = localStorage.getItem('theme');
      setIsDark(saved === 'dark');
    };

    window.addEventListener('storage', checkTheme);
    // Verificar cada 500ms por cambios de tema
    const interval = setInterval(checkTheme, 500);

    return () => {
      window.removeEventListener('storage', checkTheme);
      clearInterval(interval);
    };
  }, []);

  return isDark;
}

export function getThemeColors() {
  const isDark = localStorage.getItem('theme') === 'dark';
  
  if (isDark) {
    return {
      bgPrimary: '#0f0f0f',
      bgSecondary: '#1a1a1a',
      textPrimary: '#f0f0f0',
      textSecondary: '#c0c0c0',
      textHeading: '#ffffff',
      borderColor: '#333333',
      cardBg: '#1a1a1a',
      cardBgAlt: '#252525',
      inputBg: '#1a1a1a',
      inputBorder: '#333333',
      accentColor: '#5dade2',
      successColor: '#2ecc71',
      warningColor: '#f1c40f',
      errorColor: '#e74c3c',
      buttonTextColor: '#ffffff',
      white: '#1a1a1a',
      lightGray: '#333333',
      darkGray: '#f0f0f0',
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    };
  }

  return {
    /* Valores inspirados en Productos/Dashboard (modo claro) */
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textHeading: '#1f2937',
    borderColor: '#e5e7eb',
    cardBg: '#ffffff',
    cardBgAlt: '#f8fafc',
    inputBg: '#ffffff',
    inputBorder: '#e5e7eb',
    accentColor: '#3b82f6',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    buttonTextColor: '#ffffff',
    white: '#ffffff',
    lightGray: '#f3f4f6',
    darkGray: '#111827',
    shadowColor: 'rgba(0, 0, 0, 0.08)'
  };
}
