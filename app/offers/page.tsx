'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Plus, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sparkles,
  BarChart3,
  Edit,
  Trash2
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { OfferModal } from '../../components/modals/offer-modal';
import { Offer } from '../../types';

export default function OffersPage() {
  const { offers, addOffer, updateOffer, deleteOffer } = useAppStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Promotional Offers & Campaign Workspace
            </h1>
            <p className="text-xs text-slate-500">Lifecycle tracking for affiliate links, caps, test variants, and EPC analytics</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center space-x-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Sample Offer List Table (Spec Section 7 & 8) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-600" /> Active Campaign Portfolio
          </h2>
          <span className="text-xs text-slate-500 font-mono">Total Offers: {offers.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">OFFER</th>
                <th className="py-3 px-4">CLIENT</th>
                <th className="py-3 px-4">NETWORK</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">VOLUME (CAP)</th>
                <th className="py-3 px-4">REVENUE</th>
                <th className="py-3 px-4">FOLLOW-UP</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>{offer.offerName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-blue-700 font-semibold">{offer.clientName}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">{offer.network}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                      offer.status === 'Testing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      offer.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-800">{offer.volume.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">${offer.revenue.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{offer.followUpDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <Link
                        href={`/offers/${offer.id}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold inline-flex items-center space-x-1"
                      >
                        <span>Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs transition-colors"
                        title="Edit Offer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete offer "${offer.offerName}"?`)) {
                            deleteOffer(offer.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs transition-colors"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Offer Modal */}
      <OfferModal
        isOpen={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => addOffer(data)}
      />

      {/* Edit Offer Modal */}
      <OfferModal
        isOpen={!!editingOffer}
        mode="edit"
        offerToEdit={editingOffer}
        onClose={() => setEditingOffer(null)}
        onSave={(data) => {
          if (editingOffer) updateOffer(editingOffer.id, data);
        }}
      />
    </div>
  );
}
