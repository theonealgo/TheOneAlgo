import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  const buf = await req.arrayBuffer();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const p = supabase.from("profiles");

  switch (event.type) {
    case "customer.subscription.trial_will_end": {
      const sub = event.data.object as Stripe.Subscription;
      // mark trial as ending
      await p.update({ status: "trial_will_end" })
             .eq("subscription_id", sub.id);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.billing_reason === "subscription_create" || invoice.billing_reason === "subscription_cycle") {
        // subscription active or renewed
        await p.update({ status: "active", subscription_id: invoice.subscription as string })
               .eq("subscription_id", invoice.subscription as string);
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as any;
      await p.update({ status: "past_due" })
             .eq("subscription_id", invoice.subscription as string);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await p.update({ status: "canceled" })
             .eq("subscription_id", sub.id);
      break;
    }
    default:
      // ignore other events
      break;
  }

  return new Response("✅", { status: 200 });
}
