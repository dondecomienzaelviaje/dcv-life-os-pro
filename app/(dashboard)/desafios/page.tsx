import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function DesafiosPage() {
  return (
    <>
      <Header title="Desafíos" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirán los desafíos DCV: 7, 21 y 30 días, con progreso y recompensa.
        </p>
      </Card>
    </>
  );
}