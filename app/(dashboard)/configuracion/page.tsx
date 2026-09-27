import { getOrCreateUser } from "@/lib/current-user";
import ConfiguracionClient from "./ConfiguracionClient";

export default async function ConfiguracionPage() {
  const user = await getOrCreateUser();

  return (
    <ConfiguracionClient
      email={user?.email ?? "—"}
      compactMode={user?.compactMode ?? false}
    />
  );
}