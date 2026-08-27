'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Building, 
  Package, 
  Video, 
  CheckSquare, 
  Clock, 
  Plus, 
  FileText 
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { UpdateCategory } from '../../types';

export function QuickAddModal() {
  const { 
    isQuickAddOpen, 
    quickAddType, 
    closeQuickAdd, 
    clients, 
    offers, 
    currentDate,
    addClientUpdate,
    addOffer,
    addMeeting,
    addTask,
    addFollowUp
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'update' | 'offer' | 'meeting' | 'task' | 'followup'>('update');

  // Client / Internal Update state
  const [updateClientId, setUpdateClientId] = useState(clients[0]?.id || '');
  const [updateOfferId, setUpdateOfferId] = useState('');
  const [updateType, setUpdateType] = useState<UpdateCategory>('Performance');
  const [updateSource, setUpdateSource] = useState<'Client' | 'Internal'>('Client');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updatePriority, setUpdatePriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [updatePrimarySubject, setUpdatePrimarySubject] = useState('');

  // Offer state
  const [offerName, setOfferName] = useState('');
  const [offerClientId, setOfferClientId] = useState(clients[0]?.id || '');
  const [offerNetwork, setOfferNetwork] = useState('Network X');
  const [offerVolume, setOfferVolume] = useState(25000);
  const [offerRevenue, setOfferRevenue] = useState(5000);
  const [offerOwner, setOfferOwner] = useState('Vamshi');

  // Meeting state
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingClientId, setMeetingClientId] = useState(clients[0]?.id || '');
  const [meetingTime, setMeetingTime] = useState('14:00');

  // Task state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskClientId, setTaskClientId] = useState(clients[0]?.id || '');
  const [taskAssignedTo, setTaskAssignedTo] = useState('Vamshi');
  const [taskDueDate, setTaskDueDate] = useState(currentDate);

  // Follow-up state
  const [followUpTitle, setFollowUpTitle] = useState('');
  const [followUpClientId, setFollowUpClientId] = useState(clients[0]?.id || '');
  const [followUpAssignedTo, setFollowUpAssignedTo] = useState('Vamshi');
  const [followUpDueDate, setFollowUpDueDate] = useState(currentDate);

  if (!isQuickAddOpen) return null;

  const currentTab = quickAddType || activeTab;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackClient = {
      id: 'client-manual',
      name: 'General Account',
      primaryContact: { name: 'Operations Team', email: 'ops@csops.com' }
    };

    const selectedClient = clients.find((c) => c.id === updateClientId) || clients[0] || fallbackClient;
    const selectedOffer = offers.find((o) => o.id === updateOfferId);

    if (currentTab === 'update') {
      addClientUpdate({
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        offerId: selectedOffer?.id,
        offerName: selectedOffer?.offerName,
        type: updateType,
        source: updateSource,
        message: updateMessage || `${selectedClient.name}: Update recorded`,
        priority: updatePriority,
        status: 'New',
        primarySubject: updatePrimarySubject || selectedClient.primaryContact.name
      });
    } else if (currentTab === 'offer') {
      const clientObj = clients.find((c) => c.id === offerClientId) || clients[0] || fallbackClient;
      addOffer({
        clientId: clientObj.id,
        clientName: clientObj.name,
        offerName: offerName || 'New Campaign Offer',
        offerCode: `OFF-${Math.floor(100 + Math.random() * 900)}`,
        network: offerNetwork,
        category: 'Finance / Digital',
        status: 'Testing',
        description: 'New promotional campaign created via Quick Add.',
        landingPageUrl: 'https://landing.client.com/promo',
        emailCreative: 'Creative Variant A1',
        fromName: 'Promo Team',
        subjectLine: 'Special Promotion Today',
        targetAudience: 'US Adults 21+',
        geo: 'US',
        device: 'All Devices',
        trafficSource: 'Email Broadcast',
        volume: Number(offerVolume),
        leads: Math.floor(offerVolume * 0.08),
        successfulLeads: Math.floor(offerVolume * 0.075),
        cancelledLeads: Math.floor(offerVolume * 0.005),
        revenue: Number(offerRevenue),
        cpl: 2.50,
        epc: 0.20,
        testingStatus: 'In Progress',
        testStartDate: currentDate,
        testVolume: Number(offerVolume),
        testResult: 'Initial test cap configured',
        winnerVariant: 'Variant A',
        nextTestPlan: 'Review conversion metrics in 48 hours',
        followUpDate: currentDate,
        owner: offerOwner
      });
    } else if (currentTab === 'meeting') {
      const clientObj = clients.find((c) => c.id === meetingClientId) || clients[0] || fallbackClient;
      addMeeting({
        googleEventId: `evt-${Date.now()}`,
        clientId: clientObj.id,
        clientName: clientObj.name,
        title: meetingTitle || `${clientObj.name} Alignment Sync`,
        startTime: `${currentDate}T${meetingTime}:00`,
        endTime: `${currentDate}T${meetingTime}:30`,
        meetLink: `https://meet.google.com/meet-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Scheduled',
        organizer: 'Vamshi',
        participants: [clientObj.primaryContact.email, 'vamshi@csops.com'],
        description: 'Scheduled campaign & updates sync.',
        meetingNotes: 'Meeting scheduled via Quick Add.',
        keyDecisions: ['Review performance metrics'],
        actionItems: ['Prepare presentation deck']
      });
    } else if (currentTab === 'task') {
      const clientObj = clients.find((c) => c.id === taskClientId) || clients[0] || fallbackClient;
      addTask({
        clientId: clientObj.id,
        clientName: clientObj.name,
        sourceType: 'Manual',
        title: taskTitle || `Follow up with ${clientObj.name}`,
        assignedTo: taskAssignedTo,
        dueDate: taskDueDate,
        status: 'Not Started'
      });
    } else if (currentTab === 'followup') {
      const clientObj = clients.find((c) => c.id === followUpClientId) || clients[0] || fallbackClient;
      addFollowUp({
        clientId: clientObj.id,
        clientName: clientObj.name,
        title: followUpTitle || `Action Item: ${clientObj.name}`,
        reminderAt: `${followUpDueDate}T10:00:00`,
        assignedTo: followUpAssignedTo,
        status: 'Due Today',
        dueDate: followUpDueDate
      });
    }

    closeQuickAdd();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Quick Add Record</h2>
          </div>
          <button 
            onClick={closeQuickAdd}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 text-xs font-medium">
          {(['update', 'offer', 'meeting', 'task', 'followup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 border-b-2 text-center transition-all capitalize ${
                currentTab === tab 
                  ? 'border-blue-600 text-blue-700 font-bold bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'update' ? 'Update' : tab}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {currentTab === 'update' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Target Client</label>
                <select
                  value={updateClientId}
                  onChange={(e) => setUpdateClientId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  {clients.length === 0 ? (
                    <option value="">(No Clients — Enter Manually Below)</option>
                  ) : (
                    clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Category Type</label>
                  <select
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value as UpdateCategory)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Performance">Performance</option>
                    <option value="New Offer">New Offer</option>
                    <option value="Testing Request">Testing Request</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Source</label>
                  <select
                    value={updateSource}
                    onChange={(e) => setUpdateSource(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Client">Client</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Update Message / Note</label>
                <textarea
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  placeholder="Enter details about this update..."
                  rows={3}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {currentTab === 'offer' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Offer Name</label>
                  <input
                    type="text"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    placeholder="e.g. Summer Health Promo"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Client</label>
                  <select
                    value={offerClientId}
                    onChange={(e) => setOfferClientId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Daily Traffic Volume</label>
                  <input
                    type="number"
                    value={offerVolume}
                    onChange={(e) => setOfferVolume(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Estimated Revenue ($)</label>
                  <input
                    type="number"
                    value={offerRevenue}
                    onChange={(e) => setOfferRevenue(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentTab === 'meeting' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Meeting Title</label>
                <input
                  type="text"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g. Client Performance Sync"
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Client</label>
                  <select
                    value={meetingClientId}
                    onChange={(e) => setMeetingClientId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Start Time</label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentTab === 'task' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Task Description / Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Audit Q3 Campaign Caps"
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Assigned Owner</label>
                  <input
                    type="text"
                    value={taskAssignedTo}
                    onChange={(e) => setTaskAssignedTo(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none [color-scheme:light]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentTab === 'followup' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Follow-up Action Title</label>
                <input
                  type="text"
                  value={followUpTitle}
                  onChange={(e) => setFollowUpTitle(e.target.value)}
                  placeholder="e.g. Confirm cap expansion with Michael"
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Assignee</label>
                  <input
                    type="text"
                    value={followUpAssignedTo}
                    onChange={(e) => setFollowUpAssignedTo(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Reminder Date</label>
                  <input
                    type="date"
                    value={followUpDueDate}
                    onChange={(e) => setFollowUpDueDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-500 focus:outline-none [color-scheme:light]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={closeQuickAdd}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
