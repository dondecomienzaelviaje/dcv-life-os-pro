"use client";

import { useTransition } from "react";
import type { Task } from "@prisma/client";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { ciclarEstadoTarea } from "../tareas/actions";

type MiDiaData = {
  userName: string;
  points: number;
  levelName: string;
  levelNumber: number;
  streak: number;
  priorityTasks: Task[];
  habitPercentToday: number;
  weekActivity: boolean[];
};

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function MiDiaClient({ data }: { data: MiDiaData }) {
  const [isPending, startTransition] = useTransition();

  const completadas = data.priorityTasks.filter((t) => t.status === "COMPLETADA").length;
  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const circunferencia = 2 * Math.PI * 56;
  const offset = circunferencia * (1 - data.habitPercentToday / 100);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Buenos días, {data.userName}
          </h1>
          <p className="text-muted text-sm mt-1.5">
            Construye hoy el progreso que quieres ver mañana.
          </p>
        </div>
        <div className="text-xs text-muted border border-line rounded-full px-3 py-1.5 capitalize whitespace-nowrap">
          {fecha}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
        <Card>
          <div className="text-xs text-muted mb-2">Nivel actual</div>
          <div className="font-display text-xl font-semibold text-gold">
            0{data.levelNumber} — {data.levelName}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Puntos DCV</div>
          <div className="font-display text-xl font-semibold">
            {data.points.toLocaleString("es-CO")}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Racha actual</div>
          <div className="font-display text-xl font-semibold">{data.streak} días</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Prioridades de hoy</div>
          <div className="font-display text-xl font-semibold">
            {completadas} / {data.priorityTasks.length || 0}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-4">
        <Card className={isPending ? "opacity-50" : ""}>
          <h2 className="text-sm font-semibold mb-1">Mis 3 prioridades de hoy</h2>
          <p className="text-xs text-muted mb-4">
            Lo único que necesitas mover hacia adelante
          </p>

          {data.priorityTasks.length === 0 ? (
            <p className="text-muted text-sm py-4">
              No tienes tareas priorizadas. Elígelas en Planificador.
            </p>
          ) : (
            data.priorityTasks.map((t, i) => (
              <div
                key={t.id}
                className={`flex items-center gap-3 py-3 ${
                  i < data.priorityTasks.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <button
                  onClick={() => startTransition(() => ciclarEstadoTarea(t.id))}
                  className={`w-[19px] h-[19px] rounded-md border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    t.status === "COMPLETADA"
                      ? "bg-gold border-gold text-bg"
                      : "border-muted text-transparent"
                  }`}
                >
                  ✓
                </button>
                <span
                  className={`flex-1 text-sm ${
                    t.status === "COMPLETADA" ? "text-muted line-through" : ""
                  }`}
                >
                  {t.title}
                </span>
                {t.category && (
                  <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5">
                    {t.category}
                  </span>
                )}
              </div>
            ))
          )}
        </Card>

        <Card>
          <h2 className="text-sm font-semibold mb-4">Constancia de hoy</h2>
          <div className="flex flex-col items-center gap-3.5">
            <div className="relative w-[132px] h-[132px]">
              <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
                <circle cx="66" cy="66" r="56" fill="none" stroke="#1c1c1c" strokeWidth="10" />
                <circle
                  cx="66"
                  cy="66"
                  r="56"
                  fill="none"
                  stroke="#caa24a"
                  strokeWidth="10"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <b className="font-display text-2xl">{data.habitPercentToday}%</b>
                <span className="text-[11px] text-muted">completado</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted text-center mb-1.5">
                Últimos 7 días
              </div>
              <div className="flex gap-1.5">
                {data.weekActivity.map((activo, i) => (
                  <div
                    key={i}
                    title={DIAS_SEMANA[i]}
                    className={`w-[22px] h-[22px] rounded-md ${
                      activo ? "bg-gold" : "bg-surface-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}