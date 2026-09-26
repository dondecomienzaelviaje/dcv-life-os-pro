"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import { otorgarPuntos, PUNTOS } from "@/lib/points";

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

  const nuevoEstado = siguiente[tarea.status];

  await prisma.task.update({
    where: { id },
    data: { status: nuevoEstado },
  });

  if (nuevoEstado === "COMPLETADA") {
    await otorgarPuntos(user.id, PUNTOS.TAREA);
  } else if (tarea.status === "COMPLETADA") {
    await otorgarPuntos(user.id, -PUNTOS.TAREA);
  }

  revalidatePath("/tareas");
}