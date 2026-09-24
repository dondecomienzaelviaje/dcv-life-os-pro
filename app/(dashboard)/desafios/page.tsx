import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

const DESAFIOS = [
  {
    nombre: "7 días de disciplina",
    descripcion: "Completa tus 3 prioridades diarias durante una semana seguida.",
    dias: 7,
    diaActual: 7,
    puntos: 100,
    estado: "Completado",
  },
  {
    nombre: "21 días de hábitos",
    descripcion: "Mantén al menos 3 hábitos activos sin fallar ni un día.",
    dias: 21,
    diaActual: 13,
    puntos: 250,
    estado: "En curso",
  },
  {
    nombre: "30 días de enfoque",
    descripcion: "Un mes completo de constancia en tus metas principales.",
    dias: 30,
    diaActual: 0,
    puntos: 400,
    estado: "Disponible",
  },
];

export default function DesafiosPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Desafíos DCV</h1>
        <p className="text-muted text-sm mt-1.5">
          Retos de constancia que suman a tu progreso.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {DESAFIOS.map((d) => {
          const progreso = (d.diaActual / d.dias) * 100;
          return (
            <Card key={d.nombre}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-[15px]">{d.nombre}</h2>
                <span
                  className={`text-[11px] rounded-full px-2 py-0.5 ${
                    d.estado === "Completado"
                      ? "bg-[rgba(120,180,140,.15)] text-[#9fd0af]"
                      : d.estado === "En curso"
                      ? "bg-gold-dim text-gold"
                      : "text-muted border border-line"
                  }`}
                >
                  {d.estado}
                </span>
              </div>
              <p className="text-muted text-sm mb-4">{d.descripcion}</p>
              <ProgressBar percent={progreso} />
              <div className="flex justify-between text-xs text-muted mt-2 mb-4">
                <span>
                  {d.estado === "Disponible" ? "Sin empezar" : `Día ${d.diaActual} de ${d.dias}`}
                </span>
                <span className="text-gold font-semibold">+{d.puntos} pts</span>
              </div>
              {d.estado === "Disponible" && (
                <button className="w-full bg-gold text-bg text-sm font-semibold rounded-xl py-2.5 hover:opacity-90 transition-opacity">
                  Comenzar desafío
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}