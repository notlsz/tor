import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { creators, invites } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { count = 1 } = body;

    // Validate count parameter
    if (typeof count !== 'number' || count < 1 || count > 10) {
      return NextResponse.json(
        { error: 'Invalid count, must be between 1 and 10' },
        { status: 400 }
      );
    }

    // Get creator profile
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

    const creator = creatorProfile[0];

    // Check if user has enough invites remaining
    if (creator.invitesRemaining < count) {
      return NextResponse.json(
        {
          error: 'Insufficient invites remaining',
          invitesRemaining: creator.invitesRemaining,
        },
        { status: 400 }
      );
    }

    // Generate unique invite codes
    const generatedInvites = [];
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const createdAt = new Date().toISOString();

    for (let i = 0; i < count; i++) {
      let code: string;
      let isUnique = false;

      // Generate unique code with collision check
      while (!isUnique) {
        code = Math.floor(100000 + Math.random() * 900000).toString();

        // Check if code already exists
        const existingCode = await db
          .select()
          .from(invites)
          .where(eq(invites.code, code))
          .limit(1);

        if (existingCode.length === 0) {
          isUnique = true;

          // Create invite record
          const newInvite = await db
            .insert(invites)
            .values({
              id: crypto.randomUUID(),
              code: code,
              inviterId: user.id,
              expiresAt: expiresAt,
              createdAt: createdAt,
            })
            .returning();

          generatedInvites.push({
            id: newInvite[0].id,
            code: newInvite[0].code,
            expiresAt: newInvite[0].expiresAt,
            createdAt: newInvite[0].createdAt,
          });
        }
      }
    }

    // Decrement creator's invitesRemaining
    const updatedCreator = await db
      .update(creators)
      .set({
        invitesRemaining: creator.invitesRemaining - count,
      })
      .where(eq(creators.id, user.id))
      .returning();

    return NextResponse.json(
      {
        invites: generatedInvites,
        invitesRemaining: updatedCreator[0].invitesRemaining,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}