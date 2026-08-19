'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  Plus, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function OffersPage() {
  const { offers, openQuickAdd } = useAppStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Promotional Offers & Campaign Workspace
            </h1>
            <p className="text-xs text-slate-400">Lifecycle tracking for affiliate links, caps, test variants, and EPC analytics</p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('offer')}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-amber-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Sample Offer List Table (Spec Section 7 & 8) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="font-bold text-sm text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" /> Active Campaign Portfolio
          </h2>
          <span className="text-xs text-slate-400 font-mono">Total Offers: {offers.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">OFFER</th>
                <th className="py-3 px-4">CLIENT</th>
                <th className="py-3 px-4">NETWORK</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">VOLUME (CAP)</th>
                <th className="py-3 px-4">REVENUE</th>
                <th className="py-3 px-4">FOLLOW-UP</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>{offer.offerName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-blue-300 font-semibold">{offer.clientName}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{offer.network}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                      offer.status === 'Testing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      offer.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-200">{offer.volume.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">${offer.revenue.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{offer.followUpDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/offers/${offer.id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold inline-flex items-center space-x-1"
                    >
                      <span>Workspace</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
