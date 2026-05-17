"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function saveBio(content: string, inputData: any) {
  try {
    const session = await auth();
    
    // Se não estiver logado, não salva (proteção na UI deve lidar com isso)
    if (!session?.user?.id) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const bio = await prisma.bio.create({
      data: {
        content,
        inputData,
        userId: session.user.id,
      },
    });

    revalidatePath("/historico");
    revalidatePath("/dashboard");
    
    return { success: true, bioId: bio.id };
  } catch (error) {
    console.error("Erro ao salvar bio:", error);
    return { success: false, error: "Falha ao salvar no banco de dados." };
  }
}

export async function toggleFavoriteBio(bioId: string, currentStatus: boolean) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    // Verifica se a bio pertence ao usuário
    const existing = await prisma.bio.findUnique({ where: { id: bioId } });
    if (!existing || existing.userId !== session.user.id) {
      return { success: false, error: "Not found or unauthorized" };
    }

    await prisma.bio.update({
      where: { id: bioId },
      data: { isFavorite: !currentStatus },
    });

    revalidatePath("/historico");
    revalidatePath("/favoritos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao favoritar bio:", error);
    return { success: false, error: "Falha ao favoritar." };
  }
}

export async function deleteBio(bioId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const existing = await prisma.bio.findUnique({ where: { id: bioId } });
    if (!existing || existing.userId !== session.user.id) {
      return { success: false, error: "Not found or unauthorized" };
    }

    await prisma.bio.delete({
      where: { id: bioId },
    });

    revalidatePath("/historico");
    revalidatePath("/favoritos");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar bio:", error);
    return { success: false, error: "Falha ao deletar." };
  }
}
