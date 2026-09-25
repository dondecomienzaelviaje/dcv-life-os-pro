import Card from "@/components/ui/Card";
import { getProyectos } from "./actions";
import ProyectoItem from "./ProyectoItem";

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Proyectos</h1>
          <p className="text-muted text-sm mt-1.5">
            Lo que estás construyendo, con seguimiento de avance real.
          </p>
        </div>
      </div>

      {proyectos.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes proyectos. ¡Crea el primero!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {proyectos.map((p) => (
            <ProyectoItem key={p.id} proyecto={p} />
          ))}
        </div>
      )}
    </>
  );
}