import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS, type PlanId } from "@/lib/plans";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { planId } = await req.json() as { planId: PlanId };
  const plan = PLANS[planId];

  if (!plan || plan.stripePriceId === null) {
    return new Response(JSON.stringify({ error: "Plano inválido" }), { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
    return new Response(
      JSON.stringify({ error: "Stripe não está configurado. Adicione STRIPE_SECRET_KEY no .env" }),
      { status: 503 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, stripeCustomerId: true },
  });

  // Cria ou reutiliza o customer no Stripe
  let customerId = user?.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user?.email ?? undefined,
      metadata: { userId: session.user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeCustomerId: customer.id },
    });
  }

  // Cria a sessão de checkout do Stripe
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/plano?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/plano?canceled=true`,
    metadata: {
      userId: session.user.id,
      planId,
    },
  });

  return new Response(JSON.stringify({ url: checkoutSession.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
