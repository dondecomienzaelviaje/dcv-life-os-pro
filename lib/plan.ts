export const RUTAS_GRATIS = ["/dia", "/tareas", "/habitos", "/perfil", "/configuracion"];

export function requierePro(pathname: string) {
  return !RUTAS_GRATIS.some((r) => pathname.startsWith(r));
}