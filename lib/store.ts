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
  SyncSettings 
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
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  
  addClientUpdate: (update: Omit<ClientUpdate, 'id' | 'timestamp'>) => void;
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTaskStatus: (id: string, status: TaskItem['status']) => void;
  
  addFollowUp: (followUp: Omit<FollowUpItem, 'id'>) => void;
  updateFollowUpStatus: (id: string, status: FollowUpItem['status']) => void;

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
          industry: 'Digital Media',
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
        const todayStr = getTodayDateString();
        set({
          clients: [
            {
              id: 'client-a',
              name: 'Client A',
              company: 'Acme Growth Media',
              status: 'Active',
              subModule: 'Affiliate Client',
              industry: 'Digital Marketing',
              primaryContact: { name: 'John Miller', email: 'john@clienta.com', phone: '+1 555-2345', role: 'VP Marketing' },
              createdAt: todayStr,
              metricsSummary: '$45,000 / mo traffic volume'
            },
            {
              id: 'client-b',
              name: 'Client B',
              company: 'Nexus Affiliate Network',
              status: 'Active',
              subModule: 'Affiliate Client',
              industry: 'E-Commerce & Lead Gen',
              primaryContact: { name: 'Sarah Jenkins', email: 'sarah@nexusaffiliate.com', phone: '+1 555-8765', role: 'Head Partnerships' },
              createdAt: todayStr,
              metricsSummary: '12 Active Campaigns'
            },
            {
              id: 'client-c',
              name: 'Client C',
              company: 'Vortex Global Tech',
              status: 'Active',
              subModule: 'Data Partner',
              industry: 'SaaS Feeds',
              primaryContact: { name: 'Michael Chang', email: 'm.chang@vortexglobal.com', phone: '+1 555-3456', role: 'Ops Director' },
              createdAt: todayStr,
              metricsSummary: '1.2M API Records / day'
            },
            {
              id: 'client-d',
              name: 'Client D',
              company: 'Apex Partners Consulting',
              status: 'Onboarding',
              subModule: 'Consulting',
              industry: 'CS Advisory',
              primaryContact: { name: 'Elena Rostova', email: 'elena@apexpartners.com', phone: '+1 555-9012', role: 'Account Lead' },
              createdAt: todayStr,
              metricsSummary: 'Q3 Strategy Project'
            }
          ],
          offers: [
            {
              id: 'offer-a',
              clientId: 'client-a',
              clientName: 'Client A',
              offerName: 'Offer A - Credit Score Flow',
              offerCode: 'OFF-A101',
              network: 'Network X',
              category: 'Finance',
              status: 'Active',
              description: 'Credit score monitoring flow.',
              landingPageUrl: 'https://landing.clienta.com/offer-a-v2',
              emailCreative: 'Creative Variant A2',
              fromName: 'Credit Support',
              subjectLine: 'Check Your Updated Financial Score Today',
              targetAudience: 'US Adults 25-54',
              geo: 'US, CA',
              device: 'All Devices',
              trafficSource: 'Email Broadcast',
              volume: 25000,
              leads: 1850,
              successfulLeads: 1720,
              cancelledLeads: 130,
              revenue: 4250,
              cpl: 2.30,
              epc: 0.17,
              testingStatus: 'Completed',
              testStartDate: todayStr,
              testVolume: 25000,
              testResult: 'Variant A outperforming by +14%',
              winnerVariant: 'Variant A2',
              nextTestPlan: 'Scale cap to 50k once approved.',
              followUpDate: todayStr,
              owner: 'Vamshi'
            },
            {
              id: 'offer-b',
              clientId: 'client-b',
              clientName: 'Client B',
              offerName: 'Offer B - Wellness Trial',
              offerCode: 'OFF-B204',
              network: 'Network Y',
              category: 'E-Commerce',
              status: 'Testing',
              description: 'Nutraceutical subscription trial offer.',
              landingPageUrl: 'https://checkout.nexusaffiliate.com/offer-b',
              emailCreative: 'Creative B - Summer Wellness',
              fromName: 'Wellness Direct',
              subjectLine: 'Claim Your Trial Bottle',
              targetAudience: 'Females 30+',
              geo: 'US, UK',
              device: 'Mobile Preferred',
              trafficSource: 'Native, Email',
              volume: 40000,
              leads: 3200,
              successfulLeads: 3050,
              cancelledLeads: 150,
              revenue: 8900,
              cpl: 2.78,
              epc: 0.22,
              testingStatus: 'In Progress',
              testStartDate: todayStr,
              testVolume: 15000,
              testResult: 'Mobile flow testing',
              winnerVariant: 'Mobile Flow V3',
              nextTestPlan: 'Expand GEO targeting.',
              followUpDate: todayStr,
              owner: 'Vamshi'
            }
          ],
          meetings: [
            {
              id: 'meet-1',
              googleEventId: 'evt-1',
              clientId: 'client-a',
              clientName: 'Client A',
              title: 'Client A Weekly Alignment Sync',
              startTime: `${todayStr}T11:00:00`,
              endTime: `${todayStr}T11:45:00`,
              meetLink: 'https://meet.google.com/abc-defg-hij',
              status: 'Scheduled',
              organizer: 'Vamshi (CS Ops)',
              participants: ['john@clienta.com', 'vamshi@csops.com'],
              description: 'Weekly review of Offer A caps, EPC metrics & revenue goals.',
              meetingNotes: 'Early conversion rate +14% above control.',
              keyDecisions: ['Increase test cap on Offer A to 25k'],
              actionItems: ['Prepare EPC metrics table']
            },
            {
              id: 'meet-2',
              googleEventId: 'evt-2',
              clientId: 'client-b',
              clientName: 'Client B',
              title: 'Offer B Testing & Revenue Sync',
              startTime: `${todayStr}T14:30:00`,
              endTime: `${todayStr}T15:00:00`,
              meetLink: 'https://meet.google.com/mno-pqrs-tuv',
              status: 'Scheduled',
              organizer: 'Sarah Jenkins',
              participants: ['sarah@nexusaffiliate.com', 'vamshi@csops.com'],
              description: 'Reviewing daily cap limits and mobile payout flow.',
              meetingNotes: 'Mobile checkout conversion rate holding at 8.2%.',
              keyDecisions: ['Maintain current traffic sources'],
              actionItems: ['Confirm testing cap for next variant']
            }
          ],
          tasks: [
            {
              id: 'task-1',
              clientId: 'client-a',
              clientName: 'Client A',
              sourceType: 'Email',
              title: 'Prepare Offer A Performance Breakdown Report',
              assignedTo: 'Vamshi',
              dueDate: todayStr,
              status: 'In Progress'
            },
            {
              id: 'task-2',
              clientId: 'client-b',
              clientName: 'Client B',
              sourceType: 'Meeting',
              title: 'Confirm Offer B Cap & Payout Limit',
              assignedTo: 'Sarah Jenkins',
              dueDate: todayStr,
              status: 'Not Started'
            },
            {
              id: 'task-3',
              clientId: 'client-c',
              clientName: 'Client C',
              sourceType: 'Update',
              title: 'Send Mobile Landing Page EPC Report to Michael',
              assignedTo: 'Vamshi',
              dueDate: todayStr,
              status: 'Waiting'
            }
          ],
          followUps: [
            {
              id: 'fl-1',
              clientId: 'client-a',
              clientName: 'Client A',
              title: 'Offer A Performance Sync Follow-up',
              reminderAt: `${todayStr}T10:00:00`,
              assignedTo: 'Vamshi',
              status: 'Due Today',
              dueDate: todayStr
            },
            {
              id: 'fl-2',
              clientId: 'client-b',
              clientName: 'Client B',
              title: 'Offer B Testing Cap Confirmation',
              reminderAt: `${todayStr}T11:00:00`,
              assignedTo: 'Team',
              status: 'Due Today',
              dueDate: todayStr
            }
          ],
          updates: [
            {
              id: 'up-1',
              clientId: 'client-a',
              clientName: 'Client A',
              type: 'Performance',
              source: 'Client',
              message: 'Client A requested Offer A performance review and conversion report.',
              priority: 'High',
              status: 'In Review',
              timestamp: `${todayStr}T10:32:00`,
              primarySubject: 'John Miller (Client A)'
            },
            {
              id: 'up-2',
              clientId: 'client-b',
              clientName: 'Client B',
              type: 'New Offer',
              source: 'Client',
              message: 'Client B shared new campaign offer list with updated payout rates.',
              priority: 'Medium',
              status: 'New',
              timestamp: `${todayStr}T11:15:00`,
              primarySubject: 'Sarah Jenkins (Client B)'
            }
          ]
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
      }
    }),
    {
      name: 'cs-ops-hub-storage-v3',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
