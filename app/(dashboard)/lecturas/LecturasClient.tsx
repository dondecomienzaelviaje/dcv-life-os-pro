"use client";

import { useState, useTransition } from "react";
import type { Book } from "@prisma/client";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { crearLibro, avanzarPaginas } from "./actions";

const FILTROS = ["Todos", "Por leer", "Leyendo", "Terminado"] as const;

const ESTADO_LABEL: Record<Book["status"], string> = {
  POR_LEER: "Por leer",
  LEYENDO: "Leyendo",
  TERMINADO: "Terminado",
};

export default function LecturasClient({ libros }: { libros: Book[] }) {
  const [isPending, startTransition] = useTransition();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [paginas, setPaginas] = useState("");

  const visibles = libros.filter(
    (l) => filtro === "Todos" || ESTADO_LABEL[l.status] === filtro
  );

  const handleSubmit = () => {
    if (!titulo.trim()) return;
    startTransition(async () => {
      await crearLibro({
        title: titulo,
        author: autor || undefined,
        totalPages: paginas ? parseInt(paginas, 10) : undefined,
      });
      setTitulo("");
      setAutor("");
      setPaginas("");
      setMostrarForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Lecturas</h1>
          <p className="text-muted text-sm mt-1.5">
            {libros.filter((l) => l.status === "TERMINADO").length} libro(s) terminado(s).
          </p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Agregar libro
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5">
          <div className="flex flex-wrap gap-3 items-end">
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold w-56"
            />
            <input
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Autor (opcional)"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold w-48"
            />
            <input
              type="number"
              value={paginas}
              onChange={(e) => setPaginas(e.target.value)}
              placeholder="Páginas (opcional)"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold w-36"
            />
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-gold text-bg text-sm font-semibold rounded-lg px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
        </Card>
      )}

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

      {visibles.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            {libros.length === 0
              ? "Aún no tienes libros. ¡Agrega el primero!"
              : "No hay libros en este filtro."}
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {visibles.map((l) => {
            const progreso = l.totalPages
              ? (l.currentPage / l.totalPages) * 100
              : 0;
            return (
              <Card key={l.id} className={isPending ? "opacity-50" : ""}>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="font-display font-semibold text-[15px]">{l.title}</h2>
                  <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5 shrink-0">
                    {ESTADO_LABEL[l.status]}
                  </span>
                </div>
                {l.author && <p className="text-muted text-sm mb-4">{l.author}</p>}
                {l.totalPages && (
                  <>
                    <ProgressBar percent={progreso} />
                    <div className="flex justify-between text-xs text-muted mt-2 mb-4">
                      <span>
                        {l.currentPage} de {l.totalPages} páginas
                      </span>
                      <span className="text-gold font-semibold">
                        {Math.round(progreso)}%
                      </span>
                    </div>
                  </>
                )}
                {l.status !== "TERMINADO" && (
                  <button
                    onClick={() => startTransition(() => avanzarPaginas(l.id, 10))}
                    disabled={isPending}
                    className="text-xs text-gold border border-gold-dim bg-gold-dim rounded-lg px-3 py-1.5 hover:opacity-80 transition-opacity"
                  >
                    + Registrar 10 páginas
                  </button>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}