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
  const [error, setError] = useState(null);

  useEffect(() => {
    getClientes().then(res => setClientes(res.data.data));
    api.get('/productos').then(res => setProductos(res.data.data));
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
    setError(null);
    try {
      const total = form.detalles.reduce((sum, d) => sum + d.cantidad * d.precio_unitario, 0);
      const now = new Date();
      const fecha = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

      const ventaData = {
        ...form,
        usuario_id: usuario_id || 1,
        fecha: fecha,
        total,
      };
      await createVenta(ventaData);
      window.showToast('Venta registrada exitosamente', 'success');
      onSuccess();
    } catch (error) {
      setError('Ocurrió un error al registrar la venta. Por favor, revise los datos e intente nuevamente.');
      window.showToast('Error al registrar la venta', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18, background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(44,62,80,0.08)', padding: 32 }}>
      <h3 style={{ color: '#2563eb', marginBottom: 16, fontSize: 26, fontWeight: 800 }}>Registrar Venta</h3>
      {error && <div style={{ color: '#e74c3c', background: '#fdecea', padding: 10, borderRadius: 8, marginBottom: 8, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <label style={{ minWidth: 120, fontWeight: 600 }}>Cliente:</label>
        <select value={form.cliente_id} onChange={handleCliente} required style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="">Seleccione cliente</option>
          {clientes.map(c => (
            <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
          ))}
        </select>
      </div>
      <h4 style={{ color: '#2c3e50', margin: '18px 0 8px 0', fontWeight: 700 }}>Productos</h4>
      {form.detalles.map((d, idx) => (
        <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, background: '#f8fafc', borderRadius: 8, padding: 10 }}>
          <select value={d.id_producto} onChange={e => handleProducto(idx, 'id_producto', e.target.value)} required style={{ flex: 2, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">Seleccione producto</option>
            {productos.map(p => (
              <option key={p.id_producto} value={p.id_producto}>{p.nombre_producto}</option>
            ))}
          </select>
          <input type="number" min={1} value={d.cantidad} onChange={e => handleProducto(idx, 'cantidad', Number(e.target.value))} required style={{ width: 70, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} placeholder="Cantidad" />
          <input type="number" min={0} value={d.precio_unitario} onChange={e => handleProducto(idx, 'precio_unitario', Number(e.target.value))} required style={{ width: 100, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} placeholder="Precio" />
          <button type="button" onClick={() => removeDetalle(idx)} style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: 6, padding: '8px 14px', fontWeight: 600, cursor: 'pointer' }}>Quitar</button>
        </div>
      ))}
      <button type="button" onClick={addDetalle} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 10, width: 'fit-content' }}>+ Agregar Producto</button>
      <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 32px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Guardando...' : 'Guardar Venta'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            padding: '12px 32px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
} 