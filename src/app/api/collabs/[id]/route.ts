import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { collabs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const VALID_STATUSES = ['ongoing', 'completed', 'cancelled'] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ 
        error: 'Collaboration ID is required',
        code: 'MISSING_ID' 
      }, { status: 400 });
    }

    const requestBody = await request.json();
    const { title, description, status, deliverables } = requestBody;

    // Fetch existing collaboration
    const existingCollab = await db.select()
      .from(collabs)
      .where(eq(collabs.id, id))
      .limit(1);

    if (existingCollab.length === 0) {
      return NextResponse.json({ 
        error: 'Collaboration not found' 
      }, { status: 404 });
    }

    const collab = existingCollab[0];

    // Verify user is a participant
    let participantIds: string[];
    try {
      participantIds = JSON.parse(collab.participantIds as string);
    } catch (error) {
      console.error('Failed to parse participantIds:', error);
      return NextResponse.json({ 
        error: 'Invalid collaboration data',
        code: 'INVALID_DATA' 
      }, { status: 500 });
    }

    if (!participantIds.includes(user.id)) {
      return NextResponse.json({ 
        error: 'Not a participant in this collaboration' 
      }, { status: 403 });
    }

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ 
        error: "Invalid status, must be 'ongoing', 'completed', or 'cancelled'",
        code: 'INVALID_STATUS' 
      }, { status: 400 });
    }

    // Build update object
    const updates: {
      title?: string;
      description?: string;
      status?: string;
      deliverables?: string;
      completedAt?: string | null;
    } = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) {
      updates.status = status;
      // Auto-set completedAt when status changes to 'completed'
      if (status === 'completed') {
        updates.completedAt = new Date().toISOString();
      }
    }
    if (deliverables !== undefined) {
      updates.deliverables = JSON.stringify(deliverables);
    }

    // Perform update
    const updatedCollab = await db.update(collabs)
      .set(updates)
      .where(eq(collabs.id, id))
      .returning();

    if (updatedCollab.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to update collaboration',
        code: 'UPDATE_FAILED' 
      }, { status: 500 });
    }

    // Parse JSON fields for response
    const responseCollab = {
      ...updatedCollab[0],
      participantIds: JSON.parse(updatedCollab[0].participantIds as string),
      deliverables: updatedCollab[0].deliverables 
        ? JSON.parse(updatedCollab[0].deliverables as string) 
        : null
    };

    return NextResponse.json({ collab: responseCollab }, { status: 200 });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}