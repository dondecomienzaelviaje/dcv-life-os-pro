"use server";

import { revalidatePath } from "next/cache";
import type { Transaction } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getTransacciones(): Promise<Transaction[]> {
  const user = await getOrCreateUser();
  if (!user) return [];

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  return prisma.transaction.findMany({
    where: { userId: user.id, date: { gte: inicioMes } },
    orderBy: { date: "desc" },
  });
}

export async function crearTransaccion(data: {
  type: "INGRESO" | "GASTO";
  amount: number;
  category?: string;
  note?: string;
}) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.transaction.create({
    data: {
      type: data.type,
      amount: data.amount,
      category: data.category,
      note: data.note,
      userId: user.id,
    },
  });

  revalidatePath("/finanzas");
}