'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Plus, 
  ExternalLink, 
  Building, 
  Mail, 
  Phone, 
  Package, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function ClientsPage() {
  const { clients, offers, updates } = useAppStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Client Accounts & Profiles
            </h1>
            <p className="text-xs text-slate-400">Directory of external client organizations and 360-degree profiles</p>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clients.map((client) => {
          const clientOffers = offers.filter((o) => o.clientId === client.id);
          const clientUpdates = updates.filter((u) => u.clientId === client.id);

          return (
            <div 
              key={client.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      {client.name.replace('Client ', '')}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{client.name}</h2>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-500" /> {client.company}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    client.status === 'Onboarding' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {client.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Contact:</span>
                    <span className="font-semibold text-white">{client.primaryContact.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-400" /> {client.primaryContact.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> {client.primaryContact.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Linked Offers:</span>
                    <span className="font-bold text-amber-400 font-mono">{clientOffers.length}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Total Updates:</span>
                    <span className="font-bold text-blue-400 font-mono">{clientUpdates.length}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Industry: {client.industry}</span>
                <Link
                  href={`/clients/${client.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <span>Open 360° Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
