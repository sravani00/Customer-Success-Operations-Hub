import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    const body = await request.json();

    const newLog = await prisma.dataLogSource.create({
      data: {
        clientId,
        sourceName: body.sourceName,
        driveLocation: body.driveLocation || '',
        fileName: body.fileName,
        dataVolume: body.dataVolume,
        validationStatus: body.validationStatus || 'Validated',
        date: body.date || new Date().toISOString().split('T')[0],
      },
    });

    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    console.error('Failed to create DataLogSource:', error);
    return NextResponse.json({ error: 'Failed to create DataLogSource' }, { status: 500 });
  }
}
