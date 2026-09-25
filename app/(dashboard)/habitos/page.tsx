import Card from "@/components/ui/Card";
import { getHabitos } from "./actions";
import HabitoCard from "./HabitoCard";

export default async function HabitosPage() {
  const habitos = await getHabitos();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Mis hábitos</h1>
          <p className="text-muted text-sm mt-1.5">
            La constancia diaria es lo que construye el nivel siguiente.
          </p>
        </div>
      </div>

      {habitos.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes hábitos. ¡Crea el primero!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {habitos.map((h: Awaited<ReturnType<typeof getHabitos>>[number]) => (
            <HabitoCard key={h.id} habito={h} />
          ))}
        </div>
      )}
    </>
  );
}