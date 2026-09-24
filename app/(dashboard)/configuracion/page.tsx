import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function ConfiguracionPage() {
  return (
    <>
      <Header title="Configuración" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirán las preferencias de cuenta, apariencia y notificaciones.
        </p>
      </Card>
    </>
  );
}