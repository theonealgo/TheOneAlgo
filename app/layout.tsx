// app/layout.tsx  ← replace entire file
import './styles/globals.css';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Providers from './providers';
import Footer from '@/components/Footer';

// HeaderClient is already a client component
import HeaderClient from '@/components/HeaderClient';

export const metadata = {
  title: 'The One Algo',
  description: 'Built with TradingView® technology',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // get the session on the server once
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="bg-black">
      <Providers session={session}>
        <body className="antialiased text-white min-h-screen flex flex-col bg-black">
         {/* ★ Global background image */}
        <div
          className="fixed inset-0 -z-50 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bground.jpg')",
            backgroundAttachment: 'fixed',   // nice parallax feel; drop if you don’t want it
          }}
        />  
          <HeaderClient />        {/* runs only in the browser */}
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
