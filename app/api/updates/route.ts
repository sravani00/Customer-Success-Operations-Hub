import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const updates = await prisma.clientUpdate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(updates);
  } catch (error) {
    console.error('Failed to fetch client updates:', error);
    return NextResponse.json({ error: 'Failed to fetch client updates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUpdate = await prisma.clientUpdate.create({
      data: body,
    });
    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error) {
    console.error('Failed to create update:', error);
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 });
  }
}
