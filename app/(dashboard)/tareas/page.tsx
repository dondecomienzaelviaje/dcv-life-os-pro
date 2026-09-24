import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function TareasPage() {
  return (
    <>
      <Header title="Tareas" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirá el sistema de tareas: crear, editar, completar y organizar por prioridad.
        </p>
      </Card>
    </>
  );
}