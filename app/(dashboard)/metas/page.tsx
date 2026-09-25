import Card from "@/components/ui/Card";
import { getMetas } from "./actions";
import MetaItem from "./MetaItem";

export default async function MetasPage() {
  const metas = await getMetas();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Mis metas</h1>
          <p className="text-muted text-sm mt-1.5">
            Lo que decides perseguir, con seguimiento real de avance.
          </p>
        </div>
      </div>

      {metas.length === 0 ? (
        <Card>
          <p className="text-muted text-sm text-center py-8">
            Aún no tienes metas. ¡Crea la primera!
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {metas.map((m: (typeof metas)[number]) => (
            <MetaItem key={m.id} meta={m} />
          ))}
        </div>
      )}
    </>
  );
}