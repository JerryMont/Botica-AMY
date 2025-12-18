import ProductoList from '../components/Productos/ProductoList';
import { getThemeColors } from '../hooks/useDarkMode';

export default function Productos() {
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
          background: 'linear-gradient(135deg, hsl(280, 70%, 60%) 0%, hsl(320, 75%, 65%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Gestión de Productos
        </h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Administra el inventario de productos de la farmacia
        </p>
      </div>
      <ProductoList />
    </div>
  );
}