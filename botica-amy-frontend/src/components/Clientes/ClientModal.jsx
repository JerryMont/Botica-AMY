import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function ClientModal({ cliente = null, onClose, onSuccess }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '', activo: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setForm({
        nombre: cliente.nombre || '',
        email: cliente.email || '',
        telefono: cliente.telefono || '',
        direccion: cliente.direccion || '',
        activo: cliente.activo !== undefined ? cliente.activo : true
      });
    }
  }, [cliente]);

  const validate = () => {
    const errors = {};
    if (!form.nombre || !form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
    if (!form.email || !form.email.trim()) errors.email = 'El email es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email inválido.';
    return errors;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFieldErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const payload = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        activo: form.activo ? 1 : 0
      };

      if (cliente) {
        await api.put(`/clientes/${cliente.id_cliente}`, payload);
        window.showToast('Cliente actualizado', 'success');
      } else {
        await api.post('/clientes', payload);
        window.showToast('Cliente creado', 'success');
      }

      onSuccess && onSuccess();
      onClose && onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        setError(errorMessages.join('. '));
      } else {
        setError('Error al guardar. Revise los datos.');
      }
      window.showToast('Error al guardar cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200, animation: 'fadeIn 0.2s ease' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div style={{ width: 520, background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', animation: 'slideIn 0.25s ease', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1f2937' }}>{cliente ? 'Editar cliente' : 'Nuevo cliente'}</h3>
          <button onClick={() => onClose && onClose()} style={{ background: '#f3f4f6', border: 'none', fontSize: 24, cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', transition: 'all 0.2s ease' }} onMouseEnter={e => e.target.style.background = '#e5e7eb'} onMouseLeave={e => e.target.style.background = '#f3f4f6'}>✕</button>
        </div>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: 12, borderRadius: 8, marginBottom: 14, fontSize: 14, fontWeight: 500 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              {fieldErrors.nombre && <small style={{ color: '#e74c3c', fontSize: 12 }}>{fieldErrors.nombre}</small>}
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Ej: juan@example.com" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              {fieldErrors.email && <small style={{ color: '#e74c3c', fontSize: 12 }}>{fieldErrors.email}</small>}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Teléfono</label>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ej: 987654321" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              </div>
              <div style={{ width: 150 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Activo</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input name="activo" type="checkbox" checked={form.activo} onChange={handleChange} />
                  <span style={{ fontSize: 14 }}>Sí</span>
                </label>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Dirección</label>
              <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Ej: Calle Principal 123" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
              <button type="button" onClick={() => onClose && onClose()} style={{ padding: '10px 20px', background: '#f3f4f6', color: '#374151', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s ease' }} onMouseEnter={e => e.target.style.background = '#e5e7eb'} onMouseLeave={e => e.target.style.background = '#f3f4f6'}>Cancelar</button>
              <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s ease', opacity: loading ? 0.7 : 1 }} onMouseEnter={e => !loading && (e.target.style.background = '#2563eb')} onMouseLeave={e => !loading && (e.target.style.background = '#3b82f6')}>{loading ? 'Guardando...' : (cliente ? 'Guardar cambios' : 'Crear cliente')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}