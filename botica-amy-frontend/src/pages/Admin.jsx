import UsuarioAdmin from '../components/Admin/UsuarioAdmin';
import { getThemeColors } from '../hooks/useDarkMode';
import './Admin.css';

export default function Admin() {
  const colors = getThemeColors();
  return (
    <div className="fade-in" style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          marginBottom: '8px',
          color: colors.textHeading,
          fontWeight: '800',
          fontSize: '36px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, hsl(260, 70%, 55%) 0%, hsl(280, 65%, 55%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Administración del Sistema</h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Gestiona usuarios, roles y configuraciones avanzadas del sistema
        </p>
      </div>
      <UsuarioAdmin />
    </div>
  );
}