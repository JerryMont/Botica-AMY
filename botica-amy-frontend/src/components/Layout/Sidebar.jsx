import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onToggle }) {
  const { user } = useAuth();

  // Menú para admin con solo icono y label limpio
  const adminMenu = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/productos', label: 'Gestión de Productos', icon: '💊' },
    { path: '/clientes', label: 'Base de Datos de Clientes', icon: '👥' },
    { path: '/ventas', label: 'Proceso de Ventas', icon: '🛒' },
    { path: '/servicios', label: 'Servicios Farmacéuticos', icon: '💉' },
    { path: '/reportes', label: 'Reportes y Análisis', icon: '📊' },
    { path: '/admin', label: 'Administración del Sistema', icon: '⚙️' }
  ];
  const vendedorMenu = [
    { path: '/productos', label: 'Gestión de Productos', icon: '💊' },
    { path: '/clientes', label: 'Base de Datos de Clientes', icon: '👥' },
    { path: '/ventas', label: 'Proceso de Ventas', icon: '🛒' },
    { path: '/servicios', label: 'Servicios Farmacéuticos', icon: '💉' },
    { path: '/reportes', label: 'Reportes y Análisis', icon: '📊' }
  ];

  // Elegir menú según rol
  const menuItems = user?.rol === 'admin' ? adminMenu : vendedorMenu;

  if (!user) return null;

  const isAdmin = user.rol === 'admin';
  
  // Clases CSS para controlar la visibilidad
  const sidebarClasses = `sidebar ${!isAdmin && !isOpen ? 'collapsed' : ''}`;

  return (
    <>
      {/* Overlay para móviles solo para vendedor */}
      {!isAdmin && isOpen && (
        <div
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1199
          }}
        />
      )}

      <aside className={sidebarClasses}>
        <nav style={{ padding: '0 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map(item => (
              <li key={item.path} style={{ marginBottom: '6px' }}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 22px',
                    color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    borderLeft: isActive ? '4px solid var(--accent-color)' : '4px solid transparent',
                    backgroundColor: isActive ? 'rgba(52, 152, 219, 0.08)' : 'transparent',
                    transition: 'all 0.2s ease',
                    fontSize: '15px',
                    fontWeight: isActive ? '600' : '400',
                    borderRadius: '6px',
                  })}
                  onClick={() => {
                    if (!isAdmin && window.innerWidth <= 768) {
                      onToggle();
                    }
                  }}
                >
                  <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Información del usuario */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid var(--border-color)',
          marginTop: 'auto',
          fontSize: '13px'
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

      {/* Botón para abrir/cerrar sidebar en móviles solo para vendedor */}
      {!isAdmin && (
        <button
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: '80px',
            left: '10px',
            zIndex: 1201,
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
      )}
    </>
  );
} 