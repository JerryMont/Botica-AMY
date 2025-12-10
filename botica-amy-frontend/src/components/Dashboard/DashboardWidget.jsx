import { getThemeColors } from '../../hooks/useDarkMode';

export default function DashboardWidget({ title, value, icon, color = '#3498db' }) {
  const colors = getThemeColors();
  
  return (
    <div style={{
      backgroundColor: colors.cardBg,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: `0 2px 4px ${colors.shadowColor}`,
      borderLeft: `4px solid ${color}`,
      flex: 1,
      minWidth: '200px',
      border: `1px solid ${colors.borderColor}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', color: colors.textSecondary, fontSize: '14px' }}>
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