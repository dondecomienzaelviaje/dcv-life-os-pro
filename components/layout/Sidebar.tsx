"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
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
  { label: "Tienda DCV", href: "https://tienda.dcvcorp.com", external: true },
  { label: "Perfil", href: "/perfil" },
  { label: "Configuración", href: "/configuracion" },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  if (item.external) {
    return ( <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm px-3 py-2.5 rounded-lg transition-colors text-muted hover:bg-surface-2 hover:text-white flex items-center justify-between"
      >
        {item.label}
        <span className="text-[11px] opacity-60">↗</span>
      </a>
    );
  }

  return (
    <Link
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
}

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
        {NAV_ITEMS.map((item) => (
          <div key={item.href}>
            <NavLink item={item} active={pathname === item.href} />
          </div>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <UserButton />
      </div>
    </aside>
  );
}