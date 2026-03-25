import Layout from '../../components/Layout';
import { DemoThemeProvider, useDemoTheme } from '../../components/DemoThemeProvider';

function Header() {
  const { theme, toggleTheme } = useDemoTheme();
  return (
    <header style={{
      padding: '24px',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px'
    }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold' }}>Header - <span style={{ color: 'var(--accent)' }}>{theme}</span> theme</h1>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        Toggle Theme
      </button>
    </header>
  );
}

function QuizCard() {
  return (
    <div style={{
      padding: '32px',
      backgroundColor: 'var(--bg-tertiary)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <h2 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Quiz Card</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Content goes here...</p>
    </div>
  );
}

function Footer() {
  const { theme } = useDemoTheme();
  return (
    <footer style={{
      padding: '24px',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
      textAlign: 'center'
    }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Footer - {theme} theme</p>
    </footer>
  );
}

export default function Task2Page() {
  return (
    <Layout title="Task 2: Theme Context" showBackButton>
      <DemoThemeProvider>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-lg)',
          borderRadius: '16px',
          border: '1px solid var(--border)'
        }}>
          <Header />
          <QuizCard />
          <Footer />
        </div>
      </DemoThemeProvider>
    </Layout>
  );
}
