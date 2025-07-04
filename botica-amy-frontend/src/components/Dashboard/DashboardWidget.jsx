export default function DashboardWidget({ title, value, icon, color = '#3498db' }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`,
      flex: 1,
      minWidth: '200px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50', fontSize: '14px' }}>
            {title}
          </h3>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: color }}>
            {value}
          </p>
        </div>
        <span style={{ fontSize: '32px' }}>{icon}</span>
      </div>
    </div>
  );
} 