import { useState } from 'react';
import { getReporteVentas } from '../../api/reportes';

export default function ReporteVentas() {
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);

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
        backgroundColor: 'white',
        borderRadius: 12,
        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        padding: 24,
        marginBottom: 24
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Reporte de Ventas</h2>
        <p style={{ color: '#7f8c8d' }}>Genera un reporte por rango de fechas.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', color: '#2c3e50', marginBottom: 6 }}>Fecha inicio</label>
            <input type="date" value={fecha_inicio} onChange={e => setFechaInicio(e.target.value)} required style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#2c3e50', marginBottom: 6 }}>Fecha fin</label>
            <input type="date" value={fecha_fin} onChange={e => setFechaFin(e.target.value)} required style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
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

          <div style={{ backgroundColor: 'white', borderRadius: 12, boxShadow: '0 6px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <div style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Detalle por Producto</h3>
              <span style={{ color: '#7f8c8d', fontSize: 13 }}>Período: {reporte.fecha_inicio} — {reporte.fecha_fin}</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7f9fc', color: '#2c3e50' }}>
                    <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #eee' }}>Producto</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: '1px solid #eee' }}>Cantidad vendida</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: '1px solid #eee' }}>Monto total</th>
                  </tr>
                </thead>
                <tbody>
                  {reporte.detalle_por_producto?.map((d) => (
                    <tr key={d.id_producto}>
                      <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0' }}>{d.nombre_producto}</td>
                      <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontWeight: 600 }}>{d.total_cantidad}</td>
                      <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(d.total_monto)}</td>
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