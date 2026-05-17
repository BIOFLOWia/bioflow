"use client";

import { Check, X, Zap, Crown, Building2, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: "FREE",
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Para quem quer experimentar o poder da IA",
    icon: Zap,
    iconColor: "text-muted-foreground",
    iconBg: "bg-white/5",
    border: "border-white/10",
    highlighted: false,
    features: [
      { text: "2 bios geradas no total", included: true },
      { text: "Preview Instagram em tempo real", included: true },
      { text: "Exportar bio (copiar)", included: true },
      { text: "Bios ilimitadas", included: false },
      { text: "Histórico completo", included: false },
      { text: "Favoritos", included: false },
      { text: "Analytics de uso", included: false },
      { text: "Suporte prioritário", included: false },
    ],
    cta: "Começar Grátis",
    href: "/dashboard",
  },
  {
    id: "PRO",
    name: "Pro",
    price: "R$ 27",
    period: "/mês",
    description: "Para criadores, profissionais e infoprodutores",
    icon: Crown,
    iconColor: "text-primary",
    iconBg: "bg-primary/20",
    border: "border-primary/40",
    highlighted: true,
    badge: "Mais Popular",
    features: [
      { text: "Bios ilimitadas ✨", included: true },
      { text: "Preview Instagram em tempo real", included: true },
      { text: "Exportar bio (copiar)", included: true },
      { text: "Histórico completo", included: true },
      { text: "Favoritos", included: true },
      { text: "Analytics de uso", included: true },
      { text: "Todos os nichos e tons de voz", included: true },
      { text: "Suporte prioritário", included: false },
    ],
    cta: "Assinar Pro",
    href: "/checkout/pro",
  },
  {
    id: "BUSINESS",
    name: "Business",
    price: "R$ 67",
    period: "/mês",
    description: "Para agências, times e social medias",
    icon: Building2,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10",
    border: "border-amber-400/20",
    highlighted: false,
    features: [
      { text: "Tudo do Pro", included: true },
      { text: "Múltiplos perfis gerenciados", included: true },
      { text: "API de integração (em breve)", included: true },
      { text: "Relatórios avançados exportáveis", included: true },
      { text: "Onboarding dedicado", included: true },
      { text: "Suporte prioritário 24/7", included: true },
      { text: "SLA garantido", included: true },
      { text: "White-label (em breve)", included: true },
    ],
    cta: "Falar com a Equipe",
    href: "https://wa.me/5541984372637?text=Olá! Gostaria de saber mais sobre o plano Business do Bio Flow.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function PricingCards({ currentPlan }: { currentPlan?: string }) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const router = useRouter();

  const handlePlanClick = async (plan: typeof plans[0]) => {
    if (currentPlan === plan.id) return;
    
    // Redirect direct links (FREE, mailto, or external like WhatsApp)
    if (plan.id === "FREE" || plan.href.startsWith("mailto:") || plan.href.startsWith("http")) {
      if (plan.href.startsWith("http")) {
        window.open(plan.href, "_blank");
      } else {
        router.push(plan.href);
      }
      return;
    }

    // Handle Stripe Checkout
    setLoadingPlan(plan.id);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao iniciar checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Planos simples e transparentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Comece grátis e faça upgrade quando precisar. Sem surpresas na fatura.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;
            const isLoading = loadingPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`relative rounded-2xl border p-8 flex flex-col gap-6 ${plan.border} ${
                  plan.highlighted
                    ? "bg-primary/5 shadow-2xl shadow-primary/20 scale-[1.03]"
                    : "bg-white/[0.02]"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold glow-primary">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-6">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
                      Plano Atual
                    </span>
                  </div>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.iconBg}`}>
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="text-xs text-muted-foreground">{plan.description}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 text-sm ${!feature.included ? "opacity-40" : ""}`}>
                      {feature.included ? (
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePlanClick(plan)}
                  disabled={isCurrentPlan || (loadingPlan !== null && !isLoading)}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isCurrentPlan
                      ? "bg-white/5 text-muted-foreground cursor-default"
                      : plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  } disabled:opacity-50`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {isCurrentPlan ? "Plano Atual" : plan.cta}
                      {!isCurrentPlan && <ArrowRight className="w-4 h-4" />}
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Guarantee */}
        <div className="mt-12 text-center text-sm text-muted-foreground space-y-1">
          <p>✅ Sem fidelidade · Cancele quando quiser · Pagamento seguro via Stripe</p>
          <p>💳 Cartão de crédito, PIX e boleto aceitos</p>
        </div>
      </div>
    </section>
  );
}
