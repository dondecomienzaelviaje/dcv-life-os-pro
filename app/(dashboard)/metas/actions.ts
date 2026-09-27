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
  targetValue?: number;
}) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.goal.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      targetValue: data.targetValue,
      currentValue: data.targetValue ? 0 : undefined,
      userId: user.id,
    },
  });

  revalidatePath("/metas");
}

export async function actualizarProgreso(id: string, nuevoValor: number) {
  const user = await getOrCreateUser();
  if (!user) return;

  const meta = await prisma.goal.findFirst({
    where: { id, userId: user.id },
  });
  if (!meta) return;

  let nuevoProgreso: number;

  if (meta.targetValue && meta.targetValue > 0) {
    const valorLimitado = Math.max(0, Math.min(nuevoValor, meta.targetValue));
    nuevoProgreso = Math.round((valorLimitado / meta.targetValue) * 100);
    await prisma.goal.update({
      where: { id },
      data: { currentValue: valorLimitado, progressPercent: nuevoProgreso },
    });
  } else {
    nuevoProgreso = Math.max(0, Math.min(nuevoValor, 100));
    await prisma.goal.update({
      where: { id },
      data: { progressPercent: nuevoProgreso },
    });
  }

  if (nuevoProgreso >= 100 && meta.progressPercent < 100) {
    await otorgarPuntos(user.id, PUNTOS.META);
  } else if (nuevoProgreso < 100 && meta.progressPercent >= 100) {
    await otorgarPuntos(user.id, -PUNTOS.META);
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