import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    const body = await request.json();

    const newRecord = await prisma.dataRevenueRecord.create({
      data: {
        clientId,
        period: body.period,
        dailyRevenue: parseFloat(body.dailyRevenue) || 0,
        revShareAmount: parseFloat(body.revShareAmount) || 0,
        paymentStatus: body.paymentStatus || 'Paid',
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Failed to create DataRevenueRecord:', error);
    return NextResponse.json({ error: 'Failed to create DataRevenueRecord' }, { status: 500 });
  }
}
