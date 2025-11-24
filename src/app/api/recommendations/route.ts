import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { creators } from '@/db/schema';
import { eq, ne } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// Simple keyword extraction from free-form prompt
function extractKeywords(prompt: string) {
  const cleaned = prompt.toLowerCase();
  // Split on non-letters/numbers and filter short tokens
  const tokens = cleaned.split(/[^a-z0-9+#]+/g).filter(t => t && t.length > 2);
  // Remove very common filler words
  const stop = new Set(['the','and','for','with','that','this','you','your','from','have','make','want','like','need','best','most','into','over','under','into','about','just','into','into']);
  const uniq: string[] = [];
  for (const t of tokens) {
    if (!stop.has(t) && !uniq.includes(t)) uniq.push(t);
  }
  return uniq.slice(0, 12); // cap for perf
}

export async function GET(request: NextRequest) {
  try {
    // Optional prompt to bias matches ("AI" assist)
    const prompt = request.nextUrl.searchParams.get('q') || '';

    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current user's creator profile
    const currentCreatorResult = await db
      .select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (currentCreatorResult.length === 0) {
      return NextResponse.json(
        { error: 'Creator profile not found' },
        { status: 404 }
      );
    }

    const currentCreator = currentCreatorResult[0];
    const currentAudienceSize = currentCreator.audienceSize || 0;

    // Query all other creators
    const otherCreators = await db
      .select()
      .from(creators)
      .where(ne(creators.id, user.id));

    // Prepare keywords once
    const keywords = prompt ? extractKeywords(prompt) : [];

    // Calculate match scores
    const scoredCreators = otherCreators.map((creator) => {
      let score = 0;
      const matchReasons: string[] = [];

      // Parse JSON fields
      const creatorSocials =
        typeof creator.socials === 'string'
          ? JSON.parse(creator.socials)
          : creator.socials || {};

      // Same niche: +30 points
      if (creator.niche && creator.niche === currentCreator.niche) {
        score += 30;
        matchReasons.push('Same niche');
      }

      // Same location: +20 points
      if (creator.location && creator.location === currentCreator.location) {
        score += 20;
        matchReasons.push('Same location');
      }

      // Same city: +15 points
      if (creator.city && creator.city === currentCreator.city) {
        score += 15;
        matchReasons.push('Same city');
      }

      // Collab status open: +25 points
      if (creator.collabStatus === 'open') {
        score += 25;
        matchReasons.push('Open to collaborations');
      }

      // Similar audience size (within 2x range): +10 points
      const creatorAudienceSize = creator.audienceSize || 0;
      if (currentAudienceSize > 0 && creatorAudienceSize > 0) {
        const minRange = currentAudienceSize / 2;
        const maxRange = currentAudienceSize * 2;
        if (
          creatorAudienceSize >= minRange &&
          creatorAudienceSize <= maxRange
        ) {
          score += 10;
          matchReasons.push('Similar audience size');
        }
      }

      // Prompt-based keyword boosts (pseudo-AI):
      if (keywords.length > 0) {
        const haystack = (
          `${creator.displayName || ''} ${creator.bio || ''} ${creator.niche || ''} ${creator.city || ''} ${creator.location || ''}`
        ).toLowerCase();

        let keywordHits = 0;
        for (const k of keywords) {
          if (haystack.includes(k)) keywordHits++;
        }

        if (keywordHits > 0) {
          // +8 per hit up to +40
          const boost = Math.min(keywordHits * 8, 40);
          score += boost;
          matchReasons.push(`Matches your idea (${keywordHits} keyword${keywordHits > 1 ? 's' : ''})`);
        }

        // Special-case: product stunt or hardware style words
        const stuntWords = ['flamethrower','stunt','pyro','explosion','rooftop','fire','prank','challenge'];
        if (stuntWords.some(w => keywords.includes(w))) {
          // Give a small preference to niches often producing spectacle content
          if (creator.niche && ['Film/Video','Technology & Gadgets','Gaming & Esports','Comedy & Skits'].includes(creator.niche)) {
            score += 12;
            matchReasons.push('High-impact content niche');
          }
        }
      }

      return {
        id: creator.id,
        displayName: creator.displayName,
        bio: creator.bio,
        niche: creator.niche,
        location: creator.location,
        city: creator.city,
        collabStatus: creator.collabStatus,
        audienceSize: creator.audienceSize,
        socials: creatorSocials,
        avatarUrl: creator.avatarUrl,
        matchScore: score,
        matchReasons: matchReasons,
      };
    });

    // Sort by match score DESC
    scoredCreators.sort((a, b) => {
      return b.matchScore - a.matchScore;
    });

    // Return top matches (default 5, allow override via ?limit)
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') ?? '5'), 20);
    const recommendations = scoredCreators.slice(0, limit);

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (error) {
    console.error('GET /api/recommendations error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}