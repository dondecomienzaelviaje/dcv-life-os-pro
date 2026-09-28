"use client";

import { useState, useTransition } from "react";
import type { Task } from "@prisma/client";
import Card from "@/components/ui/Card";
import { togglePrioridad, asignarHora, asignarDia } from "./actions";

const VISTAS = ["Día", "Semana", "Mes"] as const;
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function PlanificadorClient({
  tareas,
  agendaHoy,
  tareasSemana,
}: {
  tareas: Task[];
  agendaHoy: Task[];
  tareasSemana: Task[];
}) {
  const [vista, setVista] = useState<(typeof VISTAS)[number]>("Día");
  const [isPending, startTransition] = useTransition();
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [horaTemp, setHoraTemp] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);

  const prioridades = tareas.filter((t) => t.isPriority);
  const disponibles = tareas.filter((t) => !t.isPriority);

  const conHora = agendaHoy.filter((t) => t.scheduledTime);
  const sinHora = agendaHoy.filter((t) => !t.scheduledTime);

  const guardarHora = (id: string) => {
    startTransition(async () => {
      await asignarHora(id, horaTemp || null);
      setEditandoId(null);
      setHoraTemp("");
    });
  };

  const tareasPorDia = (dia: number) =>
    tareasSemana.filter((t) => t.scheduledDay === dia);

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
        <Card className={isPending ? "opacity-50" : ""}>
          <h2 className="text-sm font-semibold mb-4">Agenda de hoy</h2>

          {agendaHoy.length === 0 ? (
            <p className="text-muted text-sm text-center py-10">
              No tienes tareas pendientes. Crea alguna en Tareas.
            </p>
          ) : (
            <div className="flex flex-col">
              {conHora.map((t) => (
                <div key={t.id} className="flex items-center gap-4 py-3 border-b border-line">
                  {editandoId === t.id ? (
                    <input
                      type="time"
                      value={horaTemp}
                      onChange={(e) => setHoraTemp(e.target.value)}
                      onBlur={() => guardarHora(t.id)}
                      autoFocus
                      className="bg-surface-2 border border-line rounded-lg px-2 py-1 text-xs w-24 outline-none focus:border-gold"
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setEditandoId(t.id);
                        setHoraTemp(t.scheduledTime ?? "");
                      }}
                      className="text-xs text-gold w-16 shrink-0 text-left hover:opacity-80"
                    >
                      {t.scheduledTime}
                    </button>
                  )}
                  <span className="flex-1 text-sm">{t.title}</span>
                  {t.category && (
                    <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5">
                      {t.category}
                    </span>
                  )}
                </div>
              ))}

              {sinHora.length > 0 && (
                <>
                  <p className="text-[11px] text-muted mt-4 mb-2">Sin hora asignada</p>
                  {sinHora.map((t) => (
                    <div key={t.id} className="flex items-center gap-4 py-3 border-b border-line last:border-0">
                      {editandoId === t.id ? (
                        <input
                          type="time"
                          value={horaTemp}
                          onChange={(e) => setHoraTemp(e.target.value)}
                          onBlur={() => guardarHora(t.id)}
                          autoFocus
                          className="bg-surface-2 border border-line rounded-lg px-2 py-1 text-xs w-24 outline-none focus:border-gold"
                        />
                      ) : (
                        <button
                          onClick={() => {
                            setEditandoId(t.id);
                            setHoraTemp("");
                          }}
                          className="text-xs text-muted w-16 shrink-0 text-left hover:text-white"
                        >
                          + hora
                        </button>
                      )}
                      <span className="flex-1 text-sm">{t.title}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </Card>
      )}

      {vista === "Semana" && (
        <>
          <Card className="mb-4">
            <div className="grid grid-cols-7 gap-2 text-center">
              {DIAS_SEMANA.map((d, i) => {
                const cantidad = tareasPorDia(i).length;
                return (
                  <button
                    key={d}
                    onClick={() => setDiaSeleccionado(i)}
                    className={`transition-colors ${
                      diaSeleccionado === i ? "" : ""
                    }`}
                  >
                    <div className="text-xs text-muted mb-2">{d}</div>
                    <div
                      className={`h-24 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                        diaSeleccionado === i
                          ? "bg-gold-dim border-transparent text-gold"
                          : cantidad > 0
                          ? "bg-surface-2 border-line text-white"
                          : "bg-surface-2 border-line text-muted"
                      }`}
                    >
                      <span className="font-display text-lg font-semibold">
                        {cantidad || "—"}
                      </span>
                      {cantidad > 0 && (
                        <span className="text-[10px] opacity-70">
                          {cantidad === 1 ? "tarea" : "tareas"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {diaSeleccionado !== null && (
            <Card className={isPending ? "opacity-50" : ""}>
              <h2 className="text-sm font-semibold mb-4">
                Tareas del {DIAS_SEMANA[diaSeleccionado]}
              </h2>
              {tareasPorDia(diaSeleccionado).length === 0 ? (
                <p className="text-muted text-sm text-center py-6">
                  Ninguna tarea asignada a este día todavía.
                </p>
              ) : (
                tareasPorDia(diaSeleccionado).map((t) => (
                  <div key={t.id} className="flex items-center gap-3 py-2.5 border-b border-line last:border-0">
                    <span className="flex-1 text-sm">{t.title}</span>
                    {t.scheduledTime && (
                      <span className="text-[11px] text-gold">{t.scheduledTime}</span>
                    )}
                    <button
                      onClick={() => startTransition(() => asignarDia(t.id, null))}
                      className="text-[11px] text-muted hover:text-[#e0a3a3] transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                ))
              )}
              <div className="mt-4 pt-4 border-t border-line">
                <p className="text-[11px] text-muted mb-2">
                  Asignar una de tus tareas pendientes a este día:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tareas
                    .filter((t) => t.scheduledDay !== diaSeleccionado)
                    .map((t) => (
                      <button
                        key={t.id}
                        onClick={() =>
                          startTransition(() => asignarDia(t.id, diaSeleccionado))
                        }
                        className="text-xs text-muted border border-line rounded-lg px-3 py-1.5 hover:text-white hover:border-white/20 transition-colors"
                      >
                        + {t.title}
                      </button>
                    ))}
                </div>
              </div>
            </Card>
          )}
        </>
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