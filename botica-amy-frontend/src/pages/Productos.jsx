import ProductoList from '../components/Productos/ProductoList';
import { getThemeColors } from '../hooks/useDarkMode';

export default function Productos() {
  const colors = getThemeColors();
  return (
    <>
      <h1 style={{ 
        marginBottom: '30px', 
        color: colors.textHeading,
        fontWeight: '700',
        fontSize: '28px',
        letterSpacing: '-0.5px'
      }}>Gestión de Productos</h1>
      <ProductoList />
    </>
  );
} 