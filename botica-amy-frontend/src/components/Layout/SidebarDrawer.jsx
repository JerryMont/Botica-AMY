import { NavLink } from 'react-router-dom';
import iconoImg from '../../assets/Icono.png';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/productos', label: 'Gestión de Productos', icon: '💊' },
  { path: '/clientes', label: 'Base de Datos de Clientes', icon: '👥' },
  { path: '/ventas', label: 'Proceso de Ventas', icon: '💰' },
  { path: '/servicios', label: 'Servicios Farmacéuticos', icon: '🩺' },
  { path: '/reportes', label: 'Reportes y Análisis', icon: '📊', adminOnly: true },
  { path: '/admin', label: 'Administración del Sistema', icon: '⚙️', adminOnly: true },
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
  const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isAdmin = user && String(user.rol).trim().toLowerCase() === 'admin';
  console.log('SidebarDrawer user:', user, 'isAdmin:', isAdmin); // DEPURACIÓN

  useEffect(() => {
    // Mostrar bienvenida solo la primera vez
    if (user && !localStorage.getItem('hideWelcome')) {
      setShowWelcome(true);
    }
  }, [user]);

  const handleCloseWelcome = (hide) => {
    setShowWelcome(false);
    if (hide) localStorage.setItem('hideWelcome', 'true');
  };

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
            background: 'rgba(0,0,0,0.25)',
            zIndex: 2000,
            transition: 'background 0.3s',
          }}
        />
      )}
      {/* Drawer */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : -270,
          width: 250,
          height: '100vh',
          background: '#1e2a38',
          color: 'white',
          boxShadow: '2px 0 8px rgba(44,62,80,0.08)',
          zIndex: 2001,
          padding: '24px 0 0 0',
          transition: 'left 0.3s, background 0.3s',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Ícono visual atractivo en la parte superior */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 140,
            marginBottom: 8,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 20,
            marginLeft: 16,
            marginRight: 16,
          }}>
            <img src={iconoImg} alt="Logo Botica" style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 20, boxShadow: '0 2px 8px rgba(44,62,80,0.08)', background: 'white' }} />
          </div>
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 12,
              background: 'none',
              border: 'none',
              fontSize: 28,
              color: '#fff',
              cursor: 'pointer',
            }}
            aria-label="Cerrar menú"
          >
            ×
          </button>
          {/* Opciones de navegación */}
          <nav style={{ marginTop: 40, overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {menuItems.map(item => (
                <li key={item.path} style={{ marginBottom: 8 }}>
                  <NavLink
                    to={item.path}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '12px 24px',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: isActive ? 700 : 400,
                      borderLeft: isActive ? '4px solid #f59e42' : '4px solid transparent',
                      background: isActive ? 'rgba(255,255,255,0.10)' : 'transparent',
                      borderRadius: 8,
                      fontSize: 16,
                      transition: 'all 0.2s',
                    })}
                    onClick={onClose}
                  >
                    <span style={{ fontSize: 22, minWidth: 28, textAlign: 'center', color: 'white' }}>{item.icon}</span>
                    <span style={{ color: 'white' }}>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Footer con botón de ayuda */}
        <div style={{ padding: 20, textAlign: 'center' }}>
          <button
            className="ayuda-btn"
            style={{
              background: 'linear-gradient(90deg, #6c63ff 60%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 0',
              borderRadius: 22,
              cursor: 'pointer',
              width: '90%',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 0.5,
              boxShadow: '0px 2px 8px rgba(44,62,80,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.3s',
              margin: '0 auto',
            }}
            onClick={() => setHelpOpen(true)}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #5548c8 60%, #2563eb 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #6c63ff 60%, #2563eb 100%)'}
          >
            <span style={{ fontSize: 20, marginRight: 4 }}>❓</span> Ayuda
          </button>
        </div>
      </aside>
      {/* Modal de bienvenida para usuarios nuevos */}
      {showWelcome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,42,56,0.85)',
          zIndex: 4000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            color: '#222',
            borderRadius: 18,
            maxWidth: 600,
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(44,62,80,0.18)',
            padding: 36,
            position: 'relative',
          }}>
            <button
              onClick={() => handleCloseWelcome(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: 28,
                color: '#888',
                cursor: 'pointer',
              }}
              aria-label="Cerrar bienvenida"
            >✕</button>
            <h2 style={{ fontSize: 28, color: '#2563eb', fontWeight: 800, marginBottom: 10 }}>🎉 ¡Bienvenido{user?.nombre_usuario ? `, ${user.nombre_usuario}` : ''} a Botica AMY!</h2>
            <p style={{ fontSize: 18, color: '#444', marginBottom: 18 }}>Gestiona tu farmacia de forma profesional, sencilla y segura.</p>
            {/* Video eliminado */}
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700, marginBottom: 8 }}>🚀 Primeros pasos</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, minWidth: 120, flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>💊</div>
                  <div style={{ fontWeight: 600 }}>Agrega tus productos</div>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, minWidth: 120, flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>👥</div>
                  <div style={{ fontWeight: 600 }}>Registra tus clientes</div>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, minWidth: 120, flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>💰</div>
                  <div style={{ fontWeight: 600 }}>Realiza tu primera venta</div>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, minWidth: 120, flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>📊</div>
                  <div style={{ fontWeight: 600 }}>Consulta reportes</div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700, marginBottom: 8 }}>💡 Consejos útiles</h3>
              <ul style={{ paddingLeft: 20, color: '#333', fontSize: 16 }}>
                <li>Usa el menú lateral para navegar entre secciones.</li>
                <li>Puedes exportar reportes a PDF para guardarlos o compartirlos.</li>
                <li>Los productos con stock bajo aparecen destacados en rojo en el dashboard.</li>
                <li>Siempre verifica la información antes de confirmar una venta.</li>
                <li>¿Dudas? Usa el botón de ayuda en cualquier momento.</li>
              </ul>
            </div>
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700, marginBottom: 8 }}>🆘 ¿Necesitas ayuda?</h3>
              <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, color: '#222', fontSize: 16 }}>
                <p><b>📧 Email:</b> soporte@boticaamy.com</p>
                <p><b>📞 Teléfono:</b> +123 456 7890</p>
                <p><b>🕒 Horario:</b> Lunes a Viernes 8:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
              <button
                onClick={() => handleCloseWelcome(true)}
                style={{
                  background: '#e5e7eb',
                  color: '#222',
                  border: 'none',
                  borderRadius: 25,
                  padding: '12px 28px',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                No mostrar más
              </button>
              <button
                onClick={() => handleCloseWelcome(false)}
                style={{
                  background: '#6c63ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 25,
                  padding: '12px 36px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#4b3cc4'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#6c63ff'}
              >
                ¡Entendido! Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de ayuda overlay */}
      {helpOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,42,56,0.85)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setHelpOpen(false)}>
          <div style={{
            background: 'white',
            color: '#222',
            borderRadius: 18,
            maxWidth: 700,
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(44,62,80,0.18)',
            padding: 36,
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setHelpOpen(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: 28,
                color: '#888',
                cursor: 'pointer',
              }}
              aria-label="Cerrar ayuda"
            >✕</button>
            <h2 style={{ fontSize: 28, color: '#6c63ff', fontWeight: 800, marginBottom: 18 }}>❓ Ayuda del Sistema</h2>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700 }}>Funciones Principales</h3>
              <ul style={{ paddingLeft: 20, color: '#333', fontSize: 17 }}>
                <li><b>Dashboard:</b> Estadísticas en tiempo real, alertas y widgets de acceso rápido.</li>
                <li><b>Gestión de Productos:</b> Inventario, categorías, stock y notificaciones automáticas.</li>
                <li><b>Base de Datos de Clientes:</b> Registro, seguimiento y reportes de clientes.</li>
                <li><b>Proceso de Ventas:</b> Flujo guiado, cálculo automático y actualización de stock.</li>
                <li><b>Servicios Farmacéuticos:</b> Gestión de servicios, precios y descripción.</li>
                <li><b>Reportes y Análisis:</b> Reportes PDF, análisis de ventas y productos más vendidos.</li>
                <li><b>Administración del Sistema:</b> Gestión de usuarios, roles y parámetros críticos.</li>
              </ul>
            </div>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700 }}>Consejos Útiles</h3>
              <ul style={{ paddingLeft: 20, color: '#333', fontSize: 17 }}>
                <li>💡 Usa Ctrl+F para buscar rápidamente productos o clientes en las listas.</li>
                <li>💡 Los productos con stock bajo aparecen destacados en rojo en el dashboard.</li>
                <li>💡 Puedes exportar reportes a PDF para guardarlos o compartirlos.</li>
                <li>💡 Mantén actualizado el stock para evitar problemas durante las ventas.</li>
                <li>💡 Usa las categorías para organizar mejor tu inventario farmacéutico.</li>
                <li>💡 El sistema calcula automáticamente los totales en las ventas.</li>
                <li>💡 Puedes ver el historial completo de ventas por cliente.</li>
                <li>💡 Los reportes te ayudan a identificar productos más vendidos.</li>
                <li>💡 Siempre verifica la información antes de confirmar una venta.</li>
                <li>💡 Usa el botón de ayuda en cualquier momento si tienes dudas.</li>
              </ul>
            </div>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700 }}>Guía de Inicio Rápido</h3>
              <ol style={{ paddingLeft: 20, color: '#333', fontSize: 17 }}>
                <li>Configura tu inventario en "Productos".</li>
                <li>Registra tus clientes en "Clientes".</li>
                <li>Realiza tu primera venta en "Ventas".</li>
                <li>Revisa los reportes en "Reportes".</li>
              </ol>
            </div>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: '#2563eb', fontWeight: 700 }}>¿Necesitas más ayuda?</h3>
              <p>Contacta al administrador del sistema:</p>
              <div style={{ background: '#f8fafc', borderRadius: 10, padding: 16, color: '#222', fontSize: 16 }}>
                <p><b>📧 Email:</b> soporte@boticaamy.com</p>
                <p><b>📞 Teléfono:</b> +123 456 7890</p>
                <p><b>🕒 Horario:</b> Lunes a Viernes 8:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                onClick={() => setHelpOpen(false)}
                style={{
                  background: '#6c63ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 25,
                  padding: '12px 36px',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#4b3cc4'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#6c63ff'}
              >
                ¡Entendido! Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 