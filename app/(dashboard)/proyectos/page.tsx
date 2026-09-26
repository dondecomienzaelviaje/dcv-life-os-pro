import { getProyectos } from "./actions";
import ProyectosClient from "./ProyectosClient";

export default async function ProyectosPage() {
  const proyectos = await getProyectos();
  return <ProyectosClient proyectos={proyectos} />;
}