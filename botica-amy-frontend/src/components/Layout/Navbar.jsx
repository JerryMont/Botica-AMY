import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();

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
          👤 {user?.nombre || 'Usuario'}
        </span>
        <button
          onClick={logout}
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