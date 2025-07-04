import MainLayout from '../components/Layout/MainLayout';
import ReporteVentas from '../components/Reportes/ReporteVentas';
import ReporteStock from '../components/Reportes/ReporteStock';

export default function Reportes() {
  return (
    <MainLayout>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Reportes y Estadísticas</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px' 
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '25px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <ReporteVentas />
        </div>
        
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '25px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <ReporteStock />
        </div>
      </div>
    </MainLayout>
  );
} 