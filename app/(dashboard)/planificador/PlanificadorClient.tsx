"use client";

import { useState, useTransition } from "react";
import type { Task } from "@prisma/client";
import Card from "@/components/ui/Card";
import { togglePrioridad } from "./actions";

const VISTAS = ["Día", "Semana", "Mes"] as const;
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function PlanificadorClient({ tareas }: { tareas: Task[] }) {
  const [vista, setVista] = useState<(typeof VISTAS)[number]>("Día");
  const [isPending, startTransition] = useTransition();

  const prioridades = tareas.filter((t) => t.isPriority);
  const disponibles = tareas.filter((t) => !t.isPriority);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Planificador</h1>
          <p className="text-muted text-sm mt-1.5">
            Organiza tu tiempo antes de que el día te organice a ti.
          </p>
        </div>
        <div className="flex gap-1 bg-surface border border-line rounded-xl p-1">
          {VISTAS.map((v) => (
            <button
              key={v}
              onClick={() => setVista(v)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors ${
                vista === v ? "bg-gold-dim text-gold" : "text-muted hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <Card className={`mb-5 ${isPending ? "opacity-50" : ""}`}>
        <h2 className="text-sm font-semibold mb-1">Mis 3 prioridades de hoy</h2>
        <p className="text-xs text-muted mb-4">
          Marca hasta 3 tareas — lo único que necesitas mover hacia adelante
        </p>

        {prioridades.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {prioridades.map((t) => (
              <button
                key={t.id}
                onClick={() => startTransition(() => togglePrioridad(t.id))}
                className="bg-gold-dim border border-transparent text-gold rounded-xl px-4 py-3 text-sm text-left hover:opacity-80 transition-opacity"
              >
                {t.title}
              </button>
            ))}
          </div>
        )}

        {prioridades.length < 3 && disponibles.length > 0 && (
          <div>
            <p className="text-[11px] text-muted mb-2">Elige de tus tareas pendientes:</p>
            <div className="flex flex-wrap gap-2">
              {disponibles.map((t) => (
                <button
                  key={t.id}
                  onClick={() => startTransition(() => togglePrioridad(t.id))}
                  className="text-xs text-muted border border-line rounded-lg px-3 py-1.5 hover:text-white hover:border-white/20 transition-colors"
                >
                  + {t.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {tareas.length === 0 && (
          <p className="text-muted text-sm">
            No tienes tareas pendientes para priorizar. Crea alguna en Tareas.
          </p>
        )}
      </Card>

      {vista === "Día" && (
        <Card>
          <p className="text-muted text-sm text-center py-10">
            La agenda por horas se conecta a datos reales en un próximo paso.
          </p>
        </Card>
      )}

      {vista === "Semana" && (
        <Card>
          <div className="grid grid-cols-7 gap-2 text-center">
            {DIAS_SEMANA.map((d) => (
              <div key={d}>
                <div className="text-xs text-muted mb-2">{d}</div>
                <div className="h-24 rounded-xl border border-line bg-surface-2 flex items-center justify-center text-[11px] text-muted">
                  —
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {vista === "Mes" && (
        <Card>
          <p className="text-muted text-sm text-center py-10">
            Vista de calendario mensual — pendiente de conectar.
          </p>
        </Card>
      )}
    </>
  );
}