import { getThemeColors } from '../../hooks/useDarkMode';

export default function DashboardWidget({ title, value, icon, color = '#3498db' }) {
  const colors = getThemeColors();

  return (
    <div
      className="hover-lift"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: `2px solid ${color}30`,
        flex: 1,
        minWidth: '220px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = `0 12px 24px ${color}30`;
        e.currentTarget.style.borderColor = `${color}50`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderColor = `${color}30`;
      }}
    >
      {/* Círculo decorativo de fondo */}
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        top: '-40px',
        right: '-40px',
        pointerEvents: 'none'
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 12px 0',
            color: colors.textSecondary,
            fontSize: '13px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {title}
          </h3>
          <p style={{
            margin: 0,
            fontSize: '32px',
            fontWeight: '800',
            color: color,
            lineHeight: '1',
            letterSpacing: '-0.02em'
          }}>
            {value}
          </p>
        </div>
        <div style={{
          fontSize: '48px',
          lineHeight: '1',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
          animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transition: 'transform 0.3s ease'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          {icon}
        </div>
      </div>

      {/* Barra de acento en la parte inferior */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
        borderRadius: '0 0 14px 14px'
      }} />
    </div>
  );
}