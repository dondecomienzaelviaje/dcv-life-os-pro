"use client";

import { useTransition } from "react";
import type { Project } from "@prisma/client";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { avanzarEstadoProyecto, avanzarProgresoProyecto } from "./actions";

const ESTADO_LABEL: Record<Project["status"], string> = {
  IDEA: "Idea",
  PLANIFICACION: "Planificación",
  EN_PROGRESO: "En progreso",
  PAUSADO: "Pausado",
  COMPLETADO: "Completado",
};

const ESTADO_BADGE: Record<Project["status"], string> = {
  IDEA: "text-muted border border-line",
  PLANIFICACION: "bg-gold-dim text-gold",
  EN_PROGRESO: "bg-gold-dim text-gold",
  PAUSADO: "bg-[rgba(200,90,90,.15)] text-[#e0a3a3]",
  COMPLETADO: "bg-[rgba(120,180,140,.15)] text-[#9fd0af]",
};

export default function ProyectoItem({ proyecto }: { proyecto: Project }) {
  const [isPending, startTransition] = useTransition();
  const completado = proyecto.status === "COMPLETADO";

  return (
    <Card className={isPending ? "opacity-50" : ""}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="font-display font-semibold text-[15px]">{proyecto.name}</h2>
        <button
          onClick={() => startTransition(() => avanzarEstadoProyecto(proyecto.id))}
          disabled={isPending || completado}
          className={`text-[11px] rounded-full px-2 py-0.5 shrink-0 ${ESTADO_BADGE[proyecto.status]} ${
            !completado ? "hover:opacity-80 transition-opacity cursor-pointer" : ""
          }`}
        >
          {ESTADO_LABEL[proyecto.status]}
        </button>
      </div>
      {proyecto.description && (
        <p className="text-muted text-sm mb-4">{proyecto.description}</p>
      )}
      <ProgressBar percent={proyecto.progressPercent} />
      <div className="flex justify-between text-xs text-muted mt-2 mb-4">
        <span>Progreso</span>
        <span className="text-gold font-semibold">{proyecto.progressPercent}%</span>
      </div>
      {!completado && (
        <button
          onClick={() => startTransition(() => avanzarProgresoProyecto(proyecto.id, 10))}
          disabled={isPending}
          className="text-xs text-gold border border-gold-dim bg-gold-dim rounded-lg px-3 py-1.5 hover:opacity-80 transition-opacity"
        >
          + Registrar avance (10%)
        </button>
      )}
      {proyecto.relatedGoal && (
        <div className="text-[11px] text-muted mt-3.5 pt-3.5 border-t border-line">
          Meta relacionada: {proyecto.relatedGoal}
        </div>
      )}
    </Card>
  );
}