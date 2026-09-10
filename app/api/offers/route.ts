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
    const newOffer = await prisma.offer.create({
      data: body,
    });
    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error('Failed to create offer:', error);
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}
