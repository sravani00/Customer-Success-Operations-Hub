'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Calendar as CalendarIcon, 
  User, 
  Check, 
  Trash2, 
  Sparkles,
  ChevronDown,
  FileText,
  Package,
  Video,
  CheckSquare,
  Clock,
  LogOut
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const Header: React.FC = () => {
  const { 
    currentDate, 
    setCurrentDate, 
    searchQuery, 
    setSearchQuery, 
    notifications, 
    markNotificationRead,
    clearAllNotifications,
    openQuickAdd 
  } = useAppStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (e) {
      window.location.href = '/login';
    }
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm text-slate-200">
      {/* Search Input & Workspace Context */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients, meetings, tasks, follow-ups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Date Switcher & Actions */}
      <div className="flex items-center space-x-4">
        {/* Date Context Display & Stepper Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <CalendarIcon className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-slate-400 font-sans font-medium hidden sm:inline">Active Date:</span>
          
          {/* Previous Day Button */}
          <button
            title="Previous Day"
            onClick={() => {
              const dateObj = new Date(`${currentDate}T00:00:00`);
              dateObj.setDate(dateObj.getDate() - 1);
              const year = dateObj.getFullYear();
              const month = String(dateObj.getMonth() + 1).padStart(2, '0');
              const day = String(dateObj.getDate()).padStart(2, '0');
              setCurrentDate(`${year}-${month}-${day}`);
            }}
            className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold border border-slate-800 transition-colors"
          >
            ‹
          </button>

          {/* Interactive Date Input */}
          <input
            type="date"
            value={currentDate}
            onChange={(e) => e.target.value && setCurrentDate(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 text-blue-300 font-mono font-bold px-2 py-0.5 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer text-xs [color-scheme:dark]"
          />

          {/* Next Day Button */}
          <button
            title="Next Day"
            onClick={() => {
              const dateObj = new Date(`${currentDate}T00:00:00`);
              dateObj.setDate(dateObj.getDate() + 1);
              const year = dateObj.getFullYear();
              const month = String(dateObj.getMonth() + 1).padStart(2, '0');
              const day = String(dateObj.getDate()).padStart(2, '0');
              setCurrentDate(`${year}-${month}-${day}`);
            }}
            className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold border border-slate-800 transition-colors"
          >
            ›
          </button>
        </div>

        {/* Persistent Quick Add Menu (Spec Section 24) */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3.5 py-2 rounded-lg flex items-center space-x-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Add</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showQuickMenu && (
            <div 
              className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              onMouseLeave={() => setShowQuickMenu(false)}
            >
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Create Record
              </div>
              <button
                onClick={() => { openQuickAdd('update'); setShowQuickMenu(false); }}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center space-x-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>+ Client / Internal Update</span>
              </button>
              <button
                onClick={() => { openQuickAdd('offer'); setShowQuickMenu(false); }}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center space-x-2.5 transition-colors"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span>+ Promotional Offer</span>
              </button>
              <button
                onClick={() => { openQuickAdd('meeting'); setShowQuickMenu(false); }}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center space-x-2.5 transition-colors"
              >
                <Video className="w-4 h-4 text-emerald-400" />
                <span>+ Scheduled Meeting</span>
              </button>
              <button
                onClick={() => { openQuickAdd('task'); setShowQuickMenu(false); }}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center space-x-2.5 transition-colors"
              >
                <CheckSquare className="w-4 h-4 text-indigo-400" />
                <span>+ Operational Task</span>
              </button>
              <button
                onClick={() => { openQuickAdd('followup'); setShowQuickMenu(false); }}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center space-x-2.5 transition-colors"
              >
                <Clock className="w-4 h-4 text-rose-400" />
                <span>+ Action Follow-up</span>
              </button>
            </div>
          )}
        </div>

        {/* Global Notifications Bell (Spec Section 22) */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white relative transition-colors"
            title="Global System Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 text-slate-200">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-xs text-white">System Notifications</span>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[10px] text-slate-400 hover:text-rose-400 flex items-center space-x-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 text-xs cursor-pointer transition-colors ${
                        notif.read ? 'bg-slate-900 opacity-60' : 'bg-slate-950 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-blue-300">{notif.title}</span>
                        <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                      </div>
                      <p className="text-slate-300 line-clamp-2 leading-relaxed">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge & Lock Action */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/30">
            VA
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-200">Vamshi</div>
            <div className="text-[10px] text-slate-400">CS Ops Lead</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors ml-1"
            title="Lock Session / Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
