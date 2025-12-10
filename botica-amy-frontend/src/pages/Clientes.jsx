import { useState } from 'react';
import ClienteList from '../components/Clientes/ClienteList';
import ClienteForm from '../components/Clientes/ClienteForm';
import { getThemeColors } from '../hooks/useDarkMode';

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
    <>
      <h1 style={{ marginBottom: '30px', color: colors.textPrimary }}>Base de Datos de Clientes</h1>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: '12px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px'
        }}
      >
        👥 Nuevo Cliente
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
    </>
  );
} 