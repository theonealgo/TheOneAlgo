import { signIn } from "next-auth/react";

async function handleLogin'e' {
  e.preventDefault();
  await signIn("credentials", {
    redirect: true,
    email,
    password,
    callbackUrl: "/dashboard",
  });
}
