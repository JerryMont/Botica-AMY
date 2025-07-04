import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ClienteList from '../components/Clientes/ClienteList';
import ClienteForm from '../components/Clientes/ClienteForm';

export default function Clientes() {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (cliente) => {
    setEditing(cliente);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditing(null);
    setRefresh(!refresh);
  };

  return (
    <MainLayout>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Gestión de Clientes</h1>
      
      <button 
        onClick={handleNew}
        style={{
          padding: '12px 20px',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px'
        }}
      >
        ➕ Nuevo Cliente
      </button>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <ClienteForm
            cliente={editing}
            onSuccess={handleSuccess}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      <ClienteList key={refresh} onEdit={handleEdit} />
    </MainLayout>
  );
} 