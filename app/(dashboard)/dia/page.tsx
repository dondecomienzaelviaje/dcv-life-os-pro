import { getMiDia } from "./actions";
import MiDiaClient from "./MiDiaClient";

export default async function DiaPage() {
  const data = await getMiDia();
  return <MiDiaClient data={data} />;
}