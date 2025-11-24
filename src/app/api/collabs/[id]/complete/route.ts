import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { collabs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Extract collaboration ID from URL parameter
    const collabId = params.id;

    if (!collabId) {
      return NextResponse.json(
        { error: 'Collaboration ID is required', code: 'MISSING_COLLAB_ID' },
        { status: 400 }
      );
    }

    // Query collaboration by ID
    const collab = await db
      .select()
      .from(collabs)
      .where(eq(collabs.id, collabId))
      .limit(1);

    // Verify collaboration exists
    if (collab.length === 0) {
      return NextResponse.json(
        { error: 'Collaboration not found' },
        { status: 404 }
      );
    }

    const collaboration = collab[0];

    // Parse participant IDs and verify current user is a participant
    let participantIds: string[] = [];
    try {
      participantIds = JSON.parse(collaboration.participantIds as string);
    } catch (error) {
      console.error('Error parsing participantIds:', error);
      return NextResponse.json(
        { error: 'Invalid collaboration data', code: 'INVALID_DATA' },
        { status: 500 }
      );
    }

    if (!participantIds.includes(user.id)) {
      return NextResponse.json(
        { error: 'Not a participant in this collaboration' },
        { status: 403 }
      );
    }

    // Check if collaboration is already completed
    if (collaboration.status === 'completed') {
      return NextResponse.json(
        { error: 'Collaboration already completed', code: 'ALREADY_COMPLETED' },
        { status: 400 }
      );
    }

    // Check if collaboration is cancelled
    if (collaboration.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Cannot complete cancelled collaboration', code: 'CANCELLED_COLLAB' },
        { status: 400 }
      );
    }

    // Update collaboration to completed status
    const updated = await db
      .update(collabs)
      .set({
        status: 'completed',
        completedAt: new Date().toISOString(),
      })
      .where(eq(collabs.id, collabId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update collaboration', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    const updatedCollab = updated[0];

    return NextResponse.json(
      {
        collab: {
          id: updatedCollab.id,
          title: updatedCollab.title,
          status: updatedCollab.status,
          completedAt: updatedCollab.completedAt,
        },
        message: 'Collaboration marked as completed',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/collabs/[id]/complete error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}