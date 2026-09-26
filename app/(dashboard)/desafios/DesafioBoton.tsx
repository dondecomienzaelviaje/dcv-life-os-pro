"use client";

import { useTransition } from "react";
import type { Challenge } from "@prisma/client";
import { avanzarDesafio } from "./actions";

export default function DesafioBoton({
  id,
  status,
}: {
  id: string;
  status: Challenge["status"];
}) {
  const [isPending, startTransition] = useTransition();

  if (status === "COMPLETADO") return null;

  return (
    <button
      onClick={() => startTransition(() => avanzarDesafio(id))}
      disabled={isPending}
      className="w-full bg-gold text-bg text-sm font-semibold rounded-xl py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {status === "DISPONIBLE" ? "Comenzar desafío" : "Marcar día completado"}
    </button>
  );
}