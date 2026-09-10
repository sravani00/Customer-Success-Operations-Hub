import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: offerData,
    });
    return NextResponse.json(updatedOffer);
  } catch (error) {
    console.error('Failed to update offer:', error);
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.offer.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Failed to delete offer:', error);
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
  }
}
