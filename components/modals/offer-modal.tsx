'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit, Plus, Package } from 'lucide-react';
import { Offer, OfferStatus } from '../../types';
import { useAppStore } from '../../lib/store';

interface OfferModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  offerToEdit?: Offer | null;
  defaultClientId?: string;
  onClose: () => void;
  onSave: (offerData: any) => void;
}

export function OfferModal({
  isOpen,
  mode,
  offerToEdit,
  defaultClientId,
  onClose,
  onSave,
}: OfferModalProps) {
  const { clients } = useAppStore();

  const [clientId, setClientId] = useState('');
  const [offerName, setOfferName] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const [network, setNetwork] = useState('');
  const [category, setCategory] = useState('Email Marketing');
  const [status, setStatus] = useState<OfferStatus>('Active');
  const [cpl, setCpl] = useState<number>(3.50);
  const [volume, setVolume] = useState<number>(50000);
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [fromName, setFromName] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [geo, setGeo] = useState('US, CA');
  const [device, setDevice] = useState('All Devices');
  const [trafficSource, setTrafficSource] = useState('Email / Native');
  const [description, setDescription] = useState('');
  const [emailCreative, setEmailCreative] = useState('');

  useEffect(() => {
    if (mode === 'edit' && offerToEdit) {
      setClientId(offerToEdit.clientId || clients[0]?.id || '');
      setOfferName(offerToEdit.offerName || '');
      setOfferCode(offerToEdit.offerCode || '');
      setNetwork(offerToEdit.network || '');
      setCategory(offerToEdit.category || 'Email Marketing');
      setStatus(offerToEdit.status || 'Active');
      setCpl(offerToEdit.cpl ?? 3.50);
      setVolume(offerToEdit.volume ?? 50000);
      setLandingPageUrl(offerToEdit.landingPageUrl || '');
      setFromName(offerToEdit.fromName || '');
      setSubjectLine(offerToEdit.subjectLine || '');
      setTargetAudience(offerToEdit.targetAudience || '');
      setGeo(offerToEdit.geo || 'US, CA');
      setDevice(offerToEdit.device || 'All Devices');
      setTrafficSource(offerToEdit.trafficSource || 'Email / Native');
      setDescription(offerToEdit.description || '');
      setEmailCreative(offerToEdit.emailCreative || '');
    } else {
      setClientId(defaultClientId || clients[0]?.id || '');
      setOfferName('');
      setOfferCode(`OFF-${Math.floor(100 + Math.random() * 900)}`);
      setNetwork('Nexus Affiliate');
      setCategory('Email Marketing');
      setStatus('Active');
      setCpl(3.50);
      setVolume(50000);
      setLandingPageUrl('https://example.com/landing');
      setFromName('Special Promotion');
      setSubjectLine('Exclusive Offer Inside');
      setTargetAudience('Consumer 25-54');
      setGeo('US, CA');
      setDevice('All Devices');
      setTrafficSource('Email / Native');
      setDescription('');
      setEmailCreative('');
    }
  }, [mode, offerToEdit, defaultClientId, isOpen, clients]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerName || !clientId) return;

    const selectedClient = clients.find((c) => c.id === clientId);
    const clientName = selectedClient ? selectedClient.name : 'Client';

    onSave({
      clientId,
      clientName,
      offerName,
      offerCode,
      network: network || 'Nexus Affiliate',
      category,
      status,
      cpl: Number(cpl) || 0,
      volume: Number(volume) || 0,
      landingPageUrl,
      fromName,
      subjectLine,
      targetAudience,
      geo,
      device,
      trafficSource,
      description,
      emailCreative,
      leads: offerToEdit ? offerToEdit.leads : 0,
      successfulLeads: offerToEdit ? offerToEdit.successfulLeads : 0,
      cancelledLeads: offerToEdit ? offerToEdit.cancelledLeads : 0,
      revenue: offerToEdit ? offerToEdit.revenue : (Number(volume) || 0) * (Number(cpl) || 0),
      epc: offerToEdit ? offerToEdit.epc : 0.25,
      testingStatus: offerToEdit ? offerToEdit.testingStatus : 'Pending Approval',
      testStartDate: offerToEdit ? offerToEdit.testStartDate : new Date().toISOString().split('T')[0],
      testVolume: offerToEdit ? offerToEdit.testVolume : 5000,
      testResult: offerToEdit ? offerToEdit.testResult : 'Testing initialized',
      winnerVariant: offerToEdit ? offerToEdit.winnerVariant : 'Variant A',
      nextTestPlan: offerToEdit ? offerToEdit.nextTestPlan : 'Scale traffic upon approval',
      followUpDate: offerToEdit ? offerToEdit.followUpDate : new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            {mode === 'edit' ? (
              <>
                <Edit className="w-4 h-4 text-blue-600" /> Edit Promotional Offer — {offerToEdit?.offerName}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-blue-600" /> Add Promotional Offer
              </>
            )}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Account Client</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                {clients.filter((c) => c.subModule !== 'Data Partner').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.company})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Offer Name</label>
              <input
                type="text"
                placeholder="e.g. Solar Energy Savings V2"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Offer Code</label>
              <input
                type="text"
                placeholder="e.g. OFF-8821"
                value={offerCode}
                onChange={(e) => setOfferCode(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Offer Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OfferStatus)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Testing">Testing</option>
                <option value="Pending">Pending</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Payout / CPL ($)</label>
              <input
                type="number"
                step="0.1"
                placeholder="3.50"
                value={cpl}
                onChange={(e) => setCpl(parseFloat(e.target.value) || 0)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Volume Cap (Leads)</label>
              <input
                type="number"
                placeholder="50000"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value) || 0)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Network / Advertiser</label>
              <input
                type="text"
                placeholder="Nexus Media"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Target GEO</label>
              <input
                type="text"
                placeholder="US, CA, UK"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Target Devices</label>
              <input
                type="text"
                placeholder="Desktop, Mobile, All"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-700">Traffic Source</label>
              <input
                type="text"
                placeholder="Email, Display, Search"
                value={trafficSource}
                onChange={(e) => setTrafficSource(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email / Creative Details */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <span className="block font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
              Email Creative & Targeting Specs
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">From Name</label>
                <input
                  type="text"
                  placeholder="e.g. Energy Savings Advisory"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g. Lower your monthly power bill this season"
                  value={subjectLine}
                  onChange={(e) => setSubjectLine(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700">Landing Page URL</label>
              <input
                type="text"
                placeholder="https://client-landing.com/promo"
                value={landingPageUrl}
                onChange={(e) => setLandingPageUrl(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono text-blue-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700">Offer Description</label>
            <textarea
              rows={2}
              placeholder="Campaign rules, allowed angles, suppression list guidelines..."
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
              {mode === 'edit' ? 'Save Offer Changes' : 'Create Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
