"use client";

import { useTransition } from "react";
import Badge from "@/components/ui/Badge";
import { ciclarEstadoTarea } from "./actions";

type Tarea = {
  id: string;
  title: string;
  category: string | null;
  priority: string | null;
  status: "PENDIENTE" | "PROGRESO" | "COMPLETADA";
};

const ESTADO_LABEL = {
  PENDIENTE: "Pendiente",
  PROGRESO: "En progreso",
  COMPLETADA: "Completada",
} as const;

const ESTADO_BADGE = {
  PENDIENTE: "warning",
  PROGRESO: "gold",
  COMPLETADA: "success",
} as const;

export default function TareaItem({
  tarea,
  isLast,
}: {
  tarea: Tarea;
  isLast: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3.5 ${
        !isLast ? "border-b border-line" : ""
      } ${isPending ? "opacity-50" : ""}`}
    >
      <button
        onClick={() => startTransition(() => ciclarEstadoTarea(tarea.id))}
        disabled={isPending}
        className={`w-[19px] h-[19px] rounded-md border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
          tarea.status === "COMPLETADA"
            ? "bg-gold border-gold text-bg"
            : "border-muted text-transparent"
        }`}
      >
        ✓
      </button>
      <span
        className={`flex-1 text-sm ${
          tarea.status === "COMPLETADA" ? "text-muted line-through" : ""
        }`}
      >
        {tarea.title}
      </span>
      {tarea.category && (
        <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5 hidden sm:inline-block">
          {tarea.category}
        </span>
      )}
      <Badge variant={ESTADO_BADGE[tarea.status]}>
        {ESTADO_LABEL[tarea.status]}
      </Badge>
    </div>
  );
}