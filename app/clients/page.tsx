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
  X
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { ClientSubModule, ClientStatus } from '../../types';

export default function ClientsPage() {
  const { clients, offers, updates, addClient } = useAppStore();
  const [selectedSubModule, setSelectedSubModule] = useState<'All' | ClientSubModule>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Client Form state
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSubModule, setNewSubModule] = useState<ClientSubModule>('Affiliate Client');
  const [newIndustry, setNewIndustry] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRole, setNewContactRole] = useState('');
  const [newMetricsSummary, setNewMetricsSummary] = useState('');

  // Sub-module counts
  const affiliateCount = clients.filter((c) => c.subModule === 'Affiliate Client').length;
  const dataPartnerCount = clients.filter((c) => c.subModule === 'Data Partner').length;
  const consultingCount = clients.filter((c) => c.subModule === 'Consulting').length;
  const leadCount = clients.filter((c) => c.subModule === 'Lead').length;

  // Filtered clients list
  const filteredClients = clients.filter((client) => {
    const matchesSubModule = selectedSubModule === 'All' || client.subModule === selectedSubModule;
    const matchesSearch = 
      client.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      client.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchFilter.toLowerCase()) ||
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
      industry: newIndustry || 'Digital Operations',
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
    setNewIndustry('');
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewContactRole('');
    setNewMetricsSummary('');
    setShowAddModal(false);
  };

  const getSubModuleBadge = (subModule: ClientSubModule) => {
    switch (subModule) {
      case 'Affiliate Client':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Share2 className="w-3 h-3 text-blue-400" /> Affiliate Client
          </span>
        );
      case 'Data Partner':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Database className="w-3 h-3 text-purple-400" /> Data Partner
          </span>
        );
      case 'Consulting':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <Briefcase className="w-3 h-3 text-emerald-400" /> Consulting
          </span>
        );
      case 'Lead':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <UserPlus className="w-3 h-3 text-amber-400" /> Lead Pipeline
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-500/30 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Client & Partner Accounts Directory
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                4 Sub-Modules
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive management of Affiliate Clients, Data Partners, Consulting Accounts, and Lead Pipeline
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Account</span>
        </button>
      </div>

      {/* 4 Sub-Module Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sub-Module 1: Affiliate Clients */}
        <div 
          onClick={() => setSelectedSubModule('Affiliate Client')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Affiliate Client'
              ? 'bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/30 shadow-lg shadow-blue-950/50'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white font-mono">{affiliateCount}</span>
          </div>
          <h2 className="text-sm font-bold text-white">Affiliate Clients</h2>
          <p className="text-xs text-slate-400 mt-1">Direct performance advertisers & publishers</p>
        </div>

        {/* Sub-Module 2: Data Partners */}
        <div 
          onClick={() => setSelectedSubModule('Data Partner')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Data Partner'
              ? 'bg-purple-950/40 border-purple-500/80 ring-1 ring-purple-500/30 shadow-lg shadow-purple-950/50'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white font-mono">{dataPartnerCount}</span>
          </div>
          <h2 className="text-sm font-bold text-white">Data Partners</h2>
          <p className="text-xs text-slate-400 mt-1">Data enrichment & validation feeds</p>
        </div>

        {/* Sub-Module 3: Consulting */}
        <div 
          onClick={() => setSelectedSubModule('Consulting')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Consulting'
              ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/50'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white font-mono">{consultingCount}</span>
          </div>
          <h2 className="text-sm font-bold text-white">Consulting</h2>
          <p className="text-xs text-slate-400 mt-1">Strategic ops & advisory accounts</p>
        </div>

        {/* Sub-Module 4: Leads */}
        <div 
          onClick={() => setSelectedSubModule('Lead')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedSubModule === 'Lead'
              ? 'bg-amber-950/40 border-amber-500/80 ring-1 ring-amber-500/30 shadow-lg shadow-amber-950/50'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white font-mono">{leadCount}</span>
          </div>
          <h2 className="text-sm font-bold text-white">Leads Pipeline</h2>
          <p className="text-xs text-slate-400 mt-1">Prospective deals & onboarding leads</p>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        {/* Sub-Module Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 md:pb-0 text-xs">
          {[
            { key: 'All', label: 'All Accounts', count: clients.length },
            { key: 'Affiliate Client', label: 'Affiliate Clients', count: affiliateCount, icon: Share2 },
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
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search accounts or contacts..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClients.length === 0 ? (
          <div className="col-span-2 p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No accounts found</h3>
            <p className="text-xs text-slate-400">Try adjusting your sub-module filter or search criteria.</p>
          </div>
        ) : (
          filteredClients.map((client) => {
            const clientOffers = offers.filter((o) => o.clientId === client.id);
            const clientUpdates = updates.filter((u) => u.clientId === client.id);

            return (
              <div 
                key={client.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Account Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-blue-500/20">
                        {client.name.replace('Client ', '')}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                          {client.name}
                        </h2>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-slate-500" /> {client.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {getSubModuleBadge(client.subModule || 'Affiliate Client')}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        client.status === 'Onboarding' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                  </div>

                  {/* Primary Contact Details */}
                  <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Primary Contact:</span>
                      <span className="font-semibold text-white">{client.primaryContact.name} ({client.primaryContact.role})</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/40">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-400" /> {client.primaryContact.email}</span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {client.primaryContact.phone}</span>
                    </div>
                  </div>

                  {/* Metrics & Sub-Module Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Account Type:</span>
                      <span className="font-bold text-blue-400 font-mono">{client.subModule}</span>
                    </div>
                    <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Sub-Module Focus:</span>
                      <span className="font-semibold text-blue-300 text-[11px] truncate max-w-[110px]">
                        {client.metricsSummary || client.subModule}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Industry: {client.industry}</span>
                  <Link
                    href={`/clients/${client.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Open 360° Profile</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h2 className="text-base font-bold text-white">Create New Client Account</h2>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClientSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Account Code / Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Client I"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nexus Media Group"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Sub-Module Category</label>
                  <select
                    value={newSubModule}
                    onChange={(e) => setNewSubModule(e.target.value as ClientSubModule)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Affiliate Client">Affiliate Client</option>
                    <option value="Data Partner">Data Partner</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. E-Commerce / SaaS"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="block font-semibold mb-2 text-slate-400 uppercase tracking-wider text-[10px]">
                  Primary Contact Person
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-300">Contact Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-300">Email Address</label>
                    <input
                      type="email"
                      placeholder="sarah@company.com"
                      value={newContactEmail}
                      onChange={(e) => setNewContactEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Metrics Summary / Target</label>
                  <input
                    type="text"
                    placeholder="e.g. Est. $35k Deal Value"
                    value={newMetricsSummary}
                    onChange={(e) => setNewMetricsSummary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
