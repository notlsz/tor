import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { badges } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Query all badges ordered by points descending (highest value first)
    const allBadges = await db.select()
      .from(badges)
      .orderBy(desc(badges.points));

    // Parse criteria JSON field for each badge (handle double-escaped JSON)
    const badgesWithParsedCriteria = allBadges.map(badge => {
      let criteria = badge.criteria;
      
      // Handle double-escaped JSON from database
      if (typeof criteria === 'string') {
        try {
          // First parse removes outer quotes
          let parsed = JSON.parse(criteria);
          // If still a string, parse again
          if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
          }
          criteria = parsed;
        } catch (e) {
          console.error('Error parsing badge criteria:', e);
          criteria = null;
        }
      }

      return {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        criteria,
        tier: badge.tier,
        points: badge.points,
        createdAt: badge.createdAt
      };
    });

    return NextResponse.json({
      badges: badgesWithParsedCriteria
    }, { status: 200 });

  } catch (error) {
    console.error('GET badges error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}