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
    const { data } = await api.post('/login', { nombre_usuario, password });
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.usuario));
    setUser(data.data.usuario);
    return data;
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