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
    subModule: 'Affiliate Client',
    industry: 'Digital Marketing & Affiliate',
    primaryContact: {
      name: 'John Miller',
      email: 'john@clienta.com',
      phone: '+1 (555) 234-5678',
      role: 'VP of Performance Marketing'
    },
    createdAt: '2026-01-15',
    metricsSummary: '$45,000 / mo traffic volume'
  },
  {
    id: 'client-b',
    name: 'Client B',
    company: 'Nexus Affiliate Network',
    status: 'Active',
    subModule: 'Affiliate Client',
    industry: 'E-Commerce & Lead Gen',
    primaryContact: {
      name: 'Sarah Jenkins',
      email: 'sarah@nexusaffiliate.com',
      phone: '+1 (555) 876-5432',
      role: 'Head of Strategic Partnerships'
    },
    createdAt: '2026-03-01',
    metricsSummary: '12 Active Campaigns'
  },
  {
    id: 'client-c',
    name: 'Client C',
    company: 'Vortex Global Tech',
    status: 'Active',
    subModule: 'Data Partner',
    industry: 'SaaS & Data Feeds',
    primaryContact: {
      name: 'Michael Chang',
      email: 'm.chang@vortexglobal.com',
      phone: '+1 (555) 345-6789',
      role: 'Operations Director'
    },
    createdAt: '2026-05-10',
    metricsSummary: '1.2M API Records / day'
  },
  {
    id: 'client-d',
    name: 'Client D',
    company: 'Apex Partners Consulting',
    status: 'Onboarding',
    subModule: 'Consulting',
    industry: 'Financial Advisory & CS Ops',
    primaryContact: {
      name: 'Elena Rostova',
      email: 'elena@apexpartners.com',
      phone: '+1 (555) 901-2345',
      role: 'Account Lead'
    },
    createdAt: '2026-08-01',
    metricsSummary: 'Q3 Strategy Project'
  },
  {
    id: 'client-e',
    name: 'Client E',
    company: 'DataStream Insights Inc',
    status: 'Active',
    subModule: 'Data Partner',
    industry: 'Consumer Data & Validation',
    primaryContact: {
      name: 'David Vance',
      email: 'd.vance@datastream.com',
      phone: '+1 (555) 432-1098',
      role: 'VP Data Operations'
    },
    createdAt: '2026-06-18',
    metricsSummary: 'Email & Phone Enrichment API'
  },
  {
    id: 'client-f',
    name: 'Client F',
    company: 'StratSphere Advisory Services',
    status: 'Active',
    subModule: 'Consulting',
    industry: 'Enterprise Operations Consulting',
    primaryContact: {
      name: 'Rachel Sterling',
      email: 'rachel@stratsphere.io',
      phone: '+1 (555) 765-4321',
      role: 'Senior Partner'
    },
    createdAt: '2026-07-04',
    metricsSummary: 'Workflow Optimization Sprint'
  },
  {
    id: 'client-g',
    name: 'Client G',
    company: 'NovaTech Media Solutions',
    status: 'Onboarding',
    subModule: 'Lead',
    industry: 'Performance Marketing',
    primaryContact: {
      name: 'Marcus Brody',
      email: 'marcus@novatech.com',
      phone: '+1 (555) 890-1234',
      role: 'Chief Revenue Officer'
    },
    createdAt: '2026-08-12',
    leadStage: 'Proposal',
    metricsSummary: 'Est. $28,000 Deal Value'
  },
  {
    id: 'client-h',
    name: 'Client H',
    company: 'OmniReach Ad Network',
    status: 'Onboarding',
    subModule: 'Lead',
    industry: 'Lead Generation',
    primaryContact: {
      name: 'Amanda Cross',
      email: 'a.cross@omnireach.com',
      phone: '+1 (555) 678-9012',
      role: 'VP Sales'
    },
    createdAt: '2026-08-15',
    leadStage: 'Discovery',
    metricsSummary: 'Est. $42,000 Deal Value'
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
    owner: 'Vamshi'
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
    owner: 'Vamshi'
  }
];

export const INITIAL_UPDATES: ClientUpdate[] = [
  // August 17, 2026 (Today)
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
    timestamp: '2026-08-20T10:32:00',
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
    timestamp: '2026-08-20T11:15:00',
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
    timestamp: '2026-08-20T13:45:00',
    primarySubject: 'Michael Chang (Client C)'
  },
  // August 16, 2026 (Previous Date)
  {
    id: 'up-16-1',
    clientId: 'client-a',
    clientName: 'Client A',
    type: 'Testing Request',
    source: 'Client',
    message: 'Client A submitted cap expansion request for 25,000 daily traffic.',
    priority: 'High',
    status: 'Resolved',
    timestamp: '2026-08-16T09:40:00',
    primarySubject: 'John Miller (Client A)'
  },
  {
    id: 'up-16-2',
    clientId: 'client-d',
    clientName: 'Client D',
    type: 'General',
    source: 'Client',
    message: 'Elena Rostova provided completed Q3 onboarding compliance documentation.',
    priority: 'Medium',
    status: 'Resolved',
    timestamp: '2026-08-16T14:15:00',
    primarySubject: 'Elena Rostova (Apex Partners)'
  },
  // August 15, 2026 (Previous Date)
  {
    id: 'up-15-1',
    clientId: 'client-e',
    clientName: 'Client E',
    type: 'Technical Issue',
    source: 'Client',
    message: 'DataStream completed API authentication key exchange and endpoint testing.',
    priority: 'High',
    status: 'Resolved',
    timestamp: '2026-08-15T11:20:00',
    primarySubject: 'David Vance (DataStream)'
  },
  {
    id: 'up-15-2',
    clientId: 'client-h',
    clientName: 'Client H',
    type: 'Performance',
    source: 'Internal',
    message: 'OmniReach Ad Network lead qualified during discovery call ($42k deal value).',
    priority: 'Medium',
    status: 'New',
    timestamp: '2026-08-15T16:00:00',
    primarySubject: 'Amanda Cross (OmniReach)'
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
    body: 'Hi Vamshi,\n\nCould you please send over the detailed performance breakdown for Offer A? We noticed a spike in volume today and want to check EPC and conversion accuracy.\n\nThanks,\nJohn Miller',
    receivedAt: '2026-08-20T10:28:00',
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
    receivedAt: '2026-08-20T11:10:00',
    actionRequired: true,
    processed: true
  }
];

export const INITIAL_MEETINGS: Meeting[] = [
  // August 17, 2026 (Active Date / Today)
  {
    id: 'meet-3',
    googleEventId: 'evt-903',
    clientId: 'client-b',
    clientName: 'Client B',
    title: 'Offer B Capping & Revenue Review',
    startTime: '2026-08-20T09:00:00',
    endTime: '2026-08-20T09:30:00',
    meetLink: 'https://meet.google.com/mno-pqrs-tuv',
    status: 'Completed',
    organizer: 'Sarah Jenkins',
    participants: ['sarah@nexusaffiliate.com', 'team@csops.com'],
    description: 'Morning sync on Offer B daily volume caps.',
    meetingNotes: 'Cap held at 40k. EPC steady at $0.22.',
    keyDecisions: ['Maintain current traffic sources'],
    actionItems: ['Confirm testing cap for next variant']
  },
  {
    id: 'meet-1',
    googleEventId: 'evt-901',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    title: 'Client A Weekly Sync',
    startTime: '2026-08-20T11:00:00',
    endTime: '2026-08-20T11:45:00',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
    organizer: 'Vamshi (CS Ops)',
    participants: ['john@clienta.com', 'vamshi@csops.com', 'ops@csops.com'],
    description: 'Weekly alignment on Offer A performance, capping targets, and creative refresh.',
    meetingNotes: 'Client expressed satisfaction with early test results. Agreed to review cap expansion.',
    keyDecisions: ['Increase test cap on Offer A to 25k', 'Review creative variant A2 on Wednesday'],
    actionItems: ['Prepare EPC metrics table', 'Schedule follow-up sync for Aug 19']
  },
  {
    id: 'meet-4',
    googleEventId: 'evt-904',
    clientId: 'client-c',
    clientName: 'Client C',
    title: 'Client C Mobile Landing Page Test Review',
    startTime: '2026-08-20T14:30:00',
    endTime: '2026-08-20T15:15:00',
    meetLink: 'https://meet.google.com/vrt-mbl-2026',
    status: 'Scheduled',
    organizer: 'Michael Chang',
    participants: ['m.chang@vortexglobal.com', 'vamshi@csops.com'],
    description: 'Reviewing conversion rates on new dark mode mobile landing page.',
    meetingNotes: 'Early conversion rate +18% higher than desktop control.',
    keyDecisions: ['Allocate 70% mobile traffic to variant B'],
    actionItems: ['Prepare performance report for Michael']
  },
  {
    id: 'meet-2',
    googleEventId: 'evt-902',
    clientId: 'internal',
    clientName: 'Internal CS Team',
    title: 'Internal Campaign Strategy Review',
    startTime: '2026-08-20T16:00:00',
    endTime: '2026-08-20T17:00:00',
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'Scheduled',
    organizer: 'Team Lead',
    participants: ['vamshi@csops.com', 'team@csops.com'],
    description: 'Reviewing active campaigns, pending test caps, and urgent overdue follow-ups.',
    meetingNotes: 'Focus on resolving overdue items for Client D and preparing executive recap.',
    keyDecisions: ['Prioritize Client A performance review task', 'Re-assign Client D audit'],
    actionItems: ['Send EOD summary report to leadership']
  },
  // August 16, 2026 (Previous Date)
  {
    id: 'meet-16-1',
    googleEventId: 'evt-816',
    clientId: 'client-d',
    clientName: 'Client D',
    title: 'Apex Partners Onboarding Briefing',
    startTime: '2026-08-16T14:00:00',
    endTime: '2026-08-16T15:00:00',
    meetLink: 'https://meet.google.com/apx-onb-2026',
    status: 'Completed',
    organizer: 'Elena Rostova',
    participants: ['elena@apexpartners.com', 'vamshi@csops.com'],
    description: 'Kickoff meeting for Q3 consulting strategy & operations audit.',
    meetingNotes: 'Onboarding milestones established. Document submission completed.',
    keyDecisions: ['Sprint 1 deliverable date set for Aug 28'],
    actionItems: ['File compliance audit checklist']
  },
  // August 15, 2026 (Previous Date)
  {
    id: 'meet-15-1',
    googleEventId: 'evt-815',
    clientId: 'client-e',
    clientName: 'Client E',
    title: 'DataStream API Integration Review',
    startTime: '2026-08-15T10:00:00',
    endTime: '2026-08-15T11:00:00',
    meetLink: 'https://meet.google.com/dts-api-2026',
    status: 'Completed',
    organizer: 'David Vance',
    participants: ['d.vance@datastream.com', 'tech@csops.com'],
    description: 'Validation of rate limits and webhook notification handlers.',
    meetingNotes: 'API endpoints operating at 99.98% uptime.',
    keyDecisions: ['Enable production webhook key'],
    actionItems: ['Log API latency metrics in hub']
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  // August 17, 2026 (Active Date / Today)
  {
    id: 'task-1',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    sourceType: 'Email',
    sourceId: 'em-1',
    title: 'Check Offer A performance & send breakdown report',
    assignedTo: 'Vamshi',
    dueDate: '2026-08-20',
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
    title: 'Confirm Testing Cap & Payout on Offer B variant',
    assignedTo: 'Sarah Jenkins',
    dueDate: '2026-08-20',
    status: 'In Progress'
  },
  {
    id: 'task-3',
    clientId: 'client-c',
    clientName: 'Client C',
    offerId: 'offer-c',
    offerName: 'Offer C',
    sourceType: 'Update',
    sourceId: 'up-3',
    title: 'Send Mobile Landing Page EPC Report to Michael',
    assignedTo: 'Vamshi',
    dueDate: '2026-08-20',
    status: 'Not Started'
  },
  {
    id: 'task-4',
    clientId: 'client-d',
    clientName: 'Client D',
    sourceType: 'Manual',
    title: 'Verify Q3 Onboarding Compliance Audit Checklist',
    assignedTo: 'Elena Rostova',
    dueDate: '2026-08-20',
    status: 'Completed'
  },
  {
    id: 'task-5',
    clientId: 'client-e',
    clientName: 'Client E',
    sourceType: 'Manual',
    title: 'Audit DataStream API Traffic Metrics & Webhook Uptime',
    assignedTo: 'Tech Lead',
    dueDate: '2026-08-20',
    status: 'Waiting'
  },
  // August 16, 2026 (Previous Date)
  {
    id: 'task-16-1',
    clientId: 'client-d',
    clientName: 'Client D',
    sourceType: 'Manual',
    title: 'Audit Apex Partners Q3 Onboarding Documents',
    assignedTo: 'Elena Rostova',
    dueDate: '2026-08-16',
    status: 'Completed'
  },
  {
    id: 'task-16-2',
    clientId: 'client-a',
    clientName: 'Client A',
    sourceType: 'Manual',
    title: 'Review 25,000 traffic cap request for Offer A',
    assignedTo: 'John Miller',
    dueDate: '2026-08-16',
    status: 'Completed'
  },
  // August 15, 2026 (Previous Date)
  {
    id: 'task-15-1',
    clientId: 'client-e',
    clientName: 'Client E',
    sourceType: 'Manual',
    title: 'Verify DataStream API Key Authorization',
    assignedTo: 'Tech Lead',
    dueDate: '2026-08-15',
    status: 'Completed'
  }
];

export const INITIAL_FOLLOWUPS: FollowUpItem[] = [
  // August 17, 2026 (Active Date / Today)
  {
    id: 'fl-1',
    clientId: 'client-a',
    clientName: 'Client A',
    offerId: 'offer-a',
    offerName: 'Offer A',
    taskId: 'task-1',
    title: 'Offer A Performance Review Sync',
    reminderAt: '2026-08-20T10:00:00',
    assignedTo: 'Vamshi',
    status: 'Due Today',
    dueDate: '2026-08-20'
  },
  {
    id: 'fl-2',
    clientId: 'client-b',
    clientName: 'Client B',
    offerId: 'offer-b',
    offerName: 'Offer B',
    taskId: 'task-2',
    title: 'Offer B Testing Confirmation',
    reminderAt: '2026-08-17T10:00:00',
    assignedTo: 'Team',
    status: 'Due Today',
    dueDate: '2026-08-17'
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
    assignedTo: 'Vamshi',
    status: 'Due Today',
    dueDate: '2026-08-20'
  },
  // August 16, 2026 (Previous Date)
  {
    id: 'fl-16-1',
    clientId: 'client-d',
    clientName: 'Client D',
    taskId: 'task-16-1',
    title: 'Follow-up on Onboarding Document Verification',
    reminderAt: '2026-08-16T15:00:00',
    assignedTo: 'Elena Rostova',
    status: 'Completed',
    dueDate: '2026-08-16'
  },
  // August 15, 2026 (Previous Date)
  {
    id: 'fl-15-1',
    clientId: 'client-e',
    clientName: 'Client E',
    taskId: 'task-15-1',
    title: 'DataStream API Key Activation Check',
    reminderAt: '2026-08-15T11:30:00',
    assignedTo: 'Tech Lead',
    status: 'Completed',
    dueDate: '2026-08-15'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New High Priority Client Update',
    message: 'Client A requested Offer A performance review (25,000 test cap).',
    type: 'task',
    timestamp: '2026-08-20T10:32:00',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Meeting in 30 minutes',
    message: 'Client A Weekly Sync scheduled for 11:00 AM today.',
    type: 'meeting',
    timestamp: '2026-08-20T10:30:00',
    read: false
  }
];

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
