"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

const ENTRADAS = [
  {
    fecha: "23 de septiembre",
    titulo: "Buen avance en LIFE OS",
    contenido:
      "Hoy cerramos la autenticación completa del ecosistema. Fue más largo de lo esperado pero quedó sólido.",
    etiquetas: ["Trabajo", "Progreso"],
  },
  {
    fecha: "20 de septiembre",
    titulo: "Semana de mucho enfoque",
    contenido:
      "Mantuve la racha de hábitos completa. Quiero seguir así hasta cerrar el mes.",
    etiquetas: ["Hábitos"],
  },
  {
    fecha: "15 de septiembre",
    titulo: "Reflexión sobre el proyecto",
    contenido: "A veces avanzar más lento con más claridad es mejor que avanzar rápido sin rumbo.",
    etiquetas: ["Personal"],
  },
];

export default function DiarioPage() {
  const [busqueda, setBusqueda] = useState("");

  const visibles = ENTRADAS.filter(
    (e) =>
      e.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.contenido.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Diario</h1>
          <p className="text-muted text-sm mt-1.5">
            Un espacio para pensar antes de actuar.
          </p>
        </div>
        <button className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity">
          + Nueva entrada
        </button>
      </div>

      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar en tus entradas..."
        className="w-full bg-surface border border-line rounded-xl px-4 py-2.5 text-sm mb-5 outline-none focus:border-gold transition-colors placeholder:text-muted"
      />

      <div className="flex flex-col gap-4">
        {visibles.map((e) => (
          <Card key={e.titulo}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted">{e.fecha}</span>
              <div className="flex gap-1.5">
                {e.etiquetas.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-gold bg-gold-dim rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="font-display font-semibold text-[15px] mb-2">{e.titulo}</h2>
            <p className="text-muted text-sm leading-relaxed">{e.contenido}</p>
          </Card>
        ))}
        {visibles.length === 0 && (
          <p className="text-muted text-sm text-center py-8">
            No hay entradas que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </>
  );
}