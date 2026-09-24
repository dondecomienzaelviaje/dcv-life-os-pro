import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function PerfilPage() {
  return (
    <>
      <Header title="Perfil" subtitle="Este módulo está en construcción." />
      <Card>
        <p className="text-muted text-sm">
          Aquí vivirán tus datos de cuenta: nombre, foto, nivel, puntos y racha.
        </p>
      </Card>
    </>
  );
}