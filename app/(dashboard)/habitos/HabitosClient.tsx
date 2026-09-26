"use client";

import { useState, useTransition } from "react";
import Card from "@/components/ui/Card";
import HabitoCard from "./HabitoCard";
import { crearHabito } from "./actions";

type HabitoData = Awaited<ReturnType<typeof import("./actions").getHabitos>>[number];

export default function HabitosClient({ habitos }: { habitos: HabitoData[] }) {
  const [isPending, startTransition] = useTransition();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    startTransition(async () => {
      await crearHabito({ name, category: category || undefined });
      setName("");
      setCategory("");
      setMostrarForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Mis hábitos</h1>
          <p className="text-muted text-sm mt-1.5">
            La constancia diaria es lo que construye el nivel siguiente.
          </p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Nuevo hábito
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5">
          <div className="flex flex-wrap gap-3 items-end">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del hábito"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold flex-1 min-w-[200px]"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Categoría (opcional)"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold w-48"
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

      {habitos.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes hábitos. ¡Crea el primero!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {habitos.map((h) => (
            <HabitoCard key={h.id} habito={h} />
          ))}
        </div>
      )}
    </>
  );
}