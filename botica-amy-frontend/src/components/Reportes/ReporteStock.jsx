import { useState, useEffect } from 'react';
import { getProductosStockBajo } from '../../api/reportes';

export default function ReporteStock() {
  const [umbral, setUmbral] = useState(10);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await getProductosStockBajo(umbral);
      setProductos(res.data.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, [umbral]);

  return (
    <div>
      <h3>Productos con Stock Bajo</h3>
      <div>
        <label>Umbral de stock: </label>
        <input
          type="number"
          min={1}
          value={umbral}
          onChange={e => setUmbral(Number(e.target.value))}
        />
        <button onClick={fetchProductos} disabled={loading}>
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h4>Productos con stock ≤ {umbral}</h4>
          {productos.length === 0 ? (
            <p>No hay productos con stock bajo</p>
          ) : (
            <ul>
              {productos.map(p => (
                <li key={p.id_producto} style={{ color: p.stock === 0 ? 'red' : 'orange' }}>
                  {p.nombre_producto} - Stock: {p.stock} - Precio: S/ {p.precio}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 