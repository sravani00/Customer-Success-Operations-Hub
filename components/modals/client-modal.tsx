'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit, Plus } from 'lucide-react';
import { Client, ClientSubModule, ClientSubCategory, ClientStatus } from '../../types';

interface ClientModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  clientToEdit?: Client | null;
  defaultSubModule?: ClientSubModule;
  defaultSubCategory?: ClientSubCategory;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

export function ClientModal({
  isOpen,
  mode,
  clientToEdit,
  defaultSubModule = 'Affiliate Networks',
  defaultSubCategory = 'Resolute',
  onClose,
  onSave,
}: ClientModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [subModule, setSubModule] = useState<ClientSubModule>(defaultSubModule);
  const [subModuleCategory, setSubModuleCategory] = useState<ClientSubCategory>(defaultSubCategory);
  const [communicationMode, setCommunicationMode] = useState('Email');
  const [status, setStatus] = useState<ClientStatus>('Active');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [metricsSummary, setMetricsSummary] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'edit' && clientToEdit) {
      setName(clientToEdit.name || '');
      setCompany(clientToEdit.company || '');
      setSubModule(clientToEdit.subModule || defaultSubModule);
      setSubModuleCategory(clientToEdit.subModuleCategory || defaultSubCategory);
      setCommunicationMode(clientToEdit.communicationMode || 'Email');
      setStatus(clientToEdit.status || 'Active');
      setContactName(clientToEdit.primaryContact?.name || '');
      setContactEmail(clientToEdit.primaryContact?.email || '');
      setContactPhone(clientToEdit.primaryContact?.phone || '');
      setContactRole(clientToEdit.primaryContact?.role || '');
      setMetricsSummary(clientToEdit.metricsSummary || '');
      setDescription(clientToEdit.description || '');
    } else {
      setName('');
      setCompany('');
      setSubModule(defaultSubModule);
      setSubModuleCategory(defaultSubCategory);
      setCommunicationMode('Email');
      setStatus('Active');
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactRole('');
      setMetricsSummary('');
      setDescription('');
    }
  }, [mode, clientToEdit, defaultSubModule, defaultSubCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    onSave({
      name,
      company,
      subModule,
      subModuleCategory,
      communicationMode,
      status,
      primaryContact: {
        name: contactName || 'Primary Contact',
        email: contactEmail || 'contact@client.com',
        phone: contactPhone || '+1 (555) 000-0000',
        role: contactRole || 'Account Manager',
      },
      metricsSummary: metricsSummary || 'Active Account',
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            {mode === 'edit' ? (
              <>
                <Edit className="w-4 h-4 text-blue-600" /> Edit Account — {clientToEdit?.name}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-blue-600" /> Add New Account
              </>
            )}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Account Name</label>
              <input
                type="text"
                placeholder="e.g. Client I"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Nexus Media Group"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Account Category</label>
              <select
                value={subModule}
                onChange={(e) => {
                  const cat = e.target.value as ClientSubModule;
                  setSubModule(cat);
                  if (cat === 'Affiliate Networks') setSubModuleCategory('Resolute');
                  else if (cat === 'Data Partner') setSubModuleCategory('Agreement');
                  else if (cat === 'Consulting') setSubModuleCategory('Resolute');
                  else setSubModuleCategory('General');
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
                value={subModuleCategory}
                onChange={(e) => setSubModuleCategory(e.target.value as ClientSubCategory)}
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
                value={communicationMode}
                onChange={(e) => setCommunicationMode(e.target.value)}
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
                value={status}
                onChange={(e) => setStatus(e.target.value as ClientStatus)}
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
                  placeholder="e.g. Sarah Jenkins"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="sarah@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
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
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Contact Role</label>
              <input
                type="text"
                placeholder="e.g. VP Marketing"
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700">Metrics Summary / Target</label>
            <input
              type="text"
              placeholder="e.g. Est. $35k Deal Value"
              value={metricsSummary}
              onChange={(e) => setMetricsSummary(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700">Client Description</label>
            <textarea
              rows={2}
              placeholder="Key account details, traffic expectations, and partnership goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
