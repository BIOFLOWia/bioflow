import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Only warn, don't crash on build/dev when Stripe isn't configured yet
  console.warn("[Stripe] STRIPE_SECRET_KEY is not set. Stripe features will not work.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});
