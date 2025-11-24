import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { featuredCreators, creators } from '@/db/schema';
import { eq, and, lte, gte, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const weekStart = searchParams.get('week_start');
    const current = searchParams.get('current') === 'true';

    let query = db
      .select({
        id: featuredCreators.id,
        creatorId: featuredCreators.creatorId,
        weekStartDate: featuredCreators.weekStartDate,
        weekEndDate: featuredCreators.weekEndDate,
        blurb: featuredCreators.blurb,
        curatorId: featuredCreators.curatorId,
        createdAt: featuredCreators.createdAt,
        creator: {
          id: creators.id,
          displayName: creators.displayName,
          bio: creators.bio,
          niche: creators.niche,
          avatarUrl: creators.avatarUrl,
        },
      })
      .from(featuredCreators)
      .leftJoin(creators, eq(featuredCreators.creatorId, creators.id));

    if (current) {
      const today = new Date().toISOString().split('T')[0];
      query = query.where(
        and(
          lte(featuredCreators.weekStartDate, today),
          gte(featuredCreators.weekEndDate, today)
        )
      ) as any;
    } else if (weekStart) {
      query = query.where(eq(featuredCreators.weekStartDate, weekStart)) as any;
    }

    const results = await query.orderBy(desc(featuredCreators.weekStartDate));

    const featured = results.map((row) => ({
      id: row.id,
      creatorId: row.creatorId,
      creator: row.creator,
      weekStartDate: row.weekStartDate,
      weekEndDate: row.weekEndDate,
      blurb: row.blurb,
      curatorId: row.curatorId,
      createdAt: row.createdAt,
    }));

    return NextResponse.json({ featured }, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { creatorId, weekStartDate, weekEndDate, blurb } = body;

    if (!creatorId) {
      return NextResponse.json(
        { error: 'creatorId is required', code: 'MISSING_CREATOR_ID' },
        { status: 400 }
      );
    }

    if (!weekStartDate || !weekEndDate) {
      return NextResponse.json(
        { error: 'weekStartDate and weekEndDate are required', code: 'MISSING_DATES' },
        { status: 400 }
      );
    }

    const startDate = new Date(weekStartDate);
    const endDate = new Date(weekEndDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO format (YYYY-MM-DD)', code: 'INVALID_DATE_FORMAT' },
        { status: 400 }
      );
    }

    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'weekEndDate must be after weekStartDate', code: 'INVALID_DATE_RANGE' },
        { status: 400 }
      );
    }

    const existingCreator = await db
      .select()
      .from(creators)
      .where(eq(creators.id, creatorId))
      .limit(1);

    if (existingCreator.length === 0) {
      return NextResponse.json(
        { error: 'Creator not found', code: 'CREATOR_NOT_FOUND' },
        { status: 404 }
      );
    }

    const existingFeatured = await db
      .select()
      .from(featuredCreators)
      .where(
        and(
          eq(featuredCreators.creatorId, creatorId),
          lte(featuredCreators.weekStartDate, weekEndDate),
          gte(featuredCreators.weekEndDate, weekStartDate)
        )
      )
      .limit(1);

    if (existingFeatured.length > 0) {
      return NextResponse.json(
        { error: 'Creator already featured for this week', code: 'DUPLICATE_FEATURED' },
        { status: 400 }
      );
    }

    const newFeatured = await db
      .insert(featuredCreators)
      .values({
        id: crypto.randomUUID(),
        creatorId,
        weekStartDate,
        weekEndDate,
        blurb: blurb || null,
        curatorId: user.id,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(
      { featured: newFeatured[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}