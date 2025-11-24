import { NextRequest, NextResponse } from "next/server";

// For now, we'll use a simple in-memory store for demo purposes
// In production, this should be stored in a database
const VALID_INVITE_CODES = new Set([
  "123456",
  "654321",
  "111111",
  "000000",
]);

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    // Validate code format
    if (!code || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { valid: false, message: "Invalid code format" },
        { status: 400 }
      );
    }

    // Check if code is valid
    const isValid = VALID_INVITE_CODES.has(code);

    if (isValid) {
      // In production, you would:
      // 1. Mark the code as used
      // 2. Associate it with the user
      // 3. Update user permissions
      return NextResponse.json(
        { valid: true, message: "Invite code verified" },
        { status: 200 }
      );
    } else {
      // In production, you would:
      // 1. Add user to waitlist in database
      // 2. Send waitlist confirmation email
      return NextResponse.json(
        { valid: false, message: "Invalid invite code - added to waitlist" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error verifying invite code:", error);
    return NextResponse.json(
      { valid: false, message: "Server error" },
      { status: 500 }
    );
  }
}
