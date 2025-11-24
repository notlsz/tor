import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invites } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    // Validate code format
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Code is required', code: 'MISSING_CODE' },
        { status: 400 }
      );
    }

    // Validate code format (must be 6 digits)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid code format, must be 6 digits', code: 'INVALID_FORMAT' },
        { status: 400 }
      );
    }

    // Query invites table for matching code
    const invite = await db.select()
      .from(invites)
      .where(eq(invites.code, code))
      .limit(1);

    // Check if code exists
    if (invite.length === 0) {
      return NextResponse.json({
        valid: false,
        reason: 'code_not_found'
      }, { status: 200 });
    }

    const inviteRecord = invite[0];

    // Check if code has been used
    if (inviteRecord.usedBy !== null) {
      return NextResponse.json({
        valid: false,
        reason: 'already_used'
      }, { status: 200 });
    }

    // Check if code has expired
    const now = new Date();
    const expiresAt = new Date(inviteRecord.expiresAt);
    
    if (expiresAt <= now) {
      return NextResponse.json({
        valid: false,
        reason: 'expired'
      }, { status: 200 });
    }

    // Code is valid
    return NextResponse.json({
      valid: true,
      inviteId: inviteRecord.id,
      inviterId: inviteRecord.inviterId
    }, { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}