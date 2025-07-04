import MainLayout from '../components/Layout/MainLayout';
import ProductoList from '../components/Productos/ProductoList';

export default function Productos() {
  return (
    <MainLayout>
      <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>Gestión de Productos</h1>
      <ProductoList />
    </MainLayout>
  );
} 