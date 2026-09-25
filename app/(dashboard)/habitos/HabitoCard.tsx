"use client";

import { useTransition } from "react";
import Card from "@/components/ui/Card";
import { toggleHabitoHoy } from "./actions";

type Habito = {
  id: string;
  name: string;
  category: string | null;
  heatmap: boolean[];
  doneToday: boolean;
  rachaActual: number;
  mejorRacha: number;
  cumplimiento: number;
};

export default function HabitoCard({ habito }: { habito: Habito }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Card className={isPending ? "opacity-50" : ""}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-display font-semibold text-[15px] mb-1">
            {habito.name}
          </div>
          {habito.category && (
            <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5">
              {habito.category}
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="font-display text-lg font-semibold text-gold">
            {habito.cumplimiento}%
          </div>
          <div className="text-[10.5px] text-muted">cumplimiento</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-[5px]">
        {habito.heatmap.map((activo, i) => {
          const esHoy = i === habito.heatmap.length - 1;
          return (
            <button
              key={i}
              onClick={
                esHoy ? () => startTransition(() => toggleHabitoHoy(habito.id)) : undefined
              }
              disabled={!esHoy || isPending}
              className={`aspect-square rounded-[4px] transition-colors ${
                activo ? "bg-gold" : "bg-surface-2"
              } ${esHoy ? "outline outline-1 outline-offset-1 outline-muted cursor-pointer" : "cursor-default"}`}
            />
          );
        })}
      </div>

      <div className="flex justify-between text-[11.5px] text-muted mt-4 pt-3.5 border-t border-line">
        <span>
          Racha actual: <b className="text-white font-semibold">{habito.rachaActual} días</b>
        </span>
        <span>
          Mejor racha: <b className="text-white font-semibold">{habito.mejorRacha} días</b>
        </span>
      </div>
    </Card>
  );
}