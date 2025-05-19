/* components/Header.tsx */
'use client';

import Link      from 'next/link';
import Image     from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User as UserIcon, ChevronDown } from 'lucide-react';

/* menu data ---------------------------------------------------------- */
const menus = [
  {
    key: 'product',
    label: 'Product',
    items: [
      { href: '/pricing',   label: 'Pricing' },
      { href: '/features',  label: 'Features' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    items: [
      { href: '/documentation', label: 'Documentation' },
      { href: '/tutorials',     label: 'Tutorials' },
    ],
  },
  {
    key: 'company',
    label: 'Company',
    items: [
      { href: '/about',   label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

/* header component --------------------------------------------------- */
export default function Header() {
  const { data: session, status } = useSession();

  const [open, setOpen]       = useState(false);
  const dropdownRef           = useRef<HTMLDivElement>(null);

  /* close user-menu on outside click */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50
                 backdrop-blur-[2px]              /* frosted-glass effect */
                 text-white px-6 py-4 flex items-center justify-between"
    >
      {/* logo ---------------------------------------------------------- */}
      <Link href="/" className="flex items-center">
        <Image
          src="/images/theonelogo.png"
          alt="The One Algo logo"
          width={128}
          height={128}
          className="h-10 w-auto"
        />
      </Link>

      {/* nav ----------------------------------------------------------- */}
      <nav className="flex items-center gap-6 text-white">
        {menus.map(({ key, label, items }) => (
          <div key={key} className="relative group">
            <button className="
  bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500
  bg-clip-text text-transparent font-semibold
  transition
">
  {label}
</button>

            {/* dropdown */}
            <div className="absolute left-0 top-full w-40 bg-gray-900/90 rounded shadow-lg py-2 z-50
                            opacity-0 pointer-events-none
                            group-hover:opacity-100 group-hover:pointer-events-auto
                            transition-opacity duration-150">
              {items.map(({ href, label }) => (
               <Link
  key={href}
  href={href}
  className="block px-4 py-2 rounded-md font-semibold text-black bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 hover:brightness-110 transition"
>
  {label}
</Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA button -------------------------------------------------- */}
        <Link
          href="/pricing"
          className="ml-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500
                     hover:brightness-110 text-black px-4 py-2 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>

        {/* user menu --------------------------------------------------- */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70"
          >
            <UserIcon className="h-5 w-5" />
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900/90 rounded shadow-lg py-1">
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
                  <span className="block px-4 py-2 text-sm">
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
