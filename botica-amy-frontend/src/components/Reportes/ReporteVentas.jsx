import { useState } from 'react';
import { getReporteVentas } from '../../api/reportes';
import { getThemeColors } from '../../hooks/useDarkMode';

export default function ReporteVentas() {
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);
  const colors = getThemeColors();

  const formatCurrency = (n) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(n || 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getReporteVentas(fecha_inicio, fecha_fin);
      setReporte(res.data.data);
    } catch (error) {
      window.showToast && window.showToast('Error al obtener el reporte', 'error');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{
        backgroundColor: colors.cardBg,
        borderRadius: 12,
        boxShadow: `0 6px 16px ${colors.shadowColor}`,
        padding: 24,
        marginBottom: 24,
        border: `1px solid ${colors.borderColor}`,
        color: colors.textPrimary
      }}>
        <h2 style={{ margin: 0, color: colors.textPrimary }}>Reporte de Ventas</h2>
        <p style={{ color: colors.textSecondary }}>Genera un reporte por rango de fechas.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', color: colors.textPrimary, marginBottom: 6 }}>Fecha inicio</label>
            <input type="date" value={fecha_inicio} onChange={e => setFechaInicio(e.target.value)} required style={{ width: '100%', padding: 10, border: `1px solid ${colors.borderColor}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }} />
          </div>
          <div>
            <label style={{ display: 'block', color: colors.textPrimary, marginBottom: 6 }}>Fecha fin</label>
            <input type="date" value={fecha_fin} onChange={e => setFechaFin(e.target.value)} required style={{ width: '100%', padding: 10, border: `1px solid ${colors.borderColor}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }} />
          </div>
          <button type="submit" disabled={loading} style={{
            padding: '12px 18px',
            backgroundColor: loading ? '#95a5a6' : '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Cargando...' : 'Generar Reporte'}
          </button>
        </form>
      </div>

      {reporte && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div style={{ backgroundColor: '#3498db', color: 'white', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Total de ventas</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{reporte.total_ventas}</div>
            </div>
            <div style={{ backgroundColor: '#2ecc71', color: 'white', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Productos vendidos</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{reporte.total_productos_vendidos}</div>
            </div>
            <div style={{ backgroundColor: '#f39c12', color: 'white', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Monto total</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{formatCurrency(reporte.monto_total)}</div>
            </div>
            <div style={{ backgroundColor: '#8e44ad', color: 'white', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Promedio por venta</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{formatCurrency(reporte.promedio_por_venta)}</div>
            </div>
          </div>

          <div style={{ backgroundColor: colors.cardBg, borderRadius: 12, boxShadow: `0 6px 16px ${colors.shadowColor}`, overflow: 'hidden' }}>
            <div style={{ padding: 16, borderBottom: `1px solid ${colors.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, color: colors.textPrimary }}>Detalle por Producto</h3>
              <span style={{ color: colors.textSecondary, fontSize: 13 }}>Período: {reporte.fecha_inicio} — {reporte.fecha_fin}</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: colors.bgSecondary, color: colors.textPrimary }}>
                    <th style={{ textAlign: 'left', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Producto</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Cantidad vendida</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Monto total</th>
                  </tr>
                </thead>
                <tbody>
                  {reporte.detalle_por_producto?.map((d) => (
                    <tr key={d.id_producto} style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
                      <td style={{ padding: 12, color: colors.textPrimary }}>{d.nombre_producto}</td>
                      <td style={{ padding: 12, textAlign: 'right', fontWeight: 600, color: colors.textPrimary }}>{d.total_cantidad}</td>
                      <td style={{ padding: 12, textAlign: 'right', fontWeight: 600, color: colors.textPrimary }}>{formatCurrency(d.total_monto)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}