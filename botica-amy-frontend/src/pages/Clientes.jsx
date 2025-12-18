import { useState } from 'react';
import ClienteList from '../components/Clientes/ClienteList';
import ClienteForm from '../components/Clientes/ClienteForm';
import { getThemeColors } from '../hooks/useDarkMode';
import './Clientes.css';

export default function Clientes() {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const colors = getThemeColors();

  const handleEdit = (cliente) => {
    setEditing(cliente);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setEditing(null);
    setShowForm(false);
    setRefresh(!refresh);
  };

  return (
    <div className="fade-in" style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          marginBottom: '8px',
          color: colors.textHeading,
          fontWeight: '800',
          fontSize: '36px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(160, 65%, 50%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Base de Datos de Clientes</h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Gestiona la información de tus clientes
        </p>
      </div>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(160, 65%, 50%) 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(46, 204, 113, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(46, 204, 113, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(46, 204, 113, 0.3)';
        }}
      >
        <span>👥</span>
        <span>Nuevo Cliente</span>
      </button>
      {showForm && (
        <div style={{
          backgroundColor: colors.cardBg,
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: `0 2px 4px ${colors.shadowColor}`
        }}>
          <ClienteForm cliente={editing} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}
      <ClienteList key={refresh} onEdit={handleEdit} />
    </div>
  );
} 