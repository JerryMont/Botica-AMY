import { useState } from 'react';
import { getReporteVentas } from '../../api/reportes';

export default function ReporteVentas() {
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getReporteVentas(fecha_inicio, fecha_fin);
      setReporte(res.data.data);
    } catch (error) {
      console.error('Error al obtener reporte:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>Reporte de Ventas</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={fecha_inicio}
          onChange={e => setFechaInicio(e.target.value)}
          required
        />
        <input
          type="date"
          value={fecha_fin}
          onChange={e => setFechaFin(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Generar Reporte'}
        </button>
      </form>

      {reporte && (
        <div>
          <h4>Resumen</h4>
          <p>Total de ventas: {reporte.total_ventas}</p>
          <p>Total de productos vendidos: {reporte.total_productos_vendidos}</p>
          <p>Monto total: S/ {reporte.monto_total}</p>

          <h4>Detalle por Producto</h4>
          <ul>
            {reporte.detalle_por_producto?.map(d => (
              <li key={d.id_producto}>
                {d.producto?.nombre_producto} - Cantidad: {d.cantidad_vendida} - Total: S/ {d.total_vendido}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 