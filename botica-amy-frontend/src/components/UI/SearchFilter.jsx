export default function SearchFilter({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Buscar...",
  showFilters = false,
  filters = {},
  onFilterChange = () => {}
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>
      
      {showFilters && Object.keys(filters).length > 0 && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(filters).map(([key, options]) => (
            <select
              key={key}
              onChange={(e) => onFilterChange(key, e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="">{key}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
} 