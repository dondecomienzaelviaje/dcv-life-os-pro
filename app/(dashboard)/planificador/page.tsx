"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

const VISTAS = ["Día", "Semana", "Mes"] as const;

const BLOQUES_DIA = [
  { hora: "8:00", texto: "Bloque de enfoque — DCV Shop", tag: "Trabajo" },
  { hora: "10:30", texto: "Reunión de seguimiento", tag: "Trabajo" },
  { hora: "13:00", texto: "Almuerzo", tag: "Personal" },
  { hora: "16:00", texto: "Entrenar", tag: "Salud" },
  { hora: "20:00", texto: "Lectura antes de dormir", tag: "Lecturas" },
];

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function PlanificadorPage() {
  const [vista, setVista] = useState<(typeof VISTAS)[number]>("Día");

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

      <Card className="mb-5">
        <h2 className="text-sm font-semibold mb-1">Mis 3 prioridades de hoy</h2>
        <p className="text-xs text-muted mb-4">
          Lo único que necesitas mover hacia adelante
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {["Cerrar propuesta DCV Shop", "Entrenar 40 minutos", "Leer 20 páginas"].map(
            (p) => (
              <div
                key={p}
                className="bg-surface-2 border border-line rounded-xl px-4 py-3 text-sm"
              >
                {p}
              </div>
            )
          )}
        </div>
      </Card>

      {vista === "Día" && (
        <Card className="p-0 overflow-hidden">
          {BLOQUES_DIA.map((b, i) => (
            <div
              key={b.hora}
              className={`flex items-center gap-4 px-5 py-3.5 ${
                i < BLOQUES_DIA.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className="text-xs text-muted w-12 shrink-0">{b.hora}</span>
              <span className="flex-1 text-sm">{b.texto}</span>
              <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5">
                {b.tag}
              </span>
            </div>
          ))}
        </Card>
      )}

      {vista === "Semana" && (
        <Card>
          <div className="grid grid-cols-7 gap-2 text-center">
            {DIAS_SEMANA.map((d, i) => (
              <div key={d}>
                <div className="text-xs text-muted mb-2">{d}</div>
                <div
                  className={`h-24 rounded-xl border border-line flex items-center justify-center text-[11px] text-muted ${
                    i === 2 ? "bg-gold-dim border-transparent text-gold" : "bg-surface-2"
                  }`}
                >
                  {i === 2 ? "3 bloques" : "—"}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {vista === "Mes" && (
        <Card>
          <p className="text-muted text-sm text-center py-10">
            Vista de calendario mensual — se conecta con datos reales en la Fase 3.
          </p>
        </Card>
      )}
    </>
  );
}