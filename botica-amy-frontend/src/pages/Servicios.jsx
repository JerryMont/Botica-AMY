import ServicioList from '../components/Servicios/ServicioList';
import ServicioForm from '../components/Servicios/ServicioForm';
import { useState } from 'react';

export default function Servicios() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (servicio) => {
    setEditing(servicio);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setEditing(null);
    setShowForm(false);
    setRefresh(!refresh);
  };

  return (
    <>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Servicios Farmacéuticos</h1>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: '12px 20px',
          backgroundColor: '#f39c12',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px'
        }}
      >
        🔧 Nuevo Servicio
      </button>
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <ServicioForm servicio={editing} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}
      <ServicioList key={refresh} onEdit={handleEdit} />
    </>
  );
} 