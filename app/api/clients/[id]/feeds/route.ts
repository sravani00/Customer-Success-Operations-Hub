import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    const body = await request.json();

    const newFeed = await prisma.dataFeed.create({
      data: {
        clientId,
        feedName: body.feedName,
        dataType: body.dataType,
        frequency: body.frequency,
        volume: body.volume,
        status: body.status || 'Active',
      },
    });

    return NextResponse.json(newFeed, { status: 201 });
  } catch (error) {
    console.error('Failed to create DataFeed:', error);
    return NextResponse.json({ error: 'Failed to create DataFeed' }, { status: 500 });
  }
}
