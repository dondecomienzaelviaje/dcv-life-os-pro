import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { getDesafios } from "./actions";
import DesafioBoton from "./DesafioBoton";

export default async function DesafiosPage() {
  const desafios = await getDesafios();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Desafíos DCV</h1>
        <p className="text-muted text-sm mt-1.5">
          Retos de constancia que suman a tu progreso.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {desafios.map((d) => {
          const progreso = (d.currentDay / d.totalDays) * 100;
          const label =
            d.status === "COMPLETADO"
              ? "Completado"
              : d.status === "EN_CURSO"
              ? "En curso"
              : "Disponible";

          return (
            <Card key={d.id}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-[15px]">{d.name}</h2>
                <span
                  className={`text-[11px] rounded-full px-2 py-0.5 ${
                    d.status === "COMPLETADO"
                      ? "bg-[rgba(120,180,140,.15)] text-[#9fd0af]"
                      : d.status === "EN_CURSO"
                      ? "bg-gold-dim text-gold"
                      : "text-muted border border-line"
                  }`}
                >
                  {label}
                </span>
              </div>
              {d.description && (
                <p className="text-muted text-sm mb-4">{d.description}</p>
              )}
              <ProgressBar percent={progreso} />
              <div className="flex justify-between text-xs text-muted mt-2 mb-4">
                <span>
                  {d.status === "DISPONIBLE"
                    ? "Sin empezar"
                    : `Día ${d.currentDay} de ${d.totalDays}`}
                </span>
                <span className="text-gold font-semibold">+{d.points} pts</span>
              </div>
              <DesafioBoton id={d.id} status={d.status} />
            </Card>
          );
        })}
      </div>
    </>
  );
}