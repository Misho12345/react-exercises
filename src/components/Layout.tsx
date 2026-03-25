import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
}

export default function Layout({ children, title, showBackButton = false }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <header style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {showBackButton && (
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid var(--border)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontSize: '16px' }}>←</span>
              Back
            </Link>
          )}
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h2>
        </div>

        <button
          onClick={toggleTheme}
          style={{
            position: 'relative',
            width: '68px',
            height: '34px',
            borderRadius: '17px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '2px solid var(--border)',
            padding: '3px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '3px',
            left: theme === 'light' ? '3px' : '34px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: theme === 'light' ? 'var(--warning)' : '#818cf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'var(--shadow-md)',
          }}>
            {theme === 'light' ? '' : ''}
          </div>
        </button>
      </header>
      <main style={{
        padding: '48px 32px',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 74px)',
      }}>
        {children}
      </main>
    </div>
  );
}
