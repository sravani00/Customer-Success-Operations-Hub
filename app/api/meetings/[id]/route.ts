import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { participants, keyDecisions, actionItems, momPoints, ...meetingData } = body;

    const updateData: Record<string, unknown> = { ...meetingData };
    if (participants !== undefined) updateData.participants = JSON.stringify(participants);
    if (keyDecisions !== undefined) updateData.keyDecisions = JSON.stringify(keyDecisions);
    if (actionItems !== undefined) updateData.actionItems = JSON.stringify(actionItems);

    const updatedMeeting = await prisma.meeting.update({
      where: { id },
      data: updateData,
      include: { momPoints: true },
    });
    return NextResponse.json(updatedMeeting);
  } catch (error) {
    console.error('Failed to update meeting:', error);
    return NextResponse.json({ error: 'Failed to update meeting' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.meeting.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    return NextResponse.json({ error: 'Failed to delete meeting' }, { status: 500 });
  }
}
