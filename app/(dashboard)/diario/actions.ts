"use server";

import { revalidatePath } from "next/cache";
import type { JournalEntry } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function getEntradas(): Promise<JournalEntry[]> {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function crearEntrada(data: {
  title: string;
  content: string;
  tags: string[];
}) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.journalEntry.create({
    data: {
      title: data.title,
      content: data.content,
      tags: data.tags,
      userId: user.id,
    },
  });

  revalidatePath("/diario");
}

export async function eliminarEntrada(id: string) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.journalEntry.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/diario");
}