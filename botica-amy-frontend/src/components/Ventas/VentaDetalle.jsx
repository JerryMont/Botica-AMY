export default function VentaDetalle({ venta, onClose }) {
  if (!venta) return null;
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: 16 }}>
      <h3>Detalle de Venta #{venta.id_venta}</h3>
      <p>Fecha: {venta.fecha}</p>
      <p>Cliente: {venta.cliente?.nombre}</p>
      <p>Usuario: {venta.usuario?.nombre_usuario}</p>
      <p>Total: S/ {venta.total}</p>
      <h4>Productos:</h4>
      <ul>
        {venta.detalles?.map(d => (
          <li key={d.id_detalle}>
            {d.producto?.nombre_producto} - Cantidad: {d.cantidad} - Precio: S/ {d.precio_unitario}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
} 