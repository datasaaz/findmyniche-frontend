import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'SaaS MVP',
  description: 'MVP frontend with Firebase Auth and Stripe Checkout paywall',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Providers>
          <div className="mx-auto min-h-screen max-w-6xl px-4 py-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
