'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  Clock, 
  UserCheck,
  Send,
  Zap
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function EmailsPage() {
  const { emails, ingestEmail } = useAppStore();

  const [testSender, setTestSender] = useState('john@clienta.com');
  const [testSubject, setTestSubject] = useState('Please check the performance of Offer A.');
  const [testBody, setTestBody] = useState('Hi Vamshi,\nCould you please check conversion rates and EPC for Offer A today? We noticed a volume spike.\n\nThanks,\nJohn');
  const [actionRequired, setActionRequired] = useState(true);
  const [ingestSuccess, setIngestSuccess] = useState(false);

  const handleRunSimulator = (e: React.FormEvent) => {
    e.preventDefault();
    ingestEmail({
      sender: testSender,
      subject: testSubject,
      body: testBody,
      actionRequired
    });
    setIngestSuccess(true);
    setTimeout(() => setIngestSuccess(false), 3000);
  };

  const handleLoadPreset = (preset: 'perf' | 'offer' | 'info') => {
    if (preset === 'perf') {
      setTestSender('john@clienta.com');
      setTestSubject('Please check the performance of Offer A.');
      setTestBody('Hi Vamshi,\nPlease check the performance of Offer A and prepare an EPC breakdown.\nThanks,\nJohn');
      setActionRequired(true);
    } else if (preset === 'offer') {
      setTestSender('sarah@nexusaffiliate.com');
      setTestSubject('New Offer list for Q3 - Nexus Affiliate');
      setTestBody('Hi Team,\nWe have released 5 new e-commerce offers. Let us know cap preferences.\nRegards,\nSarah');
      setActionRequired(true);
    } else if (preset === 'info') {
      setTestSender('m.chang@vortexglobal.com');
      setTestSubject('Invoice Confirmation for August payment');
      setTestBody('Hi CS Ops,\nPayment for invoice #VG-8902 has been sent via bank transfer.\nBest,\nMichael');
      setActionRequired(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Gmail Ingestion & Automated Workflow Engine
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">Live Simulator</span>
            </h1>
            <p className="text-xs text-slate-500">Automatic ingestion of client emails eliminating manual copy-pasting</p>
          </div>
        </div>
      </div>

      {/* Visual Workflow Pipeline Diagram (Spec Section 10 & 11 Page 4) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600" /> Automated Parsing Architecture (Spec Diagram)
        </h2>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between font-mono text-xs text-slate-700">
            <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-bold text-center">
              [ Gmail Inbox ]
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-center font-medium">
              New Email Received
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-center font-medium">
              Identify Sender / Client
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-center font-medium">
              Identify Offer Context
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 font-bold text-center">
              Analyze Subject & Body
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] uppercase block w-fit border border-slate-200">
                Branch A: [ Information Only ]
              </span>
              <div className="text-slate-700 flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" /> Save Client Update record
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-200 space-y-2">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px] uppercase block w-fit border border-indigo-200">
                Branch B: [ Action Required ]
              </span>
              <div className="text-slate-700 space-y-1">
                <div className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-600" /> Save Client Update</div>
                <div className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-600" /> Auto-generate Task</div>
                <div className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-600" /> Auto-schedule Follow-up</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Form & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulator Control Panel */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> Email Ingestion Simulator
            </h2>
          </div>

          {/* Presets buttons */}
          <div className="space-y-1.5 text-xs">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Load Spec Example Presets:</span>
            <div className="flex flex-col gap-1.5">
              <button 
                type="button" 
                onClick={() => handleLoadPreset('perf')}
                className="text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-700 font-mono transition-colors"
              >
                Preset 1: "Please check performance of Offer A"
              </button>
              <button 
                type="button" 
                onClick={() => handleLoadPreset('offer')}
                className="text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-amber-700 font-mono transition-colors"
              >
                Preset 2: "New Q3 Offer list"
              </button>
              <button 
                type="button" 
                onClick={() => handleLoadPreset('info')}
                className="text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-mono transition-colors"
              >
                Preset 3: "Invoice confirmation" (Info only)
              </button>
            </div>
          </div>

          <form onSubmit={handleRunSimulator} className="space-y-3 text-xs pt-2">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Sender Email</label>
              <input
                type="email"
                value={testSender}
                onChange={(e) => setTestSender(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">Subject Line</label>
              <input
                type="text"
                value={testSubject}
                onChange={(e) => setTestSubject(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">Email Body</label>
              <textarea
                rows={4}
                value={testBody}
                onChange={(e) => setTestBody(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="actionReq"
                checked={actionRequired}
                onChange={(e) => setActionRequired(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <label htmlFor="actionReq" className="text-slate-700 font-medium">
                Action Required (Generates Task & Follow-up)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center space-x-2 shadow-xs transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Simulate Email Ingestion</span>
            </button>

            {ingestSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Email ingested successfully! Client Update, Task, and Follow-up generated.</span>
              </div>
            )}
          </form>
        </div>

        {/* Email Log Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" /> Ingested Gmail Audit Log
            </h2>
            <span className="text-xs text-slate-500 font-mono">Count: {emails.length}</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {emails.map((em) => (
              <div key={em.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{em.clientName}</span>
                    <span className="text-slate-500 font-mono text-[11px]">({em.sender})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-mono font-semibold">
                    {em.category}
                  </span>
                </div>

                <div className="text-xs font-semibold text-blue-700">{em.subject}</div>
                <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                  {em.body}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Thread: {em.gmailThreadId}</span>
                  <span className={`font-semibold ${em.actionRequired ? 'text-amber-700' : 'text-slate-500'}`}>
                    {em.actionRequired ? '⚡ Task & Follow-up Created' : 'ℹ️ Saved to Client Updates'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
