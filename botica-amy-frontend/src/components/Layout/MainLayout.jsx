import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SidebarDrawer from './SidebarDrawer';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MainLayout({ children }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isAdmin = user && user.rol === 'admin';

  return (
    <div className={`layout-container${drawerOpen && isAdmin ? ' sidebar-open' : ''}`}>
      {/* Botón azul de menú hamburguesa solo para admin */}
      {isAdmin && (
        <>
          <button
            className="drawer-toggle"
            style={{
              position: 'fixed',
              top: 64,
              left: 8,
              zIndex: 2001,
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
            }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            {/* Icono de menú hamburguesa */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
          <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
      )}
      <Navbar />
      <main className="main-content" style={{ padding: '20px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}