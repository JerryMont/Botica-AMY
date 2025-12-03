import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function ProductModal({ product = null, onClose, onSuccess }) {
  const [form, setForm] = useState({ nombre_producto: '', descripcion: '', precio: '', stock: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        nombre_producto: product.nombre_producto || '',
        descripcion: product.descripcion || '',
        precio: product.precio != null ? product.precio : '',
        stock: product.stock != null ? product.stock : ''
      });
    }
  }, [product]);

  const validate = () => {
    const errors = {};
    if (!form.nombre_producto || !form.nombre_producto.trim()) errors.nombre_producto = 'El nombre es obligatorio.';
    if (form.precio === '' || isNaN(form.precio) || Number(form.precio) < 0) errors.precio = 'Precio inválido.';
    if (form.stock === '' || isNaN(form.stock) || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) errors.stock = 'Stock inválido.';
    return errors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
        nombre_producto: form.nombre_producto,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock, 10)
      };

      if (product) {
        await api.put(`/productos/${product.id_producto}`, payload);
        window.showToast('Producto actualizado', 'success');
      } else {
        await api.post('/productos', payload);
        window.showToast('Producto creado', 'success');
      }

      onSuccess && onSuccess();
      onClose && onClose();
    } catch (err) {
      setError('Error al guardar. Revise los datos.');
      window.showToast('Error al guardar producto', 'error');
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
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1f2937' }}>{product ? 'Editar producto' : 'Nuevo producto'}</h3>
          <button onClick={() => onClose && onClose()} style={{ background: '#f3f4f6', border: 'none', fontSize: 24, cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', transition: 'all 0.2s ease' }} onMouseEnter={e => e.target.style.background = '#e5e7eb'} onMouseLeave={e => e.target.style.background = '#f3f4f6'}>✕</button>
        </div>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: 12, borderRadius: 8, marginBottom: 14, fontSize: 14, fontWeight: 500 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Nombre del producto *</label>
              <input name="nombre_producto" value={form.nombre_producto} onChange={handleChange} placeholder="Ej: Paracetamol 500mg" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
            </div>
            {fieldErrors.nombre_producto && <small style={{ color: '#e74c3c', fontSize: 12 }}>{fieldErrors.nombre_producto}</small>}

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Descripción</label>
              <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Ej: Alivio de dolor y fiebre" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Precio *</label>
                <input name="precio" type="number" step="0.01" min="0" value={form.precio} onChange={handleChange} placeholder="0.00" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
                {fieldErrors.precio && <small style={{ color: '#e74c3c', fontSize: 12 }}>{fieldErrors.precio}</small>}
              </div>
              <div style={{ width: 150 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Stock *</label>
                <input name="stock" type="number" min={0} value={form.stock} onChange={handleChange} placeholder="0" style={{ padding: 11, borderRadius: 8, border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box', fontSize: 14, transition: 'border 0.2s ease', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
                {fieldErrors.stock && <small style={{ color: '#e74c3c', fontSize: 12 }}>{fieldErrors.stock}</small>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
              <button type="button" onClick={() => onClose && onClose()} style={{ padding: '10px 20px', background: '#f3f4f6', color: '#374151', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s ease' }} onMouseEnter={e => e.target.style.background = '#e5e7eb'} onMouseLeave={e => e.target.style.background = '#f3f4f6'}>Cancelar</button>
              <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s ease', opacity: loading ? 0.7 : 1 }} onMouseEnter={e => !loading && (e.target.style.background = '#2563eb')} onMouseLeave={e => !loading && (e.target.style.background = '#3b82f6')}>{loading ? 'Guardando...' : (product ? 'Guardar cambios' : 'Crear producto')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
