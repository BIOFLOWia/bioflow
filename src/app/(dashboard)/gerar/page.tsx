import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BioGeneratorClient } from "@/components/BioGeneratorClient";

export default async function GerarBioPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user, biosUsed] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionTier: true },
    }),
    prisma.bio.count({
      where: { userId: session.user.id },
    }),
  ]);

  const subscriptionTier = user?.subscriptionTier ?? "FREE";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerador Inteligente</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os dados abaixo e deixe a IA criar uma bio estratégica para o seu perfil.
        </p>
      </div>

      <BioGeneratorClient biosUsed={biosUsed} subscriptionTier={subscriptionTier} />
    </div>
  );
}
