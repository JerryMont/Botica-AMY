import { useEffect, useState, useMemo } from 'react';
import { getClientes, deleteCliente } from '../../api/clientes';
import api from '../../api/axios';
import SearchFilter from '../UI/SearchFilter';
import Pagination from '../UI/Pagination';

export default function ClienteList({ onEdit }) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const fetchClientes = () => {
    getClientes()
      .then(res => setClientes(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Filtros disponibles
  const filters = {
    estado: [
      { value: 'activo', label: 'Activo' },
      { value: 'inactivo', label: 'Inactivo' }
    ]
  };

  // Filtrar clientes
  const filteredClientes = useMemo(() => {
    let filtered = clientes;

    // Búsqueda por nombre o email
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [clientes, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    // Implementar filtros adicionales si es necesario
    console.log('Filter changed:', filterType, value);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Nombre', 'Email', 'Teléfono', 'Dirección'],
      ...filteredClientes.map(c => [
        c.id_cliente,
        c.nombre,
        c.email,
        c.telefono || '',
        c.direccion || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    window.showToast('Clientes exportados exitosamente', 'success');
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      await deleteCliente(id);
      fetchClientes();
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Cargando clientes...</p>
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
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Lista de Clientes</h2>
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

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Buscar por nombre o email..."
        showFilters={true}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {filteredClientes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
          {searchTerm ? 'No se encontraron clientes con esa búsqueda' : 'No hay clientes registrados'}
        </p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '15px'
          }}>
            {paginatedClientes.map(c => (
              <div key={c.id_cliente} style={{
                border: '1px solid #e1e8ed',
                borderRadius: '6px',
                padding: '15px',
                backgroundColor: '#f8f9fa'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{c.nombre}</h3>
                <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                  📧 {c.email}
                </p>
                {c.telefono && (
                  <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                    📞 {c.telefono}
                  </p>
                )}
                {c.direccion && (
                  <p style={{ margin: '5px 0', color: '#7f8c8d', fontSize: '14px' }}>
                    📍 {c.direccion}
                  </p>
                )}
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredClientes.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
} 