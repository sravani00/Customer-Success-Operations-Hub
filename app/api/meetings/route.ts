import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany({
      include: { momPoints: true },
      orderBy: { createdAt: 'desc' },
    });

    const parsedMeetings = meetings.map((m: { participants: string; keyDecisions: string; actionItems: string; momPoints: Array<{ point: string }> }) => ({
      ...m,
      participants: typeof m.participants === 'string' ? JSON.parse(m.participants || '[]') : m.participants,
      keyDecisions: typeof m.keyDecisions === 'string' ? JSON.parse(m.keyDecisions || '[]') : m.keyDecisions,
      actionItems: typeof m.actionItems === 'string' ? JSON.parse(m.actionItems || '[]') : m.actionItems,
      momPoints: m.momPoints.map((p: { point: string }) => p.point),
    }));

    return NextResponse.json(parsedMeetings);
  } catch (error) {
    console.error('Failed to fetch meetings:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { participants, keyDecisions, actionItems, momPoints, ...meetingData } = body;

    const newMeeting = await prisma.meeting.create({
      data: {
        ...meetingData,
        participants: JSON.stringify(participants || []),
        keyDecisions: JSON.stringify(keyDecisions || []),
        actionItems: JSON.stringify(actionItems || []),
        momPoints: momPoints && Array.isArray(momPoints)
          ? {
              create: momPoints.map((p: string) => ({ point: p })),
            }
          : undefined,
      },
      include: { momPoints: true },
    });

    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.error('Failed to create meeting:', error);
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}
