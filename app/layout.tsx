import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '../components/layout/app-shell';

export const metadata: Metadata = {
  title: 'Customer Success Operations Hub',
  description: 'Centralized Operations Calendar & Client Command Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-blue-500 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
