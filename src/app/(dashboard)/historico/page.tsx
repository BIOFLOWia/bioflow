import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Calendar } from "lucide-react";
import { HistoryList } from "@/components/HistoryList";

export default async function HistoricoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const bios = await prisma.bio.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico de Bios</h1>
          <p className="text-muted-foreground mt-1">
            Todas as bios que você já gerou com a nossa inteligência artificial.
          </p>
        </div>
      </div>

      {bios.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 glass rounded-2xl border border-white/10 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-semibold">Nenhuma bio gerada ainda</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Você ainda não gerou nenhuma bio. Vá para o Gerador Inteligente e comece a criar sua primeira bio premium.
          </p>
        </div>
      ) : (
        <HistoryList initialBios={bios} />
      )}
    </div>
  );
}
