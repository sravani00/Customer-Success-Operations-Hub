'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Plus, 
  Building, 
  Mail, 
  Phone, 
  ChevronRight,
  Share2,
  Database,
  Briefcase,
  UserPlus,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Tag,
  Check,
  X,
  Edit,
  Trash2
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { ClientSubModule, ClientSubCategory, ClientStatus, Client } from '../../types';

export default function ClientsPage() {
  const { clients, offers, updates, addClient, updateClient, deleteClient } = useAppStore();
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedSubModule, setSelectedSubModule] = useState<'All' | ClientSubModule>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Client Form state
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSubModule, setNewSubModule] = useState<ClientSubModule>('Affiliate Networks');
  const [newSubCategory, setNewSubCategory] = useState<ClientSubCategory>('Resolute');
  const [newCommMode, setNewCommMode] = useState('Email');
  const [newDescription, setNewDescription] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRole, setNewContactRole] = useState('');
  const [newMetricsSummary, setNewMetricsSummary] = useState('');

  // Sub-module counts
  const affiliateCount = clients.filter((c) => c.subModule === 'Affiliate Networks' || (c.subModule as string) === 'Affiliate Client').length;
  const dataPartnerCount = clients.filter((c) => c.subModule === 'Data Partner').length;
  const consultingCount = clients.filter((c) => c.subModule === 'Consulting').length;
  const leadCount = clients.filter((c) => c.subModule === 'Lead').length;

  // Filtered clients list
  const filteredClients = clients.filter((client) => {
    const matchesSubModule = selectedSubModule === 'All' || client.subModule === selectedSubModule || (selectedSubModule === 'Affiliate Networks' && (client.subModule as string) === 'Affiliate Client');
    const matchesSearch = 
      client.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      client.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (client.communicationMode && client.communicationMode.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (client.description && client.description.toLowerCase().includes(searchFilter.toLowerCase())) ||
      client.primaryContact.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSubModule && matchesSearch;
  });

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCompany) return;

    addClient({
      name: newName,
      company: newCompany,
      status: 'Active',
      subModule: newSubModule,
      subModuleCategory: newSubCategory,
      communicationMode: newCommMode,
      description: newDescription,
      primaryContact: {
        name: newContactName || 'Primary Contact',
        email: newContactEmail || 'contact@client.com',
        phone: newContactPhone || '+1 (555) 000-0000',
        role: newContactRole || 'Account Manager'
      },
      metricsSummary: newMetricsSummary || 'Active Account'
    });

    // Reset form
    setNewName('');
    setNewCompany('');
    setNewSubCategory('Resolute');
    setNewCommMode('Email');
    setNewDescription('');
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewContactRole('');
    setNewMetricsSummary('');
    setShowAddModal(false);
  };

  const getSubModuleBadge = (subModule: ClientSubModule) => {
    switch (subModule) {
      case 'Affiliate Networks':
      case 'Affiliate Client' as any:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Share2 className="w-3 h-3 text-blue-600" /> Affiliate Networks
          </span>
        );
      case 'Data Partner':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Database className="w-3 h-3 text-purple-600" /> Data Partner
          </span>
        );
      case 'Consulting':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Briefcase className="w-3 h-3 text-emerald-600" /> Consulting
          </span>
        );
      case 'Lead':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <UserPlus className="w-3 h-3 text-amber-600" /> Lead Pipeline
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-500/30 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Client & Partner Accounts Directory
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                4 Categories
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive management of Affiliate Networks, Data Partners, Consulting Accounts, and Lead Pipeline
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-2 shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Account</span>
        </button>
      </div>

      {/* 4 Category Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category 1: Affiliate Networks */}
        <div 
          onClick={() => setSelectedSubModule('Affiliate Networks')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Affiliate Networks'
              ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300 shadow-xs'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-mono">{affiliateCount}</span>
          </div>
          <h2 className="text-sm font-bold text-slate-900">Affiliate Networks</h2>
          <p className="text-xs text-slate-500 mt-1">Resolute & partner performance feeds</p>
        </div>

        {/* Category 2: Data Partners */}
        <div 
          onClick={() => setSelectedSubModule('Data Partner')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Data Partner'
              ? 'bg-purple-50/80 border-purple-400 ring-2 ring-purple-300 shadow-xs'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-mono">{dataPartnerCount}</span>
          </div>
          <h2 className="text-sm font-bold text-slate-900">Data Partners</h2>
          <p className="text-xs text-slate-500 mt-1">Data enrichment & validation feeds</p>
        </div>

        {/* Category 3: Consulting */}
        <div 
          onClick={() => setSelectedSubModule('Consulting')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Consulting'
              ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-300 shadow-xs'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-mono">{consultingCount}</span>
          </div>
          <h2 className="text-sm font-bold text-slate-900">Consulting</h2>
          <p className="text-xs text-slate-500 mt-1">Resolute & Ongage advisory accounts</p>
        </div>

        {/* Category 4: Leads */}
        <div 
          onClick={() => setSelectedSubModule('Lead')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Lead'
              ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-xs'
              : 'bg-white border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 font-mono">{leadCount}</span>
          </div>
          <h2 className="text-sm font-bold text-slate-900">Leads Pipeline</h2>
          <p className="text-xs text-slate-500 mt-1">Prospective deals & onboarding leads</p>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 md:pb-0 text-xs">
          {[
            { key: 'All', label: 'All Accounts', count: clients.length },
            { key: 'Affiliate Networks', label: 'Affiliate Networks', count: affiliateCount, icon: Share2 },
            { key: 'Data Partner', label: 'Data Partners', count: dataPartnerCount, icon: Database },
            { key: 'Consulting', label: 'Consulting', count: consultingCount, icon: Briefcase },
            { key: 'Lead', label: 'Leads', count: leadCount, icon: UserPlus },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedSubModule === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedSubModule(tab.key as any)}
                className={`px-3.5 py-2 rounded-xl font-semibold flex items-center space-x-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Filter Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search account name, contact..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Directory Cards Grid */}
      {filteredClients.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
          <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No Accounts Found</h3>
          <p className="text-xs text-slate-500">Try adjusting your filter or search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const clientOffers = offers.filter((o) => o.clientId === client.id);
            const clientUpdates = updates.filter((u) => u.clientId === client.id);

            return (
              <div
                key={client.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                        {client.name.replace('Client ', '')}
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">{client.name}</h2>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-slate-400" /> {client.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {getSubModuleBadge(client.subModule || ('Affiliate Networks' as any))}
                      <button
                        onClick={() => setEditingClient(client)}
                        title="Edit Account"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${client.name}?`)) {
                            deleteClient(client.id);
                          }
                        }}
                        title="Delete Account"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900 text-[11px]">
                      {client.primaryContact.name} ({client.primaryContact.role})
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200/60 pt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-600" /> {client.primaryContact.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-600" /> {client.primaryContact.phone}</span>
                    </div>
                  </div>

                  {/* Metrics Info */}
                  <div className="space-y-1 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-500">Category:</span>
                      <span className="font-bold text-blue-700 font-mono">{client.subModule}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-500">Comm Mode:</span>
                      <span className="font-bold text-slate-800 font-mono">{client.communicationMode || 'Email'}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-500">Focus Summary:</span>
                      <span className="font-semibold text-blue-700 text-[11px]">
                        {client.metricsSummary || client.subModule}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Status: <strong className="text-emerald-700">{client.status}</strong></span>
                  <Link
                    href={`/clients/${client.id}`}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <span>360° Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add New Account</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClientSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Account Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Client I"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nexus Media Group"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Account Category</label>
                  <select
                    value={newSubModule}
                    onChange={(e) => {
                      const cat = e.target.value as ClientSubModule;
                      setNewSubModule(cat);
                      if (cat === 'Affiliate Networks') setNewSubCategory('Resolute');
                      else if (cat === 'Data Partner') setNewSubCategory('Agreement');
                      else if (cat === 'Consulting') setNewSubCategory('Resolute');
                      else setNewSubCategory('General');
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Affiliate Networks">Affiliate Networks</option>
                    <option value="Data Partner">Data Partner</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Sub Category</label>
                  <select
                    value={newSubCategory}
                    onChange={(e) => setNewSubCategory(e.target.value as ClientSubCategory)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Resolute">Resolute</option>
                    <option value="Partners">Partners</option>
                    <option value="Agreement">Agreement</option>
                    <option value="Rev-Share">Rev-Share</option>
                    <option value="Ongage">Ongage</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Mode of Communication</label>
                  <select
                    value={newCommMode}
                    onChange={(e) => setNewCommMode(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Email">Email</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Slack">Slack</option>
                    <option value="Teams">Teams</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone">Phone</option>
                    <option value="Skype">Skype</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Metrics Summary / Target</label>
                  <input
                    type="text"
                    placeholder="e.g. Est. $35k Deal Value"
                    value={newMetricsSummary}
                    onChange={(e) => setNewMetricsSummary(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="block font-semibold mb-2 text-slate-500 uppercase tracking-wider text-[10px]">
                  Primary Contact Person
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Contact Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="sarah@company.com"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Contact Role</label>
                  <input
                    type="text"
                    placeholder="e.g. VP Marketing"
                    value={newContactRole}
                    onChange={(e) => setNewContactRole(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Client Description</label>
                <textarea
                  rows={2}
                  placeholder="Key account details, traffic expectations, and partnership goals..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Edit className="w-4 h-4 text-blue-600" /> Edit Account — {editingClient.name}
              </h3>
              <button
                onClick={() => setEditingClient(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateClient(editingClient.id, editingClient);
                setEditingClient(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Account Name</label>
                  <input
                    type="text"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={editingClient.company}
                    onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                    required
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Account Category</label>
                  <select
                    value={editingClient.subModule}
                    onChange={(e) => setEditingClient({ ...editingClient, subModule: e.target.value as ClientSubModule })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Affiliate Networks">Affiliate Networks</option>
                    <option value="Data Partner">Data Partner</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Sub Category</label>
                  <select
                    value={editingClient.subModuleCategory || 'General'}
                    onChange={(e) => setEditingClient({ ...editingClient, subModuleCategory: e.target.value as ClientSubCategory })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Resolute">Resolute</option>
                    <option value="Partners">Partners</option>
                    <option value="Agreement">Agreement</option>
                    <option value="Rev-Share">Rev-Share</option>
                    <option value="Ongage">Ongage</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Mode of Communication</label>
                  <select
                    value={editingClient.communicationMode || 'Email'}
                    onChange={(e) => setEditingClient({ ...editingClient, communicationMode: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Email">Email</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Slack">Slack</option>
                    <option value="Teams">Teams</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone">Phone</option>
                    <option value="Skype">Skype</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Account Status</label>
                  <select
                    value={editingClient.status}
                    onChange={(e) => setEditingClient({ ...editingClient, status: e.target.value as ClientStatus })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="block font-semibold mb-2 text-slate-500 uppercase tracking-wider text-[10px]">
                  Primary Contact Person
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Contact Name</label>
                    <input
                      type="text"
                      value={editingClient.primaryContact.name}
                      onChange={(e) => setEditingClient({
                        ...editingClient,
                        primaryContact: { ...editingClient.primaryContact, name: e.target.value }
                      })}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={editingClient.primaryContact.email}
                      onChange={(e) => setEditingClient({
                        ...editingClient,
                        primaryContact: { ...editingClient.primaryContact, email: e.target.value }
                      })}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={editingClient.primaryContact.phone}
                    onChange={(e) => setEditingClient({
                      ...editingClient,
                      primaryContact: { ...editingClient.primaryContact, phone: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Contact Role</label>
                  <input
                    type="text"
                    value={editingClient.primaryContact.role}
                    onChange={(e) => setEditingClient({
                      ...editingClient,
                      primaryContact: { ...editingClient.primaryContact, role: e.target.value }
                    })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Metrics Summary / Target</label>
                <input
                  type="text"
                  value={editingClient.metricsSummary || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, metricsSummary: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Client Description</label>
                <textarea
                  rows={2}
                  value={editingClient.description || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, description: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
