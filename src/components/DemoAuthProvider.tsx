import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type LocalAuthContextType = { user: string | null; login: () => void; logout: () => void };

export const LocalAuthContext = createContext<LocalAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  return (
    <LocalAuthContext.Provider value={{ user, login: () => setUser('John Doe'), logout: () => setUser(null) }}>
      {children}
    </LocalAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const ctx = useContext(LocalAuthContext);
  if (!ctx) throw new Error('useDemoAuth must be inside DemoAuthProvider');
  return ctx;
}
