import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";

export default function ContactoPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-[var(--mist)]">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="section-heading">
              <p className="eyebrow">Contacto</p>
              <h1 className="h2">Hablemos sobre Konex360</h1>
              <p className="lead">Para noticias, alianzas, ayuda comunitaria o campanas sociales, deja tus datos y el equipo podra responder.</p>

              <div className="mt-8 grid gap-3">
                <div className="flex gap-3 rounded-lg bg-white p-4 font-bold text-[var(--navy)]">
                  <Mail aria-hidden="true" className="text-[var(--orange)]" />
                  contacto@konex360.de
                </div>
                <div className="flex gap-3 rounded-lg bg-white p-4 font-bold text-[var(--navy)]">
                  <MapPin aria-hidden="true" className="text-[var(--orange)]" />
                  Leipzig, Alemania
                </div>
                <div className="flex gap-3 rounded-lg bg-white p-4 font-bold text-[var(--navy)]">
                  <Phone aria-hidden="true" className="text-[var(--orange)]" />
                  Canal telefonico pendiente
                </div>
              </div>
            </div>

            <form className="card grid gap-4 p-6">
              <label className="grid gap-2 font-bold text-[var(--navy)]">
                Nombre
                <input className="rounded-lg border border-[var(--line)] px-3 py-3 font-normal" placeholder="Tu nombre" />
              </label>
              <label className="grid gap-2 font-bold text-[var(--navy)]">
                Correo
                <input className="rounded-lg border border-[var(--line)] px-3 py-3 font-normal" placeholder="tu@email.com" type="email" />
              </label>
              <label className="grid gap-2 font-bold text-[var(--navy)]">
                Mensaje
                <textarea className="min-h-36 rounded-lg border border-[var(--line)] px-3 py-3 font-normal" placeholder="Escribe tu mensaje" />
              </label>
              <button className="btn btn-primary" type="button">
                <MessageCircle aria-hidden="true" size={18} />
                Enviar mensaje
              </button>
              <p className="text-sm text-[var(--muted)]">El formulario queda listo visualmente para conectarlo luego con Supabase o correo.</p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
