import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import ProductModal from './ProductModal';
import SearchFilter from '../UI/SearchFilter';
import Pagination from '../UI/Pagination';
import { exportToPDF, exportToCSV, exportConfigs } from '../UI/ExportUtils';
import '../../../src/pages/Productos.css';

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showForm, setShowForm] = useState(null);

  const fetchProductos = () => {
    setLoading(true);
    api.get('/productos')
      .then(res => setProductos(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const filters = {
    stock: [
      { value: 'bajo', label: 'Stock Bajo (≤10)' },
      { value: 'medio', label: 'Stock Medio (11-50)' },
      { value: 'alto', label: 'Stock Alto (>50)' }
    ]
  };

  const filteredProductos = useMemo(() => {
    let filtered = productos;
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [productos, searchTerm]);

  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);
  const paginatedProductos = filteredProductos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
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
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Lista de Productos</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowForm({ product: null })}
            className="productos-btn productos-btn-primary"
          >
            + Nuevo Producto
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="productos-btn productos-btn-success"
          >
            📊 CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="productos-btn productos-btn-danger"
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
        <p className="productos-empty">
          {searchTerm ? 'No se encontraron productos con esa búsqueda' : 'No hay productos registrados'}
        </p>
      ) : (
        <>
          <div className="productos-grid">
            {paginatedProductos.map(p => (
              <div key={p.id_producto} className="productos-card">
                <h3>{p.nombre_producto}</h3>
                <p>
                  {p.descripcion || 'Sin descripción'}
                </p>
                <div className="productos-info">
                  <span className="productos-price">
                    S/ {p.precio}
                  </span>
                  <span className={`productos-stock ${p.stock <= 10 ? 'low' : p.stock <= 50 ? 'medium' : 'high'}`}>
                    Stock: {p.stock}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => setShowForm({ product: p })}
                    className="productos-btn productos-btn-edit productos-btn-primary"
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
                    className="productos-btn productos-btn-danger"
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