export default function UpgradePage() {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            DCV LIFE OS PRO
          </p>
          <h1 className="font-display text-3xl font-bold mb-4">
            Este módulo es parte de PRO
          </h1>
          <p className="text-muted text-sm mb-8">
            Desbloquea Metas, Planificador, Proyectos, Finanzas, Lecturas, Diario,
            Desafíos, Progreso y Biblioteca DCV con tu plan PRO.
          </p>
          
           <a href="https://shop.dcvcorp.com"
            className="inline-block bg-gold text-bg text-sm font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Actualizar a PRO
          </a>
          <div className="mt-6">
            <a href="/dia" className="text-muted text-sm hover:text-white transition-colors">
              ← Volver a mi día
            </a>
          </div>
        </div>
      </div>
    );
  }