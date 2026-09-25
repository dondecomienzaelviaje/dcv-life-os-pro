"use server";

import { revalidatePath } from "next/cache";
import type { Project, ProjectStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getProyectos(): Promise<Project[]> {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

const SIGUIENTE_ESTADO: Record<ProjectStatus, ProjectStatus> = {
  IDEA: "PLANIFICACION",
  PLANIFICACION: "EN_PROGRESO",
  EN_PROGRESO: "PAUSADO",
  PAUSADO: "EN_PROGRESO",
  COMPLETADO: "COMPLETADO",
};

export async function avanzarEstadoProyecto(id: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  const proyecto = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });
  if (!proyecto) return;

  await prisma.project.update({
    where: { id },
    data: { status: SIGUIENTE_ESTADO[proyecto.status] },
  });

  revalidatePath("/proyectos");
}

export async function avanzarProgresoProyecto(id: string, incremento: number = 10) {
  const user = await getOrCreateUser();
  if (!user) return;

  const proyecto = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });
  if (!proyecto) return;

  const nuevoProgreso = Math.min(100, proyecto.progressPercent + incremento);
  const nuevoEstado = nuevoProgreso >= 100 ? "COMPLETADO" : proyecto.status;

  await prisma.project.update({
    where: { id },
    data: { progressPercent: nuevoProgreso, status: nuevoEstado },
  });

  revalidatePath("/proyectos");
}