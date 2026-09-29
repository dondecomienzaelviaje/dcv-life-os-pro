import { getTareasPriorizables, getTareasSemana, getTareasMes } from "./actions";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import PlanificadorClient from "./PlanificadorClient";

export default async function PlanificadorPage() {
  const user = await getOrCreateUser();
  const tareas = await getTareasPriorizables();
  const tareasSemana = await getTareasSemana();
  const tareasMes = await getTareasMes();

  const agendaHoy = user
    ? await prisma.task.findMany({
        where: { userId: user.id, status: { not: "COMPLETADA" } },
        orderBy: { scheduledTime: "asc" },
      })
    : [];

  return (
    <PlanificadorClient
      tareas={tareas}
      agendaHoy={agendaHoy}
      tareasSemana={tareasSemana}
      tareasMes={tareasMes}
    />
  );
}