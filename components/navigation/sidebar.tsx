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
  { 
    name: 'Clients', 
    href: '/clients', 
    icon: Users,
    subItems: [
      { name: 'All Directory', href: '/clients', icon: Users },
      { 
        name: 'Affiliate Networks', 
        href: '/clients/affiliates', 
        icon: Share2,
        children: [
          { name: 'Resolute', href: '/clients/affiliates/resolute' },
          { name: 'Partners', href: '/clients/affiliates/partners' }
        ]
      },
      { 
        name: 'Data Partners', 
        href: '/clients/data-partners', 
        icon: Database,
        children: [
          { name: 'Agreement', href: '/clients/data-partners/agreement' },
          { name: 'Rev-Share', href: '/clients/data-partners/rev-share' }
        ]
      },
      { 
        name: 'Consulting', 
        href: '/clients/consulting', 
        icon: Briefcase,
        children: [
          { name: 'Resolute', href: '/clients/consulting/resolute' },
          { name: 'Ongage', href: '/clients/consulting/ongage' }
        ]
      },
      { name: 'Leads Pipeline', href: '/clients/leads', icon: UserPlus },
    ]
  },
  { name: 'Offers', href: '/offers', icon: Package },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Meetings', href: '/meetings', icon: Video },
  { name: 'Tasks & Follow-ups', href: '/tasks', icon: CheckSquare },
  { name: 'Reports', href: '/reports', icon: FileSpreadsheet },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { followUps } = useAppStore();
  const [clientsExpanded] = useState(true);

  const overdueCount = followUps.filter((f) => f.status === 'Overdue').length;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 text-slate-700 flex flex-col h-screen sticky top-0 shrink-0 select-none z-20 shadow-xs">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 flex items-center space-x-3 bg-slate-50/80">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
            CS Ops Hub
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">v2.0</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Operations Center</p>
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
                <Link
                  href="/clients"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-600 font-bold" />
                </Link>

                {item.subItems && (
                  <div className="pl-5 space-y-1 animate-in fade-in duration-150 border-l-2 border-slate-100 ml-3.5 pt-1">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      const SubIcon = sub.icon;
                      const hasChildren = sub.children && sub.children.length > 0;
                      return (
                        <div key={sub.name} className="space-y-1">
                          <Link
                            href={sub.href}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSubActive
                                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <SubIcon className="w-3.5 h-3.5 shrink-0" />
                              <span>{sub.name}</span>
                            </div>
                            {hasChildren && <ChevronDown className="w-3 h-3 opacity-60" />}
                          </Link>

                          {/* Nested Sub-modules (Resolute, Partners, Ongage) */}
                          {hasChildren && (
                            <div className="pl-5 space-y-1 border-l border-slate-200 ml-3.5">
                              {sub.children.map((child) => {
                                const isChildActive = pathname === child.href;
                                return (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className={`block px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                                      isChildActive
                                        ? 'bg-blue-100 text-blue-800 font-bold border border-blue-200'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                  >
                                    └ {child.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
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
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>

              {item.name === 'Follow-ups' && overdueCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
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
