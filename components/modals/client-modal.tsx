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
  lockCategory?: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;
}

export const getAvailableSubCategories = (mod: ClientSubModule): ClientSubCategory[] => {
  switch (mod) {
    case 'Affiliate Networks':
      return ['Resolute', 'Travis', 'Janet'];
    case 'Consulting':
      return ['Resolute', 'Ongage'];
    case 'Data Partner':
    case 'Lead':
    default:
      return ['General'];
  }
};

export function ClientModal({
  isOpen,
  mode,
  clientToEdit,
  defaultSubModule = 'Affiliate Networks',
  defaultSubCategory = 'Resolute',
  lockCategory = false,
  onClose,
  onSave,
}: ClientModalProps) {
  const [singleAccountName, setSingleAccountName] = useState('');
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

  // Data Partner Specific Fields
  const [paymentType, setPaymentType] = useState<'Rev-Share' | 'Purchased'>('Rev-Share');
  const [revenueFrequency, setRevenueFrequency] = useState<'Daily' | 'Monthly'>('Monthly');
  const [dataType, setDataType] = useState('Email Leads');
  const [estimatedVolume, setEstimatedVolume] = useState('50,000 / month');
  const [revSharePercentage, setRevSharePercentage] = useState<number>(15);

  // Leads Pipeline Specific Fields
  const [leadSource, setLeadSource] = useState('Inbound Website');
  const [leadStage, setLeadStage] = useState<'New Lead' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won'>('New Lead');
  const [expectedDealValue, setExpectedDealValue] = useState<number>(25000);
  const [expectedConversionDate, setExpectedConversionDate] = useState('2026-09-15');

  useEffect(() => {
    if (mode === 'edit' && clientToEdit) {
      const initialMod = clientToEdit.subModule || defaultSubModule;
      const accName = clientToEdit.company || clientToEdit.name || '';
      setSingleAccountName(accName);
      setName(clientToEdit.name || '');
      setCompany(clientToEdit.company || '');
      setSubModule(initialMod);
      const validSubCats = getAvailableSubCategories(initialMod);
      const initialSubCat = clientToEdit.subModuleCategory && validSubCats.includes(clientToEdit.subModuleCategory)
        ? clientToEdit.subModuleCategory
        : validSubCats[0];
      setSubModuleCategory(initialSubCat);
      setCommunicationMode(clientToEdit.communicationMode || 'Email');
      setStatus(clientToEdit.status || 'Active');
      setContactName(clientToEdit.primaryContact?.name || '');
      setContactEmail(clientToEdit.primaryContact?.email || '');
      setContactPhone(clientToEdit.primaryContact?.phone || '');
      setContactRole(clientToEdit.primaryContact?.role || '');
      setMetricsSummary(clientToEdit.metricsSummary || '');
      setDescription(clientToEdit.description || '');

      setPaymentType(clientToEdit.paymentType || 'Rev-Share');
      setRevenueFrequency(clientToEdit.revenueFrequency || 'Monthly');
      setDataType(clientToEdit.dataType || 'Email Leads');
      setEstimatedVolume(clientToEdit.estimatedVolume || '50,000 / month');
      setRevSharePercentage(clientToEdit.revSharePercentage ?? 15);
      setEstimatedVolume(clientToEdit.estimatedVolume || '50,000 / month');
      setRevSharePercentage(clientToEdit.revSharePercentage ?? 15);

      setLeadSource(clientToEdit.leadSource || 'Inbound Website');
      setLeadStage(clientToEdit.leadStage || 'New Lead');
      setExpectedDealValue(clientToEdit.expectedDealValue ?? 25000);
      setExpectedConversionDate(clientToEdit.expectedConversionDate || '2026-09-15');
    } else {
      setSingleAccountName('');
      setName('');
      setCompany('');
      setSubModule(defaultSubModule);
      const validSubCats = getAvailableSubCategories(defaultSubModule);
      const initialSubCat = validSubCats.includes(defaultSubCategory) ? defaultSubCategory : validSubCats[0];
      setSubModuleCategory(initialSubCat);
      setCommunicationMode('Email');
      setStatus('Active');
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactRole('');
      setMetricsSummary('');
      setDescription('');

      setPaymentType('Rev-Share');
      setDataType('Email Leads');
      setEstimatedVolume('50,000 / month');
      setRevSharePercentage(15);

      setLeadSource('Inbound Website');
      setLeadStage('New Lead');
      setExpectedDealValue(25000);
      setExpectedConversionDate('2026-09-15');
    }
  }, [mode, clientToEdit, defaultSubModule, defaultSubCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubModuleChange = (newMod: ClientSubModule) => {
    setSubModule(newMod);
    const validSubCats = getAvailableSubCategories(newMod);
    setSubModuleCategory(validSubCats[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCompany = singleAccountName || company || name || 'Account';
    const finalName = singleAccountName || name || company || 'Account';

    let computedMetrics = metricsSummary;
    if (subModule === 'Data Partner') {
      computedMetrics = `Payment: ${paymentType} • Vol: ${estimatedVolume}`;
    } else if (subModule === 'Lead') {
      computedMetrics = `Stage: ${leadStage} • Value: $${expectedDealValue.toLocaleString()}`;
    }

    onSave({
      name: finalName,
      company: finalCompany,
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
      metricsSummary: computedMetrics || 'Active Account',
      description,
      paymentType: subModule === 'Data Partner' ? paymentType : undefined,
      revenueFrequency: subModule === 'Data Partner' ? revenueFrequency : undefined,
      dataType: subModule === 'Data Partner' ? dataType : undefined,
      estimatedVolume: subModule === 'Data Partner' ? estimatedVolume : undefined,
      revSharePercentage: (subModule === 'Data Partner' && paymentType === 'Rev-Share') ? revSharePercentage : undefined,
      leadSource: subModule === 'Lead' ? leadSource : undefined,
      leadStage: subModule === 'Lead' ? leadStage : undefined,
      expectedDealValue: subModule === 'Lead' ? expectedDealValue : undefined,
      expectedConversionDate: subModule === 'Lead' ? expectedConversionDate : undefined,
    });
    onClose();
  };

  const availableSubCategories = getAvailableSubCategories(subModule);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-xl w-full animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            {mode === 'edit' ? (
              <>
                <Edit className="w-4 h-4 text-blue-600" /> Edit Account — {clientToEdit?.name}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-blue-600" />
                {subModule === 'Data Partner'
                  ? 'Add New Account — Data Partners'
                  : subModule === 'Lead'
                  ? 'Add New Account — Leads Pipeline'
                  : `Add New Account (${subModule})`}
              </>
            )}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Company / Account Name */}
          <div>
            <label className="block font-semibold mb-1 text-slate-700">
              {subModule === 'Data Partner' ? 'Company / Account Name' : subModule === 'Lead' ? 'Lead / Account Name' : 'Company Name'}
            </label>
            <input
              type="text"
              placeholder={
                subModule === 'Data Partner'
                  ? 'e.g. Vortex Data Systems'
                  : subModule === 'Lead'
                  ? 'e.g. Lead Delta Corp'
                  : 'e.g. Nexus Media Group'
              }
              value={singleAccountName}
              onChange={(e) => {
                setSingleAccountName(e.target.value);
                setName(e.target.value);
                setCompany(e.target.value);
              }}
              required
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Module & Sub-Category Selection (Hidden when adding under a specific module or lockCategory is true) */}
          {!lockCategory ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Account Category</label>
                <select
                  value={subModule}
                  onChange={(e) => handleSubModuleChange(e.target.value as ClientSubModule)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="Affiliate Networks">Affiliate Networks</option>
                  <option value="Data Partner">Data Partner</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Lead">Leads Pipeline</option>
                </select>
              </div>
              {availableSubCategories.length > 1 && (
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Sub Category</label>
                  <select
                    value={subModuleCategory}
                    onChange={(e) => setSubModuleCategory(e.target.value as ClientSubCategory)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer font-bold"
                  >
                    {availableSubCategories.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            availableSubCategories.length > 1 && (
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Sub Category</label>
                <select
                  value={subModuleCategory}
                  onChange={(e) => setSubModuleCategory(e.target.value as ClientSubCategory)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer font-bold"
                >
                  {availableSubCategories.map((sc) => (
                    <option key={sc} value={sc}>
                      {sc}
                    </option>
                  ))}
                </select>
              </div>
            )
          )}

          {/* SPECIFIC FIELDS: DATA PARTNERS */}
          {subModule === 'Data Partner' && (
            <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200/80 space-y-3">
              <span className="block font-bold text-purple-900 uppercase tracking-wider text-[10px]">
                Data Partner Configuration Specs
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Payment Type</label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as 'Rev-Share' | 'Purchased')}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Rev-Share">Rev-Share</option>
                    <option value="Purchased">Purchased</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Revenue Frequency</label>
                  <select
                    value={revenueFrequency}
                    onChange={(e) => setRevenueFrequency(e.target.value as 'Daily' | 'Monthly')}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Partner Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ClientStatus)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Data Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Email Leads, B2B"
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Estimated Data Volume</label>
                  <input
                    type="text"
                    placeholder="e.g. 100,000 / month"
                    value={estimatedVolume}
                    onChange={(e) => setEstimatedVolume(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                {paymentType === 'Rev-Share' && (
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Rev-Share %</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="15"
                      value={revSharePercentage}
                      onChange={(e) => setRevSharePercentage(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 font-mono font-bold focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mode of Communication & Status (For non-Data Partner modules) */}
          {subModule !== 'Data Partner' && (
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
                <label className="block font-semibold mb-1 text-slate-700">
                  {subModule === 'Lead' ? 'Lead Status' : 'Account Status'}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ClientStatus)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer font-bold"
                >
                  <option value="Active">Active</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}

          {/* SPECIFIC FIELDS: LEADS PIPELINE */}
          {subModule === 'Lead' && (
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/70 space-y-3">
              <span className="block font-bold text-blue-900 uppercase tracking-wider text-[10px]">
                Leads Pipeline Specs
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Lead Source</label>
                  <select
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Inbound Website">Inbound Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Outreach">Cold Outreach</option>
                    <option value="Trade Show">Trade Show</option>
                    <option value="Partner Network">Partner Network</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Lead Stage</label>
                  <select
                    value={leadStage}
                    onChange={(e) => setLeadStage(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Discovery">Discovery</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closed Won">Closed Won</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Expected Deal Value ($)</label>
                  <input
                    type="number"
                    step="1000"
                    placeholder="25000"
                    value={expectedDealValue}
                    onChange={(e) => setExpectedDealValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 font-mono font-bold focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Expected Conversion Date</label>
                  <input
                    type="date"
                    value={expectedConversionDate}
                    onChange={(e) => setExpectedConversionDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Person Details */}
          <div className="pt-2 border-t border-slate-200">
            <span className="block font-semibold mb-2 text-slate-500 uppercase tracking-wider text-[10px]">
              Contact Person Details
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
            <label className="block font-semibold mb-1 text-slate-700">
              {subModule === 'Data Partner' ? 'Partner Description' : subModule === 'Lead' ? 'Lead Description' : 'Client Description'}
            </label>
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
