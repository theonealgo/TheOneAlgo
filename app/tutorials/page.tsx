'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function TutorialsPage() {
  return (
    <div
      className="relative min-h-screen font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bground.jpg')" }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-left px-4 max-w-6xl pt-24">
          <div className="flex items-center mb-12">
            <Link href="/">
              <Image
                src="/images/theonelogo.png"
                alt="The One Logo"
                width={184}
                height={184}
                className="mr-8 cursor-pointer hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl font-bold gradient-text text-white"
            >
              Tutorials &amp; Setup
              <br />
              <span className="text-white">Getting Started</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Tutorial Steps */}
      <section className="py-20 px-4 md:px-0">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Step 1 */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">1. Access the Indicator</h2>
            <p className="text-gray-200">
              To begin, ensure you have access to <strong>The One</strong> indicator on TradingView. 
              If you haven't received an invitation, please contact support to request access.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">2. Add the Indicator to Your Chart</h2>
            <p className="text-gray-200">
              Once access is granted, navigate to the TradingView chart, click on "Indicators," 
              and search for <strong>The One</strong>. Click to add it to your chart.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">3. Understand the Indicator Components</h2>
            <p className="text-gray-200">
              Familiarize yourself with the various components of <strong>The One</strong> indicator, 
              including entry signals, stop-loss levels, and take-profit targets. 
              Refer to the documentation for detailed explanations.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">4. Apply the Recommended Settings</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 py-10">
              {/* Settings Image 1 */}
              <div className="max-w-md text-center">
                <Zoom zoomMargin={40}>
                  <div className="relative h-[600px] w-full">
                    <Image
                      src="/images/theonestockssettings.png"
                      alt="The One Stocks Settings"
                      fill
                      quality={100}
                      priority
                      className="rounded-xl object-contain hover:shadow-xl transition-shadow"
                      sizes="(max-width:768px)100vw,(max-width:1200px)50vw,800px"
                    />
                  </div>
                </Zoom>
                <p className="mt-4 text-gray-200">
                  These are the recommended settings for <strong>The One Stocks</strong> indicator. 
                  Apply the settings exactly as shown for optimal performance on U.S. stocks.
                </p>
              </div>
              {/* Settings Image 2 */}
              <div className="max-w-md text-center">
                <Zoom zoomMargin={40}>
                  <div className="relative h-[600px] w-full">
                    <Image
                      src="/images/theoneelitesettings.png"
                      alt="The One Elite Settings"
                      fill
                      quality={100}
                      priority
                      className="rounded-xl object-contain hover:shadow-xl transition-shadow"
                      sizes="(max-width:768px)100vw,(max-width:1200px)50vw,800px"
                    />
                  </div>
                </Zoom>
                <p className="mt-4 text-gray-200">
                  These settings are for <strong>The One Elite</strong> indicator—fine-tuned for major pairs.
                </p>
              </div>
            </div>
            <p className="text-center italic mt-4 text-gray-400">
              Note: Click and hold to zoom. Images are in 4K resolution for maximum clarity.
            </p>
          </div>

          {/* Step 5…7 (unchanged) */}
          {/* … copy your remaining steps here, just adjust text-gray-300 to text-gray-200 if you prefer a bit more contrast */}
        </div>
      </section>

      {/* Custom Zoom Styles */}
      <style jsx global>{`
        .zoom-overlay {
          background: rgba(0, 0, 0, 0.95) !important;
        }
        .zoom-image {
          cursor: zoom-out !important;
          image-rendering: crisp-edges !important;
        }
      `}</style>
    </div>
  );
}
