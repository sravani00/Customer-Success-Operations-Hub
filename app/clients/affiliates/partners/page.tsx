'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, Building, Mail, Phone, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../../../../lib/store';

export default function PartnersAffiliateNetworksPage() {
  const { clients, updates } = useAppStore();

  const partnerClients = clients.filter((c) => 
    (c.subModule === 'Affiliate Networks' || (c.subModule as string) === 'Affiliate Client') && 
    c.subModuleCategory === 'Partners'
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link href="/clients/affiliates" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3 h-3" /> Back to Affiliate Networks
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Affiliate Networks — Partners
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                {partnerClients.length} Accounts
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Strategic publisher partners, co-registered affiliate networks, and joint venture accounts
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnerClients.map((client) => {
          const clientUpdates = updates.filter((u) => u.clientId === client.id);

          return (
            <div 
              key={client.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {client.name.replace('Client ', '')}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">{client.name}</h2>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {client.company}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {client.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Primary Contact:</span>
                    <span className="font-semibold text-slate-900">{client.primaryContact.name} ({client.primaryContact.role})</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200/60">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600" /> {client.primaryContact.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {client.primaryContact.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Channel Type:</span>
                    <span className="font-bold text-blue-700 font-mono">Partners</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Total Updates:</span>
                    <span className="font-bold text-blue-700 font-mono">{clientUpdates.length}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">{client.metricsSummary}</span>
                <Link
                  href={`/clients/${client.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
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
