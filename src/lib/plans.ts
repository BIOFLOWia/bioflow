// Configuração central dos planos do Bio Flow
// Estes valores são usados na Pricing Page, no gerador e na lógica de billing

export const PLANS = {
  FREE: {
    id: "FREE",
    name: "Free",
    price: 0,
    priceMonthly: "R$ 0",
    description: "Para quem quer experimentar",
    bioLimit: 2, // Limite máximo de bios no plano gratuito
    features: [
      "2 bios geradas",
      "Preview Instagram em tempo real",
      "Exportar bio",
    ],
    notIncluded: [
      "Bios ilimitadas",
      "Histórico completo",
      "Favoritos",
      "Analytics",
      "Suporte prioritário",
    ],
    stripePriceId: null,
    cta: "Plano Atual",
    highlighted: false,
  },
  PRO: {
    id: "PRO",
    name: "Pro",
    price: 2700, // em centavos (R$27,00)
    priceMonthly: "R$ 27",
    description: "Para criadores e profissionais",
    bioLimit: Infinity,
    features: [
      "Bios ilimitadas ✨",
      "Preview Instagram em tempo real",
      "Histórico completo",
      "Favoritos",
      "Analytics de uso",
      "Todos os nichos e tons de voz",
      "Suporte via email",
    ],
    notIncluded: [
      "Multi-usuário (em breve)",
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? "price_pro_placeholder",
    cta: "Assinar Pro",
    highlighted: true,
  },
  BUSINESS: {
    id: "BUSINESS",
    name: "Business",
    price: 6700, // em centavos (R$67,00)
    priceMonthly: "R$ 67",
    description: "Para agências e times",
    bioLimit: Infinity,
    features: [
      "Tudo do Pro",
      "Múltiplos perfis",
      "API de integração (em breve)",
      "Relatórios avançados",
      "Suporte prioritário",
      "Onboarding dedicado",
    ],
    notIncluded: [],
    stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID ?? "price_business_placeholder",
    cta: "Assinar Business",
    highlighted: false,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export function getPlan(planId: string): typeof PLANS[PlanId] {
  return PLANS[planId as PlanId] ?? PLANS.FREE;
}

export function canGenerateBio(subscriptionTier: string, currentBioCount: number): boolean {
  const plan = getPlan(subscriptionTier);
  if (plan.bioLimit === Infinity) return true;
  return currentBioCount < plan.bioLimit;
}
