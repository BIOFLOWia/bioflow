import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarChart3, TrendingUp, Clock } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [totalBios, thisMonth, niches] = await Promise.all([
    prisma.bio.count({ where: { userId: session.user.id } }),
    prisma.bio.count({
      where: {
        userId: session.user.id,
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
      },
    }),
    prisma.bio.groupBy({
      by: ["niche"],
      where: { userId: session.user.id, niche: { not: null } },
      _count: { niche: true },
      orderBy: { _count: { niche: "desc" } },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Métricas de uso da sua conta.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">Total de Bios</span>
          </div>
          <span className="text-4xl font-bold">{totalBios}</span>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">Bios Este Mês</span>
          </div>
          <span className="text-4xl font-bold">{thisMonth}</span>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">Média Diária</span>
          </div>
          <span className="text-4xl font-bold">
            {thisMonth > 0 ? (thisMonth / new Date().getDate()).toFixed(1) : "0"}
          </span>
        </div>
      </div>

      {niches.length > 0 && (
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-semibold mb-6">Nichos Mais Usados</h2>
          <div className="space-y-4">
            {niches.map((item, i) => {
              const count = item._count.niche;
              const pct = totalBios > 0 ? Math.round((count / totalBios) * 100) : 0;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.niche}</span>
                    <span className="text-muted-foreground">{count} bios · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary glow-primary transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
