import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
    const todayStr = new Date().toISOString().split('T')[0];

    // Reset records
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

    // Reseed Client A
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

    // Reseed Offer A
    await prisma.offer.create({
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

    return NextResponse.json({ success: true, message: 'Database re-seeded successfully' });
  } catch (error) {
    console.error('Failed to seed database via API:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
