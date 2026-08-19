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

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'client-a',
    name: 'Client A',
    company: 'Acme Growth Media',
    status: 'Active',
    industry: 'Digital Marketing & Affiliate',
    primaryContact: {
      name: 'John Miller',
      email: 'john@clienta.com',
      phone: '+1 (555) 234-5678',
      role: 'VP of Performance Marketing'
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'client-b',
    name: 'Client B',
    company: 'Nexus Affiliate Network',
    status: 'Active',
    industry: 'E-Commerce & Lead Gen',
    primaryContact: {
      name: 'Sarah Jenkins',
      email: 'sarah@nexusaffiliate.com',
      phone: '+1 (555) 876-5432',
      role: 'Head of Strategic Partnerships'
    },
    createdAt: '2026-03-01'
  },
  {
    id: 'client-c',
    name: 'Client C',
    company: 'Vortex Global Tech',
    status: 'Active',
    industry: 'SaaS & Mobile Apps',
    primaryContact: {
      name: 'Michael Chang',
      email: 'm.chang@vortexglobal.com',
      phone: '+1 (555) 345-6789',
      role: 'Operations Director'
    },
    createdAt: '2026-05-10'
  },
  {
    id: 'client-d',
    name: 'Client D',
    company: 'Apex Partners',
    status: 'Onboarding',
    industry: 'Financial Services',
    primaryContact: {
      name: 'Elena Rostova',
      email: 'elena@apexpartners.com',
      phone: '+1 (555) 901-2345',
      role: 'Account Lead'
    },
    createdAt: '2026-08-01'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'offer-a',
    clientId: 'client-a',
    clientName: 'Client A',
    offerName: 'Offer A',
    offerCode: 'OFF-A101',
    network: 'Network X',
    category: 'Finance / Credit',
    status: 'Testing',
    description: 'High converting credit score monitoring offer with custom landing pages.',
    landingPageUrl: 'https://landing.clienta.com/offer-a-v2',
    emailCreative: 'Creative Variant A2 - High Intent Headline',
    fromName: 'Credit Support Team',
    subjectLine: 'Check Your Updated Financial Score Today',
    targetAudience: 'US Adults 25-54, Credit Conscious',
    geo: 'US, CA',
    device: 'Desktop, Mobile',
    trafficSource: 'Email Broadcast, Search',
    volume: 25000,
    leads: 1850,
    successfulLeads: 1720,
    cancelledLeads: 130,
    revenue: 4250,
    cpl: 2.30,
    epc: 0.17,
    testingStatus: 'In Progress',
    testStartDate: '2026-08-16',
    testVolume: 25000,
    testResult: 'Variant A outperforming control by +14% CTR',
    winnerVariant: 'Variant A2',
    nextTestPlan: 'Scale cap to 50k once capping approval is received.',
    followUpDate: '2026-08-19',
    owner: 'Pradeep'
  },
  {
    id: 'offer-b',
    clientId: 'client-b',
    clientName: 'Client B',
    offerName: 'Offer B',
    offerCode: 'OFF-B204',
    network: 'Network Y',
    category: 'E-Commerce / Health',
    status: 'Active',
    description: 'Nutraceutical subscription trial offer with recurring revenue model.',
    landingPageUrl: 'https://checkout.nexusaffiliate.com/offer-b',
    emailCreative: 'Creative B - Summer Wellness Promo',
    fromName: 'Wellness Direct',
    subjectLine: 'Special Summer Offer: Claim Your Trial Bottle',
    targetAudience: 'US/UK Females 30+',
    geo: 'US, UK, AU',
    device: 'Mobile Preferred',
    trafficSource: 'Native, Email',
    volume: 40000,
    leads: 3200,
    successfulLeads: 3050,
    cancelledLeads: 150,
    revenue: 8900,
    cpl: 2.78,
    epc: 0.22,
    testingStatus: 'Completed',
    testStartDate: '2026-08-10',
    testVolume: 15000,
    testResult: 'Winner declared: Mobile optimized flow',
    winnerVariant: 'Mobile Flow V3',
    nextTestPlan: 'Expand to tier-2 GEOs next week.',
    followUpDate: '2026-08-20',
    owner: 'Team'
  },
  {
    id: 'offer-c',
    clientId: 'client-c',
    clientName: 'Client C',
    offerName: 'Offer C',
    offerCode: 'OFF-C309',
    network: 'Network X',
    category: 'SaaS / Security',
    status: 'Active',
    description: 'Enterprise VPN annual subscription with 30-day money back guarantee.',
    landingPageUrl: 'https://vortexglobal.com/promo/sec-v1',
    emailCreative: 'Creative C - Cyber Security Alert',
    fromName: 'Vortex Security',
    subjectLine: 'Protect Your Online Privacy - 70% Off Today',
    targetAudience: 'Global Tech Enthusiasts',
    geo: 'Global',
    device: 'All Devices',
    trafficSource: 'Email, Display',
    volume: 40000,
    leads: 4100,
    successfulLeads: 3980,
    cancelledLeads: 120,
    revenue: 12400,
    cpl: 3.02,
    epc: 0.31,
    testingStatus: 'Completed',
    testStartDate: '2026-08-01',
    testVolume: 20000,
    testResult: 'High EPC verified across email channels',
    winnerVariant: 'Dark Theme Landing Page',
    nextTestPlan: 'Maintain active cap and review weekly ROI.',
    followUpDate: '2026-08-20',
    owner: 'Pradeep'
  }
];

export const INITIAL_UPDATES: ClientUpdate[] = [
  {
    id: 'up-1',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    type: 'Performance',
    source: 'Client',
    message: 'Client A requested Offer A performance review and conversion report.',
    priority: 'High',
    status: 'In Review',
    timestamp: '2026-08-17T10:32:00',
    primarySubject: 'John Miller (Client A)'
  },
  {
    id: 'up-2',
    clientId: 'client-b',
    clientName: 'Client B',
    offerId: 'offer-b',
    offerName: 'Offer B',
    type: 'New Offer',
    source: 'Client',
    message: 'Client B shared new campaign offer list with updated payout rates.',
    priority: 'Medium',
    status: 'New',
    timestamp: '2026-08-17T11:15:00',
    primarySubject: 'Sarah Jenkins (Client B)'
  },
  {
    id: 'up-3',
    clientId: 'client-c',
    clientName: 'Client C',
    offerId: 'offer-c',
    offerName: 'Offer C',
    type: 'Testing Request',
    source: 'Client',
    message: 'Client C requested campaign testing for new mobile landing page variant.',
    priority: 'Medium',
    status: 'New',
    timestamp: '2026-08-17T13:45:00',
    primarySubject: 'Michael Chang (Client C)'
  },
  {
    id: 'up-4',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    type: 'Volume Request',
    source: 'Internal',
    message: 'Internal campaign team approved testing and 25,000 cap expansion.',
    priority: 'High',
    status: 'Resolved',
    timestamp: '2026-08-17T14:30:00',
    primarySubject: 'Compliance & Operations Team'
  },
  {
    id: 'up-5',
    clientId: 'client-b',
    clientName: 'Client B',
    type: 'Creative',
    source: 'Client',
    message: 'Uploaded updated banner sets and refreshed email headers for August promo.',
    priority: 'Low',
    status: 'Resolved',
    timestamp: '2026-08-17T15:10:00',
    primarySubject: 'Design Team Sync'
  }
];

export const INITIAL_EMAILS: EmailMessage[] = [
  {
    id: 'em-1',
    gmailMessageId: 'msg-101',
    gmailThreadId: 'th-501',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    sender: 'john@clienta.com',
    category: 'Performance',
    subject: 'Please check the performance of Offer A.',
    body: 'Hi Pradeep,\n\nCould you please send over the detailed performance breakdown for Offer A? We noticed a spike in volume today and want to check EPC and conversion accuracy.\n\nThanks,\nJohn Miller',
    receivedAt: '2026-08-17T10:28:00',
    actionRequired: true,
    processed: true
  },
  {
    id: 'em-2',
    gmailMessageId: 'msg-102',
    gmailThreadId: 'th-502',
    clientId: 'client-b',
    clientName: 'Client B',
    offerId: 'offer-b',
    offerName: 'Offer B',
    sender: 'sarah@nexusaffiliate.com',
    category: 'New Offer',
    subject: 'New Offer list for Q3 - Nexus Affiliate',
    body: 'Hello Team,\n\nWe have just pushed 5 new wellness offers live for testing. Please review the attached creative guidelines and let us know your cap requirements.\n\nBest,\nSarah',
    receivedAt: '2026-08-17T11:10:00',
    actionRequired: true,
    processed: true
  },
  {
    id: 'em-3',
    gmailMessageId: 'msg-103',
    gmailThreadId: 'th-503',
    clientId: 'client-c',
    clientName: 'Client C',
    sender: 'm.chang@vortexglobal.com',
    category: 'Payment',
    subject: 'Invoice Confirmation & August Payment Sync',
    body: 'Hi CS Ops Team,\n\nPayment for invoice #VG-8902 has been released today via wire transfer. Please confirm receipt once processed.\n\nRegards,\nMichael',
    receivedAt: '2026-08-17T16:00:00',
    actionRequired: false,
    processed: true
  }
];

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'meet-1',
    googleEventId: 'evt-901',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    title: 'Client A Weekly Sync',
    startTime: '2026-08-17T11:00:00',
    endTime: '2026-08-17T11:45:00',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
    organizer: 'Pradeep (CS Ops)',
    participants: ['john@clienta.com', 'pradeep@csops.com', 'ops@csops.com'],
    description: 'Weekly alignment on Offer A performance, capping targets, and creative refresh.',
    meetingNotes: 'Client expressed satisfaction with early test results. Agreed to review cap expansion.',
    keyDecisions: ['Increase test cap on Offer A to 25k', 'Review creative variant A2 on Wednesday'],
    actionItems: ['Prepare EPC metrics table', 'Schedule follow-up sync for Aug 19']
  },
  {
    id: 'meet-2',
    googleEventId: 'evt-902',
    clientId: 'internal',
    clientName: 'Internal CS Team',
    title: 'Internal Campaign Strategy Review',
    startTime: '2026-08-17T16:00:00',
    endTime: '2026-08-17T17:00:00',
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'Scheduled',
    organizer: 'Team Lead',
    participants: ['pradeep@csops.com', 'team@csops.com'],
    description: 'Reviewing active campaigns, pending test caps, and urgent overdue follow-ups.',
    meetingNotes: 'Focus on resolving overdue items for Client D and preparing executive recap.',
    keyDecisions: ['Prioritize Client A performance review task', 'Re-assign Client D audit'],
    actionItems: ['Send EOD summary report to leadership']
  },
  {
    id: 'meet-3',
    googleEventId: 'evt-903',
    clientId: 'client-b',
    clientName: 'Client B',
    title: 'Offer B Capping & Revenue Review',
    startTime: '2026-08-17T09:00:00',
    endTime: '2026-08-17T09:30:00',
    meetLink: 'https://meet.google.com/mno-pqrs-tuv',
    status: 'Completed',
    organizer: 'Sarah Jenkins',
    participants: ['sarah@nexusaffiliate.com', 'team@csops.com'],
    description: 'Morning sync on Offer B daily volume caps.',
    meetingNotes: 'Cap held at 40k. EPC steady at $0.22.',
    keyDecisions: ['Maintain current traffic sources'],
    actionItems: ['Confirm testing cap for next variant']
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    sourceType: 'Email',
    sourceId: 'em-1',
    title: 'Check Offer A performance & send breakdown report',
    assignedTo: 'Pradeep',
    dueDate: '2026-08-17',
    status: 'In Progress'
  },
  {
    id: 'task-2',
    clientId: 'client-b',
    clientName: 'Client B',
    offerId: 'offer-b',
    offerName: 'Offer B',
    sourceType: 'Meeting',
    sourceId: 'meet-3',
    title: 'Confirm Testing Cap on Offer B variant',
    assignedTo: 'Team',
    dueDate: '2026-08-18',
    status: 'Not Started'
  },
  {
    id: 'task-3',
    clientId: 'client-c',
    clientName: 'Client C',
    offerId: 'offer-c',
    offerName: 'Offer C',
    sourceType: 'Update',
    sourceId: 'up-3',
    title: 'Send Performance Report to Michael',
    assignedTo: 'Pradeep',
    dueDate: '2026-08-20',
    status: 'Not Started'
  },
  {
    id: 'task-4',
    clientId: 'client-d',
    clientName: 'Client D',
    sourceType: 'Manual',
    title: 'Complete Onboarding Compliance Audit',
    assignedTo: 'Team',
    dueDate: '2026-08-15',
    status: 'In Progress'
  },
  {
    id: 'task-5',
    clientId: 'client-d',
    clientName: 'Client D',
    sourceType: 'Manual',
    title: 'Verify Bank Wire Account Details',
    assignedTo: 'Finance',
    dueDate: '2026-08-14',
    status: 'Not Started'
  }
];

export const INITIAL_FOLLOWUPS: FollowUpItem[] = [
  {
    id: 'fl-1',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    taskId: 'task-1',
    title: 'Offer A Performance Review Sync',
    reminderAt: '2026-08-17T10:00:00',
    assignedTo: 'Pradeep',
    status: 'Due Today',
    dueDate: '2026-08-17'
  },
  {
    id: 'fl-2',
    clientId: 'client-b',
    clientName: 'Client B',
    offerId: 'offer-b',
    offerName: 'Offer B',
    taskId: 'task-2',
    title: 'Offer B Testing Confirmation',
    reminderAt: '2026-08-19T10:00:00',
    assignedTo: 'Team',
    status: 'Pending',
    dueDate: '2026-08-19'
  },
  {
    id: 'fl-3',
    clientId: 'client-c',
    clientName: 'Client C',
    offerId: 'offer-c',
    offerName: 'Offer C',
    taskId: 'task-3',
    title: 'Offer C Weekly Reporting & EPC Check',
    reminderAt: '2026-08-20T10:00:00',
    assignedTo: 'Pradeep',
    status: 'Completed',
    dueDate: '2026-08-20'
  },
  {
    id: 'fl-4',
    clientId: 'client-d',
    clientName: 'Client D',
    taskId: 'task-4',
    title: 'Overdue: Onboarding Compliance Review',
    reminderAt: '2026-08-15T09:00:00',
    assignedTo: 'Team',
    status: 'Overdue',
    dueDate: '2026-08-15'
  },
  {
    id: 'fl-5',
    clientId: 'client-d',
    clientName: 'Client D',
    taskId: 'task-5',
    title: 'Overdue: Initial Offer Capping Schedule',
    reminderAt: '2026-08-14T09:00:00',
    assignedTo: 'Pradeep',
    status: 'Overdue',
    dueDate: '2026-08-14'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Client Email Received',
    message: 'John Miller (Client A): "Please check the performance of Offer A."',
    type: 'email',
    timestamp: '10:28 AM',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Upcoming Meeting in 30 mins',
    message: 'Client A Weekly Sync at 11:00 AM (Google Meet ready)',
    type: 'meeting',
    timestamp: '10:30 AM',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Urgent Overdue Item',
    message: 'Client D Onboarding Compliance Audit is 2 days overdue',
    type: 'followup',
    timestamp: '09:00 AM',
    read: false
  }
];

export const INITIAL_SETTINGS: SyncSettings = {
  syncMeetings: true,
  syncUpdates: true,
  syncCancellations: true,
  syncAttendees: true,
  importMeetLinks: true,
  frequency: 'Real-time Webhooks',
  oauthConnected: true,
  userEmail: 'pradeep@csops-hub.com'
};
