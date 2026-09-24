import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function ProgresoPage() {
  return (
    <>
      <Header title="Progreso" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirán tus estadísticas generales y gráficos de avance.
        </p>
      </Card>
    </>
  );
}