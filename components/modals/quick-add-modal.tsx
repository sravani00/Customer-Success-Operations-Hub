'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { UpdateCategory } from '../../types';

export const QuickAddModal: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState<'update' | 'offer' | 'meeting' | 'task' | 'followup'>(quickAddType || 'update');

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
  const [offerOwner, setOfferOwner] = useState('Pradeep');

  // Meeting state
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingClientId, setMeetingClientId] = useState(clients[0]?.id || '');
  const [meetingTime, setMeetingTime] = useState('14:00');

  // Task state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskClientId, setTaskClientId] = useState(clients[0]?.id || '');
  const [taskAssignedTo, setTaskAssignedTo] = useState('Pradeep');
  const [taskDueDate, setTaskDueDate] = useState(currentDate);

  // Follow-up state
  const [followUpTitle, setFollowUpTitle] = useState('');
  const [followUpClientId, setFollowUpClientId] = useState(clients[0]?.id || '');
  const [followUpAssignedTo, setFollowUpAssignedTo] = useState('Pradeep');
  const [followUpDueDate, setFollowUpDueDate] = useState(currentDate);

  if (!isQuickAddOpen) return null;

  const currentTab = quickAddType || activeTab;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedClient = clients.find((c) => c.id === updateClientId) || clients[0];
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
      const clientObj = clients.find((c) => c.id === offerClientId) || clients[0];
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
      const clientObj = clients.find((c) => c.id === meetingClientId) || clients[0];
      addMeeting({
        googleEventId: `evt-${Date.now()}`,
        clientId: clientObj.id,
        clientName: clientObj.name,
        title: meetingTitle || `${clientObj.name} Alignment Sync`,
        startTime: `${currentDate}T${meetingTime}:00`,
        endTime: `${currentDate}T${meetingTime}:30`,
        meetLink: `https://meet.google.com/meet-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Scheduled',
        organizer: 'Pradeep',
        participants: [clientObj.primaryContact.email, 'pradeep@csops.com'],
        description: 'Scheduled campaign & updates sync.',
        meetingNotes: 'Meeting scheduled via Quick Add.',
        keyDecisions: ['Review performance metrics'],
        actionItems: ['Prepare presentation deck']
      });
    } else if (currentTab === 'task') {
      const clientObj = clients.find((c) => c.id === taskClientId) || clients[0];
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
      const clientObj = clients.find((c) => c.id === followUpClientId) || clients[0];
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Quick Add Record</h2>
          </div>
          <button 
            onClick={closeQuickAdd}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 text-xs font-medium">
          {(['update', 'offer', 'meeting', 'task', 'followup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center border-b-2 capitalize transition-colors ${
                currentTab === tab 
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5 font-semibold' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'update' ? 'Update' : tab}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-200">
          {currentTab === 'update' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Client</label>
                  <select
                    value={updateClientId}
                    onChange={(e) => setUpdateClientId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Related Offer (Optional)</label>
                  <select
                    value={updateOfferId}
                    onChange={(e) => setUpdateOfferId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">None / General</option>
                    {offers.map((o) => (
                      <option key={o.id} value={o.id}>{o.offerName} ({o.clientName})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Update Category</label>
                  <select
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value as UpdateCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Performance">Performance</option>
                    <option value="New Offer">New Offer</option>
                    <option value="Testing Request">Testing Request</option>
                    <option value="Volume Request">Volume Request</option>
                    <option value="Creative">Creative</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Payment">Payment</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Source</label>
                  <select
                    value={updateSource}
                    onChange={(e) => setUpdateSource(e.target.value as 'Client' | 'Internal')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Client">Client</option>
                    <option value="Internal">Internal Team</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Priority</label>
                  <select
                    value={updatePriority}
                    onChange={(e) => setUpdatePriority(e.target.value as 'High' | 'Medium' | 'Low')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Primary Subject / Contact</label>
                <input
                  type="text"
                  placeholder="e.g. John Miller (Client A) or Design Team"
                  value={updatePrimarySubject}
                  onChange={(e) => setUpdatePrimarySubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Update Message</label>
                <textarea
                  rows={3}
                  placeholder="Detailed notes regarding performance, creative, testing cap, or volume request..."
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {currentTab === 'offer' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Offer Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Offer D - Loan Approval"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Client</label>
                  <select
                    value={offerClientId}
                    onChange={(e) => setOfferClientId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Network</label>
                  <input
                    type="text"
                    value={offerNetwork}
                    onChange={(e) => setOfferNetwork(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Test Cap (Volume)</label>
                  <input
                    type="number"
                    value={offerVolume}
                    onChange={(e) => setOfferVolume(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Target Revenue ($)</label>
                  <input
                    type="number"
                    value={offerRevenue}
                    onChange={(e) => setOfferRevenue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {currentTab === 'meeting' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Meeting Title</label>
                <input
                  type="text"
                  placeholder="e.g. Client Performance Sync"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Client</label>
                  <select
                    value={meetingClientId}
                    onChange={(e) => setMeetingClientId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Start Time</label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {currentTab === 'task' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Send EPC analysis report"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Client</label>
                  <select
                    value={taskClientId}
                    onChange={(e) => setTaskClientId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Assign To</label>
                  <input
                    type="text"
                    value={taskAssignedTo}
                    onChange={(e) => setTaskAssignedTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {currentTab === 'followup' && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Follow-up Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Confirm cap increase with team"
                  value={followUpTitle}
                  onChange={(e) => setFollowUpTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Client</label>
                  <select
                    value={followUpClientId}
                    onChange={(e) => setFollowUpClientId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Owner</label>
                  <input
                    type="text"
                    value={followUpAssignedTo}
                    onChange={(e) => setFollowUpAssignedTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Due Date</label>
                  <input
                    type="date"
                    value={followUpDueDate}
                    onChange={(e) => setFollowUpDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={closeQuickAdd}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
