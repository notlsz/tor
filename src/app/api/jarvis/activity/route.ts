import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { jarvisActivityEvents } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '25'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const acknowledgedParam = searchParams.get('acknowledged');
    const eventType = searchParams.get('event_type');

    if (limit < 1 || limit > 100) {
      return NextResponse.json({ 
        error: 'Invalid limit, must be between 1 and 100',
        code: 'INVALID_LIMIT'
      }, { status: 400 });
    }

    const conditions = [eq(jarvisActivityEvents.userId, user.id)];

    if (acknowledgedParam !== null) {
      const acknowledgedValue = acknowledgedParam === 'true' ? 1 : 0;
      conditions.push(eq(jarvisActivityEvents.acknowledged, acknowledgedValue));
    }

    if (eventType) {
      conditions.push(eq(jarvisActivityEvents.eventType, eventType));
    }

    const whereCondition = conditions.length > 1 ? and(...conditions) : conditions[0];

    const events = await db
      .select()
      .from(jarvisActivityEvents)
      .where(whereCondition)
      .orderBy(desc(jarvisActivityEvents.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select()
      .from(jarvisActivityEvents)
      .where(whereCondition);

    const parsedEvents = events.map(event => ({
      ...event,
      payload: event.payload ? JSON.parse(event.payload as string) : null,
      acknowledged: Boolean(event.acknowledged)
    }));

    return NextResponse.json({
      events: parsedEvents,
      total: totalResult.length
    }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { eventType, payload, sourceId } = body;

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    if (!eventType) {
      return NextResponse.json({ 
        error: 'eventType is required',
        code: 'MISSING_EVENT_TYPE'
      }, { status: 400 });
    }

    const newEvent = await db.insert(jarvisActivityEvents).values({
      id: crypto.randomUUID(),
      userId: user.id,
      eventType: eventType.trim(),
      payload: payload ? JSON.stringify(payload) : null,
      sourceId: sourceId?.trim() || null,
      createdAt: new Date().toISOString(),
      acknowledged: 0
    }).returning();

    const createdEvent = {
      ...newEvent[0],
      payload: newEvent[0].payload ? JSON.parse(newEvent[0].payload as string) : null,
      acknowledged: Boolean(newEvent[0].acknowledged)
    };

    return NextResponse.json({
      event: createdEvent
    }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}