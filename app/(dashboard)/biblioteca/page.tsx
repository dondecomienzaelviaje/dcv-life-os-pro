"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const CATEGORIAS = ["Todas", "Crecimiento", "Disciplina", "Hábitos", "Mentalidad"];

const RECURSOS = [
  { nombre: "Planilla de rutina matutina", tipo: "Plantilla", acceso: "Gratis", categoria: "Hábitos" },
  { nombre: "Los cuatro pilares DCV", tipo: "eBook", acceso: "Gratis", categoria: "Crecimiento" },
  { nombre: "Journal de 90 días", tipo: "Journal", acceso: "Con registro", categoria: "Disciplina" },
  { nombre: "Clase: Disciplina en acción", tipo: "Clase", acceso: "Con registro", categoria: "Disciplina" },
  { nombre: "Pack Enfoque Diario", tipo: "Pack", acceso: "Puntos DCV", categoria: "Mentalidad" },
  { nombre: "Hoja de progreso semanal", tipo: "Plantilla", acceso: "Puntos DCV", categoria: "Crecimiento" },
];

const ACCESO_BADGE: Record<string, "success" | "gold" | "warning"> = {
  Gratis: "success",
  "Con registro": "gold",
  "Puntos DCV": "warning",
};

export default function BibliotecaPage() {
  const [categoria, setCategoria] = useState("Todas");

  const visibles = RECURSOS.filter(
    (r) => categoria === "Todas" || r.categoria === categoria
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Biblioteca DCV</h1>
        <p className="text-muted text-sm mt-1.5">
          Recursos para acompañar tu progreso.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
              categoria === c
                ? "bg-gold-dim text-gold border-transparent"
                : "text-muted border-line hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {visibles.map((r) => (
          <Card key={r.nombre}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-[11px] text-muted">{r.tipo}</span>
              <Badge variant={ACCESO_BADGE[r.acceso]}>{r.acceso}</Badge>
            </div>
            <h2 className="font-display font-semibold text-[15px]">{r.nombre}</h2>
          </Card>
        ))}
      </div>
    </>
  );
}