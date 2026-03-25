import { useState } from 'react';
import { create } from 'zustand';
import Layout from '../../components/Layout';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

type Todo = { id: number; text: string; completed: boolean };

type TodoStore = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  search: string;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setFilter: (f: 'all' | 'active' | 'completed') => void;
  setSearch: (s: string) => void;
};

const useStore = create<TodoStore>((set) => ({
  todos: [],
  filter: 'all',
  search: '',
  addTodo: (text) => set((state) => ({ todos: [...state.todos, { id: Date.now(), text, completed: false }] })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
  })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
}));

function TodoApp() {
  const { todos, filter, search, addTodo, toggleTodo, removeTodo, setFilter, setSearch } = useStore();
  const [text, setText] = useState('');

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  }).filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  const total = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  const inputStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <Card
      padding="32px"
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Todos</h2>
        <span style={{ backgroundColor: 'var(--bg-tertiary)', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {completedCount}/{total} completed
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search todos..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')} 
          style={{ ...inputStyle, cursor: 'pointer', minWidth: '120px' }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          style={{ ...inputStyle, flex: 1 }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <Button type="submit" variant="primary">
          Add
        </Button>
      </form>

      <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredTodos.map((t, index) => (
            <li key={t.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderBottom: index < filteredTodos.length - 1 ? '1px solid var(--border)' : 'none',
              backgroundColor: t.completed ? 'var(--bg-primary)' : 'transparent',
              transition: 'background-color 0.2s ease'
            }}>
              <input 
                type="checkbox" 
                checked={t.completed} 
                onChange={() => toggleTodo(t.id)}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: 'var(--accent)'
                }}
              />
              <span style={{
                flex: 1,
                fontSize: '16px',
                textDecoration: t.completed ? 'line-through' : 'none',
                color: t.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                transition: 'all 0.2s ease'
              }}>
                {t.text}
              </span>
              <Button variant="danger" onClick={() => removeTodo(t.id)}>
                Delete
              </Button>
            </li>
          ))}
          {filteredTodos.length === 0 && (
            <li style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              {search ? 'No matching todos found' : 'Your todo list is empty'}
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
}

export default function Task6Page() {
  return (
    <Layout title="Task 6: Todo App (Zustand)" showBackButton>
      <div style={{ padding: '32px 20px', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        <TodoApp />
      </div>
    </Layout>
  );
}
