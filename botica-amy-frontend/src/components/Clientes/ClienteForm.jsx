import { useState, useEffect } from 'react';
import { createCliente, updateCliente } from '../../api/clientes';

export default function ClienteForm({ cliente, onSuccess, onCancel }) {
  const [form, setForm] = useState({ nombre: '', direccion: '', telefono: '' });
  const [loading, setLoading] = useState(false);

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
      console.error('Error:', error);
      window.showToast('Error al guardar el cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{cliente ? 'Editar' : 'Nuevo'} Cliente</h3>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
} 