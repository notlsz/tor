import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { collabs, creators } from '@/db/schema';
import { eq, desc, sql, and, inArray } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user's creator profile
    const [creatorProfile] = await db
      .select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (!creatorProfile) {
      return NextResponse.json({ 
        error: 'Creator profile not found' 
      }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, participantIds, deliverables } = body;

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json({ 
        error: 'Title is required' 
      }, { status: 400 });
    }

    if (!participantIds || !Array.isArray(participantIds)) {
      return NextResponse.json({ 
        error: 'participantIds must be an array' 
      }, { status: 400 });
    }

    if (participantIds.length < 2) {
      return NextResponse.json({ 
        error: 'participantIds must contain at least 2 participants' 
      }, { status: 400 });
    }

    // Ensure current user is in participantIds
    if (!participantIds.includes(user.id)) {
      return NextResponse.json({ 
        error: 'Current user must be in participantIds' 
      }, { status: 400 });
    }

    // Validate all participant IDs exist in creators table
    const validParticipants = await db
      .select({ id: creators.id })
      .from(creators)
      .where(inArray(creators.id, participantIds));

    if (validParticipants.length !== participantIds.length) {
      const validIds = validParticipants.map(p => p.id);
      const invalidIds = participantIds.filter(id => !validIds.includes(id));
      return NextResponse.json({ 
        error: `Invalid participant ID: ${invalidIds.join(', ')}` 
      }, { status: 400 });
    }

    // Create new collaboration
    const newCollab = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description ? description.trim() : null,
      participantIds: JSON.stringify(participantIds),
      status: 'ongoing',
      deliverables: deliverables ? JSON.stringify(deliverables) : null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    const [createdCollab] = await db
      .insert(collabs)
      .values(newCollab)
      .returning();

    // Fetch participant details
    const participants = await db
      .select({
        id: creators.id,
        displayName: creators.displayName,
        avatarUrl: creators.avatarUrl
      })
      .from(creators)
      .where(inArray(creators.id, participantIds));

    // Format response with parsed JSON fields
    const response = {
      collab: {
        id: createdCollab.id,
        title: createdCollab.title,
        description: createdCollab.description,
        participantIds: JSON.parse(createdCollab.participantIds as string),
        participants: participants,
        status: createdCollab.status,
        deliverables: createdCollab.deliverables ? JSON.parse(createdCollab.deliverables as string) : null,
        createdAt: createdCollab.createdAt,
        completedAt: createdCollab.completedAt
      }
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user's creator profile
    const [creatorProfile] = await db
      .select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (!creatorProfile) {
      return NextResponse.json({ 
        error: 'Creator profile not found' 
      }, { status: 400 });
    }

    const searchParams = request.nextUrl.searchParams;
    const statusFilter = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate status filter if provided
    if (statusFilter && !['ongoing', 'completed', 'cancelled'].includes(statusFilter)) {
      return NextResponse.json({ 
        error: 'Invalid status filter' 
      }, { status: 400 });
    }

    // Build query - find collabs where current user is a participant
    // Using SQL LIKE with JSON extract for SQLite JSON queries
    let whereConditions = sql`json_extract(${collabs.participantIds}, '$') LIKE ${'%' + user.id + '%'}`;

    if (statusFilter) {
      whereConditions = and(
        whereConditions,
        eq(collabs.status, statusFilter)
      ) ?? whereConditions;
    }

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(collabs)
      .where(whereConditions);
    
    const total = totalResult[0]?.count ?? 0;

    // Get collabs with pagination
    const userCollabs = await db
      .select()
      .from(collabs)
      .where(whereConditions)
      .orderBy(desc(collabs.createdAt))
      .limit(limit)
      .offset(offset);

    // Get all unique participant IDs from all collabs
    const allParticipantIds = new Set<string>();
    userCollabs.forEach(collab => {
      const ids = JSON.parse(collab.participantIds as string) as string[];
      ids.forEach(id => allParticipantIds.add(id));
    });

    // Fetch all participant details in one query
    const participantDetails = await db
      .select({
        id: creators.id,
        displayName: creators.displayName,
        avatarUrl: creators.avatarUrl
      })
      .from(creators)
      .where(inArray(creators.id, Array.from(allParticipantIds)));

    // Create a map for quick lookup
    const participantMap = new Map(
      participantDetails.map(p => [p.id, p])
    );

    // Format response with parsed JSON fields and participant details
    const formattedCollabs = userCollabs.map(collab => {
      const participantIds = JSON.parse(collab.participantIds as string) as string[];
      const participants = participantIds
        .map(id => participantMap.get(id))
        .filter(p => p !== undefined);

      return {
        id: collab.id,
        title: collab.title,
        description: collab.description,
        participantIds: participantIds,
        participants: participants,
        status: collab.status,
        deliverables: collab.deliverables ? JSON.parse(collab.deliverables as string) : null,
        createdAt: collab.createdAt,
        completedAt: collab.completedAt
      };
    });

    return NextResponse.json({
      collabs: formattedCollabs,
      total: total
    }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}