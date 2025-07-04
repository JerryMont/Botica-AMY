import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onToggle }) {
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: '📊 Dashboard', icon: '📊' },
    { path: '/productos', label: '💊 Productos', icon: '💊' },
    { path: '/clientes', label: '👥 Clientes', icon: '👥' },
    { path: '/ventas', label: '🛒 Ventas', icon: '🛒' },
    { path: '/servicios', label: '🔧 Servicios', icon: '🔧' },
    { path: '/reportes', label: '📈 Reportes', icon: '📈' }
  ];

  // Filtrar elementos según el rol del usuario
  const filteredMenuItems = menuItems.filter(item => {
    if (item.path === '/reportes' && user?.rol !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}

      <aside style={{
        width: '250px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        height: 'calc(100vh - 70px)',
        position: 'fixed',
        left: isOpen ? 0 : '-250px',
        top: '70px',
        transition: 'left 0.3s ease',
        zIndex: 999,
        overflowY: 'auto'
      }}>
        <nav style={{ padding: '20px 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredMenuItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '15px 25px',
                    color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    borderLeft: isActive ? '4px solid var(--accent-color)' : '4px solid transparent',
                    backgroundColor: isActive ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
                    transition: 'all 0.2s ease',
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '400'
                  })}
                  onClick={() => {
                    // Cerrar sidebar en móviles al hacer clic
                    if (window.innerWidth <= 768) {
                      onToggle();
                    }
                  }}
                >
                  <span style={{ marginRight: '10px' }}>{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Información del usuario */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid var(--border-color)',
          marginTop: 'auto'
        }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '5px' }}>
            Usuario actual
          </div>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
            {user?.nombre || 'Usuario'}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
            {user?.rol || 'Rol no definido'}
          </div>
        </div>
      </aside>

      {/* Botón para abrir/cerrar sidebar en móviles */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: '80px',
          left: '10px',
          zIndex: 1000,
          padding: '8px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'none',
          '@media (max-width: 768px)': {
            display: 'block'
          }
        }}
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </>
  );
} 