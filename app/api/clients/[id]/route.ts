import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        primaryContact: true,
        activeFeeds: true,
        revenueHistory: true,
        dataLogs: true,
        dataDocuments: true,
      },
    });
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error('Failed to fetch client:', error);
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { 
      primaryContact, 
      activeFeeds, 
      revenueHistory, 
      dataLogs, 
      dataDocuments, 
      id: bodyId, 
      dbCreatedAt, 
      dbUpdatedAt, 
      createdAt, 
      ...clientPartial 
    } = body;

    // Parse numeric fields safely
    if (clientPartial.revSharePercentage !== undefined && clientPartial.revSharePercentage !== null) {
      clientPartial.revSharePercentage = parseFloat(clientPartial.revSharePercentage) || 0;
    }
    if (clientPartial.expectedDealValue !== undefined && clientPartial.expectedDealValue !== null) {
      clientPartial.expectedDealValue = parseFloat(clientPartial.expectedDealValue) || 0;
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        ...clientPartial,
        primaryContact: primaryContact
          ? {
              upsert: {
                create: {
                  name: primaryContact.name || '',
                  email: primaryContact.email || '',
                  phone: primaryContact.phone || '',
                  role: primaryContact.role || '',
                },
                update: {
                  name: primaryContact.name || '',
                  email: primaryContact.email || '',
                  phone: primaryContact.phone || '',
                  role: primaryContact.role || '',
                },
              },
            }
          : undefined,
        activeFeeds: activeFeeds && Array.isArray(activeFeeds)
          ? {
              deleteMany: {},
              create: activeFeeds.map((f: any) => ({
                feedName: f.feedName || '',
                dataType: f.dataType || '',
                frequency: f.frequency || '',
                volume: f.volume || '',
                status: f.status || 'Active',
              })),
            }
          : undefined,
        revenueHistory: revenueHistory && Array.isArray(revenueHistory)
          ? {
              deleteMany: {},
              create: revenueHistory.map((r: any) => ({
                period: r.period || '',
                dailyRevenue: parseFloat(r.dailyRevenue) || 0,
                revShareAmount: parseFloat(r.revShareAmount) || 0,
                paymentStatus: r.paymentStatus || 'Paid',
              })),
            }
          : undefined,
        dataLogs: dataLogs && Array.isArray(dataLogs)
          ? {
              deleteMany: {},
              create: dataLogs.map((l: any) => ({
                sourceName: l.sourceName || '',
                driveLocation: l.driveLocation || '',
                fileName: l.fileName || '',
                dataVolume: l.dataVolume || '',
                validationStatus: l.validationStatus || 'Validated',
                date: l.date || '',
              })),
            }
          : undefined,
        dataDocuments: dataDocuments && Array.isArray(dataDocuments)
          ? {
              deleteMany: {},
              create: dataDocuments.map((d: any) => ({
                title: d.title || '',
                type: d.type || 'Agreement',
                date: d.date || '',
              })),
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

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error('Failed to update client:', error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.client.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Failed to delete client:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
