"use client";

import { useState } from "react";
import type { Task } from "@prisma/client";
import Card from "@/components/ui/Card";
import TareaItem from "./TareaItem";
import { crearTarea } from "./actions";

export default function TareasClient({ tareas }: { tareas: Task[] }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async () => {
    if (!titulo.trim()) return;
    await crearTarea({ title: titulo, category: categoria || undefined });
    setTitulo("");
    setCategoria("");
    setMostrarForm(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Tareas</h1>
          <p className="text-muted text-sm mt-1.5">
            Todo lo que tienes por hacer, en un solo lugar.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Nueva tarea
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5">
          <div className="flex flex-wrap gap-3 items-end">
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold flex-1 min-w-[200px]"
            />
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoría (opcional)"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold w-48"
            />
            <button
              onClick={handleSubmit}
              className="bg-gold text-bg text-sm font-semibold rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
            >
              Guardar
            </button>
          </div>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        {tareas.map((t, i) => (
          <TareaItem key={t.id} tarea={t} isLast={i === tareas.length - 1} />
        ))}
        {tareas.length === 0 && (
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes tareas. ¡Crea la primera!
          </p>
        )}
      </Card>
    </>
  );
}