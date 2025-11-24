import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages, creators, threads } from '@/db/schema';
import { eq, desc, lt, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Extract thread ID from URL params
    const threadId = params.id;

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is required', code: 'MISSING_THREAD_ID' },
        { status: 400 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const beforeParam = searchParams.get('before');

    // Parse and validate limit
    let limit = 50;
    if (limitParam) {
      limit = parseInt(limitParam);
      if (isNaN(limit) || limit < 1 || limit > 200) {
        return NextResponse.json(
          { error: 'Invalid limit, must be between 1 and 200', code: 'INVALID_LIMIT' },
          { status: 400 }
        );
      }
    }

    // Parse offset
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        { error: 'Invalid offset, must be a non-negative number', code: 'INVALID_OFFSET' },
        { status: 400 }
      );
    }

    // Verify thread exists
    const thread = await db
      .select()
      .from(threads)
      .where(eq(threads.id, threadId))
      .limit(1);

    if (thread.length === 0) {
      return NextResponse.json(
        { error: 'Thread not found', code: 'THREAD_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Verify current user is a participant in the thread
    const participantIds = JSON.parse(thread[0].participantIds as string) as string[];
    if (!participantIds.includes(user.id)) {
      return NextResponse.json(
        { error: 'Not a participant in this thread', code: 'NOT_PARTICIPANT' },
        { status: 403 }
      );
    }

    // Build query conditions
    let whereConditions = [eq(messages.threadId, threadId)];

    // Add before timestamp filter if provided
    if (beforeParam) {
      whereConditions.push(lt(messages.createdAt, beforeParam));
    }

    // Query messages with sender information
    const messagesQuery = db
      .select({
        id: messages.id,
        threadId: messages.threadId,
        senderId: messages.senderId,
        content: messages.content,
        generatedByAi: messages.generatedByAi,
        read: messages.read,
        createdAt: messages.createdAt,
        sender: {
          id: creators.id,
          displayName: creators.displayName,
          avatarUrl: creators.avatarUrl,
        },
      })
      .from(messages)
      .leftJoin(creators, eq(messages.senderId, creators.id))
      .where(and(...whereConditions))
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    const messagesResult = await messagesQuery;

    // Get total count for pagination
    const totalCountQuery = db
      .select({ count: messages.id })
      .from(messages)
      .where(and(...whereConditions));

    const totalCountResult = await totalCountQuery;
    const total = totalCountResult.length;

    // Format response with proper boolean conversion
    const formattedMessages = messagesResult.map((msg) => ({
      id: msg.id,
      threadId: msg.threadId,
      senderId: msg.senderId,
      sender: msg.sender,
      content: msg.content,
      generatedByAi: Boolean(msg.generatedByAi),
      read: Boolean(msg.read),
      createdAt: msg.createdAt,
    }));

    return NextResponse.json(
      {
        messages: formattedMessages,
        total,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/threads/[id]/messages error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}