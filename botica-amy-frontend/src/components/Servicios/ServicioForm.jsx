import { useState, useEffect } from 'react';
import { createServicio, updateServicio } from '../../api/servicios';

export default function ServicioForm({ servicio, onSuccess, onCancel }) {
  const [form, setForm] = useState({ titulo: '', descripcion: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (servicio) setForm(servicio);
    else setForm({ titulo: '', descripcion: '' });
    setError('');
    setSuccess('');
  }, [servicio]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (servicio) {
        console.log('Editando servicio:', { id: servicio.id, ...form });
        await updateServicio(servicio.id, form);
        setSuccess('Servicio actualizado exitosamente.');
        window.showToast && window.showToast('Servicio actualizado exitosamente', 'success');
      } else {
        console.log('Creando servicio:', form);
        await createServicio(form);
        setSuccess('Servicio creado exitosamente.');
        window.showToast && window.showToast('Servicio creado exitosamente', 'success');
      }
      setTimeout(() => onSuccess(), 700);
    } catch (error) {
      console.error('Error al guardar el servicio:', error);
      setError('Ocurrió un error al guardar el servicio. Intenta nuevamente.');
      window.showToast && window.showToast('Error al guardar el servicio', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      background: 'white',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(44,62,80,0.10)',
      padding: 32,
      maxWidth: 500,
      margin: '0 auto',
    }}>
      <h3 style={{ fontSize: 26, color: '#2563eb', fontWeight: 800, marginBottom: 10 }}>
        {servicio ? 'Editar' : 'Nuevo'} Servicio
      </h3>
      {error && <div style={{ background: '#e74c3c', color: 'white', padding: 10, borderRadius: 8, marginBottom: 8, textAlign: 'center' }}>{error}</div>}
      {success && <div style={{ background: '#2ecc71', color: 'white', padding: 10, borderRadius: 8, marginBottom: 8, textAlign: 'center' }}>{success}</div>}
      <div style={{ display: 'flex', gap: 12 }}>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 17,
            outline: 'none',
            background: '#f8fafc',
          }}
        />
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          style={{
            flex: 2,
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: 8,
            fontSize: 17,
            outline: 'none',
            background: '#f8fafc',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '10px 28px',
            fontWeight: 700,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            background: '#e5e7eb',
            color: '#222',
            border: 'none',
            borderRadius: 8,
            padding: '10px 22px',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
} 