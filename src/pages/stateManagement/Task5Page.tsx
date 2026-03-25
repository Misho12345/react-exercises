import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import Layout from '../../components/Layout';
import { DemoThemeProvider, useDemoTheme } from '../../components/DemoThemeProvider';
import { DemoAuthProvider, useDemoAuth } from '../../components/DemoAuthProvider';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const LanguageContext = createContext<{ lang: string; setLang: (l: string) => void } | undefined>(undefined);

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState('en');
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}

function Dashboard() {
  const { theme, toggleTheme } = useDemoTheme();
  const { user, login, logout } = useDemoAuth();
  const { lang, setLang } = useLanguage();

  const isDark = theme === 'dark';
  const texts = {
    en: { welcome: 'Welcome', guest: 'Guest', changeLang: 'Language', changeTheme: 'Toggle Theme', login: 'Login', logout: 'Logout' },
    bg: { welcome: 'Добре дошли', guest: 'Гост', changeLang: 'Език', changeTheme: 'Смени Темата', login: 'Вход', logout: 'Изход' }
  };

  const t = lang === 'en' ? texts.en : texts.bg;

  return (
    <Card
      padding="32px"
      style={{
        backgroundColor: isDark ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        minHeight: '300px',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: user ? 'var(--accent)' : 'var(--bg-primary)',
          border: '2px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: user ? '#fff' : 'var(--text-secondary)'
        }}>
          {user ? '' : '?' }
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{t.welcome},</h2>
          <p style={{ margin: 0, fontSize: '20px', color: 'var(--text-secondary)' }}>{user || t.guest}!</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', backgroundColor: 'var(--bg-primary)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <Button variant="primary" onClick={user ? logout : login}>
          {user ? t.logout : t.login}
        </Button>
        <Button variant="secondary" onClick={toggleTheme}>
          {t.changeTheme}
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{t.changeLang}:</span>
          <select 
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }} 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en"> English</option>
            <option value="bg"> Български</option>
          </select>
        </div>
      </div>
    </Card>
  );
}

export default function Task5Page() {
  return (
    <Layout title="Task 5: Multi-Context Dashboard" showBackButton>
      <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
        <DemoThemeProvider>
          <DemoAuthProvider>
            <LanguageProvider>
              <Dashboard />
            </LanguageProvider>
          </DemoAuthProvider>
        </DemoThemeProvider>
      </div>
    </Layout>
  );
}
