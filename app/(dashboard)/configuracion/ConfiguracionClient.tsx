"use client";

import { useTransition } from "react";
import { SignOutButton } from "@clerk/nextjs";
import Card from "@/components/ui/Card";
import { toggleCompactMode } from "./actions";

export default function ConfiguracionClient({
  email,
  compactMode,
}: {
  email: string;
  compactMode: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Configuración</h1>
        <p className="text-muted text-sm mt-1.5">Ajusta LIFE OS a tu manera.</p>
      </div>

      <div className="flex flex-col gap-3">
        <Card className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-sm mb-1">Cuenta</h2>
            <p className="text-muted text-sm">{email}</p>
          </div>
          
          <a  href="https://accounts.dcvcorp.com/user"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted border border-line rounded-lg px-3 py-1.5 hover:text-white hover:border-white/20 transition-colors shrink-0"
          >
            Gestionar en DCV ID
          </a>
        </Card>

        <Card className={`flex items-center justify-between gap-4 ${isPending ? "opacity-50" : ""}`}>
          <div>
            <h2 className="font-semibold text-sm mb-1">Apariencia</h2>
            <p className="text-muted text-sm">Modo compacto: menos espacio entre elementos.</p>
          </div>
          <button
            onClick={() => startTransition(() => toggleCompactMode())}
            disabled={isPending}
            className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
              compactMode ? "bg-gold" : "bg-surface-2"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                compactMode ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
        </Card>

        {["Notificaciones", "Privacidad", "Datos"].map((s) => (
          <Card key={s} className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-sm mb-1">{s}</h2>
              <p className="text-muted text-sm">Próximamente.</p>
            </div>
          </Card>
        ))}

        <Card className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-sm mb-1">Cerrar sesión</h2>
            <p className="text-muted text-sm">Salir de tu cuenta DCV ID en este dispositivo.</p>
          </div>
          <SignOutButton>
            <button className="text-xs border border-[#e0a3a3]/40 text-[#e0a3a3] rounded-lg px-3 py-1.5 hover:bg-[#e0a3a3]/10 transition-colors shrink-0">
              Cerrar sesión
            </button>
          </SignOutButton>
        </Card>
      </div>
    </>
  );
}