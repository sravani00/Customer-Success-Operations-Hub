'use client';

import React, { useState } from 'react';
import { 
  Database, 
  CreditCard, 
  Rss, 
  DollarSign, 
  FolderGit2, 
  CheckSquare, 
  FileText, 
  Building, 
  Mail, 
  Phone, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { Client, DataFeed, DataRevenueRecord, DataLogSource, DataDocument } from '../../types';
import { useAppStore } from '../../lib/store';

interface DataPartnerAccountViewProps {
  client: Client;
  onEditClient?: () => void;
}

export const DataPartnerAccountView: React.FC<DataPartnerAccountViewProps> = ({ client, onEditClient }) => {
  const { updateClient, tasks, addTask, deleteTask } = useAppStore();

  // Local interactive states initialized from client data
  const [feeds, setFeeds] = useState<DataFeed[]>(client.activeFeeds || [
    { id: 'f-1', feedName: 'B2B Tech Opt-In Feed', dataType: 'B2B Email & Phone', frequency: 'Real-time API', volume: '75,000 / mo', status: 'Active' },
    { id: 'f-2', feedName: 'Consumer Intent Stream', dataType: 'Opt-in Data', frequency: 'Daily Batch 02:00 UTC', volume: '45,000 / mo', status: 'Active' }
  ]);

  const [revenueHistory, setRevenueHistory] = useState<DataRevenueRecord[]>(client.revenueHistory || [
    { id: 'r-1', period: 'August 2026', dailyRevenue: 14200, revShareAmount: 2627, paymentStatus: 'Paid' },
    { id: 'r-2', period: 'July 2026', dailyRevenue: 18500, revShareAmount: 3422, paymentStatus: 'Paid' },
    { id: 'r-3', period: 'June 2026', dailyRevenue: 12900, revShareAmount: 2386, paymentStatus: 'Pending Settlement' }
  ]);

  const [dataLogs, setDataLogs] = useState<DataLogSource[]>(client.dataLogs || [
    { id: 'l-1', sourceName: 'S3 Ingestion Stream A', driveLocation: 's3://vortex-data-feeds/august-2026/', fileName: 'vortex_optin_20260827.csv', dataVolume: '24,500 records', validationStatus: 'Validated', date: '2026-08-27' },
    { id: 'l-2', sourceName: 'Google Drive Sync Feed', driveLocation: 'Shared Drive / Vortex / Feeds', fileName: 'vortex_intent_20260826.json', dataVolume: '18,200 records', validationStatus: 'Validated', date: '2026-08-26' }
  ]);

  const [documents, setDocuments] = useState<DataDocument[]>(client.dataDocuments || [
    { id: 'd-1', title: 'Data Processing Agreement (DPA 2026)', type: 'Agreement', date: '2026-01-15' },
    { id: 'd-2', title: 'Opt-In Consent Audit Certificate', type: 'Compliance', date: '2026-04-10' }
  ]);

  // Modal / Form trigger states
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);
  const [newFeedName, setNewFeedName] = useState('');
  const [newFeedDataType, setNewFeedDataType] = useState('Email & Phone');
  const [newFeedFrequency, setNewFeedFrequency] = useState('Daily Batch');
  const [newFeedVolume, setNewFeedVolume] = useState('50,000 / mo');

  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<'Agreement' | 'SLA' | 'Compliance' | 'Note'>('Agreement');

  const [newNoteText, setNewNoteText] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'All feeds are compliant with GDPR/CCPA explicit opt-in standard.',
    'SLA requires minimum 98% lead verification match rate on daily ingest.'
  ]);

  // Pending Tasks for this client
  const clientTasks = tasks.filter((t) => t.clientId === client.id);

  // Handlers
  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedName) return;
    const newFeed: DataFeed = {
      id: `f-${Date.now()}`,
      feedName: newFeedName,
      dataType: newFeedDataType,
      frequency: newFeedFrequency,
      volume: newFeedVolume,
      status: 'Active'
    };
    const updated = [...feeds, newFeed];
    setFeeds(updated);
    updateClient(client.id, { activeFeeds: updated });
    setNewFeedName('');
    setShowAddFeedModal(false);
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;
    const newDoc: DataDocument = {
      id: `d-${Date.now()}`,
      title: newDocTitle,
      type: newDocType,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...documents, newDoc];
    setDocuments(updated);
    updateClient(client.id, { dataDocuments: updated });
    setNewDocTitle('');
    setShowAddDocModal(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setNotesList([newNoteText.trim(), ...notesList]);
    setNewNoteText('');
  };

  const totalRevenueCalculated = revenueHistory.reduce((acc, r) => acc + r.dailyRevenue, 0);
  const totalRevShareCalculated = revenueHistory.reduce((acc, r) => acc + r.revShareAmount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* SECTION 1: ACCOUNT DETAILS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4.5 h-4.5 text-purple-600" />
            <span>1. Account Details</span>
          </h2>
          {onEditClient && (
            <button
              onClick={onEditClient}
              className="text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline"
            >
              Edit Details
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account / Company</span>
            <span className="font-bold text-slate-900 text-sm">{client.company || client.name}</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">{client.name}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Primary Contact</span>
            <span className="font-semibold text-slate-900">{client.primaryContact?.name || 'Michael Chang'}</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">{client.primaryContact?.role || 'Ops Lead'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email & Phone</span>
            <span className="font-semibold text-blue-600 block">{client.primaryContact?.email || 'contact@datapartner.com'}</span>
            <span className="text-slate-600 font-mono text-[11px]">{client.primaryContact?.phone || '+1 555-0199'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Status</span>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                client.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800'
              }`}>
                {client.status || 'Active'}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">Comm: {client.communicationMode || 'Email'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PARTNERSHIP & PAYMENT */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4.5 h-4.5 text-indigo-600" />
            <span>2. Partnership & Payment</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-gradient-to-br from-indigo-50/80 to-purple-50/50 rounded-xl border border-indigo-100 space-y-1">
            <span className="text-indigo-600 font-bold uppercase tracking-wider text-[10px]">Payment Type</span>
            <div className="text-lg font-black text-slate-900">{client.paymentType || 'Rev-Share'}</div>
            <p className="text-[11px] text-slate-500">
              {client.paymentType === 'Purchased' ? 'Fixed lead rate purchase model' : 'Percentage split revenue sharing model'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Revenue Frequency</span>
            <div className="text-lg font-bold text-slate-900">{client.revenueFrequency || 'Monthly'}</div>
            <p className="text-[11px] text-slate-500">Settlement calculation cycle</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Rev-Share Percentage</span>
            <div className="text-lg font-black text-emerald-700 font-mono">
              {client.paymentType === 'Purchased' ? 'N/A (Fixed Rate)' : `${client.revSharePercentage ?? 18.5}%`}
            </div>
            <p className="text-[11px] text-slate-500">Agreed monetization payout ratio</p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ACTIVE FEEDS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Rss className="w-4.5 h-4.5 text-purple-600" />
            <span>3. Active Feeds</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-mono font-bold border border-purple-200">
              {feeds.length} Active
            </span>
          </h2>
          <button
            onClick={() => setShowAddFeedModal(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Active Feed</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Feed Name</th>
                <th className="p-3">Data Type</th>
                <th className="p-3">Ingestion Frequency</th>
                <th className="p-3">Est. Volume</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {feeds.map((feed) => (
                <tr key={feed.id} className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {feed.feedName}
                  </td>
                  <td className="p-3 text-purple-700 font-semibold">{feed.dataType}</td>
                  <td className="p-3 font-mono text-slate-600">{feed.frequency}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">{feed.volume}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {feed.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        const updated = feeds.filter((f) => f.id !== feed.id);
                        setFeeds(updated);
                        updateClient(client.id, { activeFeeds: updated });
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove Feed"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: REVENUE & HISTORY */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4.5 h-4.5 text-emerald-600" />
            <span>4. Revenue & History</span>
          </h2>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-slate-500">Total Rev: <strong className="text-slate-900">${totalRevenueCalculated.toLocaleString()}</strong></span>
            <span className="text-slate-500">Total Payout: <strong className="text-emerald-700">${totalRevShareCalculated.toLocaleString()}</strong></span>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-3">Period / Month</th>
                <th className="p-3">Daily/Monthly Gross Rev ($)</th>
                <th className="p-3">Rev-Share Payout ($)</th>
                <th className="p-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {revenueHistory.map((rev) => (
                <tr key={rev.id} className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-900">{rev.period}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">${rev.dailyRevenue.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-700">${rev.revShareAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rev.paymentStatus === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {rev.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5: DATA SOURCE & LOGS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-4.5 h-4.5 text-blue-600" />
            <span>5. Data Source & Logs</span>
          </h2>
        </div>

        <div className="space-y-3">
          {dataLogs.map((log) => (
            <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-sm">{log.sourceName}</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px]">
                    {log.validationStatus}
                  </span>
                </div>
                <div className="text-slate-500 font-mono flex items-center gap-2 text-[11px]">
                  <span>📍 Location: {log.driveLocation}</span>
                  <span>📄 File: {log.fileName}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 font-mono text-[11px]">
                <div className="text-slate-600">
                  <span className="text-slate-400 block text-[9px] uppercase font-sans">Data Volume</span>
                  <span className="font-bold text-slate-900">{log.dataVolume}</span>
                </div>
                <div className="text-slate-600">
                  <span className="text-slate-400 block text-[9px] uppercase font-sans">Log Date</span>
                  <span className="font-bold text-slate-700">{log.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: PENDING ITEMS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4.5 h-4.5 text-amber-600" />
            <span>6. Pending Items</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">
              {clientTasks.length} Pending
            </span>
          </h2>
          <button
            onClick={() => {
              addTask({
                clientId: client.id,
                clientName: client.name,
                sourceType: 'Manual',
                title: 'Data Feed Quality Audit',
                assignedTo: 'Vamshi',
                dueDate: '2026-09-01',
                priority: 'High',
                status: 'Waiting'
              });
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Pending Task</span>
          </button>
        </div>

        {clientTasks.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-400 text-xs font-medium">
            No open pending items or SLA tasks for this Data Partner.
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            {clientTasks.map((task) => (
              <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    task.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <span className="font-semibold text-slate-900">{task.title}</span>
                    <span className="text-slate-400 text-[11px] block">Due: {task.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                    {task.status}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 7: NOTES & DOCUMENTS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-blue-600" />
            <span>7. Notes & Documents</span>
          </h2>
          <button
            onClick={() => setShowAddDocModal(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Attach Document</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents Block */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Agreements & Compliance Files
            </span>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="font-semibold text-slate-900 block">{doc.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{doc.type} • {doc.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const updated = documents.filter((d) => d.id !== doc.id);
                      setDocuments(updated);
                      updateClient(client.id, { dataDocuments: updated });
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Data-Specific Notes Block */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Data-Specific Operational Notes
            </span>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new note..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs"
              >
                Add
              </button>
            </form>

            <div className="space-y-2">
              {notesList.map((note, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <Tag className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="flex-1">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Active Feed */}
      {showAddFeedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900">Add New Active Feed</h3>
            <form onSubmit={handleAddFeed} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Feed Name</label>
                <input
                  type="text"
                  placeholder="e.g. Consumer Direct Feed C"
                  value={newFeedName}
                  onChange={(e) => setNewFeedName(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Data Type</label>
                <input
                  type="text"
                  placeholder="e.g. Email & Phone Leads"
                  value={newFeedDataType}
                  onChange={(e) => setNewFeedDataType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. Real-time API"
                    value={newFeedFrequency}
                    onChange={(e) => setNewFeedFrequency(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Volume</label>
                  <input
                    type="text"
                    placeholder="e.g. 50,000 / mo"
                    value={newFeedVolume}
                    onChange={(e) => setNewFeedVolume(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddFeedModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-semibold"
                >
                  Add Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Document */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900">Attach Document / Agreement</h3>
            <form onSubmit={handleAddDocument} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Data Processing SLA v3.pdf"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Type</label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Agreement">Agreement</option>
                  <option value="SLA">SLA</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Note">Note</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
