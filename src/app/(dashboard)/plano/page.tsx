import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PricingCards } from "@/components/PricingCards";

export default async function PlanoPage() {
  const session = await auth();
  
  let currentPlan = "FREE";
  let biosUsed = 0;
  
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionTier: true, _count: { select: { bios: true } } },
    });
    currentPlan = user?.subscriptionTier ?? "FREE";
    biosUsed = user?._count.bios ?? 0;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Status do plano atual */}
      {session?.user && (
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <div className="glass p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm">
                Plano atual: <span className="font-semibold text-primary">{currentPlan}</span>
              </span>
              {currentPlan === "FREE" && (
                <span className="text-xs text-muted-foreground px-2 py-1 bg-white/5 rounded-full">
                  {biosUsed}/2 bios utilizadas
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {currentPlan === "FREE" ? "Faça upgrade para bios ilimitadas" : "Você tem acesso ilimitado ✨"}
            </span>
          </div>
        </div>
      )}

      <PricingCards currentPlan={currentPlan} />
    </div>
  );
}
