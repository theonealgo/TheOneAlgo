import './styles/globals.css';

import HeaderClient from '@/components/HeaderClient';
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
        {/* header runs only in the browser */}
        <HeaderClient />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
