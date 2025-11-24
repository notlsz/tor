import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leaderboardEntries, creators } from '@/db/schema';
import { eq, desc, asc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    
    // Validate and set limit (default: 50, max: 100)
    let limit = 50;
    if (limitParam) {
      const parsedLimit = parseInt(limitParam);
      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return NextResponse.json({
          error: 'Limit must be between 1 and 100',
          code: 'INVALID_LIMIT'
        }, { status: 400 });
      }
      limit = parsedLimit;
    }
    
    // Validate and set offset (default: 0)
    let offset = 0;
    if (offsetParam) {
      const parsedOffset = parseInt(offsetParam);
      if (isNaN(parsedOffset) || parsedOffset < 0) {
        return NextResponse.json({
          error: 'Offset must be a non-negative integer',
          code: 'INVALID_OFFSET'
        }, { status: 400 });
      }
      offset = parsedOffset;
    }
    
    // Get total count for pagination
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(leaderboardEntries);
    
    const total = Number(totalCount[0]?.count || 0);
    
    // Query leaderboard entries with creator details
    // Order by rank ASC (lower rank = higher position), or by totalPoints DESC if rank is null
    const entries = await db
      .select({
        entryId: leaderboardEntries.id,
        rank: leaderboardEntries.rank,
        totalPoints: leaderboardEntries.totalPoints,
        invitesSent: leaderboardEntries.invitesSent,
        collabsCompleted: leaderboardEntries.collabsCompleted,
        messagesSent: leaderboardEntries.messagesSent,
        updatedAt: leaderboardEntries.updatedAt,
        creatorId: creators.id,
        displayName: creators.displayName,
        avatarUrl: creators.avatarUrl,
        niche: creators.niche,
        location: creators.location,
      })
      .from(leaderboardEntries)
      .innerJoin(creators, eq(leaderboardEntries.creatorId, creators.id))
      .orderBy(
        sql`CASE WHEN ${leaderboardEntries.rank} IS NULL THEN 1 ELSE 0 END`,
        asc(leaderboardEntries.rank),
        desc(leaderboardEntries.totalPoints)
      )
      .limit(limit)
      .offset(offset);
    
    // Format response
    const formattedEntries = entries.map(entry => ({
      rank: entry.rank,
      creator: {
        id: entry.creatorId,
        displayName: entry.displayName,
        avatarUrl: entry.avatarUrl,
        niche: entry.niche,
        location: entry.location,
      },
      totalPoints: entry.totalPoints || 0,
      invitesSent: entry.invitesSent || 0,
      collabsCompleted: entry.collabsCompleted || 0,
      messagesSent: entry.messagesSent || 0,
      updatedAt: entry.updatedAt,
    }));
    
    return NextResponse.json({
      entries: formattedEntries,
      total,
    }, { status: 200 });
    
  } catch (error) {
    console.error('GET leaderboard error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}