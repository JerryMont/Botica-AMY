import UsuarioAdmin from '../components/Admin/UsuarioAdmin';
import { getThemeColors } from '../hooks/useDarkMode';

export default function Admin() {
  const colors = getThemeColors();
  return (
    <div>
      <h1 style={{ marginBottom: 20, color: colors.textPrimary }}>Administración del Sistema</h1>
      <p style={{ color: colors.textSecondary, marginBottom: 20 }}>Aquí puedes gestionar usuarios, roles y configuraciones avanzadas.</p>
      <UsuarioAdmin />
    </div>
  );
}