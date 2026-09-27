import { getTareas } from "./actions";
import TareasClient from "./TareasClient";

export default async function TareasPage() {
  const tareas = await getTareas();
  return <TareasClient tareas={tareas} />;
}