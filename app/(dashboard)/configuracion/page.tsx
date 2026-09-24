import Card from "@/components/ui/Card";

const SECCIONES = [
  { titulo: "Cuenta", descripcion: "Nombre, correo y datos gestionados por tu DCV ID." },
  { titulo: "Apariencia", descripcion: "Tema, densidad y preferencias visuales." },
  { titulo: "Notificaciones", descripcion: "Recordatorios de tareas, hábitos y metas próximas a vencer." },
  { titulo: "Privacidad", descripcion: "Qué información compartes dentro del ecosistema DCV." },
  { titulo: "Datos", descripcion: "Exportar o eliminar tu información de LIFE OS." },
];

export default function ConfiguracionPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Configuración</h1>
        <p className="text-muted text-sm mt-1.5">Ajusta LIFE OS a tu manera.</p>
      </div>

      <div className="flex flex-col gap-3">
        {SECCIONES.map((s) => (
          <Card key={s.titulo} className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-sm mb-1">{s.titulo}</h2>
              <p className="text-muted text-sm">{s.descripcion}</p>
            </div>
            <button className="text-xs text-muted border border-line rounded-lg px-3 py-1.5 hover:text-white hover:border-white/20 transition-colors shrink-0">
              Editar
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}