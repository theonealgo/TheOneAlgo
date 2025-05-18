'use client';

import dynamic from 'next/dynamic';

/**
 * Loads the real <Header/> only in the browser so `useSession`
 * never runs during the server build.
 */
const Header = dynamic(() => import('@/components/Header'), { ssr: false });

export default function HeaderClient() {
  return <Header />;
}
