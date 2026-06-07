import Image from "next/image";
import { CircleCheck, CircleX, Flag, HeartHandshake, Megaphone } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";

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
              <p className="eyebrow text-[#FFB199]">Campana Lotse</p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Lotse: Pequenas acciones, gran impacto</h1>
              <p className="mt-6 text-lg text-white/88 md:text-2xl">
                Respetar las guias podotactiles es respetar la independencia, la seguridad y la dignidad de miles de personas.
              </p>
              <a className="btn btn-primary mt-8" href="#campana">
                <Megaphone aria-hidden="true" size={18} />
                Conocer la campana
              </a>
            </div>

            <div className="justify-self-center rounded-lg border border-white/20 bg-white p-5 text-[#0B3C5D] shadow-2xl">
              <Image src="/lotse-mascot.png" alt="Mascota oficial Lotse." width={360} height={360} className="aspect-square w-64 rounded-lg object-cover md:w-80" />
              <p className="mt-4 text-center text-xl font-black">LOTSE muestra el camino</p>
            </div>
          </div>
        </section>

        <section id="campana" className="section bg-white">
          <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="section-heading">
              <p className="eyebrow">Por que existen</p>
              <h2 className="h2">Las guias podotactiles son orientacion, seguridad y autonomia</h2>
              <p className="lead">Son una herramienta urbana clave para personas con discapacidad visual.</p>
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
              <p className="eyebrow">Que no debemos hacer</p>
              <h2 className="h2">No bloquees el camino</h2>
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
              <p className="eyebrow">Que debemos hacer</p>
              <h2 className="h2">Pequenos gestos hacen una ciudad mas segura</h2>
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
              <h2 className="mt-4 text-2xl font-black">Mensaje para escuelas</h2>
              <p className="mt-3 text-white/82">Estas lineas ayudan a las personas a encontrar su camino.</p>
            </article>
            <article className="rounded-lg border border-white/20 p-6">
              <HeartHandshake aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black">Mensaje para nuevos inmigrantes</h2>
              <p className="mt-3 text-white/82">En Alemania, estas guias son parte de la accesibilidad urbana. Respetarlas es convivir mejor.</p>
            </article>
          </div>
          <div className="container mt-10 border-t border-white/20 pt-8">
            <p className="text-2xl font-black">Una ciudad accesible beneficia a todos.</p>
          </div>
        </section>
      </main>
    </>
  );
}
