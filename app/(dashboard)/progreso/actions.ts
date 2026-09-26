"use server";

import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getEstadisticas() {
  const user = await getOrCreateUser();
  if (!user) {
    return {
      tareasCompletadas: 0,
      habitosCumplidos: 0,
      metasAlcanzadas: 0,
      librosTerminados: 0,
      desafiosCompletados: 0,
      puntos: 0,
      semana: [0, 0, 0, 0, 0, 0, 0],
    };
  }

  const [
    tareasCompletadas,
    habitosCumplidos,
    metasAlcanzadas,
    librosTerminados,
    desafiosCompletados,
  ] = await Promise.all([
    prisma.task.count({ where: { userId: user.id, status: "COMPLETADA" } }),
    prisma.habitLog.count({ where: { habit: { userId: user.id } } }),
    prisma.goal.count({ where: { userId: user.id, progressPercent: 100 } }),
    prisma.book.count({ where: { userId: user.id, status: "TERMINADO" } }),
    prisma.challenge.count({ where: { userId: user.id, status: "COMPLETADO" } }),
  ]);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const hace7Dias = new Date(hoy);
  hace7Dias.setDate(hace7Dias.getDate() - 6);

  const logsSemana = await prisma.habitLog.findMany({
    where: { habit: { userId: user.id }, date: { gte: hace7Dias } },
  });

  const semana = Array(7).fill(0);
  for (const log of logsSemana) {
    const dias = Math.floor(
      (log.date.getTime() - hace7Dias.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (dias >= 0 && dias < 7) semana[dias]++;
  }

  const maxSemana = Math.max(1, ...semana);
  const semanaPct = semana.map((v) => Math.round((v / maxSemana) * 100));

  return {
    tareasCompletadas,
    habitosCumplidos,
    metasAlcanzadas,
    librosTerminados,
    desafiosCompletados,
    puntos: user.points,
    semana: semanaPct,
  };
}