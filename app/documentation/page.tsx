'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function DocumentationPage() {
  return (
    <div className="relative min-h-screen text-white font-sans">
      {/* ─── HERO (no bg-image here – we’re using the global one) ─── */}
      <section className="relative flex items-center justify-center min-h-screen">
        <div className="relative z-10 text-left px-4 max-w-6xl">
          <div className="flex items-center mb-12">
            <Link href="/">
              <Image
                src="/images/theonelogo.png"
                alt="The One Logo"
                width={184}
                height={184}
                className="mr-8 cursor-pointer"
                priority
              />
            </Link>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl font-bold gradient-text"
            >
              Trade Documentation
              <br />
              <span className="text-white">Strategy Breakdowns</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ─── DOCS CONTENT ─── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Paper Trading */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Paper Trading Results</h2>
            <Zoom>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-800">
                <Image
                  src="/images/papertrading.png"
                  alt="Paper Trading Results"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </Zoom>
            <div className="p-6 rounded-xl text-white bg-gray-800/70">
              <p>
                The last five trades displayed above were executed using <strong>The One Forex Indicator</strong>, resulting in five consecutive wins...
              </p>
            </div>
          </div>

          {/* SPY 15-Minute */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">SPY 15-Minute Entries</h2>
            <Zoom>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-800">
                <Image
                  src="/images/theonestocks1588.png"
                  alt="SPY 15-Min Chart"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </Zoom>
            <div className="p-6 rounded-xl text-white bg-gray-800/70">
              <p>
                This SPY 15-minute chart highlights 84 trades executed using <strong>The One Stock Strategy</strong>. Out of those, 75 were winners...
              </p>
            </div>
          </div>

          {/* Forex Scalping */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Forex 5 &amp; 10-Minute Scalps</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                'theoneelitegbpusd1097.png',
                'theoneelite5mgbpusd95.png',
              ].map((img, i) => (
                <Zoom key={i}>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-800">
                    <Image
                      src={`/images/${img}`}
                      alt={`Forex ${i === 0 ? '5-Min' : '10-Min'} Chart`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </Zoom>
              ))}
            </div>
            <div className="p-6 rounded-xl text-white bg-gray-800/70">
              <p>
                On the right, we’ve got the <strong>GBPUSD 5-minute strategy</strong> running 43 trades with a phenomenal 41 wins and only 2 losses...
              </p>
            </div>
          </div>

          {/* Weekly Performance */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">SPY Weekly Analysis</h2>
            <Zoom>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-800">
                <Image
                  src="/images/spyweekly.png"
                  alt="SPY Weekly Chart"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </Zoom>
            <div className="p-6 rounded-xl text-white bg-gray-800/70">
              <p>
                The <strong>SPY Weekly chart</strong> using <strong>The One Strategy</strong> is nothing short of remarkable — 19 winning trades, 0 losses...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
