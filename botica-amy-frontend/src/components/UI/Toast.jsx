import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '6px',
      color: 'white',
      fontWeight: '500',
      zIndex: 1000,
      minWidth: '300px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, backgroundColor: '#27ae60' };
      case 'error':
        return { ...baseStyle, backgroundColor: '#e74c3c' };
      case 'warning':
        return { ...baseStyle, backgroundColor: '#f39c12' };
      default:
        return { ...baseStyle, backgroundColor: '#3498db' };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div style={getToastStyle()}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '16px' }}>{getIcon()}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        ×
      </button>
    </div>
  );
} 