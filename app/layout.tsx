import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '../components/navigation/sidebar';
import { Header } from '../components/navigation/header';
import { QuickAddModal } from '../components/modals/quick-add-modal';

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
      <body className="bg-slate-950 text-slate-100 min-h-screen flex overflow-x-hidden">
        {/* Persistent Left Sidebar (Spec Section 1) */}
        <Sidebar />

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Top Contextual Header (Spec Section 1 & 24) */}
          <Header />

          {/* Main Workspace (Contextual View Content) */}
          <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
            {children}
          </main>
        </div>

        {/* Persistent Quick Add Dialog */}
        <QuickAddModal />
      </body>
    </html>
  );
}
