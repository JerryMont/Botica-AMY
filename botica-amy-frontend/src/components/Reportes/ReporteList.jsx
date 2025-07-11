import { useNavigate } from 'react-router-dom';

export default function ReporteList() {
  const navigate = useNavigate();
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h3 style={{ color: '#2c3e50' }}>Reporte de Ventas</h3>
        <p style={{ color: '#7f8c8d', marginBottom: 20 }}>Consulta y exporta el historial de ventas por fechas.</p>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => navigate('/reportes/ventas')}
        >
          📊 Ver Reporte de Ventas
        </button>
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h3 style={{ color: '#2c3e50' }}>Reporte de Stock</h3>
        <p style={{ color: '#7f8c8d', marginBottom: 20 }}>Visualiza productos con stock bajo y exporta el reporte.</p>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#e67e22',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => navigate('/reportes/stock')}
        >
          📦 Ver Reporte de Stock
        </button>
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '25px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h3 style={{ color: '#2c3e50' }}>Dashboard de Indicadores</h3>
        <p style={{ color: '#7f8c8d', marginBottom: 20 }}>Accede a estadísticas generales y gráficas del sistema.</p>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => navigate('/dashboard')}
        >
          📈 Ir al Dashboard
        </button>
      </div>
    </div>
  );
} 