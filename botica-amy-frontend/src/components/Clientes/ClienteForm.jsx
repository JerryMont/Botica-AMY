import { useState, useEffect } from 'react';
import { createCliente, updateCliente } from '../../api/clientes';

export default function ClienteForm({ cliente, onSuccess, onCancel }) {
  const [form, setForm] = useState({ nombre: '', direccion: '', telefono: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cliente) setForm(cliente);
    else setForm({ nombre: '', direccion: '', telefono: '' });
  }, [cliente]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (cliente) {
        await updateCliente(cliente.id_cliente, form);
        window.showToast('Cliente actualizado exitosamente', 'success');
      } else {
        await createCliente(form);
        window.showToast('Cliente creado exitosamente', 'success');
      }
      onSuccess();
    } catch (error) {
      setError('Ocurrió un error al guardar el cliente. Por favor, revise los datos e intente nuevamente.');
      window.showToast('Error al guardar el cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ color: '#2563eb', marginBottom: 16 }}>{cliente ? 'Editar' : 'Nuevo'} Cliente</h3>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
        style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
      />
      <input
        name="direccion"
        value={form.direccion}
        onChange={handleChange}
        placeholder="Dirección"
        style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
      />
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
      />
      {error && <div style={{ color: '#e74c3c', marginBottom: 8, fontWeight: 500 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 24px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            padding: '10px 24px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
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