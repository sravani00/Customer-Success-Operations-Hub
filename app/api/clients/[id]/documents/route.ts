import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    const body = await request.json();

    const newDoc = await prisma.dataDocument.create({
      data: {
        clientId,
        title: body.title,
        type: body.type || 'Agreement',
        date: body.date || new Date().toISOString().split('T')[0],
      },
    });

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    console.error('Failed to create DataDocument:', error);
    return NextResponse.json({ error: 'Failed to create DataDocument' }, { status: 500 });
  }
}
