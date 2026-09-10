import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id: bodyId, createdAt, updatedAt, ...offerData } = body;

    // Convert numeric fields safely
    if (offerData.volume !== undefined) offerData.volume = parseInt(offerData.volume, 10) || 0;
    if (offerData.leads !== undefined) offerData.leads = parseInt(offerData.leads, 10) || 0;
    if (offerData.successfulLeads !== undefined) offerData.successfulLeads = parseInt(offerData.successfulLeads, 10) || 0;
    if (offerData.cancelledLeads !== undefined) offerData.cancelledLeads = parseInt(offerData.cancelledLeads, 10) || 0;
    if (offerData.testVolume !== undefined) offerData.testVolume = parseInt(offerData.testVolume, 10) || 0;
    if (offerData.revenue !== undefined) offerData.revenue = parseFloat(offerData.revenue) || 0;
    if (offerData.cpl !== undefined) offerData.cpl = parseFloat(offerData.cpl) || 0;
    if (offerData.epc !== undefined) offerData.epc = parseFloat(offerData.epc) || 0;

    const newOffer = await prisma.offer.create({
      data: offerData,
    });
    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error('Failed to create offer:', error);
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}
