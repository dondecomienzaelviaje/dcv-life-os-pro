"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import { otorgarPuntos, PUNTOS } from "@/lib/points";

export async function getLibros() {
  const user = await getOrCreateUser();
  if (!user) return [];

  return prisma.book.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function crearLibro(data: {
  title: string;
  author?: string;
  totalPages?: number;
}) {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      totalPages: data.totalPages,
      userId: user.id,
    },
  });

  revalidatePath("/lecturas");
}

export async function avanzarPaginas(id: string, paginas: number = 10) {
  const user = await getOrCreateUser();
  if (!user) return;

  const libro = await prisma.book.findFirst({
    where: { id, userId: user.id },
  });
  if (!libro) return;

  const nuevaPagina = Math.min(
    libro.totalPages ?? Infinity,
    libro.currentPage + paginas
  );

  const nuevoEstado =
    libro.totalPages && nuevaPagina >= libro.totalPages
      ? "TERMINADO"
      : "LEYENDO";

  await prisma.book.update({
    where: { id },
    data: { currentPage: nuevaPagina, status: nuevoEstado },
  });

  if (nuevoEstado === "TERMINADO" && libro.status !== "TERMINADO") {
    await otorgarPuntos(user.id, PUNTOS.LIBRO);
  }

  revalidatePath("/lecturas");
}