import { useEffect, useState } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../api/usuarios';
import { getThemeColors } from '../../hooks/useDarkMode';

function UsuarioFormModal({ onClose, onSuccess, usuario }) {
  const isEdit = !!usuario;
  const [form, setForm] = useState({ nombre_completo: '', nombre_usuario: '', password: '', rol: 'vendedor', activo: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [manualUsername, setManualUsername] = useState(false);
  const colors = getThemeColors();

  useEffect(() => {
    if (isEdit) {
      setForm({ nombre_completo: '', nombre_usuario: usuario.nombre_usuario || '', password: '', rol: usuario.rol || 'vendedor', activo: !!usuario.activo });
    }
  }, [isEdit, usuario]);

  const validate = () => {
    const errors = {};
    if (!form.nombre_usuario.trim()) errors.nombre_usuario = 'El usuario es obligatorio!.';
    if (!form.nombre_usuario.trim()) errors.nombre_usuario = 'El usuario es obligatorio.';
    if (!isEdit && !form.password.trim()) errors.password = 'La contraseña es obligatoria al crear.';
    if (!['admin', 'vendedor'].includes(form.rol)) errors.rol = 'Rol inválido.';
    return errors;
  };

  const suggestUsername = (name) => {
    const clean = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z\s]/g, '');
    const parts = clean.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    const first = parts[0].toLowerCase();
    const last = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
    return last ? `${first}.${last}` : first;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === 'checkbox' ? checked : value;
    setForm((prev) => {
      const next = { ...prev, [name]: v };
      if (name === 'nombre_completo' && !manualUsername && !isEdit) {
        const s = suggestUsername(v);
        if (s) next.nombre_usuario = s;
      }
      return next;
    });
    if (name === 'nombre_usuario') setManualUsername(true);
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      if (isEdit) {
        const payload = { nombre_usuario: form.nombre_usuario, rol: form.rol, activo: !!form.activo };
        if (form.password.trim()) payload.password = form.password;
        await updateUsuario(usuario.id_usuario, payload);
        window.showToast && window.showToast('Usuario actualizado', 'success');
      } else {
        await createUsuario({ nombre_usuario: form.nombre_usuario, password: form.password, rol: form.rol, activo: !!form.activo });
        window.showToast && window.showToast('Usuario creado', 'success');
      }
      onSuccess();
      onClose();
    } catch (err) {
      // Manejo detallado de errores según la respuesta del servidor
      if (err && err.response) {
        const status = err.response.status;
                if (status === 422 || status === 409) {
          const errors = err.response.data?.errors || {};
          setFieldErrors(errors);
          setError('Corrige los campos marcados.');
          window.showToast && window.showToast('Corrige los campos marcados', 'error');
        } else if (status === 401 || status === 403) {
          setError('No autorizado. Inicia sesión con una cuenta con permisos.');
          window.showToast && window.showToast('No autorizado', 'error');
        } else {
          const msg = err.response.data?.message || 'Error al guardar el usuario';
          setError(msg);
          window.showToast && window.showToast(msg, 'error');
        }
        console.error('API error creating/updating user:', err.response.data || err.message);
      } else {
        setError('Error de red o del servidor. Intente de nuevo.');
        window.showToast && window.showToast('Error de red o del servidor', 'error');
        console.error('Network/unknown error creating/updating user:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: colors.cardBg, borderRadius: 12, boxShadow: `0 6px 16px ${colors.shadowColor}`, padding: 24, minWidth: 360, maxWidth: 420, display: 'grid', gap: 12 }}>
        <h3 style={{ margin: 0, color: colors.textPrimary }}>{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
        {error && <div style={{ color: '#e74c3c', background: '#fdecea', padding: 10, borderRadius: 8, textAlign: 'center' }}>{error}</div>}
        {!isEdit && (
          <div>
            <label style={{ display: 'block', marginBottom: 6, color: colors.textPrimary }}>Nombre completo</label>
            <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} style={{ width: '100%', padding: 10, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }} />
          </div>
        )}
        <div>
          <label style={{ display: 'block', marginBottom: 6, color: colors.textPrimary }}>Usuario</label>
          <input name="nombre_usuario" value={form.nombre_usuario} onChange={handleChange} style={{ width: '100%', padding: 10, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }} />
          {fieldErrors.nombre_usuario && <span style={{ color: '#e74c3c', fontSize: 13 }}>{fieldErrors.nombre_usuario}</span>}
          {!isEdit && form.nombre_completo && (
            <div style={{ marginTop: 6, fontSize: 12, color: colors.textSecondary }}>
              Sugerencia: <b>{suggestUsername(form.nombre_completo) || '-'}</b>
              {suggestUsername(form.nombre_completo) && (
                <button type="button" onClick={() => setForm((prev) => ({ ...prev, nombre_usuario: suggestUsername(prev.nombre_completo) }))} style={{ marginLeft: 8, padding: '4px 8px', backgroundColor: colors.borderColor, border: 'none', borderRadius: 6, cursor: 'pointer', color: colors.textPrimary }}>Usar</button>
              )}
            </div>
          )}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, color: colors.textPrimary }}>Contraseña {isEdit ? '(opcional)' : ''}</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 10, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }} />
          {fieldErrors.password && <span style={{ color: '#e74c3c', fontSize: 13 }}>{fieldErrors.password}</span>}
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, color: colors.textPrimary }}>Rol</label>
          <select name="rol" value={form.rol} onChange={handleChange} style={{ width: '100%', padding: 10, border: `1px solid ${colors.inputBorder}`, borderRadius: 6, backgroundColor: colors.inputBg, color: colors.textPrimary }}>
            <option value="admin">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
          {fieldErrors.rol && <span style={{ color: '#e74c3c', fontSize: 13 }}>{fieldErrors.rol}</span>}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.textPrimary }}>
          <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} /> Activo
        </label>
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button type="submit" disabled={loading} style={{ padding: '10px 18px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Guardando...' : 'Guardar'}</button>
          <button type="button" onClick={onClose} disabled={loading} style={{ padding: '10px 18px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default function UsuarioAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const colors = getThemeColors();

  const fetchUsuarios = () => {
    setLoading(true);
    getUsuarios()
      .then((res) => setUsuarios(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (u) => {
    setEditing(u);
    setShowForm(true);
  };

  const handleDelete = async (u) => {
    const ok = confirm(`Eliminar usuario "${u.nombre_usuario}"?`);
    if (!ok) return;
    try {
      await deleteUsuario(u.id_usuario);
      window.showToast && window.showToast('Usuario eliminado', 'success');
      fetchUsuarios();
    } catch (err) {
      window.showToast && window.showToast('Error al eliminar usuario', 'error');
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: colors.cardBg, borderRadius: 12, boxShadow: `0 6px 16px ${colors.shadowColor}`, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, color: colors.textPrimary }}>Administración de Usuarios</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} style={{ padding: '10px 16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>+ Nuevo Usuario</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ color: colors.textSecondary }}>Cargando usuarios...</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: colors.bgSecondary, color: colors.textPrimary }}>
                <th style={{ textAlign: 'left', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Usuario</th>
                <th style={{ textAlign: 'left', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Rol</th>
                <th style={{ textAlign: 'center', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Estado</th>
                <th style={{ textAlign: 'right', padding: 12, borderBottom: `1px solid ${colors.borderColor}` }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id_usuario} style={{ borderBottom: `1px solid ${colors.borderColor}` }}>
                  <td style={{ padding: 12, color: colors.textPrimary }}>{u.nombre_usuario}</td>
                  <td style={{ padding: 12, color: colors.textPrimary }}>{u.rol === 'admin' ? 'Administrador' : 'Vendedor'}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <span style={{ backgroundColor: u.activo ? '#2ecc71' : '#e74c3c', color: 'white', borderRadius: 16, padding: '6px 12px', fontSize: 12, fontWeight: 700 }}>{u.activo ? 'Activo' : 'Inactivo'}</span>
                  </td>
                  <td style={{ padding: 12, textAlign: 'right' }}>
                    <button onClick={() => handleEdit(u)} style={{ padding: '8px 12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', marginRight: 8 }}>Editar</button>
                    <button onClick={() => handleDelete(u)} style={{ padding: '8px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <UsuarioFormModal onClose={() => setShowForm(false)} onSuccess={fetchUsuarios} usuario={editing} />
      )}
    </div>
  );
}