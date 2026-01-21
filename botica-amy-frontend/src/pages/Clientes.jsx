import { useState } from 'react';
import ClienteList from '../components/Clientes/ClienteList';
import { getThemeColors } from '../hooks/useDarkMode';
import './Clientes.css';

export default function Clientes() {
  const colors = getThemeColors();

  return (
    <div className="fade-in" style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          marginBottom: '8px',
          color: colors.textHeading,
          fontWeight: '800',
          fontSize: '36px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(160, 65%, 50%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Base de Datos de Clientes</h1>
        <p style={{
          color: colors.textSecondary,
          fontSize: '16px',
          margin: 0
        }}>
          Gestiona la información de tus clientes
        </p>
      </div>
      <ClienteList />
    </div>
  );
} 