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
      borderColor: '#333333',
      cardBg: '#1a1a1a',
      inputBg: '#1a1a1a',
      inputBorder: '#333333',
      white: '#1a1a1a',
      lightGray: '#333333',
      darkGray: '#f0f0f0',
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    };
  }

  return {
    bgPrimary: '#f5f6fa',
    bgSecondary: '#ffffff',
    textPrimary: '#2c3e50',
    textSecondary: '#7f8c8d',
    borderColor: '#e1e8ed',
    cardBg: '#ffffff',
    inputBg: '#ffffff',
    inputBorder: '#ddd',
    white: '#ffffff',
    lightGray: '#f0f0f0',
    darkGray: '#2c3e50',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  };
}
