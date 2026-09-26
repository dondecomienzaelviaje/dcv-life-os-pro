"use server";

import { revalidatePath } from "next/cache";
import type { Challenge } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

const DESAFIOS_BASE = [
  { name: "7 días de disciplina", totalDays: 7, points: 100 },
  { name: "21 días de hábitos", totalDays: 21, points: 250 },
  { name: "30 días de enfoque", totalDays: 30, points: 400 },
];

export async function getDesafios(): Promise<Challenge[]> {
  const user = await getOrCreateUser();
  if (!user) return [];

  const existentes = await prisma.challenge.findMany({
    where: { userId: user.id },
  });

  if (existentes.length === 0) {
    await prisma.challenge.createMany({
      data: DESAFIOS_BASE.map((d) => ({ ...d, userId: user.id })),
    });
    return prisma.challenge.findMany({ where: { userId: user.id } });
  }

  return existentes;
}

export async function avanzarDesafio(id: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  const desafio = await prisma.challenge.findFirst({
    where: { id, userId: user.id },
  });
  if (!desafio || desafio.status === "COMPLETADO") return;

  const nuevoDia = desafio.currentDay + 1;
  const completado = nuevoDia >= desafio.totalDays;

  await prisma.challenge.update({
    where: { id },
    data: {
      currentDay: nuevoDia,
      status: completado ? "COMPLETADO" : "EN_CURSO",
      startedAt: desafio.startedAt ?? new Date(),
    },
  });

  revalidatePath("/desafios");
}