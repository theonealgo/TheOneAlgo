'use client';

import React, { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tvUser, setTvUser] = useState('');
  const [plan, setPlan] = useState('');
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn('credentials', {
      redirect: true,
      email,
      password,
      tradingViewUsername: tvUser,
      plan,
      billing,
      callbackUrl: '/api/stripe/create-checkout',
    });
  }

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <input
        type="text"
        placeholder="TradingView Username"
        required
        value={tvUser}
        onChange={(e) => setTvUser(e.currentTarget.value)}
        className="w-full px-4 py-3 bg-gray-800 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        className="w-full px-4 py-3 bg-gray-800 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        className="w-full px-4 py-3 bg-gray-800 rounded"
      />
      {/* You can swap these for your real plan/billing selects */}
      <input
        type="text"
        placeholder="Plan key"
        required
        value={plan}
        onChange={(e) => setPlan(e.currentTarget.value)}
        className="w-full px-4 py-3 bg-gray-800 rounded"
      />
      <select
        value={billing}
        onChange={(e) => setBilling(e.currentTarget.value as 'monthly' | 'yearly')}
        className="w-full px-4 py-3 bg-gray-800 rounded"
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button
        type="submit"
        className="w-full bg-teal-500 py-3 rounded-lg font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}
