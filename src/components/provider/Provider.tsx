'use client';

import { SessionProvider } from 'next-auth/react';

interface SessionProviderProps {
  children: React.ReactNode
}
export const Provider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
