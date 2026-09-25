"use client";

import { useState, useTransition } from "react";
import type { Transaction } from "@prisma/client";
import Card from "@/components/ui/Card";
import { crearTransaccion } from "./actions";

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export default function FinanzasClient({ transacciones }: { transacciones: Transaction[] }) {
  const [isPending, startTransition] = useTransition();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tipo, setTipo] = useState<"INGRESO" | "GASTO">("GASTO");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");

  const ingresos = transacciones
    .filter((t) => t.type === "INGRESO")
    .reduce((sum, t) => sum + t.amount, 0);
  const gastos = transacciones
    .filter((t) => t.type === "GASTO")
    .reduce((sum, t) => sum + t.amount, 0);
  const disponible = ingresos - gastos;

  const porCategoria = transacciones
    .filter((t) => t.type === "GASTO" && t.category)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category!] = (acc[t.category!] ?? 0) + t.amount;
      return acc;
    }, {});
  const maxCategoria = Math.max(1, ...Object.values(porCategoria));

  const handleSubmit = () => {
    const amount = parseInt(monto, 10);
    if (!amount || amount <= 0) return;

    startTransition(async () => {
      await crearTransaccion({ type: tipo, amount, category: categoria || undefined });
      setMonto("");
      setCategoria("");
      setMostrarForm(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Finanzas</h1>
          <p className="text-muted text-sm mt-1.5">Tu mes, en números claros.</p>
        </div>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
        >
          + Registrar movimiento
        </button>
      </div>

      {mostrarForm && (
        <Card className="mb-5">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex gap-1 bg-surface-2 rounded-lg p-1">
              {(["GASTO", "INGRESO"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                    tipo === t ? "bg-gold-dim text-gold" : "text-muted"
                  }`}
                >
                  {t === "GASTO" ? "Gasto" : "Ingreso"}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto en COP"
              className="bg-surface-2 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold w-40"
            />
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
        <Card>
          <div className="text-xs text-muted mb-2">Ingresos del mes</div>
          <div className="font-display text-lg font-semibold">{formatCOP(ingresos)}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Gastos del mes</div>
          <div className="font-display text-lg font-semibold">{formatCOP(gastos)}</div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Disponible</div>
          <div
            className={`font-display text-lg font-semibold ${
              disponible < 0 ? "text-[#e0a3a3]" : "text-gold"
            }`}
          >
            {formatCOP(disponible)}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Movimientos</div>
          <div className="font-display text-lg font-semibold">{transacciones.length}</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-sm font-semibold mb-4">Gastos por categoría</h2>
        {Object.keys(porCategoria).length === 0 ? (
          <p className="text-muted text-sm text-center py-6">
            Aún no tienes gastos registrados este mes.
          </p>
        ) : (
          <div className="flex flex-col gap-3.5">
            {Object.entries(porCategoria).map(([cat, monto]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{cat}</span>
                  <span className="text-muted">{formatCOP(monto)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full"
                    style={{ width: `${(monto / maxCategoria) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}