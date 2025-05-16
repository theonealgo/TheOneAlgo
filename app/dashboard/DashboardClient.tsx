"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardClient() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<{
    plan_key: string;
    billing: string;
    tradingViewUsername: string | null;
  } | null>(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  // fetch profile once we’re authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      supabase
        .from("profiles")
        .select(`plan_key, billing, tradingViewUsername`)
        .eq("id", session.user.id)
        .single()
        .then(({ data, error }) => {
          if (data && !error) {
            setProfile({
              plan_key: data.plan_key,
              billing: data.billing,
              tradingViewUsername: data.tradingViewUsername,
            });
          }
        });
    }
  }, [status, session?.user?.id]);

  if (status === "loading") {
    return <p className="p-8 text-center">Loading…</p>;
  }
  if (!session) {
    return (
      <p className="p-8 text-center">
        Please{" "}
        <button onClick={() => signIn()} className="text-blue-600">
          sign in
        </button>
        .
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/save-tradingview-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    if (res.ok) {
      setMessage("Thanks! You'll receive an email shortly.");
      setUsername("");

      // re-fetch just the username
      const { data } = await supabase
        .from("profiles")
        .select("tradingViewUsername")
        .eq("id", session.user.id)
        .single();
      if (data?.tradingViewUsername) {
        setProfile((p) =>
          p
            ? { ...p, tradingViewUsername: data.tradingViewUsername }
            : p
        );
      }
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome, {session.user.name ?? session.user.email}!
      </h1>

      {!profile?.tradingViewUsername ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-300">TradingView Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white rounded"
            />
          </label>
          <button type="submit" className="w-full bg-teal-500 py-2 rounded">
            Submit
          </button>
        </form>
      ) : (
        <p>Your TradingView Username: {profile.tradingViewUsername}</p>
      )}

      {message && <p className="text-green-400">{message}</p>}
    </div>
  );
}
