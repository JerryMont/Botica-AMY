import ReporteList from '../components/Reportes/ReporteList';
import { getThemeColors } from '../hooks/useDarkMode';

export default function Reportes() {
  const colors = getThemeColors();
  return (
    <>
      <h1 style={{ marginBottom: '30px', color: colors.textPrimary }}>Reportes y Análisis</h1>
      <ReporteList />
    </>
  );
} 