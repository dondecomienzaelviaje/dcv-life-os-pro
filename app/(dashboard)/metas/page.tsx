import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function MetasPage() {
  return (
    <>
      <Header title="Metas" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirá el sistema de metas: crear objetivos, categorías y seguimiento de progreso.
        </p>
      </Card>
    </>
  );
}