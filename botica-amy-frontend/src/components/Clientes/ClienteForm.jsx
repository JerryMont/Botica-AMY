import { useState, useEffect } from 'react';
import { createCliente, updateCliente } from '../../api/clientes';

export default function ClienteForm({ cliente, onSuccess, onCancel }) {
  const [form, setForm] = useState({ nombre: '', email: '', direccion: '', telefono: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (cliente) setForm(cliente);
    else setForm({ nombre: '', email: '', direccion: '', telefono: '' });
  }, [cliente]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});
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
      console.error('Error al guardar cliente:', error);
      
      // Manejar errores de validación
      if (error.response?.status === 422 && error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
        const errorMessages = Object.values(error.response.data.errors).flat();
        setError(errorMessages.join('. ') || 'Por favor, revise los datos e intente nuevamente.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Ocurrió un error al guardar el cliente. Por favor, revise los datos e intente nuevamente.');
      }
      
      window.showToast(error.response?.data?.message || 'Error al guardar el cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ color: '#2563eb', marginBottom: 16 }}>{cliente ? 'Editar' : 'Nuevo'} Cliente</h3>
      <div>
        <input
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre *"
          required
          style={{ 
            padding: 10, 
            borderRadius: 6, 
            border: validationErrors.nombre ? '1px solid #e74c3c' : '1px solid #ccc', 
            marginBottom: 8,
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        {validationErrors.nombre && (
          <div style={{ color: '#e74c3c', fontSize: 12, marginTop: -6, marginBottom: 8 }}>
            {validationErrors.nombre[0]}
          </div>
        )}
      </div>
      
      <div>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email *"
          required
          style={{ 
            padding: 10, 
            borderRadius: 6, 
            border: validationErrors.email ? '1px solid #e74c3c' : '1px solid #ccc', 
            marginBottom: 8,
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        {validationErrors.email && (
          <div style={{ color: '#e74c3c', fontSize: 12, marginTop: -6, marginBottom: 8 }}>
            {validationErrors.email[0]}
          </div>
        )}
      </div>
      
      <div>
        <input
          name="direccion"
          type="text"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          style={{ 
            padding: 10, 
            borderRadius: 6, 
            border: validationErrors.direccion ? '1px solid #e74c3c' : '1px solid #ccc', 
            marginBottom: 8,
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        {validationErrors.direccion && (
          <div style={{ color: '#e74c3c', fontSize: 12, marginTop: -6, marginBottom: 8 }}>
            {validationErrors.direccion[0]}
          </div>
        )}
      </div>
      
      <div>
        <input
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          style={{ 
            padding: 10, 
            borderRadius: 6, 
            border: validationErrors.telefono ? '1px solid #e74c3c' : '1px solid #ccc', 
            marginBottom: 8,
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        {validationErrors.telefono && (
          <div style={{ color: '#e74c3c', fontSize: 12, marginTop: -6, marginBottom: 8 }}>
            {validationErrors.telefono[0]}
          </div>
        )}
      </div>
      
      {error && (
        <div style={{ 
          color: '#e74c3c', 
          marginBottom: 8, 
          fontWeight: 500,
          padding: 10,
          backgroundColor: '#fee',
          borderRadius: 6,
          border: '1px solid #e74c3c'
        }}>
          {error}
        </div>
      )}
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