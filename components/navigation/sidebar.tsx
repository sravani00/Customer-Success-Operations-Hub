'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  Package, 
  Mail, 
  Video, 
  CheckSquare, 
  Clock, 
  FileSpreadsheet, 
  Settings,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronRight,
  Share2,
  Database,
  Briefcase,
  UserPlus
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { 
    name: 'Clients', 
    href: '/clients', 
    icon: Users,
    subItems: [
      { name: 'All Directory', href: '/clients', icon: Users },
      { name: 'Affiliate Clients', href: '/clients/affiliates', icon: Share2 },
      { name: 'Data Partners', href: '/clients/data-partners', icon: Database },
      { name: 'Consulting', href: '/clients/consulting', icon: Briefcase },
      { name: 'Leads Pipeline', href: '/clients/leads', icon: UserPlus },
    ]
  },
  { name: 'Offers', href: '/offers', icon: Package },
  { name: 'Meetings', href: '/meetings', icon: Video },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Follow-ups', href: '/follow-ups', icon: Clock },
  { name: 'Reports', href: '/reports', icon: FileSpreadsheet },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { followUps } = useAppStore();
  const [clientsExpanded, setClientsExpanded] = useState(pathname.startsWith('/clients'));

  const overdueCount = followUps.filter((f) => f.status === 'Overdue').length;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col h-screen sticky top-0 shrink-0 select-none z-20">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center space-x-3 bg-slate-950/40">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
            CS Ops Hub
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">v2.0</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Operations Center</p>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Main Menu
        </div>
        
        {NAVIGATION_ITEMS.map((item) => {
          const isClientsGroup = item.name === 'Clients';
          const isActive = isClientsGroup
            ? pathname.startsWith('/clients')
            : pathname === item.href || (pathname === '/' && item.href === '/dashboard');
          const Icon = item.icon;

          if (isClientsGroup) {
            return (
              <div key={item.name} className="space-y-1">
                <div
                  onClick={() => setClientsExpanded(!clientsExpanded)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {clientsExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                {clientsExpanded && item.subItems && (
                  <div className="pl-6 space-y-1 animate-in fade-in duration-150">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isSubActive
                              ? 'bg-blue-600 text-white font-semibold shadow-sm'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>

              {item.name === 'Follow-ups' && overdueCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {overdueCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
