import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import { HistoryList } from "@/components/HistoryList";

export default async function FavoritosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const bios = await prisma.bio.findMany({
    where: { userId: session.user.id, isFavorite: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
          <Heart className="w-6 h-6 fill-red-400 text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favoritos</h1>
          <p className="text-muted-foreground mt-1">
            Suas melhores bios salvas para acesso rápido.
          </p>
        </div>
      </div>

      {bios.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 glass rounded-2xl border border-white/10 text-center">
          <Heart className="w-16 h-16 text-muted-foreground mb-6 opacity-30" />
          <h3 className="text-2xl font-semibold">Nenhum favorito ainda</h3>
          <p className="text-muted-foreground mt-3 max-w-md leading-relaxed">
            Quando você gerar uma bio que gostar, clique em "Favoritar" para salvá-la aqui para acesso rápido.
          </p>
        </div>
      ) : (
        <HistoryList initialBios={bios} />
      )}
    </div>
  );
}
