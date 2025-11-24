import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlist } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, failedCode } = body;

    // Validate email is provided
    if (!email) {
      return NextResponse.json(
        { 
          error: 'Email is required',
          code: 'MISSING_EMAIL'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Normalize email to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists in waitlist
    const existing = await db.select()
      .from(waitlist)
      .where(eq(waitlist.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Email already on waitlist'
        },
        { status: 200 }
      );
    }

    // Insert new waitlist entry
    const newEntry = await db.insert(waitlist)
      .values({
        id: crypto.randomUUID(),
        email: normalizedEmail,
        failedCode: failedCode ? failedCode.trim() : null,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: 'Added to waitlist successfully'
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('POST /api/waitlist error:', error);

    // Handle unique constraint violation (email already exists)
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        {
          success: true,
          message: 'Email already on waitlist'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}