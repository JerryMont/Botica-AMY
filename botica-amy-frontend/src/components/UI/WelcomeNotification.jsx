import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './WelcomeNotification.css';

export default function WelcomeNotification() {
  const [showWelcome, setShowWelcome] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Verificar si es la primera vez que el usuario accede
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome && user) {
      setShowWelcome(true);
    }
  }, [user]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!showWelcome) return null;

  return (
    <div className="welcome-notification-overlay">
      <div className="welcome-notification">
        <div className="welcome-header">
          <h2>🎉 ¡Bienvenido a Botica AMY!</h2>
          <button 
            className="welcome-close-btn"
            onClick={handleCloseWelcome}
          >
            ✕
          </button>
        </div>
        
        <div className="welcome-content">
          <div className="welcome-message">
            <p>
              <strong>¡Hola {user?.nombre_usuario}!</strong> Te damos la bienvenida a tu sistema de gestión de farmacia.
            </p>
            <p>
              Estamos aquí para ayudarte a gestionar tu negocio de manera eficiente y profesional.
            </p>
          </div>

          <div className="welcome-features">
            <h3>🚀 Lo que puedes hacer:</h3>
            <ul>
              <li>📊 <strong>Dashboard:</strong> Ver estadísticas de tu farmacia</li>
              <li>💊 <strong>Productos:</strong> Gestionar inventario y precios</li>
              <li>👥 <strong>Clientes:</strong> Mantener base de datos de clientes</li>
              <li>💰 <strong>Ventas:</strong> Procesar ventas y facturas</li>
              <li>📈 <strong>Reportes:</strong> Analizar el rendimiento</li>
            </ul>
          </div>

          <div className="welcome-tip">
            <p>
              <strong>💡 Consejo:</strong> Siempre puedes hacer clic en el botón "❓ Ayuda" 
              en la esquina inferior izquierda para obtener ayuda en cualquier momento.
            </p>
          </div>
        </div>

        <div className="welcome-footer">
          <button 
            className="welcome-start-btn"
            onClick={handleCloseWelcome}
          >
            ¡Empezar a usar el sistema!
          </button>
        </div>
      </div>
    </div>
  );
} 