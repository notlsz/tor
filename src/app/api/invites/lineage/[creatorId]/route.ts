import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invites, creators } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  try {
    const { creatorId } = params;

    // Validate creatorId is provided
    if (!creatorId || creatorId.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Creator ID is required',
          code: 'MISSING_CREATOR_ID' 
        },
        { status: 400 }
      );
    }

    // Check if creator exists
    const creatorExists = await db
      .select({ id: creators.id })
      .from(creators)
      .where(eq(creators.id, creatorId))
      .limit(1);

    if (creatorExists.length === 0) {
      return NextResponse.json(
        { 
          error: 'Creator not found',
          code: 'CREATOR_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Find the invite that this creator used (their inviter)
    const usedInvite = await db
      .select({
        inviterId: invites.inviterId,
        inviterDisplayName: creators.displayName,
        inviterAvatarUrl: creators.avatarUrl,
      })
      .from(invites)
      .leftJoin(creators, eq(invites.inviterId, creators.id))
      .where(eq(invites.usedBy, creatorId))
      .limit(1);

    // Construct inviter object
    const inviter = usedInvite.length > 0 && usedInvite[0].inviterId
      ? {
          id: usedInvite[0].inviterId,
          displayName: usedInvite[0].inviterDisplayName,
          avatarUrl: usedInvite[0].inviterAvatarUrl,
        }
      : null;

    // Find all invites this creator sent
    const sentInvites = await db
      .select({
        inviteCode: invites.code,
        usedBy: invites.usedBy,
        usedAt: invites.usedAt,
        inviteeDisplayName: creators.displayName,
        inviteeAvatarUrl: creators.avatarUrl,
      })
      .from(invites)
      .leftJoin(creators, eq(invites.usedBy, creators.id))
      .where(eq(invites.inviterId, creatorId));

    // Construct invitees array (only include used invites)
    const invitees = sentInvites
      .filter((invite) => invite.usedBy !== null)
      .map((invite) => ({
        id: invite.usedBy!,
        displayName: invite.inviteeDisplayName,
        avatarUrl: invite.inviteeAvatarUrl,
        inviteCode: invite.inviteCode,
        usedAt: invite.usedAt,
      }));

    return NextResponse.json({
      inviter,
      invitees,
    });
  } catch (error) {
    console.error('GET /api/invites/lineage/[creatorId] error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}