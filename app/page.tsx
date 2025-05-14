'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'react-medium-image-zoom/dist/styles.css';
import './zoom-overrides.css';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { FAQAccordion } from '@/components/FAQAccordion';
const Zoom = dynamic(() => import('react-medium-image-zoom'), { ssr: false });

/* headline text for the typewriter */
const fullText = 'One Signal.\nZero Noise.';

export default function Home() {
  /* — Typewriter — */
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      setTyped(fullText.slice(0, ++idx));
      if (idx >= fullText.length) clearInterval(iv);
    }, 100);
    return () => clearInterval(iv);
  }, []);

  /* — Back-to-top visibility — */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPerf = () =>
    document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' });

  /* cards under PERFORMANCE */
  const performanceItems = [
    {
      src: '/images/spydaily10xprofit.png',
      alt: 'SPY swing trading signals, 10x profit win rate',
      title: 'The One Elite Daily Chart SPY Strategy| 10x Profit Factor on SPY Daily',
      desc: 'Real-time SPY swing-trade alerts powered by The One Stocks algorithm—98% historical win rate for precise short-term entries & exits.',
    },
    {
      src: '/images/theoneelite4h98.png',
      alt: '4-hour SPY swing strategy, 98% win rate',
      title: 'The One Elite 4-Hour SPY Strategy | 98% Win Rate',
      desc: 'Harness 4-hour SPY momentum signals to capture market swings with 98% accuracy—rigorously back-tested on S&P 500 data.',
    },
    {
      src: '/images/theonestocks9897.png',
      alt: 'Multi-index strategy, 97% win rate',
      title: 'Multi-Index Analyzer | 97% Win Rate on SPY & Nasdaq',
      desc: 'One unified algorithm across SPY & Nasdaq, optimized for 1–4 hr timeframes—achieves a 97% win rate on major indices.',
    },
    {
      src: '/images/theoneelitegbpusd1097.png',
      alt: 'GBP/USD 1-hr Forex strategy, 97% win rate',
      title: 'Forex Signal for GBP/USD | 97% Win Rate on 1-Hour Chart',
      desc: 'Precision GBP/USD entry/exit signals on the 1-hour timeframe, delivering a 97% win rate for high-confidence, data-driven FX trades.',
    },
  ];

  return (
    <div className="relative">
      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section
        className="relative flex items-center justify-start px-4 pt-16 pb-32 bg-cover bg-center min-h-screen"
        style={{ backgroundImage: "url('/images/bground.jpg')" }}
      >
        {/* translucent colour-wash over the photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/30 via-black/55 to-purple-800/30 backdrop-blur-[2px]" />

        {/* hero content */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-16 max-w-6xl">
          {/* typewriter headline with teal “Zero” */}
          {typed.split('\n').map((line, i) => (
            <h1
              key={i}
              className="text-5xl md:text-7xl font-bold leading-tight text-left text-white"
            >
              {i === 1 && line.startsWith('Zero') ? (
                <>
                  <span className="text-[#2dd4bf]">Zero</span>
                  {line.slice(4)}
                </>
              ) : (
                line
              )}
            </h1>
          ))}

          {/* 2️⃣  bigger sub-headline */}
          <p className="mt-6 text-2xl md:text-3xl text-gray-200 max-w-3xl">
            Just signals that work, backed by real data&nbsp;in&nbsp;real&nbsp;time.
          </p>

          {/* CTA */}
          <div className="mt-10">
  {/* button now uses the exact header gradient */}
  <Link
    href="/auth?screen_hint=signup"
    className="
      inline-block px-8 py-3 rounded-full text-sm font-semibold text-white shadow
      bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500
      hover:brightness-110
    "
  >
    Get&nbsp;Started&nbsp;For&nbsp;Free
  </Link>

  {/* tagline directly under the button */}
  <p className="mt-2 ml-2 text-sm text-gray-200">
    No credit card required
  </p>
</div>
        </div>

        {/* scroll arrow */}
        <div className="relative z-10 pb-8 flex justify-center w-full">
          <button
            onClick={scrollToPerf}
            className="text-4xl animate-bounce text-gray-300"
            aria-label="Scroll to performance section"
          >
            ↓
          </button>
        </div>
      </section>

      {/* ─────────────────────  PERFORMANCE  ───────────────────── */}
      <section id="performance" className="bg-black py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto space-y-24">
          {performanceItems.map((item, i) => (
            <div key={i} className="space-y-8 group">
              <Zoom zoomMargin={40}>
                <div className="relative h-[600px] w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    quality={100}
                    priority
                    className="rounded-xl object-contain hover:shadow-xl transition-shadow"
                    sizes="(max-width:768px)100vw,(max-width:1200px)50vw,800px"
                  />
                </div>
              </Zoom>
              <div className="px-4 space-y-4">
                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────  LIVE STATS  ───────────────────── */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-24 px-4 md:px-12">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-5xl font-bold text-white">
            Real Results. Real&nbsp;Time.
          </h2>
          <p className="text-2xl text-gray-300">
            Our strategies are engineered for performance. See it live below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="p-8 rounded-xl bg-gray-800 shadow-lg">
              <h3 className="text-4xl font-bold text-green-400">98%</h3>
              <p className="mt-2 text-lg">Win&nbsp;Rate</p>
            </div>
            <div className="p-8 rounded-xl bg-gray-800 shadow-lg">
              <h3 className="text-4xl font-bold text-green-400">4.36</h3>
              <p className="mt-2 text-lg">Profit&nbsp;Factor</p>
            </div>
            <div className="p-8 rounded-xl bg-gray-800 shadow-lg">
              <h3 className="text-4xl font-bold text-green-400">30&nbsp;Days</h3>
              <p className="mt-2 text-lg">Free&nbsp;Trial</p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              href="/auth?screen_hint=signup"
              className="
                inline-block text-black font-semibold px-10 py-4 rounded-full transition
                bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-300 hover:brightness-110
              "
            >
              Start&nbsp;Winning&nbsp;Today
            </Link>
          </div>
        </div>
      </section>
      
      {/* ────────────────────────  VIDEO  ─────────────────────── */}
      <section className="relative bg-black py-24 px-4 md:px-12 overflow-hidden">
        <video
          src="/images/videos/market-chart.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto rounded-2xl shadow-xl"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trade with Confidence. Powered by Data.
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl">
            Harness the power of our proven trading strategies and make informed,
            data-driven decisions in real time.
          </p>
        </div>
      </section>
{/* …previous sections… */}

<FAQAccordion />

{/* …following sections… */}
      {/* ───────────────────  BACK TO TOP  ───────────────────── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="
            fixed bottom-8 right-8 p-3 rounded-full text-white shadow-lg transition
            bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-300 hover:brightness-110
          "
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}