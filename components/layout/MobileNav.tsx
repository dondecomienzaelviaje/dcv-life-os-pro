"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { NAV_ITEMS } from "./Sidebar";

export default function MobileNav() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface px-4 py-3.5">
        <div className="font-display font-bold text-[15px] tracking-tight">
          DCV <span className="text-gold">LIFE OS</span>
        </div>
        <button
          onClick={() => setAbierto(true)}
          aria-label="Abrir menú"
          className="flex flex-col justify-center gap-[5px] w-8 h-8 items-center"
        >
          <span className="block w-5 h-[1.5px] bg-white" />
          <span className="block w-5 h-[1.5px] bg-white" />
          <span className="block w-5 h-[1.5px] bg-white" />
        </button>
      </header>

      {abierto && (
        <div className="md:hidden fixed inset-0 z-30 bg-bg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-line">
            <div className="font-display font-bold text-[15px] tracking-tight">
              DCV <span className="text-gold">LIFE OS</span>
            </div>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar menú"
              className="text-2xl leading-none text-muted w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = !item.external && pathname === item.href;

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setAbierto(false)}
                    className="text-sm px-3 py-3 rounded-lg text-muted hover:bg-surface-2 hover:text-white flex items-center justify-between"
                  >
                    {item.label}
                    <span className="text-[11px] opacity-60">↗</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setAbierto(false)}
                  className={`text-sm px-3 py-3 rounded-lg transition-colors ${
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

          <div className="px-4 py-4 border-t border-line">
            <UserButton />
          </div>
        </div>
      )}
    </>
  );
}