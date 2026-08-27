'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '../navigation/sidebar';
import { Header } from '../navigation/header';
import { QuickAddModal } from '../modals/quick-add-modal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoginPage = pathname === '/login';

  // Prevent layout hydration mismatch during SSR
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <main className="min-h-screen w-full bg-slate-50 text-slate-900">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen flex overflow-x-hidden w-full bg-slate-50 text-slate-900">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Contextual Header */}
        <Header />

        {/* Main Workspace View Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>

      {/* Persistent Quick Add Modal */}
      <QuickAddModal />
    </div>
  );
}
