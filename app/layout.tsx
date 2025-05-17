// app/layout.tsx
import './styles/globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

/** <Providers> — uncomment if you were using next-auth or any context
  import Providers from './providers';
*/

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
      {/*  🔹 background image is applied on <body> so it spans every page */}
      <body
        className="
          antialiased text-white min-h-screen
          bg-[url('/images/bground.jpg')] bg-cover bg-fixed bg-center
        "
      >
        {/*  Header stays pinned to the top */}
        <Header />

        {/*  Main content */}
        <main className="pt-16">{/* 16 px = Header height offset */}
          {/*  If using Providers, wrap <main> with <Providers> */}
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
