"use server";

import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import { calcularNivel } from "@/lib/points";

function inicioDelDia(fecha: Date) {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getMiDia() {
  const user = await getOrCreateUser();

  if (!user) {
    return {
      userName: "Usuario",
      points: 0,
      levelName: "Explorador",
      levelNumber: 1,
      streak: 0,
      priorityTasks: [],
      habitPercentToday: 0,
      weekActivity: [false, false, false, false, false, false, false],
    };
  }

  const priorityTasks = await prisma.task.findMany({
    where: { userId: user.id, isPriority: true },
    orderBy: { createdAt: "asc" },
  });

  const hoy = inicioDelDia(new Date());

  const habitos = await prisma.habit.findMany({
    where: { userId: user.id },
    include: { logs: { where: { date: hoy } } },
  });

  const habitPercentToday =
    habitos.length === 0
      ? 0
      : Math.round(
          (habitos.filter((h: (typeof habitos)[number]) => h.logs.length > 0).length /
            habitos.length) *
            100
        );

  const hace7Dias = new Date(hoy);
  hace7Dias.setDate(hace7Dias.getDate() - 6);

  const logsSemana = await prisma.habitLog.findMany({
    where: { habit: { userId: user.id }, date: { gte: hace7Dias } },
  });

  const weekActivity = Array(7).fill(false);
  for (const log of logsSemana) {
    const dias = Math.floor(
      (log.date.getTime() - hace7Dias.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (dias >= 0 && dias < 7) weekActivity[dias] = true;
  }

  const nivel = calcularNivel(user.points);

  return {
    userName: user.name ?? "Usuario",
    points: user.points,
    levelName: nivel.name,
    levelNumber: nivel.level,
    streak: user.streak,
    priorityTasks,
    habitPercentToday,
    weekActivity,
  };
}