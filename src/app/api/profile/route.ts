import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { creators } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const VALID_NICHES = [
  "Music",
  "Art",
  "Film/Video",
  "Photography",
  "Writing/Literature",
  "Design",
  "Fashion & Style",
  "Dance",
  "Comedy & Skits",
  "Technology & Gadgets",
  "Lifestyle & Wellness",
  "Gaming & Esports",
  "Fitness & Sports",
  "Food & Cooking",
  "Beauty & Makeup",
  "Education & Learning",
  "Entrepreneurship & Finance",
  "Family & Parenting",
  "DIY & Home Improvement",
  "Travel & Adventure",
  "Science & Explainers",
  "Sustainability & Eco Living",
  "Pets & Animals",
  "Business & Marketing",
  "Personal Development & Motivation"
];

const VALID_COLLAB_STATUSES = ['open', 'busy', 'not_looking'];

const LOCATION_NORMALIZATION: Record<string, string> = {
  'usa': 'United States',
  'us': 'United States',
  'united states': 'United States',
  'uk': 'United Kingdom',
  'united kingdom': 'United Kingdom',
  'uae': 'United Arab Emirates',
  'united arab emirates': 'United Arab Emirates',
};

function normalizeLocation(location: string): string {
  const normalized = location.toLowerCase().trim();
  return LOCATION_NORMALIZATION[normalized] || location.trim();
}

function parseAudienceSize(value: number | string): number {
  if (typeof value === 'number') return value;
  return parseInt(value.toString().replace(/,/g, ''), 10);
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Security check: reject if userId or user_id provided in body
    if ('userId' in body || 'user_id' in body || 'id' in body) {
      return NextResponse.json(
        {
          error: "User ID cannot be provided in request body",
          code: "USER_ID_NOT_ALLOWED"
        },
        { status: 400 }
      );
    }

    // Validate required fields for profile creation
    const { displayName, niche } = body;

    if (!displayName || !displayName.toString().trim()) {
      return NextResponse.json(
        { error: 'displayName is required', code: 'MISSING_DISPLAY_NAME' },
        { status: 400 }
      );
    }

    if (!niche || !VALID_NICHES.includes(niche.toString().trim())) {
      return NextResponse.json(
        { error: 'Valid niche is required', code: 'INVALID_NICHE' },
        { status: 400 }
      );
    }

    // Check if creator profile already exists
    const existingCreator = await db
      .select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (existingCreator.length > 0) {
      return NextResponse.json(
        { error: 'Creator profile already exists. Use PATCH to update.', code: 'PROFILE_EXISTS' },
        { status: 400 }
      );
    }

    // Build new creator profile
    const newCreator: any = {
      id: user.id,
      displayName: displayName.toString().trim(),
      niche: niche.toString().trim(),
      collabStatus: body.collabStatus && VALID_COLLAB_STATUSES.includes(body.collabStatus.toString().toLowerCase().trim())
        ? body.collabStatus.toString().toLowerCase().trim()
        : 'open',
      invitesRemaining: 3,
      inviteResetAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      timezone: body.timezone?.toString().trim() || 'America/Los_Angeles',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    // Optional fields
    if (body.bio) newCreator.bio = body.bio.toString().trim();
    if (body.location) newCreator.location = normalizeLocation(body.location.toString());
    if (body.city) newCreator.city = body.city.toString().trim();
    if (body.avatarUrl) newCreator.avatarUrl = body.avatarUrl.toString().trim();

    if (body.audienceSize !== undefined) {
      const audienceSize = parseAudienceSize(body.audienceSize);
      if (!isNaN(audienceSize) && audienceSize >= 0) {
        newCreator.audienceSize = audienceSize;
      }
    }

    if (body.socials && typeof body.socials === 'object' && body.socials !== null && !Array.isArray(body.socials)) {
      newCreator.socials = JSON.stringify(body.socials);
    }

    // Insert new creator
    const created = await db.insert(creators).values(newCreator).returning();

    if (created.length === 0) {
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 500 }
      );
    }

    // Parse JSON fields for response
    const result = {
      ...created[0],
      socials: created[0].socials ? JSON.parse(created[0].socials as string) : null,
    };

    return NextResponse.json(result, { status: 201 });

  } catch (error: any) {
    console.error('POST /api/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get creator profile for authenticated user
    const creatorProfile = await db
      .select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (creatorProfile.length === 0) {
      return NextResponse.json(
        { error: 'Creator profile not found' },
        { status: 404 }
      );
    }

    const profile = creatorProfile[0];

    // Parse JSON fields for response
    const result = {
      ...profile,
      socials: profile.socials ? JSON.parse(profile.socials as string) : null,
    };

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Security check: reject if userId or user_id provided in body
    if ('userId' in body || 'user_id' in body || 'id' in body) {
      return NextResponse.json(
        {
          error: "User ID cannot be provided in request body",
          code: "USER_ID_NOT_ALLOWED"
        },
        { status: 400 }
      );
    }

    // Check if creator profile exists
    const existingCreator = await db
      .select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (existingCreator.length === 0) {
      return NextResponse.json(
        { error: 'Creator profile not found' },
        { status: 404 }
      );
    }

    // Build update object with only provided fields
    const updates: Record<string, any> = {};

    // Validate and add displayName
    if (body.displayName !== undefined) {
      updates.displayName = body.displayName.toString().trim();
    }

    // Validate and add bio
    if (body.bio !== undefined) {
      updates.bio = body.bio.toString().trim();
    }

    // Validate and add niche
    if (body.niche !== undefined) {
      const niche = body.niche.toString().trim();
      if (!VALID_NICHES.includes(niche)) {
        return NextResponse.json(
          {
            error: "Invalid niche category",
            code: "INVALID_NICHE"
          },
          { status: 400 }
        );
      }
      updates.niche = niche;
    }

    // Validate and normalize location
    if (body.location !== undefined) {
      updates.location = normalizeLocation(body.location.toString());
    }

    // Validate and add city
    if (body.city !== undefined) {
      updates.city = body.city.toString().trim();
    }

    // Validate and add collabStatus
    if (body.collabStatus !== undefined) {
      const collabStatus = body.collabStatus.toString().toLowerCase().trim();
      if (!VALID_COLLAB_STATUSES.includes(collabStatus)) {
        return NextResponse.json(
          {
            error: "Invalid collab status",
            code: "INVALID_COLLAB_STATUS"
          },
          { status: 400 }
        );
      }
      updates.collabStatus = collabStatus;
    }

    // Validate and parse audienceSize
    if (body.audienceSize !== undefined) {
      const audienceSize = parseAudienceSize(body.audienceSize);
      if (isNaN(audienceSize) || audienceSize < 0) {
        return NextResponse.json(
          {
            error: "Invalid audience size",
            code: "INVALID_AUDIENCE_SIZE"
          },
          { status: 400 }
        );
      }
      updates.audienceSize = audienceSize;
    }

    // Validate and add socials
    if (body.socials !== undefined) {
      if (typeof body.socials === 'object' && body.socials !== null && !Array.isArray(body.socials)) {
        updates.socials = JSON.stringify(body.socials);
      } else {
        return NextResponse.json(
          {
            error: "socials must be an object",
            code: "INVALID_SOCIALS"
          },
          { status: 400 }
        );
      }
    }

    // Validate and add timezone
    if (body.timezone !== undefined) {
      updates.timezone = body.timezone.toString().trim();
    }

    // Always update lastActive
    updates.lastActive = new Date().toISOString();

    // Perform update
    const updated = await db
      .update(creators)
      .set(updates)
      .where(eq(creators.id, user.id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    // Parse JSON fields for response
    const result = {
      ...updated[0],
      socials: updated[0].socials ? JSON.parse(updated[0].socials as string) : null,
    };

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error('PATCH /api/profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}