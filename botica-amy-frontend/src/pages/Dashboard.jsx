import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardWidget from '../components/Dashboard/DashboardWidget';
import api from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalClientes: 0,
    totalVentas: 0,
    stockBajo: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productos, clientes, ventas, stockBajo] = await Promise.all([
          api.get('/productos'),
          api.get('/clientes'),
          api.get('/ventas'),
          api.get('/productos/stock-bajo?umbral=10')
        ]);

        setStats({
          totalProductos: productos.data.data.length,
          totalClientes: clientes.data.data.length,
          totalVentas: ventas.data.data.length,
          stockBajo: stockBajo.data.data.length
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Dashboard</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <DashboardWidget 
          title="Total Productos" 
          value={stats.totalProductos} 
          icon="💊" 
          color="#3498db"
        />
        <DashboardWidget 
          title="Total Clientes" 
          value={stats.totalClientes} 
          icon="👥" 
          color="#2ecc71"
        />
        <DashboardWidget 
          title="Total Ventas" 
          value={stats.totalVentas} 
          icon="💰" 
          color="#f39c12"
        />
        <DashboardWidget 
          title="Stock Bajo" 
          value={stats.stockBajo} 
          icon="⚠️" 
          color="#e74c3c"
        />
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '20px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Acciones Rápidas</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '12px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }} onClick={() => navigate('/reportes')}>
            📊 Ver Reportes
          </button>
          <button style={{
            padding: '12px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }} onClick={() => navigate('/ventas')}>
            💰 Nueva Venta
          </button>
          <button style={{
            padding: '12px 20px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }} onClick={() => navigate('/clientes')}>
            👥 Nuevo Cliente
          </button>
        </div>
      </div>
    </>
  );
}