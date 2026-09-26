import { getEntradas } from "./actions";
import DiarioClient from "./DiarioClient";

export default async function DiarioPage() {
  const entradas = await getEntradas();
  return <DiarioClient entradas={entradas} />;
}