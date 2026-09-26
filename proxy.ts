import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};