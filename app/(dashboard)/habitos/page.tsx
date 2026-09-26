import { getHabitos } from "./actions";
import HabitosClient from "./HabitosClient";

export default async function HabitosPage() {
  const habitos = await getHabitos();
  return <HabitosClient habitos={habitos} />;
}