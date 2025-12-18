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
    <div className="fade-in" style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          marginBottom: '8px',
          color: colors.textHeading,
          fontWeight: '800',
          fontSize: '36px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(220, 75%, 60%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Servicios Farmacéuticos</h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Administra los servicios que ofrece tu farmacia
        </p>
      </div>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(220, 75%, 60%) 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(52, 152, 219, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.3)';
        }}
      >
        <span>🩺</span>
        <span>Nuevo Servicio</span>
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
    </div>
  );
} 