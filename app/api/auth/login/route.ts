import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Demo OTP — replace with real OTP verification (e.g. Twilio Verify, Resend OTP)
const DEMO_OTP = '123456'

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 })
    }

    // TODO: replace with real OTP check (store hashed OTP + expiry in DB)
    if (otp !== DEMO_OTP) {
      return NextResponse.json({ success: false, error: 'Invalid or expired code' }, { status: 401 })
    }

    // TODO: look up or create user in DB, get real user ID
    const sessionPayload = JSON.stringify({ email, userId: 'mock-user-id', iat: Date.now() })
    const encoded = Buffer.from(sessionPayload).toString('base64')

    const cookieStore = await cookies()
    cookieStore.set('session', encoded, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
