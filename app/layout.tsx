// app/layout.tsx
import "./styles/globals.css";

export const metadata = {
  title: "The One Algo",
  description: "Built with TradingView® technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className="antialiased text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
