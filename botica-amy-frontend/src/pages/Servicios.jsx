import ServicioForm from '../components/Servicios/ServicioForm';
import { useState } from 'react';
import { getServicios, deleteServicio } from '../api/servicios';
import { useEffect } from 'react';
import { getThemeColors } from '../hooks/useDarkMode';
import './Servicios.css';

export default function Servicios() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const colors = getThemeColors();

  useEffect(() => {
    setLoading(true);
    getServicios()
      .then(res => setServicios(res.data.data))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleEdit = (servicio) => {
    setEditing(servicio);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar servicio?')) {
      await deleteServicio(id);
      setRefresh(r => !r);
    }
  };

  const handleSuccess = () => {
    setEditing(null);
    setShowForm(false);
    setRefresh(r => !r);
  };

  return (
    <>
      <h1 style={{ marginBottom: 24, color: colors.textPrimary, fontWeight: 800, fontSize: 36, letterSpacing: '-1px' }}>
        <span style={{ verticalAlign: 'middle', marginRight: 10 }}>🩺</span>Servicios Farmacéuticos
      </h1>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: '12px 28px',
          background: '#f59e42',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 18,
          boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
          marginBottom: 32,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <span style={{ marginRight: 8 }}>🛠️</span>Nuevo Servicio
      </button>
      {showForm && (
        <div style={{
          backgroundColor: colors.cardBg,
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          boxShadow: `0 2px 8px ${colors.shadowColor}`,
          maxWidth: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <ServicioForm servicio={editing} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}
      <h2 style={{ color: colors.textPrimary, fontWeight: 700, marginBottom: 18, fontSize: 26 }}>Servicios</h2>
      {loading ? (
        <div style={{ textAlign: 'center', color: colors.textSecondary, fontSize: 18 }}>Cargando servicios...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {servicios.map(servicio => (
            <div key={servicio.id} style={{
              background: colors.cardBg,
              borderRadius: 12,
              boxShadow: `0 2px 8px ${colors.shadowColor}`,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              minHeight: 120,
              position: 'relative',
            }}>
              <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 20, marginBottom: 4 }}>{servicio.titulo}</div>
              <div style={{ color: colors.textSecondary, fontSize: 16, flex: 1 }}>{servicio.descripcion}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  style={{
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 18px',
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => handleEdit(servicio)}
                >
                  Editar
                </button>
                <button
                  style={{
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 18px',
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => handleDelete(servicio.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
} 