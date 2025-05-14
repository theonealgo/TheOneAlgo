// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

console.log('🔐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('🔑 Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0,10) + '…');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email / Password",
      credentials: {
        email:    { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        tradingViewUsername: { label: "TV Username", type: "text" },
        plan:                { label: "Plan", type: "text" },
        billing:             { label: "Billing", type: "text" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null;

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // ────────── SIGN-UP ──────────
        if (creds.plan && creds.billing) {
          const { data, error } = await supabase.auth.admin.createUser({
            email:         creds.email,
            password:      creds.password,
            email_confirm: true,
          });
          if (error || !data.user) return null;

          await supabase.from("profiles").upsert({
            id:                  data.user.id,
            tradingViewUsername: creds.tradingViewUsername,
            plan_key:            creds.plan,
            billing:             creds.billing,
          });

          return { id: data.user.id, email: data.user.email! };
        }

        // ────────── LOGIN ──────────
        const { data, error } = await supabase.auth.signInWithPassword({
          email:    creds.email,
          password: creds.password,
        });
        if (error || !data.user) return null;

        // update TradingView username if provided on login
        if (creds.tradingViewUsername) {
          await supabase.from("profiles").upsert({
            id:                  data.user.id,
            tradingViewUsername: creds.tradingViewUsername,
          });
        }

        return {
          id:    data.user.id,
          email: data.user.email!,
          name:  data.user.user_metadata.name ?? data.user.email!,
        };
      },
    }),

    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },
  secret:  process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth",
    error:  "/auth?error=1",
  },

  callbacks: {
    // 1️⃣ Persist the user object in the JWT
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    // 2️⃣ Fetch profile details on each session
    async session({ session, token }) {
      // base NextAuth session.user
      session.user =
        (token as any).user ||                     // credentials flow
        {
          id:    token.sub!,
          name:  token.name!,
          email: token.email!,
          image: token.picture!,
        };

      // now pull plan/billing/TV username from Supabase
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { data, error } = await supabase
        .from("profiles")
        .select("plan_key, billing, tradingViewUsername")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        // attach to the session
        (session.user as any).plan = data.plan_key;
        (session.user as any).billing = data.billing;
        (session.user as any).tradingViewUsername = data.tradingViewUsername;
      }

      return session;
    },
  },
};