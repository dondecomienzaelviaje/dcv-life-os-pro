"use client";

import { useUser } from "@clerk/nextjs";
import Card from "@/components/ui/Card";

export default function PerfilPage() {
  const { user } = useUser();

  const nombre = user?.fullName || user?.firstName || "Usuario";
  const correo = user?.primaryEmailAddress?.emailAddress || "—";

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Perfil</h1>
        <p className="text-muted text-sm mt-1.5">Tu cuenta dentro del ecosistema DCV.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 flex flex-col items-center text-center py-8">
          <div className="w-20 h-20 rounded-full bg-gold-dim text-gold font-display font-bold text-2xl flex items-center justify-center mb-4">
            {nombre.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-display font-semibold">{nombre}</h2>
          <p className="text-muted text-sm">{correo}</p>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="text-sm font-semibold mb-4">Tu progreso</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted mb-1.5">Nivel</div>
              <div className="font-display text-lg font-semibold text-gold">
                04 — Constructor
              </div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1.5">Puntos DCV</div>
              <div className="font-display text-lg font-semibold">1.280</div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1.5">Racha</div>
              <div className="font-display text-lg font-semibold">12 días</div>
            </div>
          </div>
          <div className="text-[11px] text-muted mt-5 pt-5 border-t border-line">
            Identidad gestionada por DCV ID — cambios de nombre, correo o foto se hacen desde tu cuenta DCV.
          </div>
        </Card>
      </div>
    </>
  );
}