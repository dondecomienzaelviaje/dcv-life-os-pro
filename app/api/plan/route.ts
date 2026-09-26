import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/current-user";

export async function GET() {
  const user = await getOrCreateUser();
  return NextResponse.json({ plan: user?.plan ?? "GRATIS" });
}