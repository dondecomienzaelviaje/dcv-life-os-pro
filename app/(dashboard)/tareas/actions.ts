"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getTareas() {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function crearTarea(data: {
  title: string;
  category?: string;
  priority?: string;
}) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.task.create({
    data: {
      title: data.title,
      category: data.category,
      priority: data.priority,
      userId: user.id,
    },
  });

  revalidatePath("/tareas");
}

export async function ciclarEstadoTarea(id: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  const tarea = await prisma.task.findFirst({
    where: { id, userId: user.id },
  });
  if (!tarea) return;

  const siguiente = {
    PENDIENTE: "PROGRESO",
    PROGRESO: "COMPLETADA",
    COMPLETADA: "PENDIENTE",
  } as const;

  await prisma.task.update({
    where: { id },
    data: { status: siguiente[tarea.status] },
  });

  revalidatePath("/tareas");
}