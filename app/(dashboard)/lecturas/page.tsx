"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

type Estado = "Por leer" | "Leyendo" | "Terminado";

const LIBROS = [
  { titulo: "Hábitos Atómicos", autor: "James Clear", estado: "Leyendo" as Estado, paginas: 210, totalPaginas: 320 },
  { titulo: "Deep Work", autor: "Cal Newport", estado: "Terminado" as Estado, paginas: 296, totalPaginas: 296 },
  { titulo: "El Monje que Vendió su Ferrari", autor: "Robin Sharma", estado: "Por leer" as Estado, paginas: 0, totalPaginas: 208 },
  { titulo: "Piense y Hágase Rico", autor: "Napoleon Hill", estado: "Por leer" as Estado, paginas: 0, totalPaginas: 238 },
];

const FILTROS = ["Todos", "Por leer", "Leyendo", "Terminado"] as const;

export default function LecturasPage() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");

  const visibles = LIBROS.filter((l) => filtro === "Todos" || l.estado === filtro);
  const terminados = LIBROS.filter((l) => l.estado === "Terminado").length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Lecturas</h1>
          <p className="text-muted text-sm mt-1.5">
            {terminados} libro{terminados !== 1 ? "s" : ""} terminado{terminados !== 1 ? "s" : ""} este año.
          </p>
        </div>
        <button className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity">
          + Agregar libro
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

      <div className="grid md:grid-cols-2 gap-4">
        {visibles.map((l) => (
          <Card key={l.titulo}>
            <div className="flex items-start justify-between gap-3 mb-1">
              <h2 className="font-display font-semibold text-[15px]">{l.titulo}</h2>
              <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5 shrink-0">
                {l.estado}
              </span>
            </div>
            <p className="text-muted text-sm mb-4">{l.autor}</p>
            {l.estado !== "Por leer" && (
              <>
                <ProgressBar percent={(l.paginas / l.totalPaginas) * 100} />
                <div className="flex justify-between text-xs text-muted mt-2">
                  <span>{l.paginas} de {l.totalPaginas} páginas</span>
                  <span className="text-gold font-semibold">
                    {Math.round((l.paginas / l.totalPaginas) * 100)}%
                  </span>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}