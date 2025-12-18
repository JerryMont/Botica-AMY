import { useState } from 'react';
import VentaList from '../components/Ventas/VentaList';
import VentaForm from '../components/Ventas/VentaForm';
import VentaDetalle from '../components/Ventas/VentaDetalle';
import { getVenta } from '../api/ventas';
import { getThemeColors } from '../hooks/useDarkMode';
import './Ventas.css';

export default function Ventas() {
  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState(null);
  const [ventaDetalle, setVentaDetalle] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const colors = getThemeColors();

  const handleNuevaVenta = () => {
    setShowForm(true);
    setDetalle(null);
  };

  const handleDetalle = async (venta) => {
    const res = await getVenta(venta.id_venta);
    setVentaDetalle(res.data.data);
    setDetalle(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setDetalle(null);
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
          background: 'linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(25, 85%, 60%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Gestión de Ventas</h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Registra y administra las ventas de la farmacia
        </p>
      </div>

      <button
        onClick={handleNuevaVenta}
        style={{
          padding: '14px 28px',
          background: 'linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(25, 85%, 60%) 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: '600',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(243, 156, 18, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(243, 156, 18, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(243, 156, 18, 0.3)';
        }}
      >
        <span>💰</span>
        <span>Registrar Venta</span>
      </button>

      {showForm && (
        <div style={{
          backgroundColor: colors.cardBg,
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: `0 2px 4px ${colors.shadowColor}`
        }}>
          <VentaForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <VentaList key={refresh} onViewDetail={handleDetalle} onNuevaVenta={handleNuevaVenta} />

      {detalle && ventaDetalle && (
        <VentaDetalle venta={ventaDetalle} onClose={() => setDetalle(null)} />
      )}
    </div>
  );
} 