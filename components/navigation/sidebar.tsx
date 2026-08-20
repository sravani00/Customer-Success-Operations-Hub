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
  { name: 'Emails', href: '/emails', icon: Mail, badge: 'Auto-sync' },
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

              {item.badge && item.name !== 'Follow-ups' && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Visual Taxonomy System Legend */}
      <div className="p-4 mx-3 mb-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
        <div className="flex items-center justify-between font-semibold text-slate-300 mb-2.5">
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-400">
            <Sparkles className="w-3 h-3 text-amber-400" /> Visual Taxonomy
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 font-medium text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Client Update
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-purple-500/15 text-purple-300 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Internal Update
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Meeting
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Offer
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Task
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/15 text-rose-300 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Follow-up
          </span>
        </div>
      </div>
    </aside>
  );
};
