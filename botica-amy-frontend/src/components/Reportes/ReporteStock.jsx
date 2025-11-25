import { useState, useEffect, useCallback } from 'react';
import { getProductosStockBajo } from '../../api/reportes';

export default function ReporteStock() {
  const [umbral, setUmbral] = useState(10);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

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
        backgroundColor: 'white',
        borderRadius: 12,
        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        padding: 24,
        marginBottom: 24
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Reporte de Stock</h2>
        <p style={{ color: '#7f8c8d' }}>Configura el umbral de alerta para identificar productos con stock bajo.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', color: '#2c3e50', marginBottom: 6 }}>Umbral de stock</label>
            <input type="number" min={1} value={umbral} onChange={e => setUmbral(Number(e.target.value))} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6 }} />
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
          <p style={{ color: '#7f8c8d' }}>Cargando...</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: 12, boxShadow: '0 6px 16px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>Productos con stock ≤ {umbral}</h3>
            <span style={{ color: '#7f8c8d', fontSize: 13 }}>Total: {productos.length}</span>
          </div>
          {productos.length === 0 ? (
            <div style={{ padding: 24 }}>
              <p style={{ color: '#7f8c8d' }}>No hay productos con stock bajo</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7f9fc', color: '#2c3e50' }}>
                    <th style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #eee' }}>Producto</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: '1px solid #eee' }}>Stock</th>
                    <th style={{ textAlign: 'right', padding: 12, borderBottom: '1px solid #eee' }}>Precio</th>
                    <th style={{ textAlign: 'center', padding: 12, borderBottom: '1px solid #eee' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => {
                    const estado = p.stock === 0 ? 'Sin stock' : p.stock <= 5 ? 'Crítico' : 'Bajo';
                    const color = p.stock === 0 ? '#e74c3c' : p.stock <= 5 ? '#e67e22' : '#f39c12';
                    return (
                      <tr key={p.id_producto}>
                        <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0' }}>{p.nombre_producto}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0', textAlign: 'right', fontWeight: 600 }}>{p.stock}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{formatCurrency(p.precio)}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
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