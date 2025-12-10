import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../UI/ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error durante logout:', error);
      // Aún así navegar a login
      navigate('/login');
    }
  };

  // Mensaje personalizado según el rol
  let saludo = 'Usuario';
  if (user?.rol === 'admin') saludo = 'Bienvenido administrador';
  else if (user?.rol === 'vendedor') saludo = 'Bienvenido vendedor';

  return (
    <nav style={{
      backgroundColor: 'var(--bg-secondary)',
      padding: '15px 20px',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '20px' }}>
          🏥 Botica AMY
        </h1>
        <ThemeToggle />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ color: 'var(--text-secondary)' }}>
          👤 {saludo}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </nav>
  );
} 