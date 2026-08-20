'use client';

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  UserCheck, 
  Mail, 
  Video, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export default function TasksPage() {
  const { currentDate, tasks, updateTaskStatus, openQuickAdd } = useAppStore();
  const [filterMode, setFilterMode] = useState<'date' | 'all'>('date');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Operational Task Management
            </h1>
            <p className="text-xs text-slate-400">Ensures zero missed commitments by linking updates, emails, and meetings to explicit tasks</p>
          </div>
        </div>

        <button
          onClick={() => openQuickAdd('task')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Task</span>
        </button>
      </div>

      {/* Task List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h2 className="font-bold text-sm text-white">Active Operational Tasks</h2>
          <span className="text-xs text-slate-400 font-mono">Count: {tasks.length}</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-slate-950/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{task.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                    Source: {task.sourceType}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Client: <span className="text-blue-400">{task.clientName}</span> • Assigned to: <span className="text-slate-200">{task.assignedTo}</span> • Due: <span className="text-amber-400">{task.dueDate}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-lg text-xs p-2 text-slate-200 font-semibold focus:border-blue-500 focus:outline-none"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
