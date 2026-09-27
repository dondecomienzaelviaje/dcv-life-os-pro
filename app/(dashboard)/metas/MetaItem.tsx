"use client";

import { useState, useTransition } from "react";
import type { Goal } from "@prisma/client";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { actualizarProgreso, eliminarMeta } from "./actions";

const formatNumero = (n: number) => n.toLocaleString("es-CO");

export default function MetaItem({ meta }: { meta: Goal }) {
  const [isPending, startTransition] = useTransition();
  const [editando, setEditando] = useState(false);
  const [valorTemp, setValorTemp] = useState("");

  const completada = meta.progressPercent >= 100;
  const esNumerica = meta.targetValue != null;

  const guardar = () => {
    const valor = parseInt(valorTemp, 10);
    if (isNaN(valor)) return;
    startTransition(async () => {
      await actualizarProgreso(meta.id, valor);
      setEditando(false);
    });
  };

  return (
    <Card className={isPending ? "opacity-50" : ""}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <h2 className="font-display font-semibold text-[15px]">{meta.name}</h2>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-[11px] rounded-full px-2 py-0.5 ${
              completada
                ? "bg-[rgba(120,180,140,.15)] text-[#9fd0af]"
                : "bg-gold-dim text-gold"
            }`}
          >
            {completada ? "Completada" : "En curso"}
          </span>
          <button
            onClick={() => startTransition(() => eliminarMeta(meta.id))}
            className="text-[11px] text-muted hover:text-[#e0a3a3] transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
      {meta.category && (
        <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5 inline-block mt-1 mb-3">
          {meta.category}
        </span>
      )}
      {meta.description && (
        <p className="text-muted text-sm mb-4">{meta.description}</p>
      )}
      <ProgressBar percent={meta.progressPercent} />
      <div className="flex justify-between items-center text-xs text-muted mt-2 mb-4">
        {esNumerica ? (
          editando ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={valorTemp}
                onChange={(e) => setValorTemp(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && guardar()}
                className="bg-surface-2 border border-line rounded-lg px-2 py-1 text-xs w-28 outline-none focus:border-gold"
              />
              <button
                onClick={guardar}
                className="text-gold text-xs font-semibold hover:opacity-80"
              >
                Guardar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setValorTemp(String(meta.currentValue ?? 0));
                setEditando(true);
              }}
              className="hover:text-white transition-colors"
            >
              {formatNumero(meta.currentValue ?? 0)} de {formatNumero(meta.targetValue!)}
            </button>
          )
        ) : (
          <span>Progreso</span>
        )}
        <span className="text-gold font-semibold">{meta.progressPercent}%</span>
      </div>
      {!esNumerica && !completada && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="% completado"
            value={editando ? valorTemp : ""}
            onFocus={() => {
              setEditando(true);
              setValorTemp(String(meta.progressPercent));
            }}
            onChange={(e) => setValorTemp(e.target.value)}
            onBlur={guardar}
            onKeyDown={(e) => e.key === "Enter" && guardar()}
            className="bg-surface-2 border border-line rounded-lg px-2 py-1.5 text-xs w-28 outline-none focus:border-gold"
          />
        </div>
      )}
    </Card>
  );
}