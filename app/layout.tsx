import './styles/globals.css';

import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Providers from './providers';
import Footer from '@/components/Footer';

// ——— client-only Header, so it never calls useSession during the build ———
const HeaderClient = dynamic(() => import('@/components/Header'), {
  ssr: false,
});

export const metadata = {
  title: 'The One Algo',
  description: 'Built with TradingView® technology',
};

// This RootLayout is a Server Component, so we can fetch the session here
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Grab the current session on the server
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="bg-black">
      {/* <Providers/> makes the session available to all client components */}
      <Providers session={session}>
        <body className="antialiased text-white min-h-screen flex flex-col">
          <HeaderClient />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
