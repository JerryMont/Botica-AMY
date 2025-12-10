import { useState, useEffect, useCallback } from 'react';
import { getProductosStockBajo } from '../../api/reportes';
import { getThemeColors } from '../../hooks/useDarkMode';

export default function ReporteStock() {
  const [umbral, setUmbral] = useState(10);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = getThemeColors();

  const formatCurrency = (n) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(n || 0));

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProductosStockBajo(umbral);
      setProductos(res.data.data);
    } catch (error) {
      window.showToast && window.showToast('Error al obtener productos', 'error');
      console.error(error);
    }
    setLoading(false);
  }, [umbral]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return (
    <div>
      <div style={{
        backgroundColor: colors.cardBg,
        borderRadius: 12,
        boxShadow: `0 6px 16px ${colors.shadowColor}`,
        padding: 24,
        marginBottom: 24
      }}>
        <h2 style={{ margin: 0, color: colors.textPrimary }}>Reporte de Stock</h2>
        <p style={{ color: colors.textSecondary }}>Configura el umbral de alerta para identificar productos con stock bajo.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', color: colors.textPrimary, marginBottom: 6 }}>Umbral de stock</label>
            <input type="number" min={1} value={umbral} onChange={e => setUmbral(Number(e.target.value))} style={{ width: '100%', padding: 10, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }} />
          </div>
          <button onClick={fetchProductos} disabled={loading} style={{
            padding: '12px 18px',
            backgroundColor: loading ? '#95a5a6' : '#e67e22',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ color: colors.textSecondary }}>Cargando...</p>
        </div>
      ) : (
        <div style={{ backgroundColor: colors.cardBg, borderRadius: 12, boxShadow: `0 6px 16px ${colors.shadowColor}`, overflow: 'hidden' }}>
          <div style={{ padding: 16, borderBottom: `1px solid ${colors.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, color: colors.textPrimary }}>Productos con stock ≤ {umbral}</h3>
            <span style={{ color: colors.textSecondary, fontSize: 13 }}>Total: {productos.length}</span>
          </div>
          {productos.length === 0 ? (
            <div style={{ padding: 24 }}>
              <p style={{ color: colors.textSecondary }}>No hay productos con stock bajo</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: colors.bgSecondary, color: colors.textPrimary }}>
                    <th style={{ textAlign: 'left', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Producto</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Stock</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Precio</th>
                    <th style={{ textAlign: 'center', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => {
                    const estado = p.stock === 0 ? 'Sin stock' : p.stock <= 5 ? 'Crítico' : 'Bajo';
                    const color = p.stock === 0 ? '#e74c3c' : p.stock <= 5 ? '#e67e22' : '#f39c12';
                    return (
                      <tr key={p.id_producto} style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
                        <td style={{ padding: 12, color: colors.textPrimary }}>{p.nombre_producto}</td>
                        <td style={{ padding: 12, textAlign: 'right', fontWeight: 600, color: colors.textPrimary }}>{p.stock}</td>
                        <td style={{ padding: 12, textAlign: 'right', color: colors.textPrimary }}>{formatCurrency(p.precio)}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>
                          <span style={{ backgroundColor: color, color: 'white', borderRadius: 16, padding: '6px 12px', fontSize: 12, fontWeight: 700 }}>{estado}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}