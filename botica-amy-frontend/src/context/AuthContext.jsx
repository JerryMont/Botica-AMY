import { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Recuperar usuario de localStorage al iniciar
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (nombre_usuario, password) => {
    // En producción, usar simple-login.php
    if (import.meta.env.PROD) {
      const response = await fetch('https://logistica-amy.infinityfreeapp.com/simple-login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Error de login');
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.usuario));
      setUser(data.data.usuario);
      return data;
    } else {
      // En desarrollo, usar Laravel API
      const { data } = await api.post('/login', { nombre_usuario, password });
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.usuario));
      setUser(data.data.usuario);
      return data;
    }
  };

  const logout = async () => {
    try {
      const response = await api.post('/logout');
      console.log('Logout exitoso:', response.data);
    } catch (error) {
      console.error('Error al hacer logout en el servidor:', error.response?.data || error.message);
      // Aún así limpiar el storage local incluso si falla la API
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      console.log('Sesión cerrada localmente');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}