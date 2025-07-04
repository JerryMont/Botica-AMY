import { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (nombre_usuario, password) => {
    const { data } = await api.post('/login', { nombre_usuario, password });
    localStorage.setItem('token', data.data.token);
    setUser(data.data.usuario);
    return data;
  };

  const logout = async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
    setUser(null);
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