import { NavLink } from 'react-router-dom';
import iconoImg from '../../assets/Icono.png';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠', gradient: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)' },
  { path: '/productos', label: 'Productos', icon: '💊', gradient: 'linear-gradient(135deg, hsl(280, 70%, 60%) 0%, hsl(320, 75%, 65%) 100%)' },
  { path: '/clientes', label: 'Clientes', icon: '👥', gradient: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(160, 65%, 50%) 100%)' },
  { path: '/ventas', label: 'Ventas', icon: '💰', gradient: 'linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(25, 85%, 60%) 100%)' },
  { path: '/servicios', label: 'Servicios', icon: '🩺', gradient: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(220, 75%, 60%) 100%)' },
  { path: '/reportes', label: 'Reportes', icon: '📊', adminOnly: true, gradient: 'linear-gradient(135deg, hsl(340, 82%, 65%) 0%, hsl(25, 85%, 60%) 100%)' },
  { path: '/admin', label: 'Administración', icon: '⚙️', adminOnly: true, gradient: 'linear-gradient(135deg, hsl(260, 70%, 55%) 0%, hsl(280, 65%, 55%) 100%)' },
];

function isMobile() {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  return false;
}

export default function SidebarDrawer({ open, onClose }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { user } = useAuth();
  const isDark = useDarkMode();
  const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isAdmin = user && String(user.rol).trim().toLowerCase() === 'admin';

  useEffect(() => {
    if (user && !localStorage.getItem('hideWelcome')) {
      setShowWelcome(true);
    }
  }, [user]);

  const handleCloseWelcome = (hide) => {
    setShowWelcome(false);
    if (hide) localStorage.setItem('hideWelcome', 'true');
  };

  const sidebarBg = isDark
    ? 'linear-gradient(180deg, hsl(220, 15%, 14%) 0%, hsl(220, 15%, 10%) 100%)'
    : 'linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(220, 20%, 97%) 100%)';

  const textColor = isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)';
  const textSecondary = isDark ? 'hsl(220, 10%, 70%)' : 'hsl(220, 10%, 45%)';

  return (
    <>
      {/* Overlay solo en móviles */}
      {open && mobile && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            transition: 'all 0.3s',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : -270,
          width: 260,
          height: '100vh',
          background: sidebarBg,
          color: textColor,
          boxShadow: isDark
            ? '4px 0 24px rgba(0, 0, 0, 0.5)'
            : '4px 0 24px rgba(0, 0, 0, 0.08)',
          zIndex: 2001,
          padding: '0',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          borderRight: isDark ? '1px solid hsl(220, 15%, 25%)' : '1px solid hsl(220, 15%, 88%)',
        }}
      >
        {/* Header con logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: isDark ? '1px solid hsl(220, 15%, 25%)' : '1px solid hsl(220, 15%, 88%)',
          background: isDark
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'white',
              padding: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={iconoImg}
                alt="Logo Botica"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px',
                }}
              />
            </div>
          </div>

          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '800',
            textAlign: 'center',
            background: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.01em',
          }}>
            Botica AMY
          </h2>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '12px',
            textAlign: 'center',
            color: textSecondary,
            fontWeight: '500',
          }}>
            Sistema de Gestión
          </p>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              fontSize: '20px',
              color: textColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            }}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>

        {/* Navegación */}
        <nav style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems
              .filter(item => !item.adminOnly || isAdmin)
              .map((item, index) => (
                <li key={item.path} style={{ marginBottom: '8px' }}>
                  <NavLink
                    to={item.path}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: textColor,
                      textDecoration: 'none',
                      fontWeight: isActive ? '600' : '500',
                      borderRadius: '12px',
                      fontSize: '15px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: isActive
                        ? (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)')
                        : 'transparent',
                      position: 'relative',
                      overflow: 'hidden',
                    })}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.classList.contains('active')) {
                        e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.classList.contains('active')) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {/* Indicador de activo */}
                    <NavLink to={item.path}>
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div style={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: '4px',
                              background: item.gradient,
                              borderRadius: '0 4px 4px 0',
                            }} />
                          )}
                          <span style={{
                            fontSize: '20px',
                            minWidth: '24px',
                            textAlign: 'center',
                            filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                          }}>
                            {item.icon}
                          </span>
                          <span style={{ flex: 1 }}>{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        {/* Footer con botón de ayuda */}
        <div style={{
          padding: '16px',
          borderTop: isDark ? '1px solid hsl(220, 15%, 25%)' : '1px solid hsl(220, 15%, 88%)',
          background: isDark
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)',
        }}>
          <button
            style={{
              background: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: '600',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(93, 173, 226, 0.3)',
            }}
            onClick={() => setHelpOpen(true)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(93, 173, 226, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(93, 173, 226, 0.3)';
            }}
          >
            <span style={{ fontSize: '18px' }}>❓</span>
            <span>Ayuda</span>
          </button>
        </div>
      </aside>

      {/* Modal de ayuda (mantener el existente pero con mejoras) */}
      {helpOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease',
        }} onClick={() => setHelpOpen(false)}>
          <div style={{
            background: isDark ? 'hsl(220, 15%, 14%)' : 'white',
            color: isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)',
            borderRadius: '20px',
            maxWidth: '700px',
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            padding: '40px',
            position: 'relative',
            border: isDark ? '1px solid hsl(220, 15%, 25%)' : 'none',
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setHelpOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                fontSize: '24px',
                color: isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
              }}
              aria-label="Cerrar ayuda"
            >✕</button>

            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ❓ Centro de Ayuda
            </h2>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '16px',
                color: isDark ? 'hsl(220, 70%, 65%)' : 'hsl(220, 75%, 55%)',
              }}>
                Funciones Principales
              </h3>
              <ul style={{
                paddingLeft: '24px',
                color: isDark ? 'hsl(220, 10%, 80%)' : 'hsl(220, 10%, 35%)',
                fontSize: '16px',
                lineHeight: '1.8',
              }}>
                <li><b>Dashboard:</b> Estadísticas en tiempo real y acceso rápido</li>
                <li><b>Productos:</b> Gestión completa de inventario</li>
                <li><b>Clientes:</b> Base de datos de clientes</li>
                <li><b>Ventas:</b> Proceso de ventas con actualización automática de stock</li>
                <li><b>Servicios:</b> Gestión de servicios farmacéuticos</li>
                <li><b>Reportes:</b> Análisis y reportes en PDF/CSV</li>
                <li><b>Administración:</b> Gestión de usuarios y configuración</li>
              </ul>
            </div>

            <div style={{
              background: isDark ? 'rgba(93, 173, 226, 0.1)' : 'rgba(93, 173, 226, 0.08)',
              borderRadius: '16px',
              padding: '20px',
              border: isDark ? '1px solid rgba(93, 173, 226, 0.2)' : '1px solid rgba(93, 173, 226, 0.15)',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '12px',
                color: isDark ? 'hsl(220, 70%, 65%)' : 'hsl(220, 75%, 55%)',
              }}>
                ¿Necesitas más ayuda?
              </h3>
              <p style={{
                margin: '0 0 12px 0',
                color: isDark ? 'hsl(220, 10%, 80%)' : 'hsl(220, 10%, 35%)',
              }}>
                <b>📧 Email:</b> soporte@boticaamy.com<br />
                <b>📞 Teléfono:</b> +123 456 7890<br />
                <b>🕒 Horario:</b> Lun-Vie 8:00 AM - 6:00 PM
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={() => setHelpOpen(false)}
                style={{
                  background: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 32px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(93, 173, 226, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(93, 173, 226, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(93, 173, 226, 0.3)';
                }}
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}