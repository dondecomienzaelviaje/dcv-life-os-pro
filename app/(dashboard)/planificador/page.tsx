import { getTareasPriorizables, getTareasSemana } from "./actions";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/current-user";
import PlanificadorClient from "./PlanificadorClient";

export default async function PlanificadorPage() {
  const user = await getOrCreateUser();
  const tareas = await getTareasPriorizables();
  const tareasSemana = await getTareasSemana();

  const agendaHoy = user
    ? await prisma.task.findMany({
        where: { userId: user.id, status: { not: "COMPLETADA" } },
        orderBy: { scheduledTime: "asc" },
      })
    : [];

  return (
    <PlanificadorClient tareas={tareas} agendaHoy={agendaHoy} tareasSemana={tareasSemana} />
  );
}