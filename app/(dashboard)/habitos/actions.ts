"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import { otorgarPuntos, PUNTOS } from "@/lib/points";

function inicioDelDia(fecha: Date) {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getHabitos() {
  const user = await getOrCreateUser();
  if (!user) return [];

  const hoy = inicioDelDia(new Date());
  const hace28Dias = new Date(hoy);
  hace28Dias.setDate(hace28Dias.getDate() - 27);

  const habitos = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    include: {
      logs: {
        where: { date: { gte: hace28Dias } },
      },
    },
  });

  return habitos.map((h: (typeof habitos)[number]) => {
    const fechasCumplidas = new Set(
      h.logs.map((l: (typeof h.logs)[number]) => l.date.toISOString().slice(0, 10))
    );

    const heatmap: boolean[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(hoy);
      d.setDate(d.getDate() - i);
      heatmap.push(fechasCumplidas.has(d.toISOString().slice(0, 10)));
    }

    const doneToday = heatmap[27];

    let rachaActual = 0;
    for (let i = 27; i >= 0; i--) {
      if (heatmap[i]) rachaActual++;
      else break;
    }

    let mejorRacha = 0;
    let actual = 0;
    for (const dia of heatmap) {
      actual = dia ? actual + 1 : 0;
      if (actual > mejorRacha) mejorRacha = actual;
    }

    const cumplimiento = Math.round(
      (heatmap.filter(Boolean).length / heatmap.length) * 100
    );

    return {
      id: h.id,
      name: h.name,
      category: h.category,
      heatmap,
      doneToday,
      rachaActual,
      mejorRacha,
      cumplimiento,
    };
  });
}

export async function toggleHabitoHoy(habitId: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  const habito = await prisma.habit.findFirst({
    where: { id: habitId, userId: user.id },
  });
  if (!habito) return;

  const hoy = inicioDelDia(new Date());

  const logHoy = await prisma.habitLog.findUnique({
    where: { habitId_date: { habitId, date: hoy } },
  });

  if (logHoy) {
    await prisma.habitLog.delete({ where: { id: logHoy.id } });
    await otorgarPuntos(user.id, -PUNTOS.HABITO);
  } else {
    await prisma.habitLog.create({ data: { habitId, date: hoy } });
    await otorgarPuntos(user.id, PUNTOS.HABITO);
  }

  revalidatePath("/habitos");
}