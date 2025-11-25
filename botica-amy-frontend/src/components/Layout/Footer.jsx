export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        padding: '12px 20px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <span>© {new Date().getFullYear()} Botica AMY</span>
      <span>Desarrollado con ❤️</span>
    </footer>
  );
}