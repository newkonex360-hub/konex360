import Image from "next/image";
import { CircleCheck, CircleX, Flag, HeartHandshake, Megaphone } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";
import { T } from "@/app/_components/T";

const facts = [
  "Son superficies con relieve que se detectan con baston blanco o con los pies.",
  "Ayudan a orientarse en estaciones, aceras, cruces y espacios publicos.",
  "Aumentan la autonomia porque permiten seguir rutas seguras.",
  "Cuando se bloquean, una persona puede perder una referencia esencial del camino."
];

const donts = [
  "Estacionar bicicletas sobre las guias.",
  "Colocar patinetes electricos sobre las guias.",
  "Bloquear el paso con mercancias.",
  "Permanecer de pie sobre ellas sin necesidad.",
  "Usarlas como zona de espera."
];

const dos = [
  "Mantener las guias libres.",
  "Explicar su funcion a los ninos.",
  "Ayudar cuando sea necesario.",
  "Respetar la accesibilidad urbana.",
  "Reportar obstaculos peligrosos."
];

export default function LotsePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="relative min-h-[86vh] overflow-hidden bg-[#0B3C5D] text-white">
          <Image src="/lotse-campaign-hero.png" alt="Persona usando una guia podotactil libre de obstaculos." fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#0B3C5D]/76" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/86 to-transparent" />
          <div className="container relative grid min-h-[86vh] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="eyebrow text-[#FFB199]"><T k="nav.lotse" /></p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl"><T k="lotse.title" /></h1>
              <p className="mt-6 text-lg text-white/88 md:text-2xl">
                <T k="lotse.subtitle" />
              </p>
              <a className="btn btn-primary mt-8" href="#campana">
                <Megaphone aria-hidden="true" size={18} />
                <T k="lotse.cta" />
              </a>
            </div>

            <div className="justify-self-center rounded-lg border border-white/20 bg-white p-5 text-[#0B3C5D] shadow-2xl">
              <Image src="/lotse-mascot.png" alt="Mascota oficial Lotse." width={360} height={360} className="aspect-square w-64 rounded-lg object-cover md:w-80" />
              <p className="mt-4 text-center text-xl font-black"><T k="lotse.mascot" /></p>
            </div>
          </div>
        </section>

        <section id="campana" className="section bg-white">
          <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="section-heading">
              <p className="eyebrow"><T k="lotse.why" /></p>
              <h2 className="h2"><T k="lotse.whyHeading" /></h2>
              <p className="lead"><T k="lotse.whyLead" /></p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact, index) => (
                <article className="card p-5" key={fact}>
                  <span className="icon-tile">
                    <Flag aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[var(--navy)]">Clave {index + 1}</h3>
                  <p className="mt-2 text-[var(--muted)]">{fact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow"><T k="lotse.donts" /></p>
              <h2 className="h2"><T k="lotse.dontsHeading" /></h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {donts.map((item) => (
                <article className="card border-l-4 border-l-[#C1121F] p-5" key={item}>
                  <CircleX className="text-[#C1121F]" aria-hidden="true" size={34} />
                  <p className="mt-4 font-bold text-[var(--navy)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow"><T k="lotse.dos" /></p>
              <h2 className="h2"><T k="lotse.dosHeading" /></h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {dos.map((item) => (
                <article className="card border-l-4 border-l-[#138A36] p-5" key={item}>
                  <CircleCheck className="text-[#138A36]" aria-hidden="true" size={34} />
                  <p className="mt-4 font-bold text-[var(--navy)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[#0B3C5D] text-white">
          <div className="container grid gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-white/20 p-6">
              <HeartHandshake aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black"><T k="lotse.schools" /></h2>
              <p className="mt-3 text-white/82"><T k="lotse.schoolsText" /></p>
            </article>
            <article className="rounded-lg border border-white/20 p-6">
              <HeartHandshake aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black"><T k="lotse.newcomers" /></h2>
              <p className="mt-3 text-white/82"><T k="lotse.newcomersText" /></p>
            </article>
          </div>
          <div className="container mt-10 border-t border-white/20 pt-8">
            <p className="text-2xl font-black"><T k="lotse.footer" /></p>
          </div>
        </section>
      </main>
    </>
  );
}
