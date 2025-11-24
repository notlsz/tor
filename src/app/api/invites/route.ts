import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invites, creators } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get creator profile for current user
    const creatorProfile = await db.select()
      .from(creators)
      .where(eq(creators.id, user.id))
      .limit(1);

    if (creatorProfile.length === 0) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
    }

    const creatorId = creatorProfile[0].id;

    // Get all invites for the current user
    const userInvites = await db.select()
      .from(invites)
      .where(eq(invites.inviterId, creatorId))
      .orderBy(desc(invites.createdAt));

    // Process invites and fetch user details for used invites
    const processedInvites = await Promise.all(
      userInvites.map(async (invite) => {
        if (invite.usedBy) {
          // Fetch creator details for the user who used this invite
          const usedByCreator = await db.select({
            id: creators.id,
            displayName: creators.displayName,
            avatarUrl: creators.avatarUrl,
          })
            .from(creators)
            .where(eq(creators.id, invite.usedBy))
            .limit(1);

          return {
            id: invite.id,
            code: invite.code,
            expiresAt: invite.expiresAt,
            createdAt: invite.createdAt,
            used: true,
            usedBy: usedByCreator.length > 0 ? usedByCreator[0] : null,
            usedAt: invite.usedAt,
          };
        }

        return {
          id: invite.id,
          code: invite.code,
          expiresAt: invite.expiresAt,
          createdAt: invite.createdAt,
          used: false,
          usedBy: null,
          usedAt: null,
        };
      })
    );

    return NextResponse.json({ invites: processedInvites }, { status: 200 });
  } catch (error) {
    console.error('GET invites error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}