import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardWidget from '../components/Dashboard/DashboardWidget';
import api from '../api/axios';
import { getThemeColors, useDarkMode } from '../hooks/useDarkMode';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalClientes: 0,
    totalVentas: 0,
    stockBajo: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isDark = useDarkMode();
  const colors = getThemeColors();

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
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      label: '📊 Ver Reportes',
      path: '/reportes',
      gradient: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
      shadow: 'rgba(93, 173, 226, 0.4)'
    },
    {
      label: '💰 Nueva Venta',
      path: '/ventas',
      gradient: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(160, 65%, 50%) 100%)',
      shadow: 'rgba(46, 204, 113, 0.4)'
    },
    {
      label: '👥 Nuevo Cliente',
      path: '/clientes',
      gradient: 'linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(25, 85%, 60%) 100%)',
      shadow: 'rgba(243, 156, 18, 0.4)'
    },
    {
      label: '💊 Nuevo Producto',
      path: '/productos',
      gradient: 'linear-gradient(135deg, hsl(280, 70%, 60%) 0%, hsl(320, 75%, 65%) 100%)',
      shadow: 'rgba(155, 89, 182, 0.4)'
    }
  ];

  return (
    <div className="fade-in" style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          marginBottom: '8px',
          color: colors.textHeading,
          fontWeight: '800',
          fontSize: '36px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Dashboard
        </h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Bienvenido al panel de control de Botica AMY
        </p>
      </div>

      {/* Widgets de estadísticas */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: '140px', borderRadius: '16px' }} />
          ))}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <DashboardWidget
            title="Total Productos"
            value={stats.totalProductos}
            icon="💊"
            color="hsl(220, 75%, 60%)"
          />
          <DashboardWidget
            title="Total Clientes"
            value={stats.totalClientes}
            icon="👥"
            color="hsl(142, 71%, 45%)"
          />
          <DashboardWidget
            title="Total Ventas"
            value={stats.totalVentas}
            icon="💰"
            color="hsl(38, 92%, 50%)"
          />
          <DashboardWidget
            title="Stock Bajo"
            value={stats.stockBajo}
            icon="⚠️"
            color="hsl(4, 90%, 58%)"
          />
        </div>
      )}

      {/* Sección de acciones rápidas */}
      <div style={{
        backgroundColor: colors.cardBg,
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${colors.borderColor}`,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            margin: '0 0 8px 0',
            color: colors.textHeading,
            fontSize: '24px',
            fontWeight: '700',
            letterSpacing: '-0.01em'
          }}>
            Acciones Rápidas
          </h2>
          <p style={{
            color: colors.textSecondary,
            fontSize: '14px',
            margin: 0
          }}>
            Accede rápidamente a las funciones más utilizadas
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              style={{
                padding: '18px 24px',
                background: action.gradient,
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 4px 12px ${action.shadow}`,
                letterSpacing: '0.01em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = `0 8px 20px ${action.shadow}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 4px 12px ${action.shadow}`;
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mensaje informativo */}
      <div style={{
        marginTop: '32px',
        padding: '20px 24px',
        background: isDark
          ? 'linear-gradient(135deg, rgba(93, 173, 226, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(93, 173, 226, 0.08) 0%, rgba(155, 89, 182, 0.08) 100%)',
        borderRadius: '16px',
        border: `1px solid ${isDark ? 'rgba(93, 173, 226, 0.2)' : 'rgba(93, 173, 226, 0.15)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{ fontSize: '32px' }}>💡</span>
        <div>
          <h3 style={{
            margin: '0 0 4px 0',
            color: colors.textHeading,
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Consejo del día
          </h3>
          <p style={{
            margin: 0,
            color: colors.textSecondary,
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Revisa regularmente los productos con stock bajo para mantener un inventario óptimo y evitar desabastecimientos.
          </p>
        </div>
      </div>
    </div>
  );
}