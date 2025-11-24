import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { creators, creatorBadges, badges, leaderboardEntries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Creator ID is required', code: 'MISSING_ID' },
        { status: 400 }
      );
    }

    // Query creator profile
    const result = await db
      .select()
      .from(creators)
      .where(eq(creators.id, parseInt(id)))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Creator profile not found', code: 'CREATOR_NOT_FOUND' },
        { status: 404 }
      );
    }

    const profile = result[0];

    // Get creator's badges (using string ID for join)
    const badgesResult = await db
      .select({
        id: badges.id,
        name: badges.name,
        description: badges.description,
        icon: badges.icon,
        tier: badges.tier,
        points: badges.points,
        earnedAt: creatorBadges.earnedAt,
      })
      .from(creatorBadges)
      .innerJoin(badges, eq(creatorBadges.badgeId, badges.id))
      .where(eq(creatorBadges.creatorId, id));

    // Get leaderboard stats
    const statsResult = await db
      .select()
      .from(leaderboardEntries)
      .where(eq(leaderboardEntries.creatorId, parseInt(id)))
      .limit(1);

    const stats = statsResult.length > 0 ? {
      totalPoints: statsResult[0].totalPoints,
      invitesSent: statsResult[0].invitesSent,
      collabsCompleted: statsResult[0].collabsCompleted,
      messagesSent: statsResult[0].messagesSent,
      rank: statsResult[0].rank,
    } : {
      totalPoints: 0,
      invitesSent: 0,
      collabsCompleted: 0,
      messagesSent: 0,
      rank: null,
    };

    // Parse socials JSON safely
    let socials = {};
    if (profile.socials) {
      try {
        socials = typeof profile.socials === 'string' 
          ? JSON.parse(profile.socials) 
          : profile.socials;
      } catch (e) {
        console.error('Error parsing socials:', e);
        socials = {};
      }
    }

    // Parse JSON fields if they are strings
    const parsedProfile = {
      id: profile.id,
      displayName: profile.displayName,
      bio: profile.bio,
      niche: profile.niche,
      location: profile.location,
      city: profile.city,
      collabStatus: profile.collabStatus,
      audienceSize: profile.audienceSize,
      avatarUrl: profile.avatarUrl,
      timezone: profile.timezone,
      createdAt: profile.createdAt,
      lastActive: profile.lastActive,
      socials,
      badges: badgesResult,
      stats,
    };

    return NextResponse.json(parsedProfile, { status: 200 });
  } catch (error) {
    console.error('GET creator profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}