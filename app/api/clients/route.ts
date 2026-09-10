import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        primaryContact: true,
        activeFeeds: true,
        revenueHistory: true,
        dataLogs: true,
        dataDocuments: true,
      },
      orderBy: { dbCreatedAt: 'desc' },
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Failed to fetch clients from database:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { primaryContact, activeFeeds, revenueHistory, dataLogs, dataDocuments, ...clientData } = body;

    const newClient = await prisma.client.create({
      data: {
        ...clientData,
        primaryContact: primaryContact
          ? {
              create: {
                name: primaryContact.name || '',
                email: primaryContact.email || '',
                phone: primaryContact.phone || '',
                role: primaryContact.role || '',
              },
            }
          : undefined,
      },
      include: {
        primaryContact: true,
        activeFeeds: true,
        revenueHistory: true,
        dataLogs: true,
        dataDocuments: true,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Failed to create client in database:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
