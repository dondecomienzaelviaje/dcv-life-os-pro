import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function ProyectosPage() {
  return (
    <>
      <Header title="Proyectos" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirá la gestión de proyectos personales, con estado y progreso.
        </p>
      </Card>
    </>
  );
}