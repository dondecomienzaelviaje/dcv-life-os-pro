"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MOBILE_ITEMS = [
  { label: "Mi día", href: "/dia" },
  { label: "Tareas", href: "/tareas" },
  { label: "Metas", href: "/metas" },
  { label: "Hábitos", href: "/habitos" },
  { label: "Progreso", href: "/progreso" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex justify-around border-t border-line bg-surface px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {MOBILE_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[11px] px-3 py-1.5 rounded-lg ${
              active ? "text-gold font-semibold" : "text-muted"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}