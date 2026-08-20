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

export const INITIAL_CLIENTS: Client[] = [];

export const INITIAL_OFFERS: Offer[] = [];

export const INITIAL_UPDATES: ClientUpdate[] = [];

export const INITIAL_EMAILS: EmailMessage[] = [];

export const INITIAL_MEETINGS: Meeting[] = [];

export const INITIAL_TASKS: TaskItem[] = [];

export const INITIAL_FOLLOWUPS: FollowUpItem[] = [];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [];

export const INITIAL_SETTINGS: SyncSettings = {
  syncMeetings: true,
  syncUpdates: true,
  syncCancellations: true,
  syncAttendees: true,
  importMeetLinks: true,
  frequency: '15-minute Polling',
  oauthConnected: true,
  userEmail: 'ops@cs-operations-hub.internal'
};
