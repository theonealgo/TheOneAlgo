"use client";

import { useEffect, useState } from "react";

export default function DevEnvPage() {
  const [env, setEnv] = useState<{ stripeKeyExists: boolean; publicUrl: string | null } | null>(null);

  useEffect(() => {
    fetch("/api/test-env")
      .then((res) => res.json())
      .then((data) => setEnv(data))
      .catch(() => setEnv(null));
  }, []);

  if (env === null) {
    return <p>Loading environment check…</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Local Environment Check</h1>
      <ul>
        <li><strong>STRIPE_SECRET_KEY loaded:</strong> {env.stripeKeyExists ? "✅" : "❌"}</li>
        <li><strong>NEXT_PUBLIC_SITE_URL:</strong> {env.publicUrl ?? "❌ not set"}</li>
      </ul>
    </div>
  );
}
