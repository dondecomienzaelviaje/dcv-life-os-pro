import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getOrCreateUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    const clerkUser = await currentUser();

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser?.primaryEmailAddress?.emailAddress ?? null,
        name: clerkUser?.fullName ?? clerkUser?.firstName ?? null,
      },
    });
  }

  return user;
}