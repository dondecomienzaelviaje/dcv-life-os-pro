import Card from "@/components/ui/Card";
import { getTareas } from "./actions";
import TareaItem from "./TareaItem";

export default async function TareasPage() {
  const tareas = await getTareas();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Tareas</h1>
          <p className="text-muted text-sm mt-1.5">
            Todo lo que tienes por hacer, en un solo lugar.
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {tareas.map((t, i) => (
          <TareaItem
            key={t.id}
            tarea={t}
            isLast={i === tareas.length - 1}
          />
        ))}
        {tareas.length === 0 && (
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes tareas. ¡Crea la primera!
          </p>
        )}
      </Card>
    </>
  );
}