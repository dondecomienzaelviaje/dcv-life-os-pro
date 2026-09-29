"use client";

import { useState, useTransition } from "react";
import type { Task } from "@prisma/client";
import Card from "@/components/ui/Card";
import { asignarFecha } from "./actions";

const DIAS_LABEL = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function VistaMes({
  tareas,
  tareasMes,
}: {
  tareas: Task[];
  tareasMes: Task[];
}) {
  const [isPending, startTransition] = useTransition();
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);

  const anio = mesActual.getFullYear();
  const mes = mesActual.getMonth();
  const primerDiaSemana = (new Date(anio, mes, 1).getDay() + 6) % 7; // 0 = Lunes
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const hoyISO = toISODate(new Date());

  const tareasPorFecha = (iso: string) =>
    tareasMes.filter((t) => t.dueDate && toISODate(new Date(t.dueDate)) === iso);

  const celdas: (string | null)[] = [
    ...Array(primerDiaSemana).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) =>
      toISODate(new Date(anio, mes, i + 1))
    ),
  ];

  return (
    <>
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMesActual(new Date(anio, mes - 1, 1))}
            className="text-muted hover:text-white transition-colors text-sm px-2"
          >
            ←
          </button>
          <h2 className="font-display font-semibold text-sm capitalize">
            {mesActual.toLocaleDateString("es-CO", { month: "long", year: "numeric" })}
          </h2>
          <button
            onClick={() => setMesActual(new Date(anio, mes + 1, 1))}
            className="text-muted hover:text-white transition-colors text-sm px-2"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
          {DIAS_LABEL.map((d) => (
            <div key={d} className="text-[11px] text-muted">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {celdas.map((iso, i) => {
            if (!iso) return <div key={i} />;
            const cantidad = tareasPorFecha(iso).length;
            const esHoy = iso === hoyISO;
            return (
              <button
                key={iso}
                onClick={() => setDiaSeleccionado(iso)}
                className={`aspect-square rounded-lg text-xs flex flex-col items-center justify-center gap-0.5 border transition-colors ${
                  diaSeleccionado === iso
                    ? "bg-gold-dim border-transparent text-gold"
                    : esHoy
                    ? "border-gold text-white"
                    : "border-line text-muted hover:text-white"
                }`}
              >
                <span>{parseInt(iso.slice(-2), 10)}</span>
                {cantidad > 0 && (
                  <span className="w-1 h-1 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {diaSeleccionado && (
        <Card className={isPending ? "opacity-50" : ""}>
          <h2 className="text-sm font-semibold mb-4">
            Tareas del{" "}
            {new Date(diaSeleccionado + "T00:00:00").toLocaleDateString("es-CO", {
              day: "numeric",
              month: "long",
            })}
          </h2>

          {tareasPorFecha(diaSeleccionado).length === 0 ? (
            <p className="text-muted text-sm text-center py-6">
              Ninguna tarea asignada a este día todavía.
            </p>
          ) : (
            tareasPorFecha(diaSeleccionado).map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 py-2.5 border-b border-line last:border-0"
              >
                <span className="flex-1 text-sm">{t.title}</span>
                <button
                  onClick={() => startTransition(() => asignarFecha(t.id, null))}
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
                .filter(
                  (t) => !t.dueDate || toISODate(new Date(t.dueDate)) !== diaSeleccionado
                )
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() =>
                      startTransition(() => asignarFecha(t.id, diaSeleccionado))
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
  );
}