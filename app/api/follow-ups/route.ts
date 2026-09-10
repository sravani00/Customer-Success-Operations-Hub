import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const followUps = await prisma.followUpItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(followUps);
  } catch (error) {
    console.error('Failed to fetch follow-ups:', error);
    return NextResponse.json({ error: 'Failed to fetch follow-ups' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id: bodyId, createdAt, ...followUpData } = body;

    const newFollowUp = await prisma.followUpItem.create({
      data: followUpData,
    });
    return NextResponse.json(newFollowUp, { status: 201 });
  } catch (error) {
    console.error('Failed to create follow-up:', error);
    return NextResponse.json({ error: 'Failed to create follow-up' }, { status: 500 });
  }
}
