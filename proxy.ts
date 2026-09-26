import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requierePro } from "@/lib/plan";

const isProtectedRoute = createRouteMatcher([
  "/dia(.*)",
  "/tareas(.*)",
  "/metas(.*)",
  "/habitos(.*)",
  "/planificador(.*)",
  "/proyectos(.*)",
  "/finanzas(.*)",
  "/lecturas(.*)",
  "/diario(.*)",
  "/desafios(.*)",
  "/progreso(.*)",
  "/biblioteca(.*)",
  "/perfil(.*)",
  "/configuracion(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  await auth.protect();

  if (requierePro(req.nextUrl.pathname)) {
    const res = await fetch(new URL("/api/plan", req.url), {
      headers: { cookie: req.headers.get("cookie") ?? "" },
    });
    const { plan } = await res.json();

    if (plan !== "PRO") {
      return NextResponse.redirect(new URL("/upgrade", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};