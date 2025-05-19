import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Help Center – The One Algo',
};

export default function HelpPage() {
  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto bg-white text-black">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <nav className="mb-8">
        <ul className="flex flex-col space-y-2">
          <li>
            <Link href="/#faqs" className="text-teal-500 hover:underline">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/tutorials" className="text-teal-500 hover:underline">
              Tutorials
            </Link>
          </li>
          <li>
            <Link href="/documents" className="text-teal-500 hover:underline">
              Documents
            </Link>
          </li>
          <li>
            <Link href="#billing" className="text-teal-500 hover:underline">
              Billing Help
            </Link>
          </li>
        </ul>
      </nav>

      {/* Placeholder for existing FAQs */}
      <section id="faqs" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <p>Please refer to the FAQ section on the <Link href="/">home page</Link> for answers to common questions.</p>
      </section>

      {/* Tutorials link only redirects */}
      <section id="tutorials" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tutorials</h2>
        <p>Visit our <Link href="/tutorials" className="text-teal-500 hover:underline">Tutorials</Link> page for step-by-step guides on using The One Algo.</p>
      </section>

      {/* Documents link only redirects */}
      <section id="documents" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Documents</h2>
        <p>Access product and policy documents on our <Link href="/documents" className="text-teal-500 hover:underline">Documents</Link> page.</p>
      </section>

      {/* Billing Help Content */}
      <section id="billing" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Billing Help</h2>
        <p className="mb-4">
          For all billing questions, email our support team at{' '}
          <a href="mailto:theonealgo@gmail.com" className="text-teal-500 hover:underline">
            theonealgo@gmail.com
          </a>.
        </p>
        <p>
          Important: Indicators are shared via link through TradingView. When signing up,
          please ensure you provide your TradingView username so we can share access correctly.
        </p>
      </section>
    </div>
  );
}
