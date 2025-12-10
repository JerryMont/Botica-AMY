import { useState } from 'react';
import VentaList from '../components/Ventas/VentaList';
import VentaForm from '../components/Ventas/VentaForm';
import VentaDetalle from '../components/Ventas/VentaDetalle';
import { getVenta } from '../api/ventas';
import { getThemeColors } from '../hooks/useDarkMode';

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
    <>
      <h1 style={{ marginBottom: '30px', color: colors.textPrimary }}>Gestión de Ventas</h1>
      
      <button 
        onClick={handleNuevaVenta}
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
        💰 Registrar Venta
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
    </>
  );
} 