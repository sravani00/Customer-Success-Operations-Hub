'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Share2, Building, Mail, Phone, Package, ChevronRight, ArrowLeft, TrendingUp, Layers, Plus, Edit, Trash2 } from 'lucide-react';
import { useAppStore } from '../../../lib/store';
import { ClientModal } from '../../../components/modals/client-modal';
import { Client } from '../../../types';

export default function AffiliateNetworksPage() {
  const { clients, offers, updates, addClient, updateClient, deleteClient } = useAppStore();
  const [selectedSubCategory, setSelectedSubCategory] = useState<'All' | 'Resolute' | 'Partners'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const affiliateClients = clients.filter((c) => {
    const isAffiliate = c.subModule === 'Affiliate Networks' || (c.subModule as string) === 'Affiliate Client';
    if (!isAffiliate) return false;
    if (selectedSubCategory === 'All') return true;
    return c.subModuleCategory === selectedSubCategory;
  });

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
              <Link href="/clients" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3 h-3" /> Back to All Clients
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Affiliate Networks
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                {affiliateClients.length} Accounts
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct performance advertisers, publisher networks, Resolute feeds, and partner offers
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          {/* Category filter pills */}
          <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedSubCategory('All')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedSubCategory === 'All' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Networks
            </button>
            <button
              onClick={() => setSelectedSubCategory('Resolute')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedSubCategory === 'Resolute' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resolute
            </button>
            <button
              onClick={() => setSelectedSubCategory('Partners')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedSubCategory === 'Partners' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Partners
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Account</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {affiliateClients.map((client) => {
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

                  <div className="flex items-center space-x-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {client.status}
                    </span>
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
                    <span className="text-slate-500">Category:</span>
                    <span className="font-bold text-blue-700 font-mono">{client.subModuleCategory || 'Resolute'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Comm Mode:</span>
                    <span className="font-bold text-slate-800 font-mono">{client.communicationMode || 'Email'}</span>
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

      {/* Add Client Modal */}
      <ClientModal
        isOpen={isAddModalOpen}
        mode="add"
        defaultSubModule="Affiliate Networks"
        defaultSubCategory={selectedSubCategory === 'All' ? 'Resolute' : (selectedSubCategory as any)}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => addClient(data)}
      />

      {/* Edit Client Modal */}
      <ClientModal
        isOpen={!!editingClient}
        mode="edit"
        clientToEdit={editingClient}
        onClose={() => setEditingClient(null)}
        onSave={(data) => {
          if (editingClient) updateClient(editingClient.id, data);
        }}
      />
    </div>
  );
}
