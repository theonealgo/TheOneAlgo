// app/not-found.tsx   ← create this file
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>

      <p className="mb-8 text-gray-400">
        Sorry, we couldn’t find that page.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500 hover:brightness-110"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
