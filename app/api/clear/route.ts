import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
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

    return NextResponse.json({ success: true, message: 'All demo data cleared successfully' });
  } catch (error) {
    console.error('Failed to clear database via API:', error);
    return NextResponse.json({ error: 'Failed to clear database' }, { status: 500 });
  }
}
