'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  ExternalLink, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Calendar as CalendarIcon,
  FlaskConical,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAppStore } from '../../../lib/store';

export default function OfferDetailWorkspace() {
  const params = useParams();
  const offerId = params.id as string;
  const { offers } = useAppStore();

  const offer = offers.find((o) => o.id === offerId) || offers[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Navigation */}
      <Link 
        href="/offers"
        className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Offers Portfolio</span>
      </Link>

      {/* Offer Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold flex items-center justify-center text-xl shadow-lg">
            {offer.offerName.substring(0, 7)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{offer.offerName}</h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{offer.offerCode}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                offer.status === 'Testing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {offer.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Client: <span className="text-blue-400 font-bold">{offer.clientName}</span> • Network: <span className="font-mono text-slate-300">{offer.network}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <div className="text-right">
            <div className="text-slate-500 text-[10px]">REVENUE</div>
            <div className="text-lg font-bold text-emerald-400">${offer.revenue.toLocaleString()}</div>
          </div>
          <div className="text-right pl-4 border-l border-slate-800">
            <div className="text-slate-500 text-[10px]">EPC</div>
            <div className="text-lg font-bold text-blue-400">${offer.epc.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Offer Field Architecture (Spec Section 7 & 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Details (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Basic Info & Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400" /> Basic Offer Architecture
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">{offer.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Category</span>
                <span className="font-bold text-slate-200">{offer.category}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Owner</span>
                <span className="font-bold text-slate-200">{offer.owner}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Follow-up Date</span>
                <span className="font-bold text-amber-400">{offer.followUpDate}</span>
              </div>
            </div>
          </div>

          {/* 2. Campaign Setup */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" /> Campaign Setup & Creative Spec
            </h2>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Landing Page URL:</span>
                <a href={offer.landingPageUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-mono flex items-center gap-1">
                  {offer.landingPageUrl} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Email Creative</span>
                  <span className="font-semibold text-slate-200">{offer.emailCreative}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Subject Line</span>
                  <span className="font-semibold text-slate-200">{offer.subjectLine}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Target GEO</span>
                  <span className="font-bold text-slate-200">{offer.geo}</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Devices</span>
                  <span className="font-bold text-slate-200">{offer.device}</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">Traffic Source</span>
                  <span className="font-bold text-slate-200">{offer.trafficSource}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Performance Analytics & Testing Framework */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-purple-400" /> Testing Framework & Conversion Analytics
            </h2>

            <div className="grid grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Test Cap</div>
                <div className="text-sm font-bold text-white mt-0.5">{offer.volume.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Successful Leads</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{offer.successfulLeads.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">CPL Rate</div>
                <div className="text-sm font-bold text-blue-400 mt-0.5">${offer.cpl.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">EPC</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">${offer.epc.toFixed(2)}</div>
              </div>
            </div>

            <div className="p-3.5 bg-purple-950/20 border border-purple-900/40 rounded-xl text-xs space-y-1">
              <div className="font-bold text-purple-300">Winner Variant: {offer.winnerVariant}</div>
              <p className="text-slate-300">{offer.testResult}</p>
              <div className="text-slate-400 pt-1 font-mono">Next Test Plan: {offer.nextTestPlan}</div>
            </div>
          </div>

        </div>

        {/* Column 2: Offer Detail Activity Timeline View (Spec Section 8) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Offer Activity Timeline
              </h2>
              <span className="text-[10px] font-mono text-slate-500">Live Audit Log</span>
            </div>

            {/* Chronological Timeline matching Page 3 Spec */}
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-800">
              
              <div className="relative pl-7 text-xs space-y-1">
                <span className="w-3 h-3 rounded-full bg-blue-500 absolute left-1.5 top-1 ring-4 ring-slate-900"></span>
                <div className="font-bold text-white">Aug 17 — Client requested performance update</div>
                <p className="text-slate-400">Client email logged via auto-sync.</p>
              </div>

              <div className="relative pl-7 text-xs space-y-1">
                <span className="w-3 h-3 rounded-full bg-amber-500 absolute left-1.5 top-1 ring-4 ring-slate-900"></span>
                <div className="font-bold text-white">Aug 16 — Testing started</div>
                <p className="text-slate-400">25,000 test cap deployed on Network X.</p>
              </div>

              <div className="relative pl-7 text-xs space-y-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500 absolute left-1.5 top-1 ring-4 ring-slate-900"></span>
                <div className="font-bold text-white">Aug 15 — Offer received from client</div>
                <p className="text-slate-400">Creatives and landing pages verified.</p>
              </div>

              <div className="relative pl-7 text-xs space-y-1">
                <span className="w-3 h-3 rounded-full bg-purple-500 absolute left-1.5 top-1 ring-4 ring-slate-900"></span>
                <div className="font-bold text-white">Aug 14 — Internal team approved testing</div>
                <p className="text-slate-400">Compliance check cleared.</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
