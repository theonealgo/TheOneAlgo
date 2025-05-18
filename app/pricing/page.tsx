// app/pricing/page.tsx
'use client';

import { useState } from 'react';
import Image       from 'next/image';
import Link        from 'next/link';

export default function PricingPage() {
  /* ───── local state ───── */
  const [billingCycle, setBillingCycle] =
    useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      title: 'The One: Stock Swing Analyzer [TheoneAlgo]',
      price: billingCycle === 'monthly' ? 49.99 : 499.9,
      description:
        'Swing-trade strategy for SPY & NASDAQ with 90%+ win rate and high profit factor.',
      features: [
        'Best for 1 hr – Daily time-frames',
        'SPY & NASDAQ focus',
        '2.2 + profit factor',
        'Real-time entry / exit alerts',
      ],
      planKey: 'the_one_stock',
    },
    {
      title: 'The One Elite – Dynamic Liquidity Strategy',
      price: billingCycle === 'monthly' ? 59.99 : 599.9,
      description:
        'Intraday strategy optimized for GBP/USD & SPY with 97% win rate.',
      features: [
        'Best for 15 min – 4 hr time-frames',
        'GBP/USD + SPY focus',
        '2.9 + profit factor',
        'Real-time entry / exit alerts',
      ],
      planKey: 'the_one_elite',
    },
    {
      title: 'The One Premium (both indicators)',
      price: billingCycle === 'monthly' ? 99.99 : 999.9,
      description:
        'All strategies included — Stocks and Elite — full trading coverage.',
      features: [
        'Stocks + Elite strategies access',
        'All time-frames supported',
        'Advanced risk-management tools',
      ],
      planKey: 'the_one_premium',
    },
  ];

  /* ───── render ───── */
  return (
    {/* ★ pushes entire page below fixed header */}
    <div className="pt-24 bg-black text-white min-h-screen font-sans overflow-x-hidden">

      {/* billing toggle */}
      <div className="flex justify-center mt-12 mb-6">
        <div className="bg-gray-900 p-1 rounded-full flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full transition ${
              billingCycle === 'monthly'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full transition ${
              billingCycle === 'yearly'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400'
            }`}
          >
            Yearly&nbsp;(Save&nbsp;20%)
          </button>
        </div>
      </div>

      {/* pricing cards */}
      <section className="py-16 px-4 md:px-12">
        <div
          className="max-w-6xl mx-auto grid gap-8
                     grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center"
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.planKey}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800
                         hover:border-teal-400 transition-all flex flex-col
                         w-full max-w-sm"
            >
              {/* top ────────────── */}
              <div>
                <h3 className="text-2xl font-bold mb-2 text-center">
                  {plan.title}
                </h3>
                <p className="text-gray-400 mb-6 text-center">
                  {plan.description}
                </p>

                <div className="mb-6 text-center">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/ {billingCycle}</span>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start">
                      <span className="text-teal-400 mr-2 mt-1">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA ────────────── */}
              <Link
                href={`/auth?screen_hint=signup&plan=${plan.planKey}&billing=${billingCycle}`}
                className="block w-full bg-gradient-to-r
                           from-blue-500 to-teal-500 text-center text-white
                           px-6 py-3 rounded-md font-semibold hover:opacity-90"
              >
                Try&nbsp;Free&nbsp;for&nbsp;30&nbsp;Days
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* payment notice */}
      <div className="bg-gray-900 py-12 px-4 md:px-12 text-center">
        <h3 className="text-2xl font-semibold mb-4">Safe & Secure Checkout</h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6 text-sm">
          Cancel anytime in one click from within your account. After signup,
          access is instant. Trade at your own risk.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/paymentmethod.svg"
            alt="Payment Methods"
            width={240}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
