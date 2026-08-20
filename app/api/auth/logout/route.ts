import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );

  // Expire the session cookie immediately
  response.cookies.set('site_auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });

  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  return response;
}
