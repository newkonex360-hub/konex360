import { CalendarDays, GraduationCap, HeartHandshake, UsersRound } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";

const events = [
  { icon: UsersRound, type: "Cultura", title: "Encuentros interculturales", text: "Actividades para conectar comunidades." },
  { icon: GraduationCap, type: "Cursos", title: "Cursos de integracion", text: "Espacio preparado para cursos y talleres." },
  { icon: HeartHandshake, type: "Inclusion", title: "Actividades inclusivas", text: "Eventos sobre accesibilidad y participacion social." }
];

export default function EventosPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Eventos</p>
              <h1 className="h2">Calendario comunitario Konex360</h1>
              <p className="lead">Estructura lista para eventos culturales, ferias de empleo, cursos y actividades inclusivas.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {events.map(({ icon: Icon, type, title, text }) => (
                <article className="card p-5" key={title}>
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-sm font-black text-[var(--orange)]">{type}</p>
                  <h2 className="mt-2 text-xl font-black text-[var(--navy)]">{title}</h2>
                  <p className="mt-3 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-[var(--line)] bg-[var(--mist)] p-5">
              <CalendarDays aria-hidden="true" className="text-[var(--orange)]" />
              <p className="mt-3 font-bold text-[var(--navy)]">Muy pronto conectaremos esta pagina con el calendario de eventos.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
