import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsContainer } from "@/components/SettingsContainer";

export default async function ConfiguracoesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true, subscriptionTier: true },
  });

  if (!user) redirect("/login");

  return <SettingsContainer initialUser={user} />;
}
