import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import './HelpButton.css';

export default function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  // Solo mostrar en páginas autenticadas (no en login)
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  
  if (!user || isLoginPage) {
    return null;
  }

  const helpContent = [
    {
      title: "🏠 Dashboard",
      content: "Tu centro de control principal. Aquí verás estadísticas en tiempo real: total de productos en inventario, número de clientes registrados, historial de ventas y alertas de productos con stock bajo. Los widgets te permiten acceder rápidamente a las funciones más utilizadas."
    },
    {
      title: "💊 Gestión de Productos",
      content: "Administra tu inventario farmacéutico completo. Agrega nuevos medicamentos con nombre, descripción, precio y stock inicial. Organiza productos por categorías (analgésicos, antibióticos, etc.). El sistema te notificará automáticamente cuando el stock esté por debajo del umbral mínimo."
    },
    {
      title: "👥 Base de Datos de Clientes",
      content: "Mantén un registro completo de tus clientes con información personal y de contacto. Esto te permite hacer seguimiento de las compras, ofrecer atención personalizada y generar reportes de fidelización. Los datos se usan automáticamente en el proceso de ventas."
    },
    {
      title: "💰 Proceso de Ventas",
      content: "Sistema completo de ventas paso a paso: 1) Selecciona el cliente, 2) Agrega productos del inventario, 3) El sistema calcula automáticamente subtotales e impuestos, 4) Confirma la venta, 5) El stock se actualiza automáticamente. También puedes vender servicios adicionales."
    },
    {
      title: "🔧 Servicios Farmacéuticos",
      content: "Gestiona servicios especializados que ofreces: consultas farmacéuticas, aplicación de vacunas, pruebas rápidas, asesoría nutricional, etc. Cada servicio puede tener su propio precio y descripción. Se integran perfectamente con el sistema de ventas."
    },
    {
      title: "📊 Reportes y Análisis",
      content: "Genera reportes detallados de ventas por períodos específicos, analiza el rendimiento de productos, identifica tendencias de ventas y toma decisiones informadas. Los reportes se pueden exportar en PDF para presentaciones o auditorías."
    },
    {
      title: "⚙️ Administración del Sistema",
      content: "Como administrador, gestiona usuarios del sistema, asigna roles (admin/vendedor), controla permisos de acceso y configura parámetros importantes como umbrales de stock bajo. Mantén la seguridad y eficiencia del sistema."
    }
  ];

  const tips = [
    "💡 Usa Ctrl+F para buscar rápidamente productos o clientes en las listas",
    "💡 Los productos con stock bajo aparecen destacados en rojo en el dashboard",
    "💡 Puedes exportar reportes a PDF para guardarlos o compartirlos",
    "💡 Mantén actualizado el stock para evitar problemas durante las ventas",
    "💡 Usa las categorías para organizar mejor tu inventario farmacéutico",
    "💡 El sistema calcula automáticamente los totales en las ventas",
    "💡 Puedes ver el historial completo de ventas por cliente",
    "💡 Los reportes te ayudan a identificar productos más vendidos",
    "💡 Siempre verifica la información antes de confirmar una venta",
    "💡 Usa el botón de ayuda en cualquier momento si tienes dudas"
  ];

  return (
    <>
      {/* Botón flotante de ayuda */}
      <button 
        className="help-button"
        onClick={() => setIsOpen(true)}
        title="¿Necesitas ayuda? Haz clic aquí"
      >
        <span className="help-icon">❓</span>
        <span className="help-text">Ayuda</span>
      </button>

      {/* Modal de ayuda */}
      {isOpen && (
        <div className="help-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="help-modal-header">
              <h2>🎉 ¡Bienvenido a Botica AMY!</h2>
              <button 
                className="help-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="help-modal-content">
              <div className="welcome-section">
                <h3>👋 ¿Primera vez usando el sistema?</h3>
                <p>
                  Este es tu sistema de gestión de farmacia. Te guiaremos a través de todas las funciones principales para que puedas aprovechar al máximo la aplicación.
                </p>
              </div>

              <div className="features-section">
                <h3>🚀 Funciones Principales</h3>
                <div className="features-grid">
                  {helpContent.map((item, index) => (
                    <div key={index} className="feature-card">
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tips-section">
                <h3>💡 Consejos Útiles</h3>
                <ul className="tips-list">
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="quick-start-section">
                <h3>🚀 Guía de Inicio Rápido</h3>
                <div className="steps-grid">
                  <div className="step-card">
                    <div className="step-number">1</div>
                    <h4>Configura tu Inventario</h4>
                    <p>Ve a "Productos" y agrega todos tus medicamentos con precios y stock inicial.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">2</div>
                    <h4>Registra tus Clientes</h4>
                    <p>En "Clientes" crea la base de datos de tus clientes frecuentes.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">3</div>
                    <h4>Realiza tu Primera Venta</h4>
                    <p>Ve a "Ventas", selecciona un cliente y agrega productos para completar la transacción.</p>
                  </div>
                  <div className="step-card">
                    <div className="step-number">4</div>
                    <h4>Revisa los Reportes</h4>
                    <p>En "Reportes" analiza el rendimiento y toma decisiones informadas.</p>
                  </div>
                </div>
              </div>

              <div className="support-section">
                <h3>🆘 ¿Necesitas más ayuda?</h3>
                <p>
                  Si tienes alguna pregunta o encuentras algún problema, no dudes en contactar al administrador del sistema.
                </p>
                <div className="support-info">
                  <p><strong>📧 Email:</strong> soporte@boticaamy.com</p>
                  <p><strong>📞 Teléfono:</strong> +123 456 7890</p>
                  <p><strong>🕒 Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="help-modal-footer">
              <button 
                className="help-close-btn-large"
                onClick={() => setIsOpen(false)}
              >
                ¡Entendido! Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 