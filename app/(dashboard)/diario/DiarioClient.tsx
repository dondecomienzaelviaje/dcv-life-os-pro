"use client";

import { useState, useTransition } from "react";
import type { JournalEntry } from "@prisma/client";
import Card from "@/components/ui/Card";
import { crearEntrada, eliminarEntrada } from "./actions";

export default function DiarioClient({ entradas }: { entradas: JournalEntry[] }) {
  const [isPending, startTransition] = useTransition();
  const [busqueda, setBusqueda] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [etiquetas, setEtiquetas] = useState("");

  const visibles = entradas.filter(
    (e) =>
      e.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.content.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSubmit = () => {
    if (!titulo.trim() || !contenido.trim()) return;
    const tags = etiquetas
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    startTransition(async () => {
      await crearEntrada({ title: titulo, content: contenido, tags });
      setTitulo("");
      setContenido("");
      setEtiquetas("");
      setMostrarForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Diario</h1>
          <p className="text-muted text-sm mt-1.5">
            Un espacio para pensar antes de actuar.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Nueva entrada
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5 flex flex-col gap-3">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="¿Qué tienes en mente hoy?"
            rows={4}
            className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold resize-none"
          />
          <div className="flex gap-3 items-center">
            <input
              value={etiquetas}
              onChange={(e) => setEtiquetas(e.target.value)}
              placeholder="Etiquetas separadas por coma (opcional)"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold flex-1"
            />
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-gold text-bg text-sm font-semibold rounded-lg px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
            >
              Guardar
            </button>
          </div>
        </Card>
      )}

      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar en tus entradas..."
        className="w-full bg-surface border border-line rounded-xl px-4 py-2.5 text-sm mb-5 outline-none focus:border-gold transition-colors placeholder:text-muted"
      />

      <div className="flex flex-col gap-4">
        {visibles.map((e) => (
          <Card key={e.id} className={isPending ? "opacity-50" : ""}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted">
                {new Date(e.createdAt).toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
              <div className="flex items-center gap-2">
                {e.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-gold bg-gold-dim rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => startTransition(() => eliminarEntrada(e.id))}
                  className="text-[11px] text-muted hover:text-[#e0a3a3] transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <h2 className="font-display font-semibold text-[15px] mb-2">{e.title}</h2>
            <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">
              {e.content}
            </p>
          </Card>
        ))}
        {visibles.length === 0 && (
          <Card>
            <p className="text-muted text-sm text-center py-8">
              {entradas.length === 0
                ? "Aún no tienes entradas. ¡Escribe la primera!"
                : "No hay entradas que coincidan con tu búsqueda."}
            </p>
          </Card>
        )}
      </div>
    </>
  );
}