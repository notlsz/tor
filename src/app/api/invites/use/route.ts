import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invites, creators } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, userId } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Invite code is required' },
        { status: 400 }
      );
    }

    // Find the invite
    const invite = await db.select()
      .from(invites)
      .where(eq(invites.code, code))
      .limit(1);

    if (invite.length === 0) {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 404 }
      );
    }

    const inviteRecord = invite[0];

    // Check if already used
    if (inviteRecord.usedBy) {
      return NextResponse.json(
        { error: 'Invite code already used' },
        { status: 400 }
      );
    }

    // Check if expired
    const now = new Date();
    const expiresAt = new Date(inviteRecord.expiresAt);
    if (expiresAt <= now) {
      return NextResponse.json(
        { error: 'Invite code expired' },
        { status: 400 }
      );
    }

    // Mark invite as used
    await db.update(invites)
      .set({
        usedBy: userId || user.id,
        usedAt: new Date().toISOString(),
      })
      .where(eq(invites.id, inviteRecord.id));

    // Update the creator's inviter_id if not already set
    await db.update(creators)
      .set({
        inviterId: inviteRecord.inviterId,
      })
      .where(and(
        eq(creators.id, userId || user.id),
        eq(creators.inviterId, null as any)
      ));

    return NextResponse.json(
      { success: true, message: 'Invite code marked as used' },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/invites/use error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}