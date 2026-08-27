'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckSquare, 
  Clock, 
  Plus, 
  Calendar as CalendarIcon,
  Filter,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Building,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function TasksAndFollowUpsPage() {
  const { currentDate, tasks, followUps, updateTaskStatus, updateFollowUpStatus, openQuickAdd } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'followups'>('all');
  const [filterMode, setFilterMode] = useState<'date' | 'all'>('date');

  // Filter tasks
  const filteredTasks = filterMode === 'date'
    ? tasks.filter((t) => t.dueDate === currentDate)
    : tasks;

  // Filter follow-ups
  const filteredFollowUps = filterMode === 'date'
    ? followUps.filter((f) => f.dueDate === currentDate || f.reminderAt?.startsWith(currentDate))
    : followUps;

  // Count summaries
  const dueTodayTaskCount = tasks.filter((t) => t.dueDate === currentDate).length;
  const dueTodayFollowUpCount = followUps.filter((f) => f.dueDate === currentDate || f.reminderAt?.startsWith(currentDate)).length;
  const overdueFollowUpCount = followUps.filter((f) => f.status === 'Overdue').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link href="/dashboard" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3 h-3" /> Back to Operations Dashboard
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Tasks & Follow-ups
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-bold">
                Active Date: {currentDate}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Unified operational task execution and client follow-up reminder tracking matrix
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => openQuickAdd('task')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-2 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
          <button
            onClick={() => openQuickAdd('followup')}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center space-x-2 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Follow-up</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Tasks Summary */}
        <div 
          onClick={() => setActiveTab('tasks')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'tasks' 
              ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-300 shadow-xs' 
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-mono">{tasks.length}</span>
          </div>
          <h2 className="text-xs font-bold text-slate-900">Operational Tasks</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {dueTodayTaskCount} task{dueTodayTaskCount === 1 ? '' : 's'} due on {currentDate}
          </p>
        </div>

        {/* Card 2: Follow-ups Summary */}
        <div 
          onClick={() => setActiveTab('followups')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'followups' 
              ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-300 shadow-xs' 
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-mono">{followUps.length}</span>
          </div>
          <h2 className="text-xs font-bold text-slate-900">Client Follow-ups</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {dueTodayFollowUpCount} reminder{dueTodayFollowUpCount === 1 ? '' : 's'} scheduled today
          </p>
        </div>

        {/* Card 3: Priority Overdue Items */}
        <div 
          onClick={() => setActiveTab('all')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            activeTab === 'all' 
              ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-xs' 
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-amber-700 font-mono">{overdueFollowUpCount}</span>
          </div>
          <h2 className="text-xs font-bold text-slate-900">Overdue Reminders</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {overdueFollowUpCount > 0 ? 'Requires immediate action' : 'All follow-ups up to date'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs & Date Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Items ({tasks.length + followUps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'tasks'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Tasks Only ({tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('followups')}
            className={`px-4 py-2 rounded-xl font-semibold flex items-center space-x-2 whitespace-nowrap transition-all ${
              activeTab === 'followups'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Follow-ups Only ({followUps.length})</span>
          </button>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilterMode('date')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              filterMode === 'date' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Active Date: {currentDate}</span>
          </button>

          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Dates
          </button>
        </div>
      </div>

      {/* Life-cycle Legend */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-xl flex items-center justify-between text-xs font-mono shadow-xs overflow-x-auto">
        <span className="text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">Life-cycle Status:</span>
        <div className="flex items-center space-x-2 font-bold text-slate-700 whitespace-nowrap">
          <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">Not Started / Pending</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700">In Progress / Due Today</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700">Overdue</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">Completed</span>
        </div>
      </div>

      {/* Combined Table View */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="font-bold text-sm text-slate-900">
            {activeTab === 'all' && `Combined Matrix (${filterMode === 'date' ? currentDate : 'All Dates'})`}
            {activeTab === 'tasks' && `Operational Tasks (${filterMode === 'date' ? currentDate : 'All Dates'})`}
            {activeTab === 'followups' && `Client Follow-ups (${filterMode === 'date' ? currentDate : 'All Dates'})`}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">TITLE / ITEM</th>
                <th className="py-3 px-4">CLIENT</th>
                <th className="py-3 px-4">SOURCE / OFFER</th>
                <th className="py-3 px-4">OWNER</th>
                <th className="py-3 px-4">DUE DATE</th>
                <th className="py-3 px-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {/* Render Tasks if tab is 'all' or 'tasks' */}
              {(activeTab === 'all' || activeTab === 'tasks') && filteredTasks.map((t) => (
                <tr key={`task-${t.id}`} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                      <CheckSquare className="w-3 h-3 text-indigo-600" /> Task
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {t.title}
                  </td>
                  <td className="py-3.5 px-4 text-blue-700 font-semibold">{t.clientName}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{t.sourceType || 'Operational'}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{t.assignedTo}</td>
                  <td className="py-3.5 px-4 font-mono text-amber-700 font-semibold">{t.dueDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={t.status}
                      onChange={(e) => updateTaskStatus(t.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded text-xs font-bold font-mono focus:outline-none cursor-pointer ${
                        t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        t.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        t.status === 'Waiting' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <option value="Not Started" className="bg-white text-slate-900">Not Started</option>
                      <option value="In Progress" className="bg-white text-slate-900">In Progress</option>
                      <option value="Waiting" className="bg-white text-slate-900">Waiting</option>
                      <option value="Completed" className="bg-white text-slate-900">Completed</option>
                      <option value="Cancelled" className="bg-white text-slate-900">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}

              {/* Render Follow-ups if tab is 'all' or 'followups' */}
              {(activeTab === 'all' || activeTab === 'followups') && filteredFollowUps.map((f) => (
                <tr key={`followup-${f.id}`} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                      <Clock className="w-3 h-3 text-rose-600" /> Follow-up
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        f.status === 'Overdue' ? 'bg-rose-500 animate-ping' :
                        f.status === 'Due Today' ? 'bg-amber-500' :
                        f.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></span>
                      <span>{f.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-blue-700 font-semibold">{f.clientName}</td>
                  <td className="py-3.5 px-4 font-mono text-amber-700 font-semibold">{f.offerName || '—'}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{f.assignedTo}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{f.dueDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={f.status}
                      onChange={(e) => updateFollowUpStatus(f.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded text-xs font-bold font-mono focus:outline-none cursor-pointer ${
                        f.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        f.status === 'Due Today' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        f.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <option value="Pending" className="bg-white text-slate-900">Pending</option>
                      <option value="Due Today" className="bg-white text-slate-900">Due Today</option>
                      <option value="Overdue" className="bg-white text-slate-900">Overdue</option>
                      <option value="Completed" className="bg-white text-slate-900">Done / Completed</option>
                    </select>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {((activeTab === 'tasks' && filteredTasks.length === 0) ||
                (activeTab === 'followups' && filteredFollowUps.length === 0) ||
                (activeTab === 'all' && filteredTasks.length === 0 && filteredFollowUps.length === 0)) && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-500">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="font-semibold text-slate-800">No pending items found</p>
                    <p className="text-slate-400 mt-1">Try switching tabs or changing the date filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
