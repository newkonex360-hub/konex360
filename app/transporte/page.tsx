import { AlertTriangle, BusFront, Clock3, TrainFront } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";

const alertTypes = [
  { icon: BusFront, title: "Tranvia y bus", text: "Espacio preparado para avisos de LVB y MDV." },
  { icon: TrainFront, title: "S-Bahn y tren", text: "Estructura lista para Deutsche Bahn y MRB." },
  { icon: AlertTriangle, title: "Alertas importantes", text: "Desvios, obras, suspensiones, eventos y retrasos." }
];

export default function TransportePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Transporte</p>
              <h1 className="h2">Alertas y orientacion para moverse por Leipzig</h1>
              <p className="lead">La seccion queda preparada para mostrar avisos revisados antes de publicarse.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {alertTypes.map(({ icon: Icon, title, text }) => (
                <article className="card p-5" key={title}>
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-xl font-black text-[var(--navy)]">{title}</h2>
                  <p className="mt-3 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5">
              <div className="flex items-center gap-3 font-black text-[var(--navy)]">
                <Clock3 aria-hidden="true" />
                No hay alertas publicadas por ahora.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
