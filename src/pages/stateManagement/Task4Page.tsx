import { useReducer } from 'react';
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

type Product = { id: number; name: string; price: number };
type CartItem = Product & { quantity: number };

type State = { cart: CartItem[] };
type Action = 
  | { type: 'ADD'; payload: Product }
  | { type: 'REMOVE'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR' };

const products: Product[] = [
  { id: 1, name: 'Apple', price: 1.2 },
  { id: 2, name: 'Banana', price: 0.8 },
  { id: 3, name: 'Orange', price: 1.5 },
];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE':
      return { cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        )
      };
    case 'CLEAR':
      return { cart: [] };
    default:
      return state;
  }
}

export default function Task4Page() {
  const [state, dispatch] = useReducer(reducer, { cart: [] });

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout title="Task 4: Shopping Cart" showBackButton>
      <div style={{
        padding: '32px',
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
      }}>
        <Card padding="24px" style={{ borderRadius: '16px', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Products</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {products.map(p => (
              <div key={p.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '16px' }}>
                  {p.name} - <span style={{ color: 'var(--accent)' }}>${p.price.toFixed(2)}</span>
                </span>
                <Button variant="primary" onClick={() => dispatch({ type: 'ADD', payload: p })}>
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="24px" style={{ borderRadius: '16px', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              Cart <span style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: 'normal' }}>(Total: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>${total.toFixed(2)}</span>)</span>
            </h2>
            <Button variant="danger" onClick={() => dispatch({ type: 'CLEAR' })} disabled={state.cart.length === 0}>
              Clear Cart
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {state.cart.length === 0 ? (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--border)',
                borderRadius: '12px',
                padding: '32px',
                color: 'var(--text-secondary)'
              }}>
                <p style={{ margin: 0, fontStyle: 'italic' }}>Your cart is empty</p>
              </div>
            ) : (
              state.cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: '16px' }}>
                    <strong style={{ fontWeight: 600 }}>{item.name}</strong> - <span style={{ color: 'var(--text-secondary)' }}>${item.price.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-primary)'
                    }}>
                      <Button
                        variant="ghost"
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) } })}
                        style={{ borderRadius: 0, minWidth: '36px', padding: '8px 12px' }}
                      >
                        -
                      </Button>
                      <span style={{ color: 'var(--text-primary)', padding: '0 12px', fontWeight: 600, minWidth: '2ch', textAlign: 'center' }}>{item.quantity}</span>
                      <Button
                        variant="ghost"
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                        style={{ borderRadius: 0, minWidth: '36px', padding: '8px 12px' }}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      title="Remove item"
                      onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
                      style={{ padding: '8px', minWidth: '40px' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
