/* components/Header.tsx */
'use client';

import Link      from 'next/link';
import Image     from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User as UserIcon, ChevronDown } from 'lucide-react';

/* ─────────── top-nav items ─────────── */
const menus = [
  {
    key: 'product',
    label: 'Product',
    items: [
      { href: '/pricing',  label: 'Pricing'  },
      { href: '/features', label: 'Features' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    items: [
      { href: '/documentation', label: 'Documentation' },
      { href: '/tutorials',     label: 'Tutorials'     },
    ],
  },
  {
    key: 'company',
    label: 'Company',
    items: [
      { href: '/about',   label: 'About'   },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export default function Header() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropRef          = useRef<HTMLDivElement>(null);

  /* close the profile dropdown when clicking outside */
  useEffect(() => {
    const close = (e: MouseEvent) =>
      dropRef.current && !dropRef.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        flex items-center justify-between
        px-6 py-3
        text-white
        /* translucent veil so links stay readable over bright areas */
        bg-black/25 backdrop-blur-sm
      "
    >
      {/* ───── Logo ───── */}
      <Link href="/" className="flex items-center">
        <Image
          src="/images/theonelogo.png"
          alt="The One Algo logo"
          width={128}
          height={128}
          className="h-10 w-auto"
          priority
        />
      </Link>

      {/* ───── Nav links ───── */}
      <nav className="flex items-center gap-6 text-sm font-medium tracking-wide">
        {menus.map(({ key, label, items }) => (
          <div key={key} className="relative group">
            <button className="hover:text-teal-300 transition-colors">{label}</button>

            {/* ↓ dropdown */}
            <div
              className="
                absolute left-0 top-full w-44 bg-gray-900/90 rounded-lg shadow-lg py-2
                opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto
                transition-opacity duration-150
              "
            >
              {items.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-4 py-2 hover:bg-gray-800/60 whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* ───── CTA ───── */}
        <Link
          href="/pricing"
          className="
            ml-4 rounded-full px-4 py-2 text-black font-semibold shadow
            bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500
            hover:brightness-110 transition
            whitespace-nowrap
          "
        >
          Get Started
        </Link>

        {/* ───── User icon / auth menu ───── */}
        <div ref={dropRef} className="relative">
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center p-2 rounded-full bg-gray-900/70 hover:bg-gray-800/80"
          >
            <UserIcon className="h-5 w-5" />
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900/90 shadow-lg py-1">
              {/* always show Help */}
              <Link href="/help" className="block px-4 py-2 text-sm hover:bg-gray-800/60">
                Help
              </Link>

              {status === 'unauthenticated' && (
                <button
                  onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800/60"
                >
                  Sign In
                </button>
              )}

              {status === 'authenticated' && session?.user && (
                <>
                  <span className="block px-4 py-2 text-sm text-gray-300">
                    {session.user.name ?? session.user.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800/60"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
