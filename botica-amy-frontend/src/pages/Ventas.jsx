import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import VentaList from '../components/Ventas/VentaList';
import VentaForm from '../components/Ventas/VentaForm';
import VentaDetalle from '../components/Ventas/VentaDetalle';
import { getVenta } from '../api/ventas';

export default function Ventas() {
  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState(null);
  const [ventaDetalle, setVentaDetalle] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
    <MainLayout>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Gestión de Ventas</h1>
      
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
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <VentaForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <VentaList 
        onViewDetail={handleDetalle} 
        onNuevaVenta={handleNuevaVenta} 
      />
      
      {detalle && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <VentaDetalle venta={ventaDetalle} onClose={() => setDetalle(null)} />
        </div>
      )}
    </MainLayout>
  );
} 