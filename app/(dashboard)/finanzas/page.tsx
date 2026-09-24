import Card from "@/components/ui/Card";

const CATEGORIAS = [
  { nombre: "Alimentación", monto: 420000 },
  { nombre: "Vivienda", monto: 1200000 },
  { nombre: "Transporte", monto: 180000 },
  { nombre: "Tecnología", monto: 250000 },
  { nombre: "Entretenimiento", monto: 90000 },
  { nombre: "Ahorro", monto: 500000 },
];

const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export default function FinanzasPage() {
  const ingresos = 4200000;
  const gastos = CATEGORIAS.reduce((sum, c) => sum + c.monto, 0);
  const disponible = ingresos - gastos;
  const maxMonto = Math.max(...CATEGORIAS.map((c) => c.monto));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Finanzas</h1>
          <p className="text-muted text-sm mt-1.5">
            Tu mes, en números claros.
          </p>
        </div>
        <button className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity">
          + Registrar movimiento
        </button>
      </div>

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
          <div className="text-xs text-muted mb-2">Ahorro</div>
          <div className="font-display text-lg font-semibold text-gold">
            {formatCOP(500000)}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-muted mb-2">Disponible</div>
          <div
            className={`font-display text-lg font-semibold ${
              disponible < 0 ? "text-[#e0a3a3]" : ""
            }`}
          >
            {formatCOP(disponible)}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-sm font-semibold mb-4">Gastos por categoría</h2>
        <div className="flex flex-col gap-3.5">
          {CATEGORIAS.map((c) => (
            <div key={c.nombre}>
              <div className="flex justify-between text-sm mb-1.5">
                <span>{c.nombre}</span>
                <span className="text-muted">{formatCOP(c.monto)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{ width: `${(c.monto / maxMonto) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}