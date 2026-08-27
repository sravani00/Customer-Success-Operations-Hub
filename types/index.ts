export type ClientStatus = 'Active' | 'Onboarding' | 'Inactive';
export type ClientSubModule = 'Affiliate Networks' | 'Data Partner' | 'Consulting' | 'Lead';
export type ClientSubCategory = 'Resolute' | 'Partners' | 'Ongage' | 'Agreement' | 'Rev-Share' | 'General';

export interface PrimaryContact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  status: ClientStatus;
  subModule: ClientSubModule;
  subModuleCategory?: ClientSubCategory;
  communicationMode?: string;
  primaryContact: PrimaryContact;
  createdAt: string;
  metricsSummary?: string;
  description?: string;
  leadStage?: 'New Lead' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won';
}

export type OfferStatus = 'Active' | 'Testing' | 'Pending' | 'Paused';

export interface Offer {
  id: string;
  clientId: string;
  clientName: string;
  offerName: string;
  offerCode: string;
  network: string;
  category: string;
  status: OfferStatus;
  description: string;
  landingPageUrl: string;
  emailCreative: string;
  fromName: string;
  subjectLine: string;
  targetAudience: string;
  geo: string;
  device: string;
  trafficSource: string;
  volume: number;
  leads: number;
  successfulLeads: number;
  cancelledLeads: number;
  revenue: number;
  cpl: number;
  epc: number;
  testingStatus: 'In Progress' | 'Completed' | 'Pending Approval' | 'Failed';
  testStartDate: string;
  testVolume: number;
  testResult: string;
  winnerVariant: string;
  nextTestPlan: string;
  followUpDate: string;
  owner: string;
}

export type UpdateCategory = 
  | 'Performance' 
  | 'New Offer' 
  | 'Testing Request' 
  | 'Volume Request' 
  | 'Landing Page' 
  | 'Creative' 
  | 'Technical Issue' 
  | 'Payment' 
  | 'Reporting' 
  | 'Deliverability' 
  | 'General' 
  | 'Other';

export interface ClientUpdate {
  id: string;
  clientId: string;
  clientName: string;
  offerId?: string;
  offerName?: string;
  type: UpdateCategory;
  source: 'Client' | 'Internal';
  message: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'New' | 'In Review' | 'Resolved';
  timestamp: string;
  primarySubject: string;
}

export interface EmailMessage {
  id: string;
  gmailMessageId: string;
  gmailThreadId: string;
  clientId: string;
  clientName: string;
  offerId?: string;
  offerName?: string;
  sender: string;
  category: UpdateCategory;
  subject: string;
  body: string;
  receivedAt: string;
  actionRequired: boolean;
  processed: boolean;
}

export interface Meeting {
  id: string;
  googleEventId: string;
  clientId: string;
  clientName: string;
  offerId?: string;
  offerName?: string;
  title: string;
  startTime: string;
  endTime: string;
  meetLink: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  organizer: string;
  participants: string[];
  description: string;
  meetingNotes: string;
  keyDecisions: string[];
  actionItems: string[];
  momPoints?: string[];
}

export type TaskStatus = 'Not Started' | 'In Progress' | 'Waiting' | 'Completed' | 'Cancelled';

export interface TaskItem {
  id: string;
  clientId: string;
  clientName: string;
  offerId?: string;
  offerName?: string;
  sourceType: 'Email' | 'Meeting' | 'Update' | 'Manual';
  sourceId?: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: TaskStatus;
}

export type FollowUpStatus = 'Pending' | 'Due Today' | 'Overdue' | 'Completed';

export interface FollowUpItem {
  id: string;
  clientId: string;
  clientName: string;
  offerId?: string;
  offerName?: string;
  taskId?: string;
  title: string;
  reminderAt: string;
  assignedTo: string;
  status: FollowUpStatus;
  dueDate: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'email' | 'meeting' | 'task' | 'followup' | 'offer';
  timestamp: string;
  read: boolean;
}

export interface SyncSettings {
  syncMeetings: boolean;
  syncUpdates: boolean;
  syncCancellations: boolean;
  syncAttendees: boolean;
  importMeetLinks: boolean;
  frequency: 'Real-time Webhooks' | '5-minute Polling' | '15-minute Polling';
  oauthConnected: boolean;
  userEmail: string;
}
