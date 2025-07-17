import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import SearchFilter from '../UI/SearchFilter';
import Pagination from '../UI/Pagination';
import { exportToPDF, exportToCSV, exportConfigs } from '../UI/ExportUtils';

function ProductoFormModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ nombre_producto: '', descripcion: '', precio: '', stock: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!form.nombre_producto.trim()) {
      errors.nombre_producto = 'El nombre es obligatorio.';
    }
    if (form.precio === '' || isNaN(form.precio) || Number(form.precio) < 0) {
      errors.precio = 'El precio es obligatorio y debe ser un número mayor o igual a 0.';
    }
    if (form.stock === '' || isNaN(form.stock) || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      errors.stock = 'El stock es obligatorio y debe ser un número entero mayor o igual a 0.';
    }
    return errors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      await api.post('/productos', {
        nombre_producto: form.nombre_producto,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock, 10)
      });
      window.showToast('Producto creado exitosamente', 'success');
      onSuccess();
      onClose();
    } catch (err) {
      setError('Ocurrió un error al guardar el producto. Revise los datos e intente nuevamente.');
      window.showToast('Error al guardar el producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,62,80,0.12)', padding: 32, minWidth: 350, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ color: '#2563eb', marginBottom: 8, fontSize: 22, fontWeight: 800 }}>Nuevo Producto</h3>
        {error && <div style={{ color: '#e74c3c', background: '#fdecea', padding: 10, borderRadius: 8, marginBottom: 8, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            name="nombre_producto"
            value={form.nombre_producto}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
          {fieldErrors.nombre_producto && <span style={{ color: '#e74c3c', fontSize: 13 }}>{fieldErrors.nombre_producto}</span>}
        </div>
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            name="precio"
            type="number"
            min={0}
            step={0.01}
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
          {fieldErrors.precio && <span style={{ color: '#e74c3c', fontSize: 13 }}>{fieldErrors.precio}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            name="stock"
            type="number"
            min={0}
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
          />
          {fieldErrors.stock && <span style={{ color: '#e74c3c', fontSize: 13 }}>{fieldErrors.stock}</span>}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 24px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '10px 24px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showForm, setShowForm] = useState(false);

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
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Lista de Productos</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: 'white',
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
              backgroundColor: '#27ae60',
              color: 'white',
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
              backgroundColor: '#e74c3c',
              color: 'white',
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
      {showForm && <ProductoFormModal onClose={() => setShowForm(false)} onSuccess={fetchProductos} />}

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar productos..."
        showFilters={true}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {filteredProductos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
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
                border: '1px solid #e1e8ed',
                borderRadius: '6px',
                padding: '15px',
                backgroundColor: '#f8f9fa'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{p.nombre_producto}</h3>
                <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                  {p.descripcion || 'Sin descripción'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#27ae60',
                    fontSize: '16px'
                  }}>
                    S/ {p.precio}
                  </span>
                  <span style={{ 
                    color: p.stock <= 10 ? '#e74c3c' : '#2ecc71',
                    fontWeight: 'bold'
                  }}>
                    Stock: {p.stock}
                  </span>
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