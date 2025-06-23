import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import nodemailer from 'nodemailer'; // <-- ADD THIS LINE

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { username } = await req.json();
  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 });
  }

  // Update in Supabase as before
 const { error } = await supabase
  .from('profiles')
  .update({ tradingViewUsername: username })
  .eq('email', session.user.email);

 if (error) {
  console.error('DB error:', error);
  return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 });
}
if (!session?.user?.id) {
  console.error('Unauthorized: session', session);
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

if (!username) {
  console.error('Missing username in body');
  return NextResponse.json({ error: 'Missing username' }, { status: 400 });
}
  // --- BEGIN EMAIL LOGIC ---
  try {
    const userEmail = session.user.email ?? "unknown";
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'theonealgo@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD, // Must be set in your env!
      },
    });

    await transporter.sendMail({
      from: '"The One Algo" <theonealgo@gmail.com>',
      to: 'theonealgo@gmail.com',
      subject: 'TradingView Username Submitted',
      text: `User submitted TradingView Username:\nEmail: ${userEmail}\nUsername: ${username}`,
    });
  } catch (err) {
    console.error('Admin email failed:', err);
    // Don't block the user if email fails.
  }
  // --- END EMAIL LOGIC ---

  return NextResponse.json({ success: true });
}
