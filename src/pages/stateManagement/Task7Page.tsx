import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { create } from 'zustand';
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

import { DemoThemeProvider, useDemoTheme } from '../../components/DemoThemeProvider';
import { DemoAuthProvider, useDemoAuth } from '../../components/DemoAuthProvider';

// 3. Cart useReducer
type Product = { id: number; name: string; price: number };
type CartItem = Product & { quantity: number };
type Action = 
  | { type: 'ADD'; payload: Product } 
  | { type: 'REMOVE'; payload: number } 
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR' };

const CartContext = createContext<{ cart: CartItem[]; dispatch: React.Dispatch<Action> } | undefined>(undefined);
function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.payload.id);
      return exists ? state.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i) : [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE': return state.filter(i => i.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
    case 'CLEAR': return [];
    default: return state;
  }
}
function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
}
function useCart() { const ctx = useContext(CartContext); if (!ctx) throw new Error('CartError'); return ctx; }

// 4. Products Zustand
type ProductStore = { products: Product[] };
const useProductsStore = create<ProductStore>(() => ({
  products: [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 }
  ]
}));

function ECommerceApp() {
  const { isDark, toggle } = useDemoTheme();
  const { user, login, logout } = useDemoAuth();
  const { cart, dispatch } = useCart();
  const { products } = useProductsStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card
      padding="32px"
      style={{
        backgroundColor: isDark ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <header style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        gap: '16px'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Mini Shop</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500 }}>
            {user ? <span style={{ color: 'var(--accent)' }}>Hello, {user}</span> : <span style={{ color: 'var(--text-secondary)' }}>Guest</span>}
          </span>
          <Button variant="primary" onClick={user ? logout : login}>
            {user ? 'Logout' : 'Login'}
          </Button>
          <Button variant="secondary" onClick={toggle}>
            Toggle Theme
          </Button>
          <div style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span></span>
            <span>{cart.reduce((acc, i) => acc + i.quantity, 0)} items (${total})</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Products</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {products.map(p => (
              <div key={p.id} style={{
                padding: '20px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>
                  <strong style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }}>{p.name}</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>${p.price}</span>
                </div>
                <Button variant="primary" onClick={() => dispatch({ type: 'ADD', payload: p })}>
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Your Cart</h3>
          {cart.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontStyle: 'italic', border: '2px dashed var(--border)', borderRadius: '8px', padding: '32px' }}>
              Your cart is empty
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                {cart.map(i => (
                  <div key={i.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '16px'
                  }}>
                    <div>
                      <strong style={{ display: 'block' }}>{i.name}</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>${i.price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: i.id, quantity: Math.max(1, i.quantity - 1) } })}
                          style={{ borderRadius: 0, minWidth: '30px', padding: '4px 8px' }}
                        >-</Button>
                        <span style={{ color: 'var(--text-primary)', padding: '0 8px', fontWeight: 600, minWidth: '2ch', textAlign: 'center' }}>{i.quantity}</span>
                        <Button
                          variant="ghost"
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: i.id, quantity: i.quantity + 1 } })}
                          style={{ borderRadius: 0, minWidth: '30px', padding: '4px 8px' }}
                        >+</Button>
                      </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 'bold' }}>${(i.price * i.quantity).toFixed(2)}</span>
                          <Button 
                            variant="danger"
                            title="Remove"
                            onClick={() => dispatch({ type: 'REMOVE', payload: i.id })}
                            style={{ padding: '8px' }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </Button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Total:</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>${total}</span>
              </div>
              <Button 
                variant={user ? 'success' : 'secondary'}
                onClick={() => { alert('Checkout successful!'); dispatch({ type: 'CLEAR' }) }} 
                disabled={!user} 
                style={{ marginTop: '24px', padding: '16px', width: '100%', fontSize: '16px' }}
              >
                {user ? 'Checkout' : 'Login to Checkout'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function Task7Page() {
  return (
    <Layout title="Task 7: Mini E-commerce" showBackButton>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 0' }}>
        <DemoThemeProvider>
          <DemoAuthProvider>
            <CartProvider>
              <ECommerceApp />
            </CartProvider>
          </DemoAuthProvider>
        </DemoThemeProvider>
      </div>
    </Layout>
  );
}
