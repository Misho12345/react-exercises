import { useReducer } from 'react';
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

type State = { count: number; history: string[] };
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'INCREMENT_BY'; payload: number };

const initialState: State = { count: 0, history: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1, history: [...state.history, 'INCREMENT'].slice(-20) };
    case 'DECREMENT':
      return { count: state.count - 1, history: [...state.history, 'DECREMENT'].slice(-20) };
    case 'RESET':
      return { count: 0, history: [...state.history, 'RESET'].slice(-20) };
    case 'INCREMENT_BY':
      return { count: state.count + action.payload, history: [...state.history, `INCREMENT_BY ${action.payload}`].slice(-20) };
    default:
      return state;
  }
}

export default function Task1Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Layout title="Task 1: Counter with useReducer" showBackButton>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card padding="32px" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
            Counter: <span style={{ color: 'var(--accent)' }}>{state.count}</span>
          </h2>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              onClick={() => dispatch({ type: 'INCREMENT' })}
              style={{ flex: '1 1 auto', minWidth: '120px' }}
            >
              Increment
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch({ type: 'DECREMENT' })}
              style={{ flex: '1 1 auto', minWidth: '120px' }}
            >
              Decrement
            </Button>
            <Button
              variant="secondary"
              onClick={() => dispatch({ type: 'RESET' })}
              style={{ flex: '1 1 auto', minWidth: '120px' }}
            >
              Reset
            </Button>
            <Button
              variant="success"
              onClick={() => dispatch({ type: 'INCREMENT_BY', payload: 5 })}
              style={{ flex: '1 1 auto', minWidth: '120px' }}
            >
              Increment by 5
            </Button>
          </div>

          <Card
            padding="24px"
            style={{
              marginTop: '24px',
              borderRadius: '12px',
              borderWidth: '1px',
              boxShadow: 'none'
            }}
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>History:</h3>
            {state.history.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No actions yet</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {state.history.map((action, index) => (
                  <li key={index} style={{
                    color: 'var(--text-secondary)',
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: 'var(--accent)', marginRight: '8px', fontWeight: 'bold' }}>{index + 1}.</span>
                    {action}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Card>
      </div>
    </Layout>
  );
}
