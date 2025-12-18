import ReporteList from '../components/Reportes/ReporteList';
import { getThemeColors } from '../hooks/useDarkMode';
import './Reportes.css';

export default function Reportes() {
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
          background: 'linear-gradient(135deg, hsl(340, 82%, 65%) 0%, hsl(25, 85%, 60%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Reportes y Análisis</h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Genera reportes detallados y analiza el rendimiento de tu farmacia
        </p>
      </div>
      <ReporteList />
    </div>
  );
}