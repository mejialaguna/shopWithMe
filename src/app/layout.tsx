import type { Metadata } from 'next';
import { inter } from '../config/font';
import './globals.css';

export const metadata: Metadata = {
  title: 'shop with me',
  description: 'shop and help local business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
