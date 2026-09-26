import Card from "@/components/ui/Card";
import { getEstadisticas } from "./actions";

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default async function ProgresoPage() {
  const stats = await getEstadisticas();

  const resumen = [
    { label: "Tareas completadas", valor: stats.tareasCompletadas },
    { label: "Hábitos cumplidos", valor: stats.habitosCumplidos },
    { label: "Metas alcanzadas", valor: stats.metasAlcanzadas },
    { label: "Libros terminados", valor: stats.librosTerminados },
    { label: "Desafíos completados", valor: stats.desafiosCompletados },
    { label: "Puntos DCV totales", valor: stats.puntos },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Mi progreso</h1>
        <p className="text-muted text-sm mt-1.5">
          El resumen de todo lo que has construido hasta ahora.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 mb-6">
        {resumen.map((r) => (
          <Card key={r.label}>
            <div className="text-xs text-muted mb-2">{r.label}</div>
            <div className="font-display text-xl font-semibold text-gold">{r.valor}</div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-sm font-semibold mb-5">Hábitos cumplidos esta semana</h2>
        <div className="flex items-end gap-3 h-40">
          {stats.semana.map((valor, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full bg-gold rounded-t-md transition-all"
                style={{ height: `${valor}%`, minHeight: valor > 0 ? "4px" : "0" }}
              />
              <span className="text-[11px] text-muted">{DIAS[i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}