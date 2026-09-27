"use client";

import { useState, useTransition } from "react";
import type { Project } from "@prisma/client";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { avanzarEstadoProyecto, actualizarProgresoProyecto, eliminarProyecto } from "./actions";

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
  const [editando, setEditando] = useState(false);
  const [valorTemp, setValorTemp] = useState("");
  const completado = proyecto.status === "COMPLETADO";

  const guardar = () => {
    const valor = parseInt(valorTemp, 10);
    if (isNaN(valor)) return;
    startTransition(async () => {
      await actualizarProgresoProyecto(proyecto.id, valor);
      setEditando(false);
    });
  };

  return (
    <Card className={isPending ? "opacity-50" : ""}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="font-display font-semibold text-[15px]">{proyecto.name}</h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => startTransition(() => avanzarEstadoProyecto(proyecto.id))}
            disabled={isPending || completado}
            className={`text-[11px] rounded-full px-2 py-0.5 ${ESTADO_BADGE[proyecto.status]} ${
              !completado ? "hover:opacity-80 transition-opacity cursor-pointer" : ""
            }`}
          >
            {ESTADO_LABEL[proyecto.status]}
          </button>
          <button
            onClick={() => startTransition(() => eliminarProyecto(proyecto.id))}
            className="text-[11px] text-muted hover:text-[#e0a3a3] transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
      {proyecto.description && (
        <p className="text-muted text-sm mb-4">{proyecto.description}</p>
      )}
      <ProgressBar percent={proyecto.progressPercent} />
      <div className="flex justify-between items-center text-xs text-muted mt-2 mb-4">
        <span>Progreso</span>
        {editando ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={valorTemp}
              onChange={(e) => setValorTemp(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && guardar()}
              onBlur={guardar}
              className="bg-surface-2 border border-line rounded-lg px-2 py-1 text-xs w-16 outline-none focus:border-gold text-right"
            />
            <span className="text-gold font-semibold">%</span>
          </div>
        ) : (
          <button
            onClick={() => {
              setValorTemp(String(proyecto.progressPercent));
              setEditando(true);
            }}
            className="text-gold font-semibold hover:opacity-80"
          >
            {proyecto.progressPercent}%
          </button>
        )}
      </div>
      {proyecto.relatedGoal && (
        <div className="text-[11px] text-muted mt-3.5 pt-3.5 border-t border-line">
          Meta relacionada: {proyecto.relatedGoal}
        </div>
      )}
    </Card>
  );
}