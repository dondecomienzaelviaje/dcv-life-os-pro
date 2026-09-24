"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const NAV_ITEMS = [
  { label: "Mi día", href: "/dia" },
  { label: "Tareas", href: "/tareas" },
  { label: "Metas", href: "/metas" },
  { label: "Hábitos", href: "/habitos" },
  { label: "Planificador", href: "/planificador" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Finanzas", href: "/finanzas" },
  { label: "Lecturas", href: "/lecturas" },
  { label: "Diario", href: "/diario" },
  { label: "Desafíos", href: "/desafios" },
  { label: "Progreso", href: "/progreso" },
  { label: "Biblioteca DCV", href: "/biblioteca" },
  { label: "Perfil", href: "/perfil" },
  { label: "Configuración", href: "/configuracion" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-62 shrink-0 flex-col gap-7 border-r border-line bg-surface px-4 py-7">
      <div className="px-2">
        <div className="font-display font-bold text-[17px] tracking-tight">
          DCV <span className="text-gold">LIFE OS</span>
        </div>
        <div className="text-xs text-muted mt-1">Tu sistema operativo personal</div>
      </div>

      <nav className="flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm px-3 py-2.5 rounded-lg transition-colors ${
                active
                  ? "bg-gold-dim text-gold font-semibold"
                  : "text-muted hover:bg-surface-2 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-2">
        <UserButton />
      </div>
    </aside>
  );
}