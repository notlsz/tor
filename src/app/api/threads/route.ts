import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { threads, creators, messages } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { participantIds } = body;

    // Validate participantIds array
    if (!participantIds || !Array.isArray(participantIds)) {
      return NextResponse.json({ 
        error: 'participantIds must be an array',
        code: 'INVALID_PARTICIPANT_IDS' 
      }, { status: 400 });
    }

    if (participantIds.length < 2) {
      return NextResponse.json({ 
        error: 'participantIds must contain at least 2 participants',
        code: 'INSUFFICIENT_PARTICIPANTS' 
      }, { status: 400 });
    }

    // Ensure current user is in participantIds
    if (!participantIds.includes(user.id)) {
      return NextResponse.json({ 
        error: 'Current user must be in participantIds',
        code: 'USER_NOT_IN_PARTICIPANTS' 
      }, { status: 400 });
    }

    // Sort participantIds for consistent lookup
    const sortedParticipantIds = [...participantIds].sort();
    const participantIdsJson = JSON.stringify(sortedParticipantIds);

    // Check if thread already exists with exact same participants
    const existingThreads = await db.select()
      .from(threads)
      .where(
        sql`json_extract(${threads.participantIds}, '$') = ${participantIdsJson}`
      )
      .limit(1);

    let thread;
    let isNew = false;

    if (existingThreads.length > 0) {
      // Return existing thread
      thread = existingThreads[0];
    } else {
      // Create new thread
      const threadId = crypto.randomUUID();
      const now = new Date().toISOString();

      const newThread = await db.insert(threads)
        .values({
          id: threadId,
          participantIds: sortedParticipantIds,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      thread = newThread[0];
      isNew = true;
    }

    // Get participant details
    const parsedParticipantIds = JSON.parse(thread.participantIds as string);
    const participants = await db.select({
      id: creators.id,
      displayName: creators.displayName,
      avatarUrl: creators.avatarUrl,
    })
      .from(creators)
      .where(
        sql`${creators.id} IN (${sql.raw(parsedParticipantIds.map((id: string) => `'${id}'`).join(','))})`
      );

    return NextResponse.json({
      thread: {
        id: thread.id,
        participantIds: parsedParticipantIds,
        participants,
        createdAt: thread.createdAt,
        updatedAt: thread.updatedAt,
      },
      isNew,
    }, { status: isNew ? 201 : 200 });

  } catch (error) {
    console.error('POST threads error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Query threads where participantIds contains current user ID
    const userThreads = await db.select()
      .from(threads)
      .where(
        sql`json_extract(${threads.participantIds}, '$') LIKE '%${user.id}%'`
      )
      .orderBy(desc(threads.updatedAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalResult = await db.select({ count: sql<number>`count(*)` })
      .from(threads)
      .where(
        sql`json_extract(${threads.participantIds}, '$') LIKE '%${user.id}%'`
      );

    const total = totalResult[0]?.count ?? 0;

    // Process each thread to get last message, unread count, and participants
    const threadsWithDetails = await Promise.all(
      userThreads.map(async (thread) => {
        const parsedParticipantIds = JSON.parse(thread.participantIds as string);

        // Get last message
        const lastMessageResult = await db.select()
          .from(messages)
          .where(eq(messages.threadId, thread.id))
          .orderBy(desc(messages.createdAt))
          .limit(1);

        const lastMessage = lastMessageResult.length > 0 ? {
          content: lastMessageResult[0].content,
          createdAt: lastMessageResult[0].createdAt,
          senderId: lastMessageResult[0].senderId,
        } : null;

        // Get unread count (messages not sent by current user and not read)
        const unreadResult = await db.select({ count: sql<number>`count(*)` })
          .from(messages)
          .where(
            sql`${messages.threadId} = ${thread.id} AND ${messages.senderId} != ${user.id} AND ${messages.read} = 0`
          );

        const unreadCount = unreadResult[0]?.count ?? 0;

        // Get participant details (exclude current user)
        const otherParticipantIds = parsedParticipantIds.filter((id: string) => id !== user.id);
        
        let participants = [];
        if (otherParticipantIds.length > 0) {
          participants = await db.select({
            id: creators.id,
            displayName: creators.displayName,
            avatarUrl: creators.avatarUrl,
          })
            .from(creators)
            .where(
              sql`${creators.id} IN (${sql.raw(otherParticipantIds.map((id: string) => `'${id}'`).join(','))})`
            );
        }

        return {
          id: thread.id,
          participantIds: parsedParticipantIds,
          participants,
          lastMessage,
          unreadCount,
          updatedAt: thread.updatedAt,
        };
      })
    );

    return NextResponse.json({
      threads: threadsWithDetails,
      total,
    }, { status: 200 });

  } catch (error) {
    console.error('GET threads error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}