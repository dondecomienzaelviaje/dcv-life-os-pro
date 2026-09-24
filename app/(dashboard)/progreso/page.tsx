import Card from "@/components/ui/Card";

const RESUMEN = [
  { label: "Tareas completadas", valor: 142 },
  { label: "Hábitos cumplidos", valor: 89 },
  { label: "Metas alcanzadas", valor: 3 },
  { label: "Libros terminados", valor: 4 },
  { label: "Desafíos completados", valor: 1 },
  { label: "Puntos DCV totales", valor: 1280 },
];

const SEMANA = [
  { dia: "Lun", valor: 80 },
  { dia: "Mar", valor: 60 },
  { dia: "Mié", valor: 100 },
  { dia: "Jue", valor: 40 },
  { dia: "Vie", valor: 90 },
  { dia: "Sáb", valor: 70 },
  { dia: "Dom", valor: 50 },
];

export default function ProgresoPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Mi progreso</h1>
        <p className="text-muted text-sm mt-1.5">
          El resumen de todo lo que has construido hasta ahora.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 mb-6">
        {RESUMEN.map((r) => (
          <Card key={r.label}>
            <div className="text-xs text-muted mb-2">{r.label}</div>
            <div className="font-display text-xl font-semibold text-gold">{r.valor}</div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-sm font-semibold mb-5">Cumplimiento semanal</h2>
        <div className="flex items-end gap-3 h-40">
          {SEMANA.map((s) => (
            <div key={s.dia} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full bg-gold rounded-t-md"
                style={{ height: `${s.valor}%` }}
              />
              <span className="text-[11px] text-muted">{s.dia}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}