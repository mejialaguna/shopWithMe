import type { Metadata } from 'next';
import { inter } from '../config/font';
import './globals.css';
import { Provider } from '@/components';

// adding a custom template for all pages , were i am adding dinamic metadata (like the one inside on product/slug/page -- route) the %s is the place holder for what getting added when adding the dinamic metadata
export const metadata: Metadata = {
  title: {
    template: ' %s - shop with us',
    default: 'Home - shop with us',
  },
  description: 'shop and help local business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
