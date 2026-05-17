import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { PLANS, type PlanId } from "@/lib/plans";

// Disable body parsing — Stripe needs the raw body for signature verification
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing stripe signature or webhook secret", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId as PlanId;

      if (userId && planId && PLANS[planId]) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionTier: planId,
            stripeCustomerId: session.customer,
          },
        });
        console.log(`✅ User ${userId} upgraded to ${planId}`);
      }
      break;
    }

    case "customer.subscription.deleted": {
      // Downgrade back to FREE when subscription is cancelled
      const subscription = event.data.object as any;
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      
      if (!("deleted" in customer)) {
        const userId = (customer as any).metadata?.userId;
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { subscriptionTier: "FREE" },
          });
          console.log(`🔽 User ${userId} downgraded to FREE`);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response("OK", { status: 200 });
}
