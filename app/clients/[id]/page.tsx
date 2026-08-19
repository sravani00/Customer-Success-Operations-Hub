'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Building, 
  Mail, 
  Phone, 
  Package, 
  Video, 
  CheckSquare, 
  Clock, 
  FileText, 
  TrendingUp, 
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../../lib/store';

export default function ClientProfileHub() {
  const params = useParams();
  const clientId = params.id as string;
  const { clients, offers, emails, meetings, updates, tasks, followUps } = useAppStore();

  const client = clients.find((c) => c.id === clientId) || clients[0];
  const clientOffers = offers.filter((o) => o.clientId === client.id);
  const clientEmails = emails.filter((e) => e.clientId === client.id);
  const clientMeetings = meetings.filter((m) => m.clientId === client.id);
  const clientUpdates = updates.filter((u) => u.clientId === client.id);
  const clientTasks = tasks.filter((t) => t.clientId === client.id);
  const clientFollowUps = followUps.filter((f) => f.clientId === client.id);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'contacts' | 'offers' | 'emails' | 'meetings' | 'updates' | 'tasks' | 'followups' | 'performance'
  >('overview');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Breadcrumb */}
      <Link 
        href="/clients"
        className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Clients Directory</span>
      </Link>

      {/* Client Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xl shadow-lg">
            {client.name.replace('Client ', '')}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{client.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {client.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-slate-500" /> {client.company} • {client.industry}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs text-slate-300">
          <div>
            <div className="text-slate-500 text-[10px] uppercase font-semibold">Primary Contact</div>
            <div className="font-bold text-white">{client.primaryContact.name}</div>
            <div className="text-slate-400 text-[11px]">{client.primaryContact.email}</div>
          </div>
        </div>
      </div>

      {/* 360-Degree Tabbed Navigation (Spec Section 15) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950 text-xs font-semibold">
          {[
            { key: 'overview', label: 'Overview', icon: Building },
            { key: 'contacts', label: 'Contacts', icon: UserCheck },
            { key: 'offers', label: `Offers (${clientOffers.length})`, icon: Package },
            { key: 'emails', label: `Emails (${clientEmails.length})`, icon: Mail },
            { key: 'meetings', label: `Meetings (${clientMeetings.length})`, icon: Video },
            { key: 'updates', label: `Updates (${clientUpdates.length})`, icon: FileText },
            { key: 'tasks', label: `Tasks (${clientTasks.length})`, icon: CheckSquare },
            { key: 'followups', label: `Follow-ups (${clientFollowUps.length})`, icon: Clock },
            { key: 'performance', label: 'Performance Metrics', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-3 border-b-2 font-medium flex items-center space-x-2 shrink-0 transition-all ${
                  isActive 
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10 font-bold' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 text-xs text-slate-200">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white">Client Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500">Account Type</span>
                  <div className="text-base font-bold text-white mt-1">Enterprise Affiliate</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500">Onboarding Date</span>
                  <div className="text-base font-bold text-white mt-1 font-mono">{client.createdAt}</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500">Dedicated CS Manager</span>
                  <div className="text-base font-bold text-white mt-1">Pradeep</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-3">
              {clientOffers.map((o) => (
                <div key={o.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{o.offerName} ({o.offerCode})</div>
                    <div className="text-slate-400 mt-1">Network: {o.network} • Test Cap: {o.volume.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">{o.status}</span>
                    <div className="text-emerald-400 font-bold font-mono mt-1">${o.revenue.toLocaleString()} Rev</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="space-y-3">
              {clientUpdates.map((u) => (
                <div key={u.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{u.message}</div>
                    <div className="text-slate-500 mt-1">Subject: {u.primarySubject}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">{u.type}</span>
                </div>
              ))}
            </div>
          )}

          {['contacts', 'emails', 'meetings', 'tasks', 'followups', 'performance'].includes(activeTab) && (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Sparkles className="w-6 h-6 text-blue-400 mx-auto" />
              <div className="font-semibold text-white uppercase tracking-wider">{activeTab} tab active</div>
              <p className="text-slate-500">Filtered real-time dataset for {client.name}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
