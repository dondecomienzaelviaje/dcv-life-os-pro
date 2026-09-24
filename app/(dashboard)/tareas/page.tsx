"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type Estado = "pendiente" | "progreso" | "completada";

type Tarea = {
  id: number;
  titulo: string;
  categoria: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: Estado;
};

const TAREAS_INICIALES: Tarea[] = [
  { id: 1, titulo: "Cerrar propuesta DCV Shop", categoria: "Proyectos", prioridad: "Alta", estado: "progreso" },
  { id: 2, titulo: "Responder correos pendientes", categoria: "Trabajo", prioridad: "Media", estado: "pendiente" },
  { id: 3, titulo: "Actualizar hoja de gastos", categoria: "Finanzas", prioridad: "Baja", estado: "pendiente" },
  { id: 4, titulo: "Entrenar 40 minutos", categoria: "Salud", prioridad: "Media", estado: "completada" },
  { id: 5, titulo: "Leer 20 páginas", categoria: "Lecturas", prioridad: "Baja", estado: "completada" },
];

const FILTROS = ["Todas", "Pendiente", "En progreso", "Completada"] as const;

const ESTADO_LABEL: Record<Estado, string> = {
  pendiente: "Pendiente",
  progreso: "En progreso",
  completada: "Completada",
};

const ESTADO_BADGE: Record<Estado, "gold" | "warning" | "success"> = {
  pendiente: "warning",
  progreso: "gold",
  completada: "success",
};

export default function TareasPage() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todas");

  const ciclarEstado = (id: number) => {
    const siguiente: Record<Estado, Estado> = {
      pendiente: "progreso",
      progreso: "completada",
      completada: "pendiente",
    };
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: siguiente[t.estado] } : t))
    );
  };

  const visibles = tareas.filter((t) => {
    if (filtro === "Todas") return true;
    return ESTADO_LABEL[t.estado] === filtro;
  });

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Tareas</h1>
          <p className="text-muted text-sm mt-1.5">
            Todo lo que tienes por hacer, en un solo lugar.
          </p>
        </div>
        <button className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity">
          + Nueva tarea
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
              filtro === f
                ? "bg-gold-dim text-gold border-transparent"
                : "text-muted border-line hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        {visibles.map((t, i) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-5 py-3.5 ${
              i < visibles.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <button
              onClick={() => ciclarEstado(t.id)}
              className={`w-[19px] h-[19px] rounded-md border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                t.estado === "completada"
                  ? "bg-gold border-gold text-bg"
                  : "border-muted text-transparent"
              }`}
            >
              ✓
            </button>
            <span
              className={`flex-1 text-sm ${
                t.estado === "completada" ? "text-muted line-through" : ""
              }`}
            >
              {t.titulo}
            </span>
            <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5 hidden sm:inline-block">
              {t.categoria}
            </span>
            <span className="text-[11px] text-muted hidden sm:inline-block">
              {t.prioridad}
            </span>
            <Badge variant={ESTADO_BADGE[t.estado]}>{ESTADO_LABEL[t.estado]}</Badge>
          </div>
        ))}
        {visibles.length === 0 && (
          <p className="text-muted text-sm text-center py-8">
            No hay tareas en este filtro.
          </p>
        )}
      </Card>
    </>
  );
}