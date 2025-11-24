import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { creators } from '@/db/schema';
import { eq, gte, lte, like, and, or, desc, sql, ne } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// Location normalization helper
function normalizeLocation(location: string): string {
  const normalized = location.toLowerCase().trim();
  const locationMap: Record<string, string> = {
    'usa': 'United States',
    'us': 'United States',
    'united states of america': 'United States',
    'uk': 'United Kingdom',
    'great britain': 'United Kingdom',
  };
  
  return locationMap[normalized] || location;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const niche = searchParams.get('niche');
    const location = searchParams.get('location');
    const city = searchParams.get('city');
    const minAudience = searchParams.get('min_audience');
    const maxAudience = searchParams.get('max_audience');
    const collabStatus = searchParams.get('collab_status');
    const searchQuery = searchParams.get('q');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate limit
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid limit, must be between 1 and 100', code: 'INVALID_LIMIT' },
        { status: 400 }
      );
    }

    // Validate pagination
    if (offset < 0) {
      return NextResponse.json(
        { error: 'Invalid offset, must be 0 or greater', code: 'INVALID_OFFSET' },
        { status: 400 }
      );
    }

    // Validate audience size range
    if (minAudience && isNaN(parseInt(minAudience))) {
      return NextResponse.json(
        { error: 'Invalid min_audience, must be a number', code: 'INVALID_MIN_AUDIENCE' },
        { status: 400 }
      );
    }

    if (maxAudience && isNaN(parseInt(maxAudience))) {
      return NextResponse.json(
        { error: 'Invalid max_audience, must be a number', code: 'INVALID_MAX_AUDIENCE' },
        { status: 400 }
      );
    }

    // Validate collab_status
    if (collabStatus && !['open', 'busy', 'not_looking'].includes(collabStatus)) {
      return NextResponse.json(
        { error: 'Invalid collab_status, must be one of: open, busy, not_looking', code: 'INVALID_COLLAB_STATUS' },
        { status: 400 }
      );
    }

    // Optional authentication - get current user if authenticated
    let currentUser = null;
    try {
      currentUser = await getCurrentUser(request);
    } catch (error) {
      // Not authenticated, continue without user context
    }

    // Build filter conditions
    const conditions = [];

    // Exclude current user if authenticated
    if (currentUser) {
      conditions.push(ne(creators.id, currentUser.id));
    }

    // Niche filter
    if (niche) {
      conditions.push(eq(creators.niche, niche));
    }

    // Location filter (with normalization)
    if (location) {
      const normalizedLocation = normalizeLocation(location);
      conditions.push(eq(creators.location, normalizedLocation));
    }

    // City filter
    if (city) {
      conditions.push(eq(creators.city, city));
    }

    // Audience size range filters
    if (minAudience) {
      conditions.push(gte(creators.audienceSize, parseInt(minAudience)));
    }

    if (maxAudience) {
      conditions.push(lte(creators.audienceSize, parseInt(maxAudience)));
    }

    // Collab status filter
    if (collabStatus) {
      conditions.push(eq(creators.collabStatus, collabStatus));
    }

    // Search query (searches displayName, bio, niche)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      conditions.push(
        or(
          sql`LOWER(${creators.displayName}) LIKE ${`%${searchLower}%`}`,
          sql`LOWER(${creators.bio}) LIKE ${`%${searchLower}%`}`,
          sql`LOWER(${creators.niche}) LIKE ${`%${searchLower}%`}`
        )
      );
    }

    // Build WHERE clause
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Execute query with ordering
    const results = await db
      .select({
        id: creators.id,
        displayName: creators.displayName,
        bio: creators.bio,
        niche: creators.niche,
        location: creators.location,
        city: creators.city,
        collabStatus: creators.collabStatus,
        audienceSize: creators.audienceSize,
        socials: creators.socials,
        avatarUrl: creators.avatarUrl,
        lastActive: creators.lastActive,
      })
      .from(creators)
      .where(whereClause)
      .orderBy(
        sql`CASE WHEN ${creators.collabStatus} = 'open' THEN 0 ELSE 1 END`,
        desc(creators.audienceSize),
        desc(creators.lastActive)
      )
      .limit(limit)
      .offset(offset);

    // Get total count for pagination metadata
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(creators)
      .where(whereClause);
    
    const total = countResult[0]?.count ?? 0;

    // Parse JSON fields and format response
    const formattedCreators = results.map(creator => ({
      id: creator.id,
      displayName: creator.displayName,
      bio: creator.bio,
      niche: creator.niche,
      location: creator.location,
      city: creator.city,
      collabStatus: creator.collabStatus,
      audienceSize: creator.audienceSize,
      socials: typeof creator.socials === 'string' 
        ? JSON.parse(creator.socials) 
        : creator.socials,
      avatarUrl: creator.avatarUrl,
      lastActive: creator.lastActive,
    }));

    return NextResponse.json({
      creators: formattedCreators,
      total,
      limit,
      offset,
    }, { status: 200 });

  } catch (error) {
    console.error('GET /api/discover error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}