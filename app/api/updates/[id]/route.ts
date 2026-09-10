import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedUpdate = await prisma.clientUpdate.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedUpdate);
  } catch (error) {
    console.error('Failed to update client update:', error);
    return NextResponse.json({ error: 'Failed to update client update' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.clientUpdate.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Client update deleted successfully' });
  } catch (error) {
    console.error('Failed to delete client update:', error);
    return NextResponse.json({ error: 'Failed to delete client update' }, { status: 500 });
  }
}
