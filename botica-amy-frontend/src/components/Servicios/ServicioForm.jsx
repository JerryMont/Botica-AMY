import { useState, useEffect } from 'react';
import { createServicio, updateServicio } from '../../api/servicios';

export default function ServicioForm({ servicio, onSuccess, onCancel }) {
  const [form, setForm] = useState({ titulo: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (servicio) setForm(servicio);
    else setForm({ titulo: '', descripcion: '' });
  }, [servicio]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (servicio) {
        await updateServicio(servicio.id, form);
        window.showToast('Servicio actualizado exitosamente', 'success');
      } else {
        await createServicio(form);
        window.showToast('Servicio creado exitosamente', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      window.showToast('Error al guardar el servicio', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{servicio ? 'Editar' : 'Nuevo'} Servicio</h3>
      <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required />
      <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <button type="submit" disabled={loading}>Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
} 