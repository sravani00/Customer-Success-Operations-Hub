import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: body,
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
