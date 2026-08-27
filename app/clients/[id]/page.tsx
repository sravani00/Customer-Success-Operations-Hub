'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Building, 
  Mail, 
  Phone, 
  Package, 
  Video, 
  CheckSquare, 
  Clock, 
  FileText, 
  TrendingUp, 
  UserCheck,
  Sparkles,
  ExternalLink,
  Layers,
  ChevronRight,
  ShieldCheck,
  Activity,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { useAppStore } from '../../../lib/store';
import { ClientSubModule, ClientSubCategory, ClientStatus, Client, Offer } from '../../../types';
import { OfferModal } from '../../../components/modals/offer-modal';
import { ClientModal } from '../../../components/modals/client-modal';
import { DataPartnerAccountView } from '../../../components/clients/data-partner-account-view';

export default function ClientProfileHub() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  const { 
    clients, 
    offers, 
    emails, 
    meetings, 
    updates, 
    tasks, 
    followUps,
    updateClient,
    deleteClient,
    updateOffer,
    deleteOffer,
    deleteMeeting,
    deleteTask,
    deleteFollowUp,
    deleteClientUpdate
  } = useAppStore();
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const client = clients.find((c) => c.id === clientId) || clients[0];
  const clientOffers = offers.filter((o) => o.clientId === client.id);
  const clientEmails = emails.filter((e) => e.clientId === client.id);
  const clientMeetings = meetings.filter((m) => m.clientId === client.id);
  const clientUpdates = updates.filter((u) => u.clientId === client.id);
  const clientTasks = tasks.filter((t) => t.clientId === client.id);
  const clientFollowUps = followUps.filter((f) => f.clientId === client.id);

  const totalRevenue = clientOffers.reduce((sum, o) => sum + o.revenue, 0);
  const totalVolume = clientOffers.reduce((sum, o) => sum + o.volume, 0);
  const avgEpc = clientOffers.length > 0 ? clientOffers.reduce((sum, o) => sum + o.epc, 0) / clientOffers.length : 0;
  const completedTasksCount = clientTasks.filter((t) => t.status === 'Completed').length;

  const [activeTab, setActiveTab] = useState<
    'all' | 'overview' | 'offers' | 'meetings' | 'updates' | 'tasks_followups' | 'performance'
  >('all');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between">
        <Link 
          href="/clients"
          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clients Directory</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab(activeTab === 'all' ? 'overview' : 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{activeTab === 'all' ? '✓ Displaying All Sections Uncollapsed' : 'Show All Sections Uncollapsed'}</span>
          </button>
        </div>
      </div>

      {/* Client Header Banner Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xl shadow-xs">
            {client.name.replace('Client ', '')}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{client.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                client.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {client.status}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {client.subModule}
              </span>
              <button
                onClick={() => setEditingClient(client)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
                title="Edit Account"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${client.name}? All associated data will be removed.`)) {
                    deleteClient(client.id);
                    router.push('/clients');
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center space-x-1 transition-colors"
                title="Delete Account"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" /> {client.company} • Joined {client.createdAt || '2026-08-01'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 text-xs text-slate-700">
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Primary Contact</div>
            <div className="font-bold text-slate-900">{client.primaryContact.name}</div>
            <div className="text-slate-500 text-[11px]">{client.primaryContact.role}</div>
          </div>
          <div className="pl-4 border-l border-slate-200">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Contact Email & Phone</div>
            <div className="font-mono text-blue-700 font-semibold">{client.primaryContact.email}</div>
            <div className="font-mono text-emerald-700 font-semibold">{client.primaryContact.phone}</div>
          </div>
        </div>
      </div>

      {/* 360-Degree Tabbed Navigation Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          {[
            { key: 'all', label: 'All Uncollapsed View', icon: Activity },
            { key: 'overview', label: 'Overview', icon: Building },
            ...(client.subModule !== 'Data Partner' ? [
              { key: 'offers', label: `Offers (${clientOffers.length})`, icon: Package },
              { key: 'meetings', label: `Meetings (${clientMeetings.length})`, icon: Video },
            ] : []),
            { key: 'updates', label: `Updates (${clientUpdates.length})`, icon: FileText },
            { key: 'tasks_followups', label: `Tasks & Follow-ups (${clientTasks.length + clientFollowUps.length})`, icon: CheckSquare },
            { key: 'performance', label: 'Performance Metrics', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-3 border-b-2 font-medium flex items-center space-x-2 shrink-0 transition-all ${
                  isActive 
                    ? 'border-blue-600 text-blue-700 bg-white font-bold' 
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Container */}
        <div className="p-6 space-y-8 text-xs text-slate-700">
          
          {/* SPECIAL 7-SECTION DEDICATED VIEW FOR DATA PARTNERS */}
          {client.subModule === 'Data Partner' ? (
            <DataPartnerAccountView client={client} onEditClient={() => setEditingClient(client)} />
          ) : (
            <>
              {/* SECTION: OVERVIEW & CONTACT DETAILS */}
              {(activeTab === 'all' || activeTab === 'overview') && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" /> Account Overview & Summary
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">ID: {client.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-medium">Account Category</span>
                    <div className="text-base font-bold text-blue-700 font-mono">{client.subModule}</div>
                    <p className="text-[11px] text-slate-500">{client.metricsSummary || 'Standard Account'}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-medium">Mode of Communication</span>
                    <div className="text-base font-bold text-slate-900">{client.communicationMode || 'Email'}</div>
                    <p className="text-[11px] text-slate-500">Company: {client.company}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-medium">Onboarding Date</span>
                    <div className="text-base font-bold text-slate-900 font-mono">{client.createdAt || '2026-08-01'}</div>
                    <p className="text-[11px] text-emerald-700 font-semibold">Status: {client.status}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-medium">Dedicated CS Manager</span>
                    <div className="text-base font-bold text-slate-900">Vamshi</div>
                    <p className="text-[11px] text-slate-500">CS Operations Lead</p>
                  </div>
                </div>

                {client.description && (
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80 text-xs space-y-1">
                    <span className="font-bold text-blue-900 block uppercase font-mono text-[10px] tracking-wider">Client Description:</span>
                    <p className="text-slate-800 leading-relaxed">{client.description}</p>
                  </div>
                )}
              </div>

              {/* EMBEDDED CONTACT DETAILS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" /> Account Contacts & Stakeholders
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">Contact Details</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <span className="font-bold text-xs uppercase tracking-wider text-blue-700 block border-b border-slate-200 pb-1.5">
                      ★ Primary Client Contact
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between"><span className="text-slate-500">Full Name:</span><span className="font-bold text-slate-900">{client.primaryContact.name}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Role:</span><span className="font-semibold text-slate-800">{client.primaryContact.role}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-mono text-blue-700 font-semibold">{client.primaryContact.email}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Phone:</span><span className="font-mono text-emerald-700 font-semibold">{client.primaryContact.phone}</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block border-b border-slate-200 pb-1.5">
                      Internal Operations Team
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between"><span className="text-slate-500">Customer Success Lead:</span><span className="font-bold text-slate-900">Vamshi</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Technical Advisor:</span><span className="font-semibold text-slate-800">CS Technical Team</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Account Manager:</span><span className="font-semibold text-slate-800">{client.primaryContact.role}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Support Routing:</span><span className="font-mono text-slate-700">ops@hub.com</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: OFFERS */}
          {(activeTab === 'all' || activeTab === 'offers') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" /> Active Promotional Offers ({clientOffers.length})
                </h3>
              </div>

              {clientOffers.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500">
                  No active promotional offers found for this client.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientOffers.map((o) => (
                    <div key={o.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {o.offerName}
                            <span className="text-[10px] font-mono text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded">
                              {o.offerCode}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {o.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 font-mono">
                          <div>
                            <span className="text-slate-400 block text-[10px] font-sans">Payout / CPL</span>
                            <span className="font-bold text-slate-800">${o.cpl.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-sans">Revenue</span>
                            <span className="font-bold text-emerald-700">${o.revenue.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-sans">Leads</span>
                            <span className="font-bold text-slate-800">{o.leads}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] font-sans">EPC</span>
                            <span className="font-bold text-blue-700">${o.epc.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                        <Link
                          href={`/offers/${o.id}`}
                          className="text-xs font-semibold text-blue-700 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Offer Workspace</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => setEditingOffer(o)}
                            className="p-1 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition-colors"
                            title="Edit Offer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete offer "${o.offerName}"?`)) {
                                deleteOffer(o.id);
                              }
                            }}
                            className="p-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors"
                            title="Delete Offer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: MEETINGS */}
          {(activeTab === 'all' || activeTab === 'meetings') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-600" /> Scheduled Meetings & Syncs ({clientMeetings.length})
                </h3>
              </div>

              {clientMeetings.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500">
                  No meetings scheduled for this account.
                </div>
              ) : (
                <div className="space-y-3">
                  {clientMeetings.map((meet) => (
                    <div key={meet.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{meet.title}</div>
                          <div className="text-xs text-slate-500 font-mono">
                            {new Date(meet.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </div>
                        {meet.meetLink && (
                          <a
                            href={meet.meetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1 shadow-xs hover:bg-emerald-700"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Open Google Meet</span>
                          </a>
                        )}
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5">
                        <span className="font-bold text-slate-700 block">Notes & Key Decisions:</span>
                        <p className="text-slate-700">{meet.meetingNotes}</p>
                        {meet.keyDecisions.length > 0 && (
                          <div className="text-emerald-700 font-mono text-[11px] font-bold">
                            Decisions: {meet.keyDecisions.join(', ')}
                          </div>
                        )}
                        {meet.momPoints && meet.momPoints.length > 0 && (
                          <div className="pt-1.5 border-t border-slate-100 space-y-1">
                            <span className="font-bold text-slate-900 block text-[11px] uppercase font-mono tracking-wider">Minutes of Meeting (MOM):</span>
                            <ul className="space-y-1 text-[11px] text-slate-700">
                              {meet.momPoints.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-1.5 font-medium">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: COMBINED TASKS & FOLLOW-UPS */}
          {(activeTab === 'all' || activeTab === 'tasks_followups') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-indigo-600" /> Tasks & Follow-ups ({clientTasks.length + clientFollowUps.length})
                </h3>
              </div>

              {clientTasks.length === 0 && clientFollowUps.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500">
                  No tasks or follow-ups logged for this client.
                </div>
              ) : (
                <div className="space-y-2">
                  {clientTasks.map((t) => (
                    <div key={t.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-100 text-indigo-800">Task</span>
                          <span className="font-bold text-slate-900 text-xs">{t.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Assigned to: <strong className="text-slate-800">{t.assignedTo}</strong> • Due: <strong className="text-amber-700">{t.dueDate}</strong> • Source: {t.sourceType}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded text-xs font-bold font-mono bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {t.status}
                        </span>
                        <button
                          onClick={() => deleteTask(t.id)}
                          title="Delete Task"
                          className="p-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {clientFollowUps.map((fl) => (
                    <div key={fl.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-100 text-rose-800">Follow-up</span>
                          <span className="font-bold text-slate-900 text-xs">{fl.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Owner: {fl.assignedTo} • Due: {fl.dueDate} {fl.offerName ? `• Offer: ${fl.offerName}` : ''}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                          fl.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          fl.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {fl.status}
                        </span>
                        <button
                          onClick={() => deleteFollowUp(fl.id)}
                          title="Delete Follow-up"
                          className="p-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: PERFORMANCE METRICS */}
          {(activeTab === 'all' || activeTab === 'performance') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" /> Key Account Performance Metrics
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-sans font-medium block">Total Revenue</span>
                  <div className="text-lg font-bold text-emerald-700 mt-1">${totalRevenue.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-sans font-medium block">Volume Cap</span>
                  <div className="text-lg font-bold text-slate-900 mt-1">{totalVolume.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-sans font-medium block">Average EPC</span>
                  <div className="text-lg font-bold text-blue-700 mt-1">${avgEpc.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-sans font-medium block">Task Completion Rate</span>
                  <div className="text-lg font-bold text-indigo-700 mt-1">
                    {clientTasks.length > 0 ? Math.round((completedTasksCount / clientTasks.length) * 100) : 100}%
                  </div>
                </div>
              </div>
            </div>
          )}
          </>
          )}

        </div>
      </div>

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

      {/* Edit Offer Modal */}
      <OfferModal
        isOpen={!!editingOffer}
        mode="edit"
        offerToEdit={editingOffer}
        defaultClientId={client.id}
        onClose={() => setEditingOffer(null)}
        onSave={(data) => {
          if (editingOffer) updateOffer(editingOffer.id, data);
        }}
      />
    </div>
  );
}
