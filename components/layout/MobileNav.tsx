"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";

export default function MobileNav() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface px-4 py-3.5">
        <div className="font-display font-bold text-[15px] tracking-tight">
          DCV <span className="gold-gradient-text">LIFE OS</span>
        </div>
        <button
          onClick={() => setAbierto(true)}
          aria-label="Abrir menú"
          className="w-8 h-8 flex items-center justify-center text-white"
        >
          <Menu size={20} strokeWidth={1.75} />
        </button>
      </header>

      {abierto && (
        <div className="md:hidden fixed inset-0 z-30 bg-bg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-line">
            <div className="font-display font-bold text-[15px] tracking-tight">
              DCV <span className="gold-gradient-text">LIFE OS</span>
            </div>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar menú"
              className="w-8 h-8 flex items-center justify-center text-muted"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
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
                    onClick={() => setAbierto(false)}
                    className="flex items-center gap-3 text-sm px-3 py-3 rounded-lg text-muted hover:bg-surface-2 hover:text-white"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                    <span className="flex-1">{item.label}</span>
                    <span className="text-[11px] opacity-50">↗</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setAbierto(false)}
                  className={`flex items-center gap-3 text-sm px-3 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-gold-dim text-gold font-semibold"
                      : "text-muted hover:bg-surface-2 hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.75} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t border-line">
            <UserButton />
          </div>
        </div>
      )}
    </>
  );
}