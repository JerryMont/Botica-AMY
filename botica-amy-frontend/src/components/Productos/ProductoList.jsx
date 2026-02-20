import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import ProductModal from './ProductModal';
import SearchFilter from '../UI/SearchFilter';
import Pagination from '../UI/Pagination';
import { exportToCSV, exportConfigs } from '../UI/ExportUtils';
import '../../../src/pages/Productos.css';

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showForm, setShowForm] = useState(null);
  const [stockFilter, setStockFilter] = useState('all');

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
      { value: 'all', label: 'Todos' },
      { value: 'bajo', label: 'Stock Bajo (≤10)' },
      { value: 'medio', label: 'Stock Medio (11-50)' },
      { value: 'alto', label: 'Stock Alto (>50)' }
    ]
  };

  const filteredProductos = useMemo(() => {
    let filtered = productos;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por stock
    if (stockFilter !== 'all') {
      filtered = filtered.filter(p => {
        const stock = p.stock;
        if (stockFilter === 'bajo') return stock <= 10;
        if (stockFilter === 'medio') return stock >= 11 && stock <= 50;
        if (stockFilter === 'alto') return stock > 50;
        return true;
      });
    }

    return filtered;
  }, [productos, searchTerm, stockFilter]);

  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);
  const paginatedProductos = filteredProductos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'stock') {
      setStockFilter(value);
      setCurrentPage(1); // Resetear a primera página cuando se filtra
    }
  };

  const handleExport = () => {
    const config = exportConfigs.productos;
    try {
      exportToCSV(filteredProductos, config.columns, 'productos');
      window.showToast('Productos exportados a CSV exitosamente', 'success');
    } catch (error) {
      console.error('Error en exportación:', error);
      window.showToast(error.message || 'Error al exportar datos', 'error');
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
                        const msg = err?.response?.data?.message || 'Error al eliminar producto';
                        window.showToast(msg, 'error');
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