export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage = 10
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginTop: '20px'
    }}>
      <div style={{ color: '#7f8c8d', fontSize: '14px' }}>
        Mostrando {startItem}-{endItem} de {totalItems} elementos
      </div>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
            color: currentPage === 1 ? '#999' : '#333',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          ←
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && onPageChange(page)}
            disabled={page === '...'}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              backgroundColor: page === currentPage ? '#3498db' : 'white',
              color: page === currentPage ? 'white' : page === '...' ? '#999' : '#333',
              cursor: page === '...' ? 'default' : 'pointer',
              borderRadius: '4px',
              minWidth: '40px'
            }}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
            color: currentPage === totalPages ? '#999' : '#333',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          →
        </button>
      </div>
    </div>
  );
} 