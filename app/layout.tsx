/* app/layout.tsx */
import './styles/globals.css';

import { getServerSession } from 'next-auth';
import { authOptions }      from '@/lib/auth';

import Providers    from './providers';
import HeaderClient from '@/components/HeaderClient';
import Footer       from '@/components/Footer';

export const metadata = {
  title:       'The One Algo',
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
      <body className="m-0 antialiased text-white min-h-screen flex flex-col">

        {/* ——— background photo (covers the whole site) ——— */}
        <div
          className="fixed inset-0 -z-50 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bground.jpg')",
            backgroundAttachment: 'fixed',   // parallax feel – remove if undesired
          }}
        />

        <Providers session={session}>
          {/* Header sits on top and is fully transparent */}
          <HeaderClient />

          {/* add top-padding so page content clears the fixed header */}
          <main className="flex-1 pt-24">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
