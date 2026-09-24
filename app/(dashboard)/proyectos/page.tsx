import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

type Estado = "Idea" | "Planificación" | "En progreso" | "Pausado" | "Completado";

const ESTADO_BADGE: Record<Estado, "gold" | "warning" | "success"> = {
  Idea: "warning",
  Planificación: "warning",
  "En progreso": "gold",
  Pausado: "warning",
  Completado: "success",
};

const PROYECTOS = [
  {
    nombre: "Lanzamiento DCV LIFE OS PRO",
    descripcion: "Construir y desplegar la versión 1.0 de la app.",
    estado: "En progreso" as Estado,
    progreso: 35,
    tareas: "5 / 14 tareas",
    meta: "Lanzar DCV LIFE OS",
  },
  {
    nombre: "Optimizar sección de compra DCV Shop",
    descripcion: "Mejorar el checkout y agregar Puntos DCV visibles.",
    estado: "Pausado" as Estado,
    progreso: 60,
    tareas: "6 / 10 tareas",
    meta: "Lanzar DCV Shop",
  },
  {
    nombre: "Auditoría Biblioteca DCV",
    descripcion: "SEO, rendimiento y contenido del sitio de recursos.",
    estado: "Completado" as Estado,
    progreso: 100,
    tareas: "8 / 8 tareas",
    meta: "—",
  },
];

export default function ProyectosPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Proyectos</h1>
          <p className="text-muted text-sm mt-1.5">
            Lo que estás construyendo, con seguimiento de avance real.
          </p>
        </div>
        <button className="bg-gold text-bg text-sm font-semibold rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity">
          + Nuevo proyecto
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {PROYECTOS.map((p) => (
          <Card key={p.nombre}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="font-display font-semibold text-[15px]">{p.nombre}</h2>
              <Badge variant={ESTADO_BADGE[p.estado]}>{p.estado}</Badge>
            </div>
            <p className="text-muted text-sm mb-4">{p.descripcion}</p>
            <ProgressBar percent={p.progreso} />
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>{p.tareas}</span>
              <span className="text-gold font-semibold">{p.progreso}%</span>
            </div>
            <div className="text-[11px] text-muted mt-3.5 pt-3.5 border-t border-line">
              Meta relacionada: {p.meta}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}