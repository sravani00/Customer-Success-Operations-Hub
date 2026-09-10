import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedFollowUp = await prisma.followUpItem.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedFollowUp);
  } catch (error) {
    console.error('Failed to update follow-up:', error);
    return NextResponse.json({ error: 'Failed to update follow-up' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.followUpItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Follow-up deleted successfully' });
  } catch (error) {
    console.error('Failed to delete follow-up:', error);
    return NextResponse.json({ error: 'Failed to delete follow-up' }, { status: 500 });
  }
}
