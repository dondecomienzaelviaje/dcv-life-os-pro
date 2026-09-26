"use client";

import { useState, useTransition } from "react";
import type { Project } from "@prisma/client";
import Card from "@/components/ui/Card";
import ProyectoItem from "./ProyectoItem";
import { crearProyecto } from "./actions";

export default function ProyectosClient({ proyectos }: { proyectos: Project[] }) {
  const [isPending, startTransition] = useTransition();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [relatedGoal, setRelatedGoal] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      await crearProyecto({
        name,
        description: description || undefined,
        relatedGoal: relatedGoal || undefined,
      });
      setName("");
      setDescription("");
      setRelatedGoal("");
      setMostrarForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Proyectos</h1>
          <p className="text-muted text-sm mt-1.5">
            Lo que estás construyendo, con seguimiento de avance real.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Nuevo proyecto
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5 flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del proyecto"
            className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            rows={2}
            className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold resize-none"
          />
          <div className="flex gap-3">
            <input
              value={relatedGoal}
              onChange={(e) => setRelatedGoal(e.target.value)}
              placeholder="Meta relacionada (opcional)"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold flex-1"
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

      {proyectos.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes proyectos. ¡Crea el primero!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {proyectos.map((p) => (
            <ProyectoItem key={p.id} proyecto={p} />
          ))}
        </div>
      )}
    </>
  );
}