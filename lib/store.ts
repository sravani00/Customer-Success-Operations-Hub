import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  Client, 
  Offer, 
  ClientUpdate, 
  EmailMessage, 
  Meeting, 
  TaskItem, 
  FollowUpItem, 
  AppNotification, 
  SyncSettings,
  DataFeed,
  DataRevenueRecord,
  DataLogSource,
  DataDocument
} from '../types';
import { 
  INITIAL_CLIENTS, 
  INITIAL_OFFERS, 
  INITIAL_UPDATES, 
  INITIAL_EMAILS, 
  INITIAL_MEETINGS, 
  INITIAL_TASKS, 
  INITIAL_FOLLOWUPS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SETTINGS 
} from './mock-data';

interface AppState {
  // Store Data Entities
  clients: Client[];
  offers: Offer[];
  updates: ClientUpdate[];
  emails: EmailMessage[];
  meetings: Meeting[];
  tasks: TaskItem[];
  followUps: FollowUpItem[];
  notifications: AppNotification[];
  settings: SyncSettings;

  // Active Global Controls
  currentDate: string;
  searchQuery: string;
  isQuickAddOpen: boolean;
  quickAddType: 'update' | 'offer' | 'meeting' | 'task' | 'followup' | null;

  // State Mutators
  setCurrentDate: (date: string) => void;
  setSearchQuery: (query: string) => void;
  openQuickAdd: (type?: 'update' | 'offer' | 'meeting' | 'task' | 'followup') => void;
  closeQuickAdd: () => void;

  // Entity CRUD
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, clientData: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  addDataFeed: (clientId: string, feed: Omit<DataFeed, 'id'>) => Promise<void>;
  addDataRevenueRecord: (clientId: string, record: Omit<DataRevenueRecord, 'id'>) => Promise<void>;
  addDataLogSource: (clientId: string, log: Omit<DataLogSource, 'id'>) => Promise<void>;
  addDataDocument: (clientId: string, doc: Omit<DataDocument, 'id'>) => Promise<void>;

  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  
  addClientUpdate: (update: Omit<ClientUpdate, 'id' | 'timestamp'>) => void;
  deleteClientUpdate: (id: string) => void;

  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  updateMeeting: (id: string, meetingData: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  addMomPoint: (meetingId: string, point: string) => void;
  removeMomPoint: (meetingId: string, index: number) => void;
  
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTaskStatus: (id: string, status: TaskItem['status']) => void;
  updateTask: (id: string, taskData: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;
  
  addFollowUp: (followUp: Omit<FollowUpItem, 'id'>) => void;
  updateFollowUpStatus: (id: string, status: FollowUpItem['status']) => void;
  updateFollowUp: (id: string, followUpData: Partial<FollowUpItem>) => void;
  deleteFollowUp: (id: string) => void;

  // Email Parser Workflow Engine
  ingestEmail: (emailInput: { sender: string; subject: string; body: string; actionRequired?: boolean }) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Settings
  updateSettings: (newSettings: Partial<SyncSettings>) => void;

  // Populate / Clear Data
  populateDemoData: () => void;
  clearAllData: () => void;
  resetToDefaults: () => void;
  fetchFromDatabase: () => Promise<void>;
}

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      clients: INITIAL_CLIENTS,
      offers: INITIAL_OFFERS,
      updates: INITIAL_UPDATES,
      emails: INITIAL_EMAILS,
      meetings: INITIAL_MEETINGS,
      tasks: INITIAL_TASKS,
      followUps: INITIAL_FOLLOWUPS,
      notifications: INITIAL_NOTIFICATIONS,
      settings: INITIAL_SETTINGS,

      currentDate: getTodayDateString(),
      searchQuery: '',
      isQuickAddOpen: false,
      quickAddType: null,

      setCurrentDate: (date) => set({ currentDate: date }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      openQuickAdd: (type = 'update') => set({ isQuickAddOpen: true, quickAddType: type }),
      closeQuickAdd: () => set({ isQuickAddOpen: false, quickAddType: null }),

      addClient: async (clientData) => {
        const payload = {
          ...clientData,
          createdAt: get().currentDate
        };
        try {
          const res = await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const saved = await res.json();
            set((state) => ({ clients: [saved, ...state.clients] }));
            return;
          }
        } catch (e) {
          console.error('Failed to create client in Supabase:', e);
        }
        const fallbackClient: Client = { ...payload, id: `client-${Date.now()}` };
        set((state) => ({ clients: [fallbackClient, ...state.clients] }));
      },

      updateClient: async (id, clientPartial) => {
        set((state) => ({
          clients: state.clients.map((c) => (c.id === id ? { ...c, ...clientPartial } : c))
        }));
        try {
          await fetch(`/api/clients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientPartial),
          });
        } catch (e) {
          console.error('Failed to update client in Supabase:', e);
        }
      },

      deleteClient: async (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
          offers: state.offers.filter((o) => o.clientId !== id),
          meetings: state.meetings.filter((m) => m.clientId !== id),
          updates: state.updates.filter((u) => u.clientId !== id),
          tasks: state.tasks.filter((t) => t.clientId !== id),
          followUps: state.followUps.filter((f) => f.clientId !== id)
        }));
        try {
          await fetch(`/api/clients/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to delete client from Supabase:', e);
        }
      },

      addDataFeed: async (clientId, feedData) => {
        let savedFeed: DataFeed = { ...feedData, id: `f-${Date.now()}` };
        try {
          const res = await fetch(`/api/clients/${clientId}/feeds`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedData),
          });
          if (res.ok) {
            savedFeed = await res.json();
          }
        } catch (e) {
          console.error('Failed to add DataFeed:', e);
        }
        set((state) => ({
          clients: state.clients.map((c) => {
            if (c.id === clientId) {
              const activeFeeds = c.activeFeeds || [];
              return { ...c, activeFeeds: [savedFeed, ...activeFeeds] };
            }
            return c;
          }),
        }));
      },

      addDataRevenueRecord: async (clientId, recordData) => {
        let savedRecord: DataRevenueRecord = { ...recordData, id: `r-${Date.now()}` };
        try {
          const res = await fetch(`/api/clients/${clientId}/revenue`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordData),
          });
          if (res.ok) {
            savedRecord = await res.json();
          }
        } catch (e) {
          console.error('Failed to add DataRevenueRecord:', e);
        }
        set((state) => ({
          clients: state.clients.map((c) => {
            if (c.id === clientId) {
              const revenueHistory = c.revenueHistory || [];
              return { ...c, revenueHistory: [savedRecord, ...revenueHistory] };
            }
            return c;
          }),
        }));
      },

      addDataLogSource: async (clientId, logData) => {
        let savedLog: DataLogSource = { ...logData, id: `l-${Date.now()}` };
        try {
          const res = await fetch(`/api/clients/${clientId}/logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData),
          });
          if (res.ok) {
            savedLog = await res.json();
          }
        } catch (e) {
          console.error('Failed to add DataLogSource:', e);
        }
        set((state) => ({
          clients: state.clients.map((c) => {
            if (c.id === clientId) {
              const dataLogs = c.dataLogs || [];
              return { ...c, dataLogs: [savedLog, ...dataLogs] };
            }
            return c;
          }),
        }));
      },

      addDataDocument: async (clientId, docData) => {
        let savedDoc: DataDocument = { ...docData, id: `d-${Date.now()}` };
        try {
          const res = await fetch(`/api/clients/${clientId}/documents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(docData),
          });
          if (res.ok) {
            savedDoc = await res.json();
          }
        } catch (e) {
          console.error('Failed to add DataDocument:', e);
        }
        set((state) => ({
          clients: state.clients.map((c) => {
            if (c.id === clientId) {
              const dataDocuments = c.dataDocuments || [];
              return { ...c, dataDocuments: [savedDoc, ...dataDocuments] };
            }
            return c;
          }),
        }));
      },

      addOffer: async (offerData) => {
        try {
          const res = await fetch('/api/offers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(offerData),
          });
          if (res.ok) {
            const saved = await res.json();
            set((state) => ({ offers: [saved, ...state.offers] }));
            return;
          }
        } catch (e) {
          console.error('Failed to create offer in Supabase:', e);
        }
        const fallbackOffer: Offer = { ...offerData, id: `offer-${Date.now()}` };
        set((state) => ({ offers: [fallbackOffer, ...state.offers] }));
      },

      updateOffer: async (id, offerPartial) => {
        set((state) => ({
          offers: state.offers.map((o) => (o.id === id ? { ...o, ...offerPartial } : o))
        }));
        try {
          await fetch(`/api/offers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(offerPartial),
          });
        } catch (e) {
          console.error('Failed to update offer in Supabase:', e);
        }
      },

      deleteOffer: async (id) => {
        set((state) => ({
          offers: state.offers.filter((o) => o.id !== id)
        }));
        try {
          await fetch(`/api/offers/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to delete offer from Supabase:', e);
        }
      },

      addClientUpdate: async (updateData) => {
        const payload = {
          ...updateData,
          timestamp: new Date().toISOString()
        };
        try {
          const res = await fetch('/api/updates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const saved = await res.json();
            set((state) => ({ updates: [saved, ...state.updates] }));
            return;
          }
        } catch (e) {
          console.error('Failed to create update in Supabase:', e);
        }
        const fallbackUpdate: ClientUpdate = { ...payload, id: `up-${Date.now()}` };
        set((state) => ({ updates: [fallbackUpdate, ...state.updates] }));
      },

      deleteClientUpdate: async (id) => {
        set((state) => ({
          updates: state.updates.filter((u) => u.id !== id)
        }));
        try {
          await fetch(`/api/updates/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to delete update from Supabase:', e);
        }
      },

      addMeeting: async (meetingData) => {
        try {
          const res = await fetch('/api/meetings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingData),
          });
          if (res.ok) {
            const saved = await res.json();
            set((state) => ({ meetings: [saved, ...state.meetings] }));
            return;
          }
        } catch (e) {
          console.error('Failed to create meeting in Supabase:', e);
        }
        const fallbackMeeting: Meeting = { ...meetingData, id: `meet-${Date.now()}` };
        set((state) => ({ meetings: [fallbackMeeting, ...state.meetings] }));
      },

      updateMeeting: async (id, meetingPartial) => {
        set((state) => ({
          meetings: state.meetings.map((m) => (m.id === id ? { ...m, ...meetingPartial } : m))
        }));
        try {
          await fetch(`/api/meetings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingPartial),
          });
        } catch (e) {
          console.error('Failed to update meeting in Supabase:', e);
        }
      },

      deleteMeeting: async (id) => {
        set((state) => ({
          meetings: state.meetings.filter((m) => m.id !== id)
        }));
        try {
          await fetch(`/api/meetings/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to delete meeting from Supabase:', e);
        }
      },

      addMomPoint: (meetingId, point) => {
        if (!point.trim()) return;
        set((state) => ({
          meetings: state.meetings.map((m) => {
            if (m.id === meetingId) {
              const existing = m.momPoints || [];
              return { ...m, momPoints: [...existing, point.trim()] };
            }
            return m;
          })
        }));
      },

      removeMomPoint: (meetingId, index) => {
        set((state) => ({
          meetings: state.meetings.map((m) => {
            if (m.id === meetingId) {
              const existing = m.momPoints || [];
              return { ...m, momPoints: existing.filter((_, idx) => idx !== index) };
            }
            return m;
          })
        }));
      },

      addTask: async (taskData) => {
        try {
          const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
          });
          if (res.ok) {
            const saved = await res.json();
            set((state) => ({ tasks: [saved, ...state.tasks] }));
            return;
          }
        } catch (e) {
          console.error('Failed to create task in Supabase:', e);
        }
        const fallbackTask: TaskItem = { ...taskData, id: `task-${Date.now()}` };
        set((state) => ({ tasks: [fallbackTask, ...state.tasks] }));
      },

      updateTaskStatus: async (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t))
        }));
        try {
          await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          });
        } catch (e) {
          console.error('Failed to update task status in Supabase:', e);
        }
      },

      updateTask: async (id, taskPartial) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...taskPartial } : t))
        }));
        try {
          await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskPartial),
          });
        } catch (e) {
          console.error('Failed to update task in Supabase:', e);
        }
      },

      deleteTask: async (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id)
        }));
        try {
          await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to delete task from Supabase:', e);
        }
      },

      addFollowUp: async (followUpData) => {
        try {
          const res = await fetch('/api/follow-ups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(followUpData),
          });
          if (res.ok) {
            const saved = await res.json();
            set((state) => ({ followUps: [saved, ...state.followUps] }));
            return;
          }
        } catch (e) {
          console.error('Failed to create follow-up in Supabase:', e);
        }
        const fallbackFollowUp: FollowUpItem = { ...followUpData, id: `fl-${Date.now()}` };
        set((state) => ({ followUps: [fallbackFollowUp, ...state.followUps] }));
      },

      updateFollowUpStatus: async (id, status) => {
        set((state) => ({
          followUps: state.followUps.map((f) => (f.id === id ? { ...f, status } : f))
        }));
        try {
          await fetch(`/api/follow-ups/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          });
        } catch (e) {
          console.error('Failed to update follow-up status in Supabase:', e);
        }
      },

      updateFollowUp: async (id, followUpPartial) => {
        set((state) => ({
          followUps: state.followUps.map((f) => (f.id === id ? { ...f, ...followUpPartial } : f))
        }));
        try {
          await fetch(`/api/follow-ups/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(followUpPartial),
          });
        } catch (e) {
          console.error('Failed to update follow-up in Supabase:', e);
        }
      },

      deleteFollowUp: async (id) => {
        set((state) => ({
          followUps: state.followUps.filter((f) => f.id !== id)
        }));
        try {
          await fetch(`/api/follow-ups/${id}`, { method: 'DELETE' });
        } catch (e) {
          console.error('Failed to delete follow-up from Supabase:', e);
        }
      },

      ingestEmail: ({ sender, subject, body, actionRequired = true }) => {
        const state = get();
        const idSuffix = Date.now();
        const todayStr = state.currentDate;

        const matchedClient = state.clients.find(
          (c) => sender.toLowerCase().includes(c.name.toLowerCase()) || 
                 sender.toLowerCase().includes(c.primaryContact.email.toLowerCase()) ||
                 (c.primaryContact.email.split('@')[1] && sender.toLowerCase().includes(c.primaryContact.email.split('@')[1].toLowerCase()))
        ) || state.clients[0] || {
          id: `client-${idSuffix}`,
          name: 'New Inbound Client',
          company: 'Inbound Organization',
          status: 'Active',
          subModule: 'Lead',
          communicationMode: 'Email',
          primaryContact: { name: sender.split('@')[0], email: sender, phone: '', role: 'Contact' },
          createdAt: todayStr
        };

        const matchedOffer = state.offers.find((o) => o.clientId === matchedClient.id);
        const category = subject.toLowerCase().includes('offer') ? 'New Offer' : 
                         subject.toLowerCase().includes('issue') ? 'Technical Issue' : 
                         subject.toLowerCase().includes('test') ? 'Testing Request' : 'Performance';

        const newEmail: EmailMessage = {
          id: `em-${idSuffix}`,
          gmailMessageId: `msg-${idSuffix}`,
          gmailThreadId: `th-${idSuffix}`,
          clientId: matchedClient.id,
          clientName: matchedClient.name,
          offerId: matchedOffer?.id,
          offerName: matchedOffer?.offerName,
          sender,
          category,
          subject,
          body,
          receivedAt: new Date().toISOString(),
          actionRequired,
          processed: true
        };

        const newUpdate: ClientUpdate = {
          id: `up-${idSuffix}`,
          clientId: matchedClient.id,
          clientName: matchedClient.name,
          offerId: matchedOffer?.id,
          offerName: matchedOffer?.offerName,
          type: category,
          source: 'Client',
          message: `${matchedClient.name}: "${subject}"`,
          priority: actionRequired ? 'High' : 'Medium',
          status: 'In Review',
          timestamp: new Date().toISOString(),
          primarySubject: matchedClient.primaryContact.name
        };

        let newTask: TaskItem | undefined;
        let newFollowUp: FollowUpItem | undefined;

        if (actionRequired) {
          newTask = {
            id: `task-${idSuffix}`,
            clientId: matchedClient.id,
            clientName: matchedClient.name,
            offerId: matchedOffer?.id,
            offerName: matchedOffer?.offerName,
            sourceType: 'Email',
            sourceId: newEmail.id,
            title: `Review Email: ${subject}`,
            assignedTo: 'Vamshi',
            dueDate: todayStr,
            status: 'Not Started'
          };

          newFollowUp = {
            id: `fl-${idSuffix}`,
            clientId: matchedClient.id,
            clientName: matchedClient.name,
            offerId: matchedOffer?.id,
            offerName: matchedOffer?.offerName,
            taskId: newTask.id,
            title: `Follow up on: ${subject}`,
            reminderAt: `${todayStr}T10:00:00`,
            assignedTo: 'Vamshi',
            status: 'Due Today',
            dueDate: todayStr
          };
        }

        const newNotification: AppNotification = {
          id: `notif-${idSuffix}`,
          title: `New Email from ${matchedClient.name}`,
          message: subject,
          type: 'email',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        };

        set((s) => ({
          emails: [newEmail, ...s.emails],
          updates: [newUpdate, ...s.updates],
          tasks: newTask ? [newTask, ...s.tasks] : s.tasks,
          followUps: newFollowUp ? [newFollowUp, ...s.followUps] : s.followUps,
          notifications: [newNotification, ...s.notifications]
        }));
      },

      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },

      populateDemoData: () => {
        set({
          clients: [],
          offers: [],
          updates: [],
          emails: [],
          meetings: [],
          tasks: [],
          followUps: [],
          notifications: []
        });
      },

      clearAllData: () => {
        set({
          clients: [],
          offers: [],
          updates: [],
          emails: [],
          meetings: [],
          tasks: [],
          followUps: [],
          notifications: []
        });
      },

      resetToDefaults: () => {
        set({
          clients: INITIAL_CLIENTS,
          offers: INITIAL_OFFERS,
          updates: INITIAL_UPDATES,
          emails: INITIAL_EMAILS,
          meetings: INITIAL_MEETINGS,
          tasks: INITIAL_TASKS,
          followUps: INITIAL_FOLLOWUPS,
          notifications: INITIAL_NOTIFICATIONS,
          settings: INITIAL_SETTINGS,
          currentDate: getTodayDateString(),
          searchQuery: ''
        });
      },

      fetchFromDatabase: async () => {
        try {
          const [clientsRes, offersRes, meetingsRes, tasksRes, followUpsRes, updatesRes] = await Promise.all([
            fetch('/api/clients').catch(() => null),
            fetch('/api/offers').catch(() => null),
            fetch('/api/meetings').catch(() => null),
            fetch('/api/tasks').catch(() => null),
            fetch('/api/follow-ups').catch(() => null),
            fetch('/api/updates').catch(() => null),
          ]);

          const clients = clientsRes && clientsRes.ok ? await clientsRes.json() : null;
          const offers = offersRes && offersRes.ok ? await offersRes.json() : null;
          const meetings = meetingsRes && meetingsRes.ok ? await meetingsRes.json() : null;
          const tasks = tasksRes && tasksRes.ok ? await tasksRes.json() : null;
          const followUps = followUpsRes && followUpsRes.ok ? await followUpsRes.json() : null;
          const updates = updatesRes && updatesRes.ok ? await updatesRes.json() : null;

          set((state) => ({
            clients: Array.isArray(clients) ? clients : state.clients,
            offers: Array.isArray(offers) ? offers : state.offers,
            meetings: Array.isArray(meetings) ? meetings : state.meetings,
            tasks: Array.isArray(tasks) ? tasks : state.tasks,
            followUps: Array.isArray(followUps) ? followUps : state.followUps,
            updates: Array.isArray(updates) ? updates : state.updates,
          }));
        } catch (e) {
          console.warn('Fallback to local store state:', e);
        }
      }
    }),
    {
      name: 'cs-ops-hub-storage-v3',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
