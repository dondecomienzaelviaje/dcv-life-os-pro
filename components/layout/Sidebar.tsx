"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Home,
  CheckSquare,
  Target,
  Flame,
  CalendarDays,
  FolderKanban,
  Wallet,
  BookOpen,
  NotebookPen,
  Trophy,
  TrendingUp,
  Library,
  ShoppingBag,
  User,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Mi día", href: "/dia", icon: Home },
  { label: "Tareas", href: "/tareas", icon: CheckSquare },
  { label: "Metas", href: "/metas", icon: Target },
  { label: "Hábitos", href: "/habitos", icon: Flame },
  { label: "Planificador", href: "/planificador", icon: CalendarDays },
  { label: "Proyectos", href: "/proyectos", icon: FolderKanban },
  { label: "Finanzas", href: "/finanzas", icon: Wallet },
  { label: "Lecturas", href: "/lecturas", icon: BookOpen },
  { label: "Diario", href: "/diario", icon: NotebookPen },
  { label: "Desafíos", href: "/desafios", icon: Trophy },
  { label: "Progreso", href: "/progreso", icon: TrendingUp },
  { label: "Biblioteca DCV", href: "https://biblioteca.dcvcorp.com", icon: Library, external: true },
  { label: "Tienda DCV", href: "https://shop.dcvcorp.com", icon: ShoppingBag, external: true },
  { label: "Perfil", href: "/perfil", icon: User },
  { label: "Configuración", href: "/configuracion", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-7 border-r border-line bg-surface px-3 py-7">
      <div className="px-3">
        <div className="font-display font-bold text-[17px] tracking-tight">
          DCV <span className="gold-gradient-text">LIFE OS</span>
        </div>
        <div className="text-xs text-muted mt-1">Tu sistema operativo personal</div>
      </div>

      <nav className="flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = !item.external && pathname === item.href;
          const Icon = item.icon;

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg transition-colors text-muted hover:bg-surface-2 hover:text-white"
              >
                <Icon size={16} strokeWidth={1.75} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                <span className="text-[11px] opacity-50">↗</span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg transition-colors ${
                active
                  ? "bg-gold-dim text-gold font-semibold"
                  : "text-muted hover:bg-surface-2 hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-gold-soft to-gold" />
              )}
              <Icon size={16} strokeWidth={1.75} className="shrink-0" />
              <span>{item.label}</span>
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