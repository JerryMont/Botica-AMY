import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function LoginForm() {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isDark = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(nombre_usuario, password);
      if (res.data.usuario.rol === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/productos');
      }
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, hsl(220, 20%, 8%) 0%, hsl(260, 25%, 12%) 100%)'
        : 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Círculos decorativos de fondo */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(93, 173, 226, 0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
        top: '-250px',
        right: '-250px',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(142, 68, 173, 0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
        bottom: '-200px',
        left: '-200px',
        pointerEvents: 'none'
      }} />

      {/* Tarjeta de login con glassmorphism */}
      <div className="scale-in" style={{
        background: isDark
          ? 'rgba(30, 30, 40, 0.7)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '48px 40px',
        borderRadius: '24px',
        boxShadow: isDark
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(255, 255, 255, 0.3)',
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header con logo y título */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: '0 8px 24px rgba(93, 173, 226, 0.3)',
            animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards'
          }}>
            🏥
          </div>
          <h1 style={{
            color: isDark ? 'hsl(220, 15%, 98%)' : 'hsl(220, 25%, 10%)',
            marginBottom: '8px',
            fontSize: '28px',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>Botica AMY</h1>
          <p style={{
            color: isDark ? 'hsl(220, 10%, 70%)' : 'hsl(220, 10%, 45%)',
            margin: 0,
            fontSize: '15px',
            fontWeight: '500'
          }}>Sistema de Gestión Farmacéutica</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Mensaje de error */}
          {error && (
            <div className="scale-in" style={{
              background: 'linear-gradient(135deg, hsl(4, 90%, 58%) 0%, hsl(340, 85%, 60%) 100%)',
              color: 'white',
              padding: '14px 18px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Campo de usuario */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.01em'
            }}>
              Usuario
            </label>
            <input
              type="text"
              value={nombre_usuario}
              onChange={e => setNombreUsuario(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: `2px solid ${isDark ? 'hsl(220, 15%, 25%)' : 'hsl(220, 15%, 88%)'}`,
                borderRadius: '12px',
                fontSize: '16px',
                boxSizing: 'border-box',
                backgroundColor: isDark ? 'hsl(220, 15%, 18%)' : 'hsl(0, 0%, 100%)',
                color: isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              placeholder="Ingrese su usuario"
              onFocus={(e) => {
                e.target.style.borderColor = 'hsl(220, 75%, 60%)';
                e.target.style.boxShadow = '0 0 0 4px rgba(93, 173, 226, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark ? 'hsl(220, 15%, 25%)' : 'hsl(220, 15%, 88%)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Campo de contraseña */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.01em'
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 50px 14px 18px',
                  border: `2px solid ${isDark ? 'hsl(220, 15%, 25%)' : 'hsl(220, 15%, 88%)'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: isDark ? 'hsl(220, 15%, 18%)' : 'hsl(0, 0%, 100%)',
                  color: isDark ? 'hsl(220, 15%, 95%)' : 'hsl(220, 20%, 15%)',
                  transition: 'all 0.3s ease',
                  fontWeight: '500'
                }}
                placeholder="Ingrese su contraseña"
                onFocus={(e) => {
                  e.target.style.borderColor = 'hsl(220, 75%, 60%)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(93, 173, 226, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDark ? 'hsl(220, 15%, 25%)' : 'hsl(220, 15%, 88%)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? 'hsl(220, 10%, 70%)' : 'hsl(220, 10%, 45%)',
                  fontSize: '20px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  borderRadius: '6px'
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading
                ? (isDark ? 'hsl(220, 10%, 35%)' : 'hsl(220, 10%, 70%)')
                : 'linear-gradient(135deg, hsl(220, 75%, 60%) 0%, hsl(260, 75%, 65%) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(93, 173, 226, 0.4)',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(93, 173, 226, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(93, 173, 226, 0.4)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span className="loading" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Footer informativo */}
        <div style={{
          marginTop: '28px',
          paddingTop: '24px',
          borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
          textAlign: 'center',
          color: isDark ? 'hsl(220, 10%, 60%)' : 'hsl(220, 10%, 50%)',
          fontSize: '13px',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            ¿Necesitas acceso? Contacta al administrador del sistema.
          </p>
          <p style={{ fontSize: '12px', color: isDark ? 'hsl(220, 10%, 50%)' : 'hsl(220, 10%, 60%)', margin: 0 }}>
            🔒 Tus credenciales están protegidas y encriptadas
          </p>
        </div>
      </div>
    </div>
  );
}