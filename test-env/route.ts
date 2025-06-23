import { NextResponse } from 'next/server';

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const gmailAppPasswordExists = !!process.env.GMAIL_APP_PASSWORD;
  return NextResponse.json({
    stripeKeyExists: !!stripeKey,
    publicUrl,
    gmailAppPasswordExists,
  });
}
