"use client";

import { useTransition } from "react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { avanzarMeta, eliminarMeta } from "./actions";

type Meta = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  priority: string | null;
  progressPercent: number;
  currentLabel: string | null;
  targetLabel: string | null;
};

export default function MetaItem({ meta }: { meta: Meta }) {
  const [isPending, startTransition] = useTransition();
  const completada = meta.progressPercent >= 100;

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
      <div className="flex justify-between text-xs text-muted mt-2 mb-4">
        <span>
          {meta.currentLabel && meta.targetLabel
            ? `${meta.currentLabel} de ${meta.targetLabel}`
            : meta.targetLabel
            ? `Meta: ${meta.targetLabel}`
            : "Progreso"}
        </span>
        <span className="text-gold font-semibold">{meta.progressPercent}%</span>
      </div>
      {!completada && (
        <button
          onClick={() => startTransition(() => avanzarMeta(meta.id, 10))}
          disabled={isPending}
          className="text-xs text-gold border border-gold-dim bg-gold-dim rounded-lg px-3 py-1.5 hover:opacity-80 transition-opacity"
        >
          + Registrar avance (10%)
        </button>
      )}
    </Card>
  );
}