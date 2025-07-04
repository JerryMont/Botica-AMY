import { useEffect, useState } from 'react';
import { getClientes } from '../../api/clientes';
import api from '../../api/axios';
import { createVenta } from '../../api/ventas';

export default function VentaForm({ onSuccess, onCancel }) {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ cliente_id: '', detalles: [] });
  const [usuario_id, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClientes().then(res => setClientes(res.data.data));
    api.get('/productos').then(res => setProductos(res.data.data));
    // Obtener usuario_id del token (opcional, depende de backend)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUsuarioId(user.id_usuario);
  }, []);

  const handleCliente = e => setForm({ ...form, cliente_id: e.target.value });

  const handleProducto = (idx, field, value) => {
    const detalles = [...form.detalles];
    detalles[idx][field] = value;
    setForm({ ...form, detalles });
  };

  const addDetalle = () => {
    setForm({ ...form, detalles: [...form.detalles, { id_producto: '', cantidad: 1, precio_unitario: 0 }] });
  };

  const removeDetalle = idx => {
    const detalles = form.detalles.filter((_, i) => i !== idx);
    setForm({ ...form, detalles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const total = form.detalles.reduce((sum, d) => sum + d.cantidad * d.precio_unitario, 0);
      const ventaData = {
        ...form,
        usuario_id: usuario_id || 1,
        fecha: new Date().toISOString(),
        total,
      };
      
      await createVenta(ventaData);
      window.showToast('Venta registrada exitosamente', 'success');
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      window.showToast('Error al registrar la venta', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Venta</h3>
      <select value={form.cliente_id} onChange={handleCliente} required>
        <option value="">Seleccione cliente</option>
        {clientes.map(c => (
          <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
        ))}
      </select>
      <h4>Productos</h4>
      {form.detalles.map((d, idx) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          <select value={d.id_producto} onChange={e => handleProducto(idx, 'id_producto', e.target.value)} required>
            <option value="">Seleccione producto</option>
            {productos.map(p => (
              <option key={p.id_producto} value={p.id_producto}>{p.nombre_producto}</option>
            ))}
          </select>
          <input type="number" min={1} value={d.cantidad} onChange={e => handleProducto(idx, 'cantidad', Number(e.target.value))} required style={{ width: 60 }} />
          <input type="number" min={0} value={d.precio_unitario} onChange={e => handleProducto(idx, 'precio_unitario', Number(e.target.value))} required style={{ width: 80 }} />
          <button type="button" onClick={() => removeDetalle(idx)}>Quitar</button>
        </div>
      ))}
      <button type="button" onClick={addDetalle}>Agregar Producto</button>
      <br />
      <button type="submit" disabled={loading}>Guardar Venta</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
} 