import Card from "@/components/ui/Card";
import { getOrCreateUser } from "@/lib/current-user";
import { calcularNivel, siguienteNivel } from "@/lib/points";

export default async function PerfilPage() {
  const user = await getOrCreateUser();

  const puntos = user?.points ?? 0;
  const nivel = calcularNivel(puntos);
  const proximoNivel = siguienteNivel(puntos);

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Perfil</h1>
        <p className="text-muted text-sm mt-1.5">Tu cuenta dentro del ecosistema DCV.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 flex flex-col items-center text-center py-8">
          <div className="w-20 h-20 rounded-full bg-gold-dim text-gold font-display font-bold text-2xl flex items-center justify-center mb-4">
            {(user?.name ?? "U").charAt(0).toUpperCase()}
          </div>
          <h2 className="font-display font-semibold">{user?.name ?? "Usuario"}</h2>
          <p className="text-muted text-sm">{user?.email ?? "—"}</p>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="text-sm font-semibold mb-4">Tu progreso</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-muted mb-1.5">Nivel</div>
              <div className="font-display text-lg font-semibold text-gold">
                0{nivel.level} — {nivel.name}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1.5">Puntos DCV</div>
              <div className="font-display text-lg font-semibold">
                {puntos.toLocaleString("es-CO")}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1.5">Racha</div>
              <div className="font-display text-lg font-semibold">
                {user?.streak ?? 0} días
              </div>
            </div>
          </div>
          {proximoNivel && (
            <div>
              <div className="flex justify-between text-xs text-muted mb-1.5">
                <span>Próximo nivel: {proximoNivel.name}</span>
                <span>
                  {puntos} / {proximoNivel.minPoints}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{
                    width: `${Math.min(100, (puntos / proximoNivel.minPoints) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
          <div className="text-[11px] text-muted mt-5 pt-5 border-t border-line">
            Identidad gestionada por DCV ID — cambios de nombre, correo o foto se hacen desde tu cuenta DCV.
          </div>
        </Card>
      </div>
    </>
  );
}