'use client';

import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface SessionProviderProps {
  children: React.ReactNode;
}

const initialOptions = {
  clientId: process?.env?.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
  currency: 'USD',
  intent: 'capture',
};

export const Providers = ({ children }: SessionProviderProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process?.env?.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        intent: 'capture',
        currency: 'USD',
      }}
      // deferLoading={true}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
};