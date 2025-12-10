import { useNavigate } from 'react-router-dom';
import { getThemeColors } from '../../hooks/useDarkMode';

export default function ReporteList() {
  const navigate = useNavigate();
  const colors = getThemeColors();
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #3498db 60%)',
        color: 'white',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 10px 20px rgba(79,70,229,0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>📊</div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Reporte de Ventas</h3>
        <p style={{ opacity: 0.9, marginTop: 8, marginBottom: 20, fontSize: 15 }}>
          Consulta y exporta el historial de ventas por fechas.
        </p>
        <button
          style={{
            padding: '12px 22px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '28px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: 0.3,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => navigate('/reportes/ventas')}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          Ver Reporte de Ventas
        </button>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #e67e22 60%)',
        color: 'white',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 10px 20px rgba(229,125,34,0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>📦</div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Reporte de Stock</h3>
        <p style={{ opacity: 0.9, marginTop: 8, marginBottom: 20, fontSize: 15 }}>
          Visualiza productos con stock bajo y exporta el reporte.
        </p>
        <button
          style={{
            padding: '12px 22px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '28px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: 0.3,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => navigate('/reportes/stock')}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          Ver Reporte de Stock
        </button>
      </div>
      <div style={{
        backgroundColor: colors.cardBg,
        borderRadius: '8px',
        padding: '25px',
        boxShadow: `0 2px 4px ${colors.shadowColor}`,
        border: `1px solid ${colors.borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h3 style={{ color: colors.textPrimary }}>Dashboard de Indicadores</h3>
        <p style={{ color: colors.textSecondary, marginBottom: 20 }}>Accede a estadísticas generales y gráficas del sistema.</p>
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