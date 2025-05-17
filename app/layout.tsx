// app/layout.tsx   ❶ add this line
'use client';
import './styles/globals.css';
import dynamic from 'next/dynamic';

// ⬇️  load Header only in the browser so `useSession` never runs on the server
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
// footer is fine to SSR
import Footer from '@/components/Footer';

export const metadata = {
  title: 'The One Algo',
  description: 'Built with TradingView® technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className="antialiased text-white min-h-screen flex flex-col">
        {/* header stays on every page, but only renders in the browser */}
        <Header />

        {/* page content */}
        <main className="flex-1">{children}</main>

        {/* global footer */}
        <Footer />
      </body>
    </html>
  );
}
