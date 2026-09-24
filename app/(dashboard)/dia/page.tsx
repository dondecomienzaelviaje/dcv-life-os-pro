"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

const PRIORIDADES_INICIALES = [
  { id: 1, texto: "Entrenar 40 minutos", tag: "Salud", hecha: true },
  { id: 2, texto: "Leer 20 páginas", tag: "Lecturas", hecha: true },
  { id: 3, texto: "Cerrar propuesta DCV Shop", tag: "Proyectos", hecha: false },
];

const RACHA_SEMANA = [true, true, true, false, true, true, true];

export default function DiaPage() {
  const [prioridades, setPrioridades] = useState(PRIORIDADES_INICIALES);

  const toggle = (id: number) =>
    setPrioridades((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hecha: !p.hecha } : p))
    );

  const completadas = prioridades.filter((p) => p.hecha).length;
  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      {/* Encabezado */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <h1 className="font-display text-2xl font-semibold">Buenos días</h1>
          <p className="text-muted text-sm mt-1.5">
            Construye hoy el progreso que quieres ver mañana.
          </p>
        </div>
        <div className="text-xs text-muted border border-line rounded-full px-3 py-1.5 capitalize whitespace-nowrap">
          {fecha}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
        <Card>
          <div className="text-xs text-muted mb-2">Nivel actual</div>
          <div className="font-display text-xl font-semibold text-gold">
            04 — Constructor
          </div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Puntos DCV</div>
          <div className="font-display text-xl font-semibold">1.280</div>
          <ProgressBar percent={85} className="mt-2.5" />
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Racha actual</div>
          <div className="font-display text-xl font-semibold">12 días</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Progreso de hoy</div>
          <div className="font-display text-xl font-semibold">
            {completadas} / {prioridades.length}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-4">
        {/* Prioridades */}
        <Card>
          <h2 className="text-sm font-semibold mb-1">Mis 3 prioridades de hoy</h2>
          <p className="text-xs text-muted mb-4">
            Lo único que necesitas mover hacia adelante
          </p>

          {prioridades.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 py-3 ${
                i < prioridades.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <button
                onClick={() => toggle(p.id)}
                className={`w-[19px] h-[19px] rounded-md border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  p.hecha
                    ? "bg-gold border-gold text-bg"
                    : "border-muted text-transparent"
                }`}
              >
                ✓
              </button>
              <span
                className={`flex-1 text-sm ${
                  p.hecha ? "text-muted line-through" : ""
                }`}
              >
                {p.texto}
              </span>
              <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5">
                {p.tag}
              </span>
            </div>
          ))}
        </Card>

        {/* Constancia */}
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
                  strokeDasharray="351.8"
                  strokeDashoffset="117.3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <b className="font-display text-2xl">67%</b>
                <span className="text-[11px] text-muted">completado</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted text-center mb-1.5">
                Últimos 7 días
              </div>
              <div className="flex gap-1.5">
                {RACHA_SEMANA.map((activo, i) => (
                  <div
                    key={i}
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