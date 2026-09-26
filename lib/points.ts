import { prisma } from "./prisma";

export const PUNTOS = {
  TAREA: 10,
  HABITO: 5,
  META: 100,
  DESAFIO: 250,
  LIBRO: 50,
} as const;

const NIVELES = [
  { level: 1, name: "Explorador", minPoints: 0 },
  { level: 2, name: "Iniciador", minPoints: 100 },
  { level: 3, name: "Disciplinado", minPoints: 300 },
  { level: 4, name: "Constructor", minPoints: 600 },
  { level: 5, name: "Impulsor", minPoints: 1000 },
  { level: 6, name: "Líder", minPoints: 1500 },
  { level: 7, name: "Maestro", minPoints: 2500 },
];

export function calcularNivel(points: number) {
  let nivel = NIVELES[0];
  for (const n of NIVELES) {
    if (points >= n.minPoints) nivel = n;
  }
  return nivel;
}

export function siguienteNivel(points: number) {
  return NIVELES.find((n) => n.minPoints > points) ?? null;
}

export async function otorgarPuntos(userId: string, cantidad: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { points: { increment: cantidad } },
  });

  const nivel = calcularNivel(user.points);
  if (nivel.level !== user.level) {
    await prisma.user.update({
      where: { id: userId },
      data: { level: nivel.level },
    });
  }
}