import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function FinanzasPage() {
  return (
    <>
      <Header title="Finanzas" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirá el control de ingresos, gastos, ahorros y deudas.
        </p>
      </Card>
    </>
  );
}