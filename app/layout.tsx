// app/layout.tsx
import "./styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import 'react-medium-image-zoom/dist/styles.css';
import './zoom-overrides.css';
import Providers from "./providers";                   
import { getServerSession } from "next-auth/next";   // ← IMPORT MUST BE exactly from "next-auth/next"
import { authOptions } from "@/lib/auth";             

export const metadata = {
  title: "The One Algo",
  description: "Built with TradingView® technology",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="bg-black">
      <body className="antialiased text-white flex flex-col min-h-screen bg-black">
        <Providers session={session}>
          <Header />
          <main className="flex-grow pt-16 bg-black">
            {children}
          </main>
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
