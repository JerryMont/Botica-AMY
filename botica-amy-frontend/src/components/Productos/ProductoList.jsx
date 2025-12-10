import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import ProductModal from './ProductModal';
import SearchFilter from '../UI/SearchFilter';
import Pagination from '../UI/Pagination';
import { exportToPDF, exportToCSV, exportConfigs } from '../UI/ExportUtils';
import { getThemeColors } from '../../hooks/useDarkMode';



export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showForm, setShowForm] = useState(null); // null = cerrado, { product: null } = crear, { product: p } = editar
  const colors = getThemeColors();

  const fetchProductos = () => {
    setLoading(true);
    api.get('/productos')
      .then(res => setProductos(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Filtros disponibles
  const filters = {
    stock: [
      { value: 'bajo', label: 'Stock Bajo (≤10)' },
      { value: 'medio', label: 'Stock Medio (11-50)' },
      { value: 'alto', label: 'Stock Alto (>50)' }
    ]
  };

  // Filtrar productos
  const filteredProductos = useMemo(() => {
    let filtered = productos;

    // Búsqueda por nombre
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [productos, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);
  const paginatedProductos = filteredProductos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    // Implementar filtros adicionales si es necesario
    console.log('Filter changed:', filterType, value);
  };

  const handleExport = (format = 'csv') => {
    const config = exportConfigs.productos;
    
    if (format === 'pdf') {
      exportToPDF(filteredProductos, config.title, config.columns, 'productos');
      window.showToast('Productos exportados a PDF exitosamente', 'success');
    } else {
      exportToCSV(filteredProductos, config.columns, 'productos');
      window.showToast('Productos exportados a CSV exitosamente', 'success');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: colors.textPrimary }}>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: colors.cardBg,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: `0 2px 4px ${colors.shadowColor}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: colors.textPrimary }}>Lista de Productos</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowForm({ product: null })}
            style={{
              padding: '8px 16px',
              backgroundColor: colors.accentColor,
              color: colors.buttonTextColor,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            + Nuevo Producto
          </button>
          <button
            onClick={() => handleExport('csv')}
            style={{
              padding: '8px 16px',
              backgroundColor: colors.successColor,
              color: colors.buttonTextColor,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📊 CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            style={{
              padding: '8px 16px',
              backgroundColor: colors.errorColor,
              color: colors.buttonTextColor,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📄 PDF
          </button>
        </div>
      </div>
      {showForm !== null && <ProductModal product={showForm.product} onClose={() => setShowForm(null)} onSuccess={fetchProductos} />}

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar productos..."
        showFilters={true}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {filteredProductos.length === 0 ? (
        <p style={{ textAlign: 'center', color: colors.textSecondary }}>
          {searchTerm ? 'No se encontraron productos con esa búsqueda' : 'No hay productos registrados'}
        </p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px'
          }}>
            {paginatedProductos.map(p => (
              <div key={p.id_producto} style={{
                border: `1px solid ${colors.borderColor}`,
                borderRadius: '6px',
                padding: '15px',
                backgroundColor: colors.cardBgAlt
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: colors.textPrimary }}>{p.nombre_producto}</h3>
                <p style={{ margin: '5px 0', color: colors.textSecondary, fontSize: '14px' }}>
                  {p.descripcion || 'Sin descripción'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: colors.successColor,
                    fontSize: '16px'
                  }}>
                    S/ {p.precio}
                  </span>
                  <span style={{ 
                    color: p.stock <= 10 ? colors.errorColor : colors.successColor,
                    fontWeight: 'bold'
                  }}>
                    Stock: {p.stock}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => setShowForm({ product: p })}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: colors.accentColor,
                      color: colors.buttonTextColor,
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm('¿Seguro que deseas eliminar este producto? Esta acción no se podrá deshacer.')) return;
                      try {
                        await api.delete(`/productos/${p.id_producto}`);
                        window.showToast('Producto eliminado', 'success');
                        fetchProductos();
                      } catch (err) {
                        window.showToast('Error al eliminar producto', 'error');
                      }
                    }}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: colors.errorColor,
                      color: colors.buttonTextColor,
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredProductos.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
} 