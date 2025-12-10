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
    bgPrimary: '#f5f6fa',
    bgSecondary: '#ffffff',
    textPrimary: '#2c3e50',
    textSecondary: '#7f8c8d',
    textHeading: '#1a252f',
    borderColor: '#e1e8ed',
    cardBg: '#ffffff',
    cardBgAlt: '#f9f9f9',
    inputBg: '#ffffff',
    inputBorder: '#ddd',
    accentColor: '#3498db',
    successColor: '#27ae60',
    warningColor: '#f39c12',
    errorColor: '#e74c3c',
    buttonTextColor: '#ffffff',
    white: '#ffffff',
    lightGray: '#f0f0f0',
    darkGray: '#2c3e50',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  };
}
