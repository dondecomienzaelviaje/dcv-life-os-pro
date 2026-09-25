"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getMetas() {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.goal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function avanzarMeta(id: string, incremento: number = 10) {
  const user = await getOrCreateUser();
  if (!user) return;

  const meta = await prisma.goal.findFirst({
    where: { id, userId: user.id },
  });
  if (!meta) return;

  const nuevoProgreso = Math.min(100, meta.progressPercent + incremento);

  await prisma.goal.update({
    where: { id },
    data: { progressPercent: nuevoProgreso },
  });

  revalidatePath("/metas");
}