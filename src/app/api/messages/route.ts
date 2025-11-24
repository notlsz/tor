import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages, threads, creators } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get creator ID for the authenticated user
    const creator = await db.select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (creator.length === 0) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
    }

    const creatorId = creator[0].id;

    const body = await request.json();
    const { threadId, content, generatedByAi } = body;

    // Validate threadId
    if (!threadId) {
      return NextResponse.json({ 
        error: 'Thread ID is required',
        code: 'MISSING_THREAD_ID' 
      }, { status: 400 });
    }

    // Validate content
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Content is required',
        code: 'MISSING_CONTENT' 
      }, { status: 400 });
    }

    const trimmedContent = content.trim();

    if (trimmedContent.length > 5000) {
      return NextResponse.json({ 
        error: 'Content exceeds maximum length of 5000 characters',
        code: 'CONTENT_TOO_LONG' 
      }, { status: 400 });
    }

    // Verify thread exists
    const thread = await db.select()
      .from(threads)
      .where(eq(threads.id, threadId))
      .limit(1);

    if (thread.length === 0) {
      return NextResponse.json({ 
        error: 'Thread not found',
        code: 'THREAD_NOT_FOUND' 
      }, { status: 404 });
    }

    // Verify current user is a participant in the thread
    const participantIds = thread[0].participantIds as string[];
    if (!participantIds.includes(creatorId)) {
      return NextResponse.json({ 
        error: 'Not a participant in this thread',
        code: 'NOT_PARTICIPANT' 
      }, { status: 403 });
    }

    // Create new message
    const messageId = randomUUID();
    const now = new Date().toISOString();

    const newMessage = await db.insert(messages)
      .values({
        id: messageId,
        threadId: threadId,
        senderId: creatorId,
        content: trimmedContent,
        generatedByAi: generatedByAi ?? false,
        read: false,
        createdAt: now
      })
      .returning();

    // Update thread's updatedAt timestamp
    await db.update(threads)
      .set({
        updatedAt: now
      })
      .where(eq(threads.id, threadId));

    return NextResponse.json({ 
      message: newMessage[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get creator ID for the authenticated user
    const creator = await db.select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (creator.length === 0) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
    }

    const creatorId = creator[0].id;

    const body = await request.json();
    const { messageId } = body;

    // Validate messageId
    if (!messageId) {
      return NextResponse.json({ 
        error: 'Message ID is required',
        code: 'MISSING_MESSAGE_ID' 
      }, { status: 400 });
    }

    // Query message by ID
    const message = await db.select()
      .from(messages)
      .where(eq(messages.id, messageId))
      .limit(1);

    if (message.length === 0) {
      return NextResponse.json({ 
        error: 'Message not found',
        code: 'MESSAGE_NOT_FOUND' 
      }, { status: 404 });
    }

    const messageRecord = message[0];

    // Verify current user is NOT the sender
    if (messageRecord.senderId === creatorId) {
      return NextResponse.json({ 
        error: 'Cannot mark own message as read',
        code: 'CANNOT_MARK_OWN' 
      }, { status: 400 });
    }

    // Get thread and verify current user is participant
    const thread = await db.select()
      .from(threads)
      .where(eq(threads.id, messageRecord.threadId))
      .limit(1);

    if (thread.length === 0) {
      return NextResponse.json({ 
        error: 'Thread not found',
        code: 'THREAD_NOT_FOUND' 
      }, { status: 404 });
    }

    const participantIds = thread[0].participantIds as string[];
    if (!participantIds.includes(creatorId)) {
      return NextResponse.json({ 
        error: 'Not a participant in this thread',
        code: 'NOT_PARTICIPANT' 
      }, { status: 403 });
    }

    // Update message read status to true
    const updatedMessage = await db.update(messages)
      .set({
        read: true
      })
      .where(eq(messages.id, messageId))
      .returning();

    return NextResponse.json({ 
      message: {
        id: updatedMessage[0].id,
        threadId: updatedMessage[0].threadId,
        read: updatedMessage[0].read
      }
    }, { status: 200 });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}