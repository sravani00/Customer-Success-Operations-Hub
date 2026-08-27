'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building, 
  CreditCard, 
  Rss, 
  DollarSign, 
  FolderGit2, 
  CheckSquare, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Tag, 
  X,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Client, DataFeed, DataRevenueRecord, DataLogSource, DataDocument, TaskItem } from '../../types';
import { useAppStore } from '../../lib/store';

interface DataPartnerAccountViewProps {
  client: Client;
  onEditClient?: () => void;
}

export const DataPartnerAccountView: React.FC<DataPartnerAccountViewProps> = ({ client, onEditClient }) => {
  const { updateClient, tasks, addTask, updateTask, deleteTask } = useAppStore();

  // Local state synced with store client data (default to empty arrays if not present, no forced dummy values!)
  const [feeds, setFeeds] = useState<DataFeed[]>(client.activeFeeds || []);
  const [revenueHistory, setRevenueHistory] = useState<DataRevenueRecord[]>(client.revenueHistory || []);
  const [dataLogs, setDataLogs] = useState<DataLogSource[]>(client.dataLogs || []);
  const [documents, setDocuments] = useState<DataDocument[]>(client.dataDocuments || []);
  const [notesList, setNotesList] = useState<string[]>(
    client.description ? [client.description] : []
  );

  useEffect(() => {
    setFeeds(client.activeFeeds || []);
    setRevenueHistory(client.revenueHistory || []);
    setDataLogs(client.dataLogs || []);
    setDocuments(client.dataDocuments || []);
    if (client.description) {
      setNotesList([client.description]);
    }
  }, [client]);

  // Tasks for this specific client
  const clientTasks = tasks.filter((t) => t.clientId === client.id);

  // Modal State Triggers
  // 1. Feeds
  const [feedModalState, setFeedModalState] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; item?: DataFeed | null }>({
    isOpen: false,
    mode: 'add',
    item: null,
  });
  const [feedName, setFeedName] = useState('');
  const [feedDataType, setFeedDataType] = useState('');
  const [feedFrequency, setFeedFrequency] = useState('Daily Batch');
  const [feedVolume, setFeedVolume] = useState('');
  const [feedStatus, setFeedStatus] = useState<'Active' | 'Testing' | 'Paused'>('Active');

  // 2. Revenue Records
  const [revModalState, setRevModalState] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; item?: DataRevenueRecord | null }>({
    isOpen: false,
    mode: 'add',
    item: null,
  });
  const [revPeriod, setRevPeriod] = useState('');
  const [revGross, setRevGross] = useState<number>(0);
  const [revPayout, setRevPayout] = useState<number>(0);
  const [revStatus, setRevStatus] = useState<'Paid' | 'Pending Settlement' | 'In Audit'>('Paid');

  // 3. Data Logs
  const [logModalState, setLogModalState] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; item?: DataLogSource | null }>({
    isOpen: false,
    mode: 'add',
    item: null,
  });
  const [logSourceName, setLogSourceName] = useState('');
  const [logLocation, setLogLocation] = useState('');
  const [logFileName, setLogFileName] = useState('');
  const [logVolume, setLogVolume] = useState('');
  const [logValidation, setLogValidation] = useState<'Validated' | 'Processing' | 'Failed'>('Validated');
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);

  // 4. Pending Tasks
  const [taskModalState, setTaskModalState] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; item?: TaskItem | null }>({
    isOpen: false,
    mode: 'add',
    item: null,
  });
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskPriority, setTaskPriority] = useState<'High' | 'Medium' | 'Normal'>('High');
  const [taskStatus, setTaskStatus] = useState<'Waiting' | 'In Progress' | 'Completed'>('Waiting');

  // 5. Documents
  const [docModalState, setDocModalState] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; item?: DataDocument | null }>({
    isOpen: false,
    mode: 'add',
    item: null,
  });
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<'Agreement' | 'SLA' | 'Compliance' | 'Note'>('Agreement');

  // 6. Notes
  const [newNoteInput, setNewNoteInput] = useState('');

  // -------------------------------------------------------------
  // FEED HANDLERS
  // -------------------------------------------------------------
  const openFeedModal = (mode: 'add' | 'edit', item?: DataFeed) => {
    if (mode === 'edit' && item) {
      setFeedName(item.feedName);
      setFeedDataType(item.dataType);
      setFeedFrequency(item.frequency);
      setFeedVolume(item.volume);
      setFeedStatus(item.status);
      setFeedModalState({ isOpen: true, mode: 'edit', item });
    } else {
      setFeedName('');
      setFeedDataType('Email & Phone Leads');
      setFeedFrequency('Real-time API');
      setFeedVolume('50,000 / mo');
      setFeedStatus('Active');
      setFeedModalState({ isOpen: true, mode: 'add', item: null });
    }
  };

  const handleSaveFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedName) return;

    let updated: DataFeed[];
    if (feedModalState.mode === 'edit' && feedModalState.item) {
      updated = feeds.map((f) =>
        f.id === feedModalState.item!.id
          ? { ...f, feedName, dataType: feedDataType, frequency: feedFrequency, volume: feedVolume, status: feedStatus }
          : f
      );
    } else {
      const newFeed: DataFeed = {
        id: `f-${Date.now()}`,
        feedName,
        dataType: feedDataType,
        frequency: feedFrequency,
        volume: feedVolume,
        status: feedStatus,
      };
      updated = [...feeds, newFeed];
    }
    setFeeds(updated);
    updateClient(client.id, { activeFeeds: updated });
    setFeedModalState({ isOpen: false, mode: 'add', item: null });
  };

  const handleDeleteFeed = (id: string) => {
    if (!confirm('Are you sure you want to delete this feed?')) return;
    const updated = feeds.filter((f) => f.id !== id);
    setFeeds(updated);
    updateClient(client.id, { activeFeeds: updated });
  };

  // -------------------------------------------------------------
  // REVENUE RECORD HANDLERS
  // -------------------------------------------------------------
  const openRevModal = (mode: 'add' | 'edit', item?: DataRevenueRecord) => {
    if (mode === 'edit' && item) {
      setRevPeriod(item.period);
      setRevGross(item.dailyRevenue);
      setRevPayout(item.revShareAmount);
      setRevStatus(item.paymentStatus);
      setRevModalState({ isOpen: true, mode: 'edit', item });
    } else {
      setRevPeriod('August 2026');
      setRevGross(10000);
      setRevPayout(client.revSharePercentage ? (10000 * client.revSharePercentage) / 100 : 1500);
      setRevStatus('Paid');
      setRevModalState({ isOpen: true, mode: 'add', item: null });
    }
  };

  const handleSaveRevRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revPeriod) return;

    let updated: DataRevenueRecord[];
    if (revModalState.mode === 'edit' && revModalState.item) {
      updated = revenueHistory.map((r) =>
        r.id === revModalState.item!.id
          ? { ...r, period: revPeriod, dailyRevenue: revGross, revShareAmount: revPayout, paymentStatus: revStatus }
          : r
      );
    } else {
      const newRecord: DataRevenueRecord = {
        id: `r-${Date.now()}`,
        period: revPeriod,
        dailyRevenue: revGross,
        revShareAmount: revPayout,
        paymentStatus: revStatus,
      };
      updated = [newRecord, ...revenueHistory];
    }
    setRevenueHistory(updated);
    updateClient(client.id, { revenueHistory: updated });
    setRevModalState({ isOpen: false, mode: 'add', item: null });
  };

  const handleDeleteRevRecord = (id: string) => {
    if (!confirm('Are you sure you want to delete this revenue record?')) return;
    const updated = revenueHistory.filter((r) => r.id !== id);
    setRevenueHistory(updated);
    updateClient(client.id, { revenueHistory: updated });
  };

  // -------------------------------------------------------------
  // DATA LOG HANDLERS
  // -------------------------------------------------------------
  const openLogModal = (mode: 'add' | 'edit', item?: DataLogSource) => {
    if (mode === 'edit' && item) {
      setLogSourceName(item.sourceName);
      setLogLocation(item.driveLocation);
      setLogFileName(item.fileName);
      setLogVolume(item.dataVolume);
      setLogValidation(item.validationStatus);
      setLogDate(item.date);
      setLogModalState({ isOpen: true, mode: 'edit', item });
    } else {
      setLogSourceName('Ingestion Feed');
      setLogLocation('s3://data-feeds/');
      setLogFileName('feed_data.csv');
      setLogVolume('10,000 records');
      setLogValidation('Validated');
      setLogDate(new Date().toISOString().split('T')[0]);
      setLogModalState({ isOpen: true, mode: 'add', item: null });
    }
  };

  const handleSaveDataLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logSourceName) return;

    let updated: DataLogSource[];
    if (logModalState.mode === 'edit' && logModalState.item) {
      updated = dataLogs.map((l) =>
        l.id === logModalState.item!.id
          ? { ...l, sourceName: logSourceName, driveLocation: logLocation, fileName: logFileName, dataVolume: logVolume, validationStatus: logValidation, date: logDate }
          : l
      );
    } else {
      const newLog: DataLogSource = {
        id: `l-${Date.now()}`,
        sourceName: logSourceName,
        driveLocation: logLocation,
        fileName: logFileName,
        dataVolume: logVolume,
        validationStatus: logValidation,
        date: logDate,
      };
      updated = [newLog, ...dataLogs];
    }
    setDataLogs(updated);
    updateClient(client.id, { dataLogs: updated });
    setLogModalState({ isOpen: false, mode: 'add', item: null });
  };

  const handleDeleteDataLog = (id: string) => {
    if (!confirm('Are you sure you want to delete this log source entry?')) return;
    const updated = dataLogs.filter((l) => l.id !== id);
    setDataLogs(updated);
    updateClient(client.id, { dataLogs: updated });
  };

  // -------------------------------------------------------------
  // PENDING TASK HANDLERS
  // -------------------------------------------------------------
  const openTaskModal = (mode: 'add' | 'edit', item?: TaskItem) => {
    if (mode === 'edit' && item) {
      setTaskTitle(item.title);
      setTaskDueDate(item.dueDate);
      setTaskPriority((item.priority as any) || 'High');
      setTaskStatus((item.status as any) || 'Waiting');
      setTaskModalState({ isOpen: true, mode: 'edit', item });
    } else {
      setTaskTitle('');
      setTaskDueDate(new Date().toISOString().split('T')[0]);
      setTaskPriority('High');
      setTaskStatus('Waiting');
      setTaskModalState({ isOpen: true, mode: 'add', item: null });
    }
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    if (taskModalState.mode === 'edit' && taskModalState.item) {
      updateTask(taskModalState.item.id, {
        title: taskTitle,
        dueDate: taskDueDate,
        priority: taskPriority,
        status: taskStatus as any,
      });
    } else {
      addTask({
        clientId: client.id,
        clientName: client.name,
        sourceType: 'Manual',
        title: taskTitle,
        assignedTo: 'Vamshi',
        dueDate: taskDueDate,
        priority: taskPriority,
        status: taskStatus as any,
      });
    }
    setTaskModalState({ isOpen: false, mode: 'add', item: null });
  };

  // -------------------------------------------------------------
  // DOCUMENT HANDLERS
  // -------------------------------------------------------------
  const openDocModal = (mode: 'add' | 'edit', item?: DataDocument) => {
    if (mode === 'edit' && item) {
      setDocTitle(item.title);
      setDocType(item.type);
      setDocModalState({ isOpen: true, mode: 'edit', item });
    } else {
      setDocTitle('');
      setDocType('Agreement');
      setDocModalState({ isOpen: true, mode: 'add', item: null });
    }
  };

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    let updated: DataDocument[];
    if (docModalState.mode === 'edit' && docModalState.item) {
      updated = documents.map((d) =>
        d.id === docModalState.item!.id ? { ...d, title: docTitle, type: docType } : d
      );
    } else {
      const newDoc: DataDocument = {
        id: `d-${Date.now()}`,
        title: docTitle,
        type: docType,
        date: new Date().toISOString().split('T')[0],
      };
      updated = [...documents, newDoc];
    }
    setDocuments(updated);
    updateClient(client.id, { dataDocuments: updated });
    setDocModalState({ isOpen: false, mode: 'add', item: null });
  };

  const handleDeleteDocument = (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    updateClient(client.id, { dataDocuments: updated });
  };

  // -------------------------------------------------------------
  // NOTES HANDLERS
  // -------------------------------------------------------------
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    const updated = [newNoteInput.trim(), ...notesList];
    setNotesList(updated);
    updateClient(client.id, { description: updated.join(' | ') });
    setNewNoteInput('');
  };

  const handleDeleteNote = (index: number) => {
    const updated = notesList.filter((_, idx) => idx !== index);
    setNotesList(updated);
    updateClient(client.id, { description: updated.join(' | ') });
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
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Account Details</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100/80">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account / Company</span>
            <span className="font-bold text-slate-900 text-sm block mt-0.5">{client.company || client.name}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Primary Contact</span>
            <span className="font-semibold text-slate-900 block mt-0.5">{client.primaryContact?.name || 'Contact Person'}</span>
            <span className="block text-[11px] text-slate-500">{client.primaryContact?.role || 'Manager'}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email & Phone</span>
            <span className="font-semibold text-blue-600 block mt-0.5">{client.primaryContact?.email || 'email@client.com'}</span>
            <span className="text-slate-600 font-mono text-[11px]">{client.primaryContact?.phone || '+1 (555) 000-0000'}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Account Status</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
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
          {onEditClient && (
            <button
              onClick={onEditClient}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Edit Payment Specs
            </button>
          )}
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
              {client.paymentType === 'Purchased' ? 'N/A (Fixed Rate)' : `${client.revSharePercentage ?? 15}%`}
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
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-mono font-bold border border-purple-200">
              {feeds.length} Active Feeds
            </span>
          </h2>
          <button
            onClick={() => openFeedModal('add')}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Active Feed</span>
          </button>
        </div>

        {feeds.length === 0 ? (
          <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
            <Rss className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No active feeds configured yet</p>
            <p className="text-[11px] text-slate-500">Click "+ Add Active Feed" above to create and manage data streams.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Feed Name</th>
                  <th className="p-3">Data Type</th>
                  <th className="p-3">Ingestion Frequency</th>
                  <th className="p-3">Est. Volume</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
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
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        feed.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : feed.status === 'Testing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {feed.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openFeedModal('edit', feed)}
                        className="p-1 rounded bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700"
                        title="Edit Feed"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFeed(feed.id)}
                        className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700"
                        title="Delete Feed"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 4: REVENUE & HISTORY */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4.5 h-4.5 text-emerald-600" />
            <span>4. Revenue & History</span>
          </h2>
          <div className="flex items-center space-x-3">
            <div className="text-xs font-mono hidden sm:block">
              <span className="text-slate-500">Total Rev: <strong className="text-slate-900">${totalRevenueCalculated.toLocaleString()}</strong></span>
              <span className="text-slate-500 ml-3">Payout: <strong className="text-emerald-700">${totalRevShareCalculated.toLocaleString()}</strong></span>
            </div>
            <button
              onClick={() => openRevModal('add')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Revenue Record</span>
            </button>
          </div>
        </div>

        {revenueHistory.length === 0 ? (
          <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
            <DollarSign className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No revenue history logged yet</p>
            <p className="text-[11px] text-slate-500">Click "+ Add Revenue Record" above to record payout statements and settlements.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Period / Month</th>
                  <th className="p-3">Gross Revenue ($)</th>
                  <th className="p-3">Rev-Share Payout ($)</th>
                  <th className="p-3">Payment Status</th>
                  <th className="p-3 text-right">Actions</th>
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
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openRevModal('edit', rev)}
                        className="p-1 rounded bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRevRecord(rev.id)}
                        className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 5: DATA SOURCE & LOGS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-4.5 h-4.5 text-blue-600" />
            <span>5. Data Source & Logs</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">
              {dataLogs.length} Entries
            </span>
          </h2>
          <button
            onClick={() => openLogModal('add')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Log Source</span>
          </button>
        </div>

        {dataLogs.length === 0 ? (
          <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
            <FolderGit2 className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No data source logs recorded yet</p>
            <p className="text-[11px] text-slate-500">Click "+ Add Log Source" to register S3 buckets, FTP paths, or file locations.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dataLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{log.sourceName}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                      log.validationStatus === 'Validated'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : log.validationStatus === 'Processing'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {log.validationStatus}
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
                    <span>📍 Path: <strong className="text-slate-800">{log.driveLocation}</strong></span>
                    <span>📄 File: <strong className="text-slate-800">{log.fileName}</strong></span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-sans">Data Volume</span>
                    <span className="font-bold text-slate-900">{log.dataVolume}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-sans">Date</span>
                    <span className="font-bold text-slate-700">{log.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 pl-2 border-l border-slate-200">
                    <button
                      onClick={() => openLogModal('edit', log)}
                      className="p-1 rounded bg-white border border-slate-200 hover:bg-blue-100 text-slate-600 hover:text-blue-700"
                      title="Edit Log"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteDataLog(log.id)}
                      className="p-1 rounded bg-white border border-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-700"
                      title="Delete Log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 6: PENDING ITEMS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4.5 h-4.5 text-amber-600" />
            <span>6. Pending Items</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">
              {clientTasks.length} Pending
            </span>
          </h2>
          <button
            onClick={() => openTaskModal('add')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Pending Task</span>
          </button>
        </div>

        {clientTasks.length === 0 ? (
          <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
            <CheckSquare className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No open pending items or SLA tasks</p>
            <p className="text-[11px] text-slate-500">Click "+ Add Pending Task" to create action items for this Data Partner.</p>
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            {clientTasks.map((task) => (
              <div key={task.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <span className="font-semibold text-slate-900">{task.title}</span>
                    <span className="text-slate-400 text-[11px] block font-mono">Due: {task.dueDate} • Priority: {task.priority || 'Normal'}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    task.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {task.status}
                  </span>
                  <button
                    onClick={() => openTaskModal('edit', task)}
                    className="p-1 rounded bg-white border border-slate-200 hover:bg-amber-100 text-slate-600 hover:text-amber-700"
                    title="Edit Task"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 rounded bg-white border border-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-700"
                    title="Delete Task"
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
            onClick={() => openDocModal('add')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Attach Document</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents Block */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Agreements & Compliance Files ({documents.length})
            </span>
            {documents.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs font-medium">
                No documents uploaded yet.
              </div>
            ) : (
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
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openDocModal('edit', doc)}
                        className="p-1 rounded bg-white border border-slate-200 hover:bg-blue-100 text-slate-600 hover:text-blue-700"
                        title="Edit Document"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-1 rounded bg-white border border-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-700"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Operational Notes Block */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Data-Specific Operational Notes ({notesList.length})
            </span>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Type operational note..."
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs"
              >
                Add Note
              </button>
            </form>

            {notesList.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs font-medium">
                No operational notes added yet.
              </div>
            ) : (
              <div className="space-y-2">
                {notesList.map((note, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <Tag className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(idx)}
                      className="text-slate-400 hover:text-rose-600 p-0.5 shrink-0"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD / EDIT ACTIVE FEED */}
      {feedModalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                {feedModalState.mode === 'edit' ? 'Edit Active Feed' : 'Add New Active Feed'}
              </h3>
              <button onClick={() => setFeedModalState({ isOpen: false, mode: 'add', item: null })} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveFeed} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Feed Name</label>
                <input
                  type="text"
                  placeholder="e.g. Consumer Direct Feed A"
                  value={feedName}
                  onChange={(e) => setFeedName(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Data Type</label>
                <input
                  type="text"
                  placeholder="e.g. Email & Phone Leads"
                  value={feedDataType}
                  onChange={(e) => setFeedDataType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. Real-time API"
                    value={feedFrequency}
                    onChange={(e) => setFeedFrequency(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Est. Volume</label>
                  <input
                    type="text"
                    placeholder="e.g. 50,000 / mo"
                    value={feedVolume}
                    onChange={(e) => setFeedVolume(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Feed Status</label>
                <select
                  value={feedStatus}
                  onChange={(e) => setFeedStatus(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Testing">Testing</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setFeedModalState({ isOpen: false, mode: 'add', item: null })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow-xs"
                >
                  {feedModalState.mode === 'edit' ? 'Save Changes' : 'Create Feed'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT REVENUE RECORD */}
      {revModalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                {revModalState.mode === 'edit' ? 'Edit Revenue Record' : 'Add Revenue Record'}
              </h3>
              <button onClick={() => setRevModalState({ isOpen: false, mode: 'add', item: null })} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveRevRecord} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Period / Month</label>
                <input
                  type="text"
                  placeholder="e.g. August 2026"
                  value={revPeriod}
                  onChange={(e) => setRevPeriod(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Gross Revenue ($)</label>
                  <input
                    type="number"
                    step="100"
                    placeholder="10000"
                    value={revGross}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setRevGross(val);
                      if (client.revSharePercentage) {
                        setRevPayout((val * client.revSharePercentage) / 100);
                      }
                    }}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Rev-Share Payout ($)</label>
                  <input
                    type="number"
                    step="10"
                    placeholder="1500"
                    value={revPayout}
                    onChange={(e) => setRevPayout(parseFloat(e.target.value) || 0)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono font-bold focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Payment Status</label>
                <select
                  value={revStatus}
                  onChange={(e) => setRevStatus(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending Settlement">Pending Settlement</option>
                  <option value="In Audit">In Audit</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setRevModalState({ isOpen: false, mode: 'add', item: null })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow-xs"
                >
                  {revModalState.mode === 'edit' ? 'Save Record' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD / EDIT DATA LOG */}
      {logModalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                {logModalState.mode === 'edit' ? 'Edit Log Source' : 'Add Log Source'}
              </h3>
              <button onClick={() => setLogModalState({ isOpen: false, mode: 'add', item: null })} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveDataLog} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Source Name</label>
                <input
                  type="text"
                  placeholder="e.g. S3 Ingestion Feed A"
                  value={logSourceName}
                  onChange={(e) => setLogSourceName(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Path / Drive Location</label>
                  <input
                    type="text"
                    placeholder="e.g. s3://bucket/path/"
                    value={logLocation}
                    onChange={(e) => setLogLocation(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono text-[11px] focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">File Name</label>
                  <input
                    type="text"
                    placeholder="e.g. leads_batch.csv"
                    value={logFileName}
                    onChange={(e) => setLogFileName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono text-[11px] focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Data Volume</label>
                  <input
                    type="text"
                    placeholder="e.g. 25,000 records"
                    value={logVolume}
                    onChange={(e) => setLogVolume(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Log Date</label>
                  <input
                    type="date"
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Validation Status</label>
                <select
                  value={logValidation}
                  onChange={(e) => setLogValidation(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                >
                  <option value="Validated">Validated</option>
                  <option value="Processing">Processing</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setLogModalState({ isOpen: false, mode: 'add', item: null })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-xs"
                >
                  {logModalState.mode === 'edit' ? 'Save Log' : 'Create Log Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD / EDIT PENDING TASK */}
      {taskModalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                {taskModalState.mode === 'edit' ? 'Edit Pending Item' : 'Add Pending Item'}
              </h3>
              <button onClick={() => setTaskModalState({ isOpen: false, mode: 'add', item: null })} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveTask} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Task / Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g. Verify API endpoint rate limit"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-amber-500 focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Status</label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-amber-500 focus:outline-none"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setTaskModalState({ isOpen: false, mode: 'add', item: null })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold shadow-xs"
                >
                  {taskModalState.mode === 'edit' ? 'Save Item' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD / EDIT DOCUMENT */}
      {docModalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                {docModalState.mode === 'edit' ? 'Edit Document' : 'Attach Document'}
              </h3>
              <button onClick={() => setDocModalState({ isOpen: false, mode: 'add', item: null })} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveDocument} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Master SLA Agreement 2026.pdf"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                >
                  <option value="Agreement">Agreement</option>
                  <option value="SLA">SLA</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Note">Note</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setDocModalState({ isOpen: false, mode: 'add', item: null })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-xs"
                >
                  {docModalState.mode === 'edit' ? 'Save Document' : 'Attach Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
