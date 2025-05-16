'use client';

import React, { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/dashboard',
    });
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-lg">
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 py-3 rounded-lg font-semibold text-white hover:brightness-110 transition"
      >
        Log In
      </button>
    </form>
  );
}
