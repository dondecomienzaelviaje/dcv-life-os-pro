"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import { otorgarPuntos, PUNTOS } from "@/lib/points";

export async function getMetas() {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.goal.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function crearMeta(data: {
  name: string;
  description?: string;
  category?: string;
  priority?: string;
  targetLabel?: string;
}) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.goal.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      priority: data.priority,
      targetLabel: data.targetLabel,
      userId: user.id,
    },
  });

  revalidatePath("/metas");
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

  if (nuevoProgreso >= 100 && meta.progressPercent < 100) {
    await otorgarPuntos(user.id, PUNTOS.META);
  }

  revalidatePath("/metas");
}

export async function eliminarMeta(id: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.goal.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/metas");
}