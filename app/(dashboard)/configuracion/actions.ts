"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";

export async function toggleCompactMode() {
  const user = await getOrCreateUser();
  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { compactMode: !user.compactMode },
  });

  revalidatePath("/configuracion");
}