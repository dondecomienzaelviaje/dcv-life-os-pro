"use client";

import { useState, useTransition } from "react";
import type { Goal } from "@prisma/client";
import Card from "@/components/ui/Card";
import MetaItem from "./MetaItem";
import { crearMeta } from "./actions";

const CATEGORIAS = [
  "Personal",
  "Profesional",
  "Financiera",
  "Salud y bienestar",
  "Educación",
  "Productividad",
  "Proyectos",
];

export default function MetasClient({ metas }: { metas: Goal[] }) {
  const [isPending, startTransition] = useTransition();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIAS[0]);
  const [targetLabel, setTargetLabel] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      await crearMeta({
        name,
        description: description || undefined,
        category,
        targetLabel: targetLabel || undefined,
      });
      setName("");
      setDescription("");
      setTargetLabel("");
      setMostrarForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Mis metas</h1>
          <p className="text-muted text-sm mt-1.5">
            Lo que decides perseguir, con seguimiento real de avance.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Nueva meta
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5 flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la meta"
            className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            rows={2}
            className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold resize-none"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              value={targetLabel}
              onChange={(e) => setTargetLabel(e.target.value)}
              placeholder="Meta (ej. $5.000.000, opcional)"
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

      {metas.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes metas. ¡Crea la primera!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {metas.map((m) => (
            <MetaItem key={m.id} meta={m} />
          ))}
        </div>
      )}
    </>
  );
}