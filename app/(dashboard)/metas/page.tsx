import { getMetas } from "./actions";
import MetasClient from "./MetasClient";

export default async function MetasPage() {
  const metas = await getMetas();
  return <MetasClient metas={metas} />;
}