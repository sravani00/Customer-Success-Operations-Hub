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
  UpdateCategory
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
  // Data entities
  clients: Client[];
  offers: Offer[];
  updates: ClientUpdate[];
  emails: EmailMessage[];
  meetings: Meeting[];
  tasks: TaskItem[];
  followUps: FollowUpItem[];
  notifications: AppNotification[];
  settings: SyncSettings;

  // App UI state
  currentDate: string; // YYYY-MM-DD, defaults to '2026-08-17'
  searchQuery: string;
  isQuickAddOpen: boolean;
  quickAddType: 'update' | 'offer' | 'meeting' | 'task' | 'followup' | null;

  // Actions
  setCurrentDate: (date: string) => void;
  setSearchQuery: (query: string) => void;
  openQuickAdd: (type?: 'update' | 'offer' | 'meeting' | 'task' | 'followup') => void;
  closeQuickAdd: () => void;

  // Entity CRUD
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  
  addClientUpdate: (update: Omit<ClientUpdate, 'id' | 'timestamp'>) => void;
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTaskStatus: (id: string, status: TaskItem['status']) => void;
  
  addFollowUp: (followUp: Omit<FollowUpItem, 'id'>) => void;
  updateFollowUpStatus: (id: string, status: FollowUpItem['status']) => void;

  // Email Parser Workflow Engine (Section 10 & 11)
  ingestEmail: (emailInput: { sender: string; subject: string; body: string; actionRequired?: boolean }) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Settings
  updateSettings: (newSettings: Partial<SyncSettings>) => void;

  // Reset demo state
  resetToDefaults: () => void;
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

      addClient: (clientData) => {
        const newClient: Client = {
          ...clientData,
          id: `client-${Date.now()}`,
          createdAt: get().currentDate
        };
        set((state) => ({ clients: [newClient, ...state.clients] }));
      },

      addOffer: (offerData) => {
        const newOffer: Offer = {
          ...offerData,
          id: `offer-${Date.now()}`
        };
        set((state) => ({ offers: [newOffer, ...state.offers] }));
      },

      updateOffer: (id, offerPartial) => {
        set((state) => ({
          offers: state.offers.map((o) => (o.id === id ? { ...o, ...offerPartial } : o))
        }));
      },

      addClientUpdate: (updateData) => {
        const newUpdate: ClientUpdate = {
          ...updateData,
          id: `up-${Date.now()}`,
          timestamp: new Date().toISOString()
        };
        set((state) => ({ updates: [newUpdate, ...state.updates] }));
      },

      addMeeting: (meetingData) => {
        const newMeeting: Meeting = {
          ...meetingData,
          id: `meet-${Date.now()}`
        };
        set((state) => ({ meetings: [newMeeting, ...state.meetings] }));
      },

      addTask: (taskData) => {
        const newTask: TaskItem = {
          ...taskData,
          id: `task-${Date.now()}`
        };
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      },

      updateTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t))
        }));
      },

      addFollowUp: (followUpData) => {
        const newFollowUp: FollowUpItem = {
          ...followUpData,
          id: `fl-${Date.now()}`
        };
        set((state) => ({ followUps: [newFollowUp, ...state.followUps] }));
      },

      updateFollowUpStatus: (id, status) => {
        set((state) => ({
          followUps: state.followUps.map((f) => (f.id === id ? { ...f, status } : f))
        }));
      },

      ingestEmail: ({ sender, subject, body, actionRequired = true }) => {
        const state = get();
        const idSuffix = Date.now();

        // 1. Identify Sender / Client
        const matchedClient = state.clients.find(
          (c) => sender.toLowerCase().includes(c.name.toLowerCase()) || 
                 sender.toLowerCase().includes(c.primaryContact.email.toLowerCase()) ||
                 c.primaryContact.email.split('@')[1] && sender.toLowerCase().includes(c.primaryContact.email.split('@')[1].toLowerCase())
        ) || state.clients[0];

        // 2. Identify Offer Context
        const matchedOffer = state.offers.find(
          (o) => subject.toLowerCase().includes(o.offerName.toLowerCase()) ||
                 body.toLowerCase().includes(o.offerName.toLowerCase())
        );

        // 3. Category Detection
        let category: UpdateCategory = 'General';
        const text = `${subject} ${body}`.toLowerCase();
        if (text.includes('performance') || text.includes('epc') || text.includes('conversion')) category = 'Performance';
        else if (text.includes('test') || text.includes('cap')) category = 'Testing Request';
        else if (text.includes('new offer') || text.includes('list')) category = 'New Offer';
        else if (text.includes('creative') || text.includes('banner')) category = 'Creative';
        else if (text.includes('payment') || text.includes('invoice')) category = 'Payment';

        // 4. Create Email record
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

        // 5. Create Client Update
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
          // 6. Generate Task
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
            dueDate: state.currentDate,
            status: 'Not Started'
          };

          // 7. Generate Follow-up
          newFollowUp = {
            id: `fl-${idSuffix}`,
            clientId: matchedClient.id,
            clientName: matchedClient.name,
            offerId: matchedOffer?.id,
            offerName: matchedOffer?.offerName,
            taskId: newTask.id,
            title: `Follow up on: ${subject}`,
            reminderAt: `${state.currentDate}T10:00:00`,
            assignedTo: 'Vamshi',
            status: 'Due Today',
            dueDate: state.currentDate
          };
        }

        // 8. Notification
        const newNotification: AppNotification = {
          id: `notif-${idSuffix}`,
          title: `New Client Email (${matchedClient.name})`,
          message: subject,
          type: 'email',
          timestamp: 'Just now',
          read: false
        };

        set((prev) => ({
          emails: [newEmail, ...prev.emails],
          updates: [newUpdate, ...prev.updates],
          tasks: newTask ? [newTask, ...prev.tasks] : prev.tasks,
          followUps: newFollowUp ? [newFollowUp, ...prev.followUps] : prev.followUps,
          notifications: [newNotification, ...prev.notifications]
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
          currentDate: '2026-08-17',
          searchQuery: ''
        });
      }
    }),
    {
      name: 'cs-ops-hub-storage-v1',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
