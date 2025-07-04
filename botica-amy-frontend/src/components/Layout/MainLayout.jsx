import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MainLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main style={{
          flex: 1,
          padding: '20px',
          backgroundColor: 'var(--bg-primary)',
          minHeight: 'calc(100vh - 70px)',
          transition: 'margin-left 0.3s ease'
        }}>
          <div className="fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 