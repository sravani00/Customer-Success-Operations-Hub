import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for CS Operations Hub...');

  // Clean existing database records
  await prisma.momPoint.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.followUpItem.deleteMany();
  await prisma.taskItem.deleteMany();
  await prisma.emailMessage.deleteMany();
  await prisma.clientUpdate.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.dataDocument.deleteMany();
  await prisma.dataLogSource.deleteMany();
  await prisma.dataRevenueRecord.deleteMany();
  await prisma.dataFeed.deleteMany();
  await prisma.primaryContact.deleteMany();
  await prisma.client.deleteMany();
  await prisma.appNotification.deleteMany();
  await prisma.syncSettings.deleteMany();
  await prisma.user.deleteMany();

  const todayStr = new Date().toISOString().split('T')[0];

  // Seed Default Admin User
  await prisma.user.create({
    data: {
      email: 'vamshi@csops.com',
      name: 'Vamshi (CS Manager)',
      role: 'Admin'
    }
  });

  // Seed Default Sync Settings
  await prisma.syncSettings.create({
    data: {
      syncMeetings: true,
      syncUpdates: true,
      syncCancellations: true,
      syncAttendees: true,
      importMeetLinks: true,
      frequency: '15-minute Polling',
      oauthConnected: true,
      userEmail: 'vamshi@csops.com'
    }
  });

  // Seed Client A
  const clientA = await prisma.client.create({
    data: {
      id: 'client-a',
      name: 'Client A',
      company: 'Acme Growth Media (Resolute)',
      status: 'Active',
      subModule: 'Affiliate Networks',
      subModuleCategory: 'Resolute',
      communicationMode: 'Email',
      description: 'Primary performance affiliate channel running financial & credit score offers.',
      createdAt: todayStr,
      metricsSummary: '$45,000 / mo traffic volume',
      primaryContact: {
        create: {
          name: 'John Miller',
          email: 'john@clienta.com',
          phone: '+1 555-2345',
          role: 'VP Marketing'
        }
      }
    }
  });

  // Seed Client B
  const clientB = await prisma.client.create({
    data: {
      id: 'client-b',
      name: 'Client B',
      company: 'Nexus Affiliate Network (Partners)',
      status: 'Active',
      subModule: 'Affiliate Networks',
      subModuleCategory: 'Travis',
      communicationMode: 'Telegram',
      description: 'Strategic publisher network partnership running co-registered affiliate campaigns.',
      createdAt: todayStr,
      metricsSummary: '12 Active Campaigns',
      primaryContact: {
        create: {
          name: 'Sarah Jenkins',
          email: 'sarah@nexusaffiliate.com',
          phone: '+1 555-8765',
          role: 'Head Partnerships'
        }
      }
    }
  });

  // Seed Client C (Data Partner)
  const clientC = await prisma.client.create({
    data: {
      id: 'client-c',
      name: 'Client C',
      company: 'Vortex Global Tech',
      status: 'Active',
      subModule: 'Data Partner',
      subModuleCategory: 'General',
      paymentType: 'Rev-Share',
      revenueFrequency: 'Monthly',
      dataType: 'Email & Phone Leads',
      estimatedVolume: '120,000 / month',
      revSharePercentage: 18.5,
      communicationMode: 'Teams',
      description: 'Data enrichment partner streaming 1.2M API records daily with Rev-Share model.',
      createdAt: todayStr,
      metricsSummary: 'Payment: Rev-Share • Vol: 120,000 / mo',
      primaryContact: {
        create: {
          name: 'Michael Chang',
          email: 'm.chang@vortexglobal.com',
          phone: '+1 555-3456',
          role: 'Ops Director'
        }
      },
      activeFeeds: {
        create: [
          { feedName: 'B2B Tech Opt-In Feed', dataType: 'B2B Leads', frequency: 'Real-time API', volume: '75,000 / mo', status: 'Active' },
          { feedName: 'Consumer Intent Stream', dataType: 'Email & Phone', frequency: 'Daily Batch 02:00 UTC', volume: '45,000 / mo', status: 'Active' }
        ]
      },
      revenueHistory: {
        create: [
          { period: 'August 2026', dailyRevenue: 14200, revShareAmount: 2627, paymentStatus: 'Paid' },
          { period: 'July 2026', dailyRevenue: 18500, revShareAmount: 3422, paymentStatus: 'Paid' },
          { period: 'June 2026', dailyRevenue: 12900, revShareAmount: 2386, paymentStatus: 'Pending Settlement' }
        ]
      },
      dataLogs: {
        create: [
          { sourceName: 'S3 API Ingestion Feed A', driveLocation: 's3://vortex-data-feeds/august-2026/', fileName: 'vortex_optin_20260827.csv', dataVolume: '24,500 records', validationStatus: 'Validated', date: '2026-08-27' },
          { sourceName: 'Google Drive Sync Feed', driveLocation: 'Shared Drive / Vortex / Feeds', fileName: 'vortex_intent_20260826.json', dataVolume: '18,200 records', validationStatus: 'Validated', date: '2026-08-26' }
        ]
      },
      dataDocuments: {
        create: [
          { title: 'Data Processing Agreement (DPA 2026)', type: 'Agreement', date: '2026-01-15' },
          { title: 'Opt-In Consent Audit Certificate', type: 'Compliance', date: '2026-04-10' }
        ]
      }
    }
  });

  // Seed Client F (Data Partner Purchased)
  await prisma.client.create({
    data: {
      id: 'client-f',
      name: 'Client F',
      company: 'OmniData Insights',
      status: 'Active',
      subModule: 'Data Partner',
      subModuleCategory: 'General',
      paymentType: 'Purchased',
      revenueFrequency: 'Daily',
      dataType: 'Purchased Opt-In Feed',
      estimatedVolume: '50,000 / month',
      revSharePercentage: 0,
      communicationMode: 'WhatsApp',
      description: 'Purchased consumer data feed partner streaming daily lead logs.',
      createdAt: todayStr,
      metricsSummary: 'Payment: Purchased • Vol: 50,000 / mo',
      primaryContact: {
        create: {
          name: 'Rachel Vance',
          email: 'rachel@omnidata.io',
          phone: '+1 555-4321',
          role: 'VP Partnerships'
        }
      },
      activeFeeds: {
        create: [
          { feedName: 'Omni Direct Lead Feed', dataType: 'Purchased Leads', frequency: 'Daily FTP 04:00 UTC', volume: '50,000 / mo', status: 'Active' }
        ]
      },
      revenueHistory: {
        create: [
          { period: 'August 2026', dailyRevenue: 8500, revShareAmount: 0, paymentStatus: 'Paid' },
          { period: 'July 2026', dailyRevenue: 9200, revShareAmount: 0, paymentStatus: 'Paid' }
        ]
      },
      dataLogs: {
        create: [
          { sourceName: 'SFTP Batch Upload', driveLocation: 'sftp://omnidata.net/incoming/', fileName: 'omnidata_lead_batch_0827.zip', dataVolume: '12,000 records', validationStatus: 'Validated', date: '2026-08-27' }
        ]
      },
      dataDocuments: {
        create: [
          { title: 'Master Data Purchase Agreement', type: 'Agreement', date: '2026-02-01' }
        ]
      }
    }
  });

  // Seed Offer A
  const offerA = await prisma.offer.create({
    data: {
      id: 'offer-a',
      clientId: clientA.id,
      clientName: clientA.name,
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
    }
  });

  // Seed Offer B
  const offerB = await prisma.offer.create({
    data: {
      id: 'offer-b',
      clientId: clientB.id,
      clientName: clientB.name,
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
  });

  // Seed Meetings
  await prisma.meeting.create({
    data: {
      id: 'meet-1',
      googleEventId: 'evt-1',
      clientId: clientA.id,
      clientName: clientA.name,
      offerId: offerA.id,
      offerName: offerA.offerName,
      title: 'Client A Weekly Alignment Sync',
      startTime: `${todayStr}T11:00:00`,
      endTime: `${todayStr}T11:45:00`,
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: 'Scheduled',
      organizer: 'Vamshi (CS Ops)',
      participants: JSON.stringify(['john@clienta.com', 'vamshi@csops.com']),
      description: 'Weekly review of Offer A caps, EPC metrics & revenue goals.',
      meetingNotes: 'Early conversion rate +14% above control.',
      keyDecisions: JSON.stringify(['Increase test cap on Offer A to 25k']),
      actionItems: JSON.stringify(['Prepare EPC metrics table']),
      momPoints: {
        create: [
          { point: 'Agreed to increase test cap on Offer A to 25,000 leads' },
          { point: 'Reviewed early conversion rate performance (+14% above control)' },
          { point: 'Assigned EPC metrics table preparation to CS Ops team' }
        ]
      }
    }
  });

  // Seed Tasks & Follow-ups
  const task1 = await prisma.taskItem.create({
    data: {
      id: 'task-1',
      clientId: clientA.id,
      clientName: clientA.name,
      offerId: offerA.id,
      offerName: offerA.offerName,
      sourceType: 'Email',
      title: 'Prepare Offer A Performance Breakdown Report',
      assignedTo: 'Vamshi',
      dueDate: todayStr,
      priority: 'High',
      status: 'In Progress'
    }
  });

  await prisma.followUpItem.create({
    data: {
      id: 'fl-1',
      clientId: clientA.id,
      clientName: clientA.name,
      offerId: offerA.id,
      offerName: offerA.offerName,
      taskId: task1.id,
      title: 'Offer A Performance Sync Follow-up',
      reminderAt: `${todayStr}T10:00:00`,
      assignedTo: 'Vamshi',
      status: 'Due Today',
      dueDate: todayStr
    }
  });

  // Seed Client Updates
  await prisma.clientUpdate.create({
    data: {
      id: 'up-1',
      clientId: clientA.id,
      clientName: clientA.name,
      offerId: offerA.id,
      offerName: offerA.offerName,
      type: 'Performance',
      source: 'Client',
      message: 'Client A requested Offer A performance review and conversion report.',
      priority: 'High',
      status: 'In Review',
      timestamp: `${todayStr}T10:32:00`,
      primarySubject: 'John Miller (Client A)'
    }
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
