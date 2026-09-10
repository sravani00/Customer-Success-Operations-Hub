'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Building, Mail, Phone, ChevronRight, ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { useAppStore } from '../../../lib/store';
import { ClientModal } from '../../../components/modals/client-modal';
import { Client } from '../../../types';

export default function WarmupPage() {
  const { clients, addClient, updateClient, deleteClient } = useAppStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const warmupClients = clients.filter((c) => c.subModule === 'Warmup');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Link href="/clients" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                <ArrowLeft className="w-3 h-3" /> Back to All Clients
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Warmup
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-mono font-bold">
                {warmupClients.length} Accounts
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage email warmup plans, pricing, and points of contact.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Warmup</span>
        </button>
      </div>

      {/* Main Content Area: Table or Empty State */}
      {warmupClients.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-xs">
            <Flame className="w-7 h-7" />
          </div>
          <div className="max-w-md space-y-1.5">
            <h3 className="text-base font-bold text-slate-900">No Warmup accounts yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add your first Warmup account to start tracking warmup plans, pricing, and points of contact.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Warmup</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-6">Client / Account</th>
                  <th className="py-3.5 px-4">Warmup Plan</th>
                  <th className="py-3.5 px-4 text-right">Price</th>
                  <th className="py-3.5 px-6">Point of Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {warmupClients.map((client) => {
                  return (
                    <tr 
                      key={client.id} 
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Client / Account Name & Company */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                            {client.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <Link 
                              href={`/clients/${client.id}`}
                              className="font-bold text-slate-900 text-sm hover:text-orange-600 transition-colors"
                            >
                              {client.name}
                            </Link>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Building className="w-3 h-3 text-slate-400" />
                              <span>{client.company}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80 inline-block">
                          {client.warmupPlan || 'Basic'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-slate-900 text-xs">
                        {client.warmupPrice || '₹15,000'}
                      </td>

                      {/* Point of Contact */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-800 text-xs">
                            {client.primaryContact?.name || 'Unassigned'}
                            {client.primaryContact?.role && (
                              <span className="text-[10px] text-slate-400 font-normal ml-1">
                                ({client.primaryContact.role})
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                            {client.primaryContact?.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                {client.primaryContact.email}
                              </span>
                            )}
                            {client.primaryContact?.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {client.primaryContact.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          client.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : client.status === 'Onboarding'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {client.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingClient(client)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-700 border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Edit Warmup Account"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${client.name}?`)) {
                                deleteClient(client.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-200 transition-colors"
                            title="Delete Account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/clients/${client.id}`}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 border border-slate-200 transition-colors"
                            title="View Profile"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      <ClientModal
        isOpen={isAddModalOpen}
        mode="add"
        lockCategory={true}
        defaultSubModule="Warmup"
        defaultSubCategory="General"
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
