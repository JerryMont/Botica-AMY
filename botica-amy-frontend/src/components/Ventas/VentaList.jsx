import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import SearchFilter from '../UI/SearchFilter';
import Pagination from '../UI/Pagination';

export default function VentaList({ onViewDetail, onNuevaVenta }) {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    api.get('/ventas')
      .then(res => setVentas(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  // Filtros disponibles
  const filters = {
    estado: [
      { value: 'completada', label: 'Completada' },
      { value: 'pendiente', label: 'Pendiente' },
      { value: 'cancelada', label: 'Cancelada' }
    ]
  };

  // Filtrar ventas
  const filteredVentas = useMemo(() => {
    let filtered = ventas;

    // Búsqueda por cliente o ID de venta
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.cliente?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id_venta.toString().includes(searchTerm)
      );
    }

    return filtered;
  }, [ventas, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredVentas.length / itemsPerPage);
  const paginatedVentas = filteredVentas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    // Implementar filtros adicionales si es necesario
    console.log('Filter changed:', filterType, value);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID Venta', 'Cliente', 'Total', 'Fecha', 'Estado'],
      ...filteredVentas.map(v => [
        v.id_venta,
        v.cliente?.nombre || 'N/A',
        v.total,
        new Date(v.fecha_venta).toLocaleDateString(),
        v.estado
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ventas.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    window.showToast('Ventas exportadas exitosamente', 'success');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Cargando ventas...</p>
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
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Lista de Ventas</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onNuevaVenta}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ➕ Nueva Venta
          </button>
          <button
            onClick={handleExport}
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
            📊 Exportar CSV
          </button>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar por cliente o ID de venta..."
        showFilters={true}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {filteredVentas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
          {searchTerm ? 'No se encontraron ventas con esa búsqueda' : 'No hay ventas registradas'}
        </p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '15px'
          }}>
            {paginatedVentas.map(v => (
              <div key={v.id_venta} style={{
                border: '1px solid #e1e8ed',
                borderRadius: '6px',
                padding: '15px',
                backgroundColor: '#f8f9fa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>Venta #{v.id_venta}</h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: v.estado === 'completada' ? '#27ae60' : 
                                   v.estado === 'pendiente' ? '#f39c12' : '#e74c3c',
                    color: 'white'
                  }}>
                    {v.estado}
                  </span>
                </div>
                
                <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                  👤 {v.cliente?.nombre || 'Cliente no encontrado'}
                </p>
                <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                  📅 {new Date(v.fecha_venta).toLocaleDateString()}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#27ae60',
                    fontSize: '16px'
                  }}>
                    S/ {v.total}
                  </span>
                  <button
                    onClick={() => onViewDetail(v)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    👁️ Ver Detalle
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredVentas.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
} 