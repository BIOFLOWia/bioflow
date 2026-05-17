import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarChart3, Zap, Calendar, Heart, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Busca dados reais do banco
  const [totalBios, favoriteBios, recentBios, user] = await Promise.all([
    prisma.bio.count({ where: { userId: session.user.id } }),
    prisma.bio.count({ where: { userId: session.user.id, isFavorite: true } }),
    prisma.bio.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionTier: true },
    }),
  ]);

  const tier = user?.subscriptionTier ?? "FREE";
  const isFree = tier === "FREE";

  const stats = [
    { title: "Bios Geradas", value: String(totalBios), icon: Zap, trend: "Total" },
    { title: "Favoritas", value: String(favoriteBios), icon: Heart, trend: "Salvas" },
    { title: "Limite de Bios", value: isFree ? "2" : "∞", icon: BarChart3, trend: isFree ? "Plano Free" : "Ilimitado" },
    { title: "Assinatura", value: tier, icon: TrendingUp, trend: isFree ? "Upgrade →" : "Pro ✨" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Usage Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Olá, {session.user.name?.split(" ")[0] ?? "Criador"} 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo ao seu painel. Gere bios incríveis e acompanhe seu progresso.
          </p>
        </div>

        {isFree && (
          <div className="glass p-4 rounded-2xl border border-white/10 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                <Zap className="w-3 h-3 text-primary" /> Uso do Plano Free
              </span>
              <span className="text-xs font-bold">{totalBios}/2</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full transition-all duration-1000 ${totalBios >= 2 ? 'bg-red-500' : 'bg-primary'}`} 
                style={{ width: `${Math.min((totalBios / 2) * 100, 100)}%` }} 
              />
            </div>
            {totalBios >= 2 ? (
              <Link href="/plano" className="text-[10px] text-red-400 mt-2 font-bold hover:underline block">Limite atingido! Upgrade para Pro →</Link>
            ) : (
              <p className="text-[10px] text-muted-foreground mt-2">Você ainda tem {2 - totalBios} bios gratuitas.</p>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl relative overflow-hidden group cursor-default">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ação Rápida */}
      <div className="glass p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Pronto para criar uma bio poderosa?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Use nossa IA para criar bios que convertem seguidores em clientes.
          </p>
        </div>
        <Link href="/gerar" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 glow-primary transition-all whitespace-nowrap">
          Gerar Agora <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Últimas Bios */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="glass p-6 rounded-2xl md:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Últimas Bios Geradas</h2>
            <Link href="/historico" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentBios.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
              <Zap className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhuma bio gerada ainda. Clique em "Gerar Agora" acima!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBios.map((bio) => (
                <div key={bio.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(bio.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    {bio.isFavorite && <Heart className="w-3 h-3 fill-red-400 text-red-400" />}
                  </div>
                  <p className="text-sm line-clamp-2 text-foreground/80 leading-relaxed">
                    {bio.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
