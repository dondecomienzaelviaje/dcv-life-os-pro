import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function DiarioPage() {
  return (
    <>
      <Header title="Diario" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirán tus entradas de diario: reflexiones personales con fecha y etiquetas.
        </p>
      </Card>
    </>
  );
}