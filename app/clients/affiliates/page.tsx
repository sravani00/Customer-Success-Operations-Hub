'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, Building, Mail, Phone, Package, ChevronRight, ArrowLeft, TrendingUp } from 'lucide-react';
import { useAppStore } from '../../../lib/store';

export default function AffiliateClientsPage() {
  const { clients, offers, updates } = useAppStore();

  const affiliateClients = clients.filter((c) => c.subModule === 'Affiliate Client');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link href="/clients" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back to All Clients
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Affiliate Clients Sub-Module
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                {affiliateClients.length} Accounts
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct performance advertisers, publisher networks, and email broadcast affiliates
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {affiliateClients.map((client) => {
          const clientOffers = offers.filter((o) => o.clientId === client.id);
          const clientUpdates = updates.filter((u) => u.clientId === client.id);

          return (
            <div 
              key={client.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      {client.name.replace('Client ', '')}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{client.name}</h2>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-500" /> {client.company}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {client.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Contact:</span>
                    <span className="font-semibold text-white">{client.primaryContact.name} ({client.primaryContact.role})</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/40">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-400" /> {client.primaryContact.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {client.primaryContact.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Account Focus:</span>
                    <span className="font-bold text-blue-400 font-mono">Affiliate Client</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Total Updates:</span>
                    <span className="font-bold text-blue-400 font-mono">{clientUpdates.length}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">{client.metricsSummary}</span>
                <Link
                  href={`/clients/${client.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <span>360° Profile</span>
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
