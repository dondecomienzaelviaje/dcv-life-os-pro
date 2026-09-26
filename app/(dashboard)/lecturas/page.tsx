import { getLibros } from "./actions";
import LecturasClient from "./LecturasClient";

export default async function LecturasPage() {
  const libros = await getLibros();
  return <LecturasClient libros={libros} />;
}