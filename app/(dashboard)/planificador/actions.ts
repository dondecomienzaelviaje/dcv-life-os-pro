"use server";

import { revalidatePath } from "next/cache";
import type { Task } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getTareasPriorizables(): Promise<Task[]> {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.task.findMany({
    where: { userId: user.id, status: { not: "COMPLETADA" } },
    orderBy: { createdAt: "asc" },
  });
}

export async function togglePrioridad(id: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  const tarea = await prisma.task.findFirst({
    where: { id, userId: user.id },
  });
  if (!tarea) return;

  if (!tarea.isPriority) {
    const actuales = await prisma.task.count({
      where: { userId: user.id, isPriority: true },
    });
    if (actuales >= 3) return;
  }

  await prisma.task.update({
    where: { id },
    data: { isPriority: !tarea.isPriority },
  });

  revalidatePath("/planificador");
}