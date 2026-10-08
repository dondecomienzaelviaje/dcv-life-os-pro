"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import type { Task } from "@prisma/client";
import { Award, Sparkles, Flame, CalendarDays } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { ciclarEstadoTarea } from "../tareas/actions";

type MiDiaData = {
  userName: string;
  points: number;
  levelName: string;
  levelNumber: number;
  nextLevelName: string | null;
  nextLevelMin: number | null;
  streak: number;
  priorityTasks: Task[];
  habitPercentToday: number;
  weekActivity: boolean[];
};

// getDay(): 0 = domingo
const INICIALES = ["D", "L", "M", "X", "J", "V", "S"];

export default function MiDiaClient({ data }: { data: MiDiaData }) {
  const [isPending, startTransition] = useTransition();
  const [saludo, setSaludo] = useState("Hola");
  const [fecha, setFecha] = useState("");
  const [etiquetas, setEtiquetas] = useState<string[]>([]);

  useEffect(() => {
    const ahora = new Date();
    const hora = ahora.getHours();
    setSaludo(hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches");

    const texto = ahora.toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setFecha(texto.charAt(0).toUpperCase() + texto.slice(1));

    setEtiquetas(
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return INICIALES[d.getDay()];
      })
    );
  }, []);

  const primerNombre = data.userName.split(" ")[0] ?? "";
  const nombre = primerNombre
    ? primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1).toLowerCase()
    : "";

  const completadas = data.priorityTasks.filter((t) => t.status === "COMPLETADA").length;
  const progresoNivel = data.nextLevelMin
    ? Math.min(100, (data.points / data.nextLevelMin) * 100)
    : 100;

  const circunferencia = 2 * Math.PI * 56;
  const offset = circunferencia * (1 - data.habitPercentToday / 100);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {saludo}
            {nombre ? `, ${nombre}` : ""}
          </h1>
          <p className="text-muted text-sm mt-2">
            Construye hoy el progreso que quieres ver mañana.
          </p>
        </div>
        {fecha && (
          <div className="text-xs text-muted border border-line rounded-full px-3 py-1.5 whitespace-nowrap">
            {fecha}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card
          elevated
          className="col-span-2 relative overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 0%, rgba(202,162,74,0.18), transparent 55%), linear-gradient(180deg, var(--color-surface-3), var(--color-surface))",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="icon-chip w-8 h-8 rounded-lg flex items-center justify-center text-gold">
              <Award size={16} strokeWidth={1.75} />
            </span>
            <span className="text-xs text-muted">
              Nivel {String(data.levelNumber).padStart(2, "0")}
            </span>
          </div>
          <div className="font-display text-3xl font-semibold tracking-tight mb-5">
            {data.levelName}
          </div>
          <ProgressBar percent={progresoNivel} />
          <p className="text-xs text-muted mt-2.5 tabular-nums">
            {data.nextLevelName && data.nextLevelMin
              ? `${data.points.toLocaleString("es-CO")} / ${data.nextLevelMin.toLocaleString("es-CO")} puntos para ${data.nextLevelName}`
              : "Has alcanzado el nivel máximo"}
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <span className="icon-chip w-8 h-8 rounded-lg flex items-center justify-center text-gold">
              <Sparkles size={16} strokeWidth={1.75} />
            </span>
            <span className="text-xs text-muted">Puntos DCV</span>
          </div>
          <div className="font-display text-3xl font-semibold tracking-tight tabular-nums">
            {data.points.toLocaleString("es-CO")}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <span className="icon-chip w-8 h-8 rounded-lg flex items-center justify-center text-gold">
              <Flame size={16} strokeWidth={1.75} />
            </span>
            <span className="text-xs text-muted">Racha actual</span>
          </div>
          <div className="font-display text-3xl font-semibold tracking-tight tabular-nums">
            {data.streak}
            <span className="text-sm text-muted font-normal ml-1.5">días</span>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-4">
        <Card className={isPending ? "opacity-50" : ""}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold">Mis 3 prioridades de hoy</h2>
              <p className="text-xs text-muted mt-1">
                Lo único que necesitas mover hacia adelante
              </p>
            </div>
            <span className="text-xs text-gold bg-gold-dim rounded-full px-2.5 py-1 tabular-nums">
              {completadas} / {data.priorityTasks.length}
            </span>
          </div>

          {data.priorityTasks.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8 gap-3">
              <span className="icon-chip w-10 h-10 rounded-xl flex items-center justify-center text-gold">
                <CalendarDays size={18} strokeWidth={1.75} />
              </span>
              <p className="text-muted text-sm max-w-xs">
                Elige hasta 3 tareas que harían de hoy un buen día.
              </p>
              <Link
                href="/planificador"
                className="text-xs font-semibold text-gold border border-gold-dim bg-gold-dim rounded-lg px-3.5 py-2 hover:opacity-80 transition-opacity"
              >
                Elegir en Planificador
              </Link>
            </div>
          ) : (
            data.priorityTasks.map((t, i) => (
              <div
                key={t.id}
                className={`flex items-center gap-3 py-3 ${
                  i < data.priorityTasks.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <button
                  onClick={() => startTransition(() => ciclarEstadoTarea(t.id))}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    t.status === "COMPLETADA"
                      ? "bg-gradient-to-br from-gold-soft to-gold border-transparent text-bg"
                      : "border-muted text-transparent hover:border-gold"
                  }`}
                >
                  ✓
                </button>
                <span
                  className={`flex-1 text-sm transition-colors ${
                    t.status === "COMPLETADA" ? "text-muted line-through" : ""
                  }`}
                >
                  {t.title}
                </span>
                {t.category && (
                  <span className="text-[11px] text-muted border border-line rounded-full px-2 py-0.5">
                    {t.category}
                  </span>
                )}
              </div>
            ))
          )}
        </Card>

        <Card>
          <h2 className="text-sm font-semibold mb-5">Constancia de hoy</h2>
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-[140px] h-[140px]">
              <svg width="140" height="140" viewBox="0 0 132 132" className="-rotate-90">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8c766" />
                    <stop offset="100%" stopColor="#caa24a" />
                  </linearGradient>
                </defs>
                <circle cx="66" cy="66" r="56" fill="none" stroke="#1c1c1c" strokeWidth="10" />
                <circle
                  cx="66"
                  cy="66"
                  r="56"
                  fill="none"
                  stroke="url(#ringGradient)"
                  strokeWidth="10"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.8s ease",
                    filter:
                      data.habitPercentToday > 0
                        ? "drop-shadow(0 0 6px rgba(202,162,74,0.35))"
                        : "none",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <b className="font-display text-3xl tabular-nums">{data.habitPercentToday}%</b>
                <span className="text-[11px] text-muted">hábitos de hoy</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted text-center mb-2.5">Últimos 7 días</div>
              <div className="flex gap-2">
                {data.weekActivity.map((activo, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-md ${
                        activo ? "bg-gradient-to-br from-gold-soft to-gold" : "bg-surface-2"
                      }`}
                    />
                    <span className="text-[10px] text-muted">{etiquetas[i] ?? ""}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}