import UsuarioAdmin from '../components/Admin/UsuarioAdmin';

export default function Admin() {
  return (
    <div>
      <h1 style={{ marginBottom: 20, color: '#2c3e50' }}>Administración del Sistema</h1>
      <p style={{ color: '#7f8c8d', marginBottom: 20 }}>Aquí puedes gestionar usuarios, roles y configuraciones avanzadas.</p>
      <UsuarioAdmin />
    </div>
  );
}