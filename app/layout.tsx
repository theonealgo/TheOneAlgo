// app/layout.tsx
import './styles/globals.css';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import Providers     from './providers';
import HeaderClient  from '@/components/HeaderClient';   // client-only header
import Footer        from '@/components/Footer';

export const metadata = {
  title: 'The One Algo',
  description: 'Built with TradingView® technology',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="antialiased text-white min-h-screen flex flex-col">

        {/* ★ site-wide background image */}
        <div
          className="fixed inset-0 -z-50 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bground.jpg')",
            backgroundAttachment: 'fixed', // parallax feel – remove if undesired
          }}
        />

        {/* optional translucent wash over the photo
        <div className="fixed inset-0 -z-40 bg-gradient-to-br from-cyan-800/30 via-black/55 to-purple-800/30" />
        */}

        <Providers session={session}>
          <HeaderClient />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
