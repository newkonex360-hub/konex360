import Link from "next/link";
import { Megaphone, Recycle, ShieldCheck } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";

const campaigns = [
  {
    title: "Lotse: pequenas acciones, gran impacto",
    text: "Campana para respetar las guias podotactiles y proteger la autonomia de personas con discapacidad visual.",
    href: "/campana-lotse",
    icon: ShieldCheck
  },
  {
    title: "Reciclar bien tambien es integrarse",
    text: "Guia comunitaria sobre separacion de residuos, Pfand y convivencia responsable.",
    href: "/integracion",
    icon: Recycle
  }
];

export default function CampanasPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Campanas sociales</p>
              <h1 className="h2">Sensibilizacion, inclusion y vida comunitaria</h1>
              <p className="lead">Konex360 prepara campanas educativas para una ciudad mas accesible, respetuosa y facil de entender.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {campaigns.map(({ title, text, href, icon: Icon }) => (
                <article className="card p-6" key={title}>
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-2xl font-black text-[var(--navy)]">{title}</h2>
                  <p className="mt-3 text-[var(--muted)]">{text}</p>
                  <Link className="btn btn-primary mt-6" href={href}>
                    <Megaphone aria-hidden="true" size={18} />
                    Ver campana
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
