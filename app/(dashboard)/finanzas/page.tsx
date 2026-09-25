import { getTransacciones } from "./actions";
import FinanzasClient from "./FinanzasClient";

export default async function FinanzasPage() {
  const transacciones = await getTransacciones();
  return <FinanzasClient transacciones={transacciones} />;
}