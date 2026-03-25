import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Dispatch } from 'react';
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

type Notification = { id: number; message: string; type: 'success' | 'error' | 'info' };
type State = Notification[];
type Action = 
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: number };

const NotificationContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

function notificationReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    case 'REMOVE_NOTIFICATION':
      return state.filter(n => n.id !== action.payload);
    default:
      return state;
  }
}

function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, []);
  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
      <NotificationList />
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
}

function NotificationList() {
  const { state } = useNotification();
  return (
    <div style={{ position: 'fixed', top: 90, right: 20, display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
      {state.map(n => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { dispatch } = useNotification();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, dispatch]);

  const bgColors = {
    success: 'var(--success)',
    error: 'var(--danger)',
    info: 'var(--info)'
  };

  return (
    <div
      style={{
        backgroundColor: bgColors[notification.type],
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-md)',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideIn 0.3s ease-out forwards',
        transition: 'transform 0.2s ease, opacity 0.2s ease'
      }}
      onClick={() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.opacity = '0.9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.opacity = '1';
      }}
    >
      <span>
        {notification.type === 'success' && ''}
        {notification.type === 'error' && ''}
        {notification.type === 'info' && 'ℹ'}
      </span>
      {notification.message}
    </div>
  );
}

function Demo() {
  const { dispatch } = useNotification();
  
  const notify = (type: 'success' | 'error' | 'info') => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id: Date.now() + Math.random(), message: `This is a ${type} message!`, type }
    });
  };

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="success" onClick={() => notify('success')}>
        Success
      </Button>
      <Button variant="danger" onClick={() => notify('error')}>
        Error
      </Button>
      <Button variant="info" onClick={() => notify('info')}>
        Info
      </Button>
    </div>
  );
}

export default function Task3Page() {
  return (
    <Layout title="Task 3: Notification System" showBackButton>
      <NotificationProvider>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Card padding="32px" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Click to add notification</h2>
            <Demo />
          </Card>
        </div>
      </NotificationProvider>
    </Layout>
  );
}
