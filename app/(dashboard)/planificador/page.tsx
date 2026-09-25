import { getTareasPriorizables } from "./actions";
import PlanificadorClient from "./PlanificadorClient";

export default async function PlanificadorPage() {
  const tareas = await getTareasPriorizables();
  return <PlanificadorClient tareas={tareas} />;
}