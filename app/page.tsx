import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dia");

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight">
          DCV <span className="gold-gradient-text">LIFE OS</span>
        </h1>
        <p className="text-muted mt-4">Tu sistema operativo personal.</p>
        <p className="text-sm mt-8 mb-10">Organiza tu vida. Construye tu progreso.</p>
        <Link
          href="/dia"
          className="inline-block bg-gradient-to-br from-gold-soft to-gold text-bg text-sm font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
        >
          Entrar con DCV ID
        </Link>
        <p className="text-xs text-muted mt-6">Gratis con tu cuenta DCV ID.</p>
      </div>
    </main>
  );
}