"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Accessibility,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Globe2,
  HeartHandshake,
  Home,
  Languages,
  MapPin,
  Megaphone,
  MessageCircle,
  Newspaper,
  Search,
  Share2,
  ShieldCheck,
  UsersRound
} from "lucide-react";

const languages = [
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Українська" }
];

const copy = {
  es: {
    slogan: "Conectando culturas, construyendo comunidad",
    intro:
      "Noticias verificadas, recursos de integración y campañas educativas para vivir, participar y prosperar en Alemania.",
    news: "Noticias",
    integration: "Integración",
    campaigns: "Campañas Sociales",
    events: "Eventos",
    directory: "Directorio de Ayuda"
  },
  de: {
    slogan: "Kulturen verbinden, Gemeinschaft gestalten",
    intro:
      "Verifizierte Nachrichten, Integrationsressourcen und Bildungskampagnen fuer ein aktives Leben in Deutschland.",
    news: "Nachrichten",
    integration: "Integration",
    campaigns: "Soziale Kampagnen",
    events: "Veranstaltungen",
    directory: "Hilfsverzeichnis"
  },
  en: {
    slogan: "Connecting cultures, building community",
    intro:
      "Verified news, integration resources and educational campaigns for living, participating and thriving in Germany.",
    news: "News",
    integration: "Integration",
    campaigns: "Social Campaigns",
    events: "Events",
    directory: "Help Directory"
  },
  ar: {
    slogan: "نصل الثقافات ونبني المجتمع",
    intro:
      "أخبار موثوقة وموارد للاندماج وحملات تعليمية للحياة والمشاركة في ألمانيا.",
    news: "الأخبار",
    integration: "الاندماج",
    campaigns: "حملات اجتماعية",
    events: "الفعاليات",
    directory: "دليل المساعدة"
  },
  ru: {
    slogan: "Соединяем культуры, строим сообщество",
    intro:
      "Проверенные новости, ресурсы интеграции и образовательные кампании для жизни в Германии.",
    news: "Новости",
    integration: "Интеграция",
    campaigns: "Социальные кампании",
    events: "События",
    directory: "Каталог помощи"
  },
  uk: {
    slogan: "Поєднуємо культури, будуємо спільноту",
    intro:
      "Перевірені новини, ресурси інтеграції та освітні кампанії для життя в Німеччині.",
    news: "Новини",
    integration: "Інтеграція",
    campaigns: "Соціальні кампанії",
    events: "Події",
    directory: "Каталог допомоги"
  }
};

const newsCategories = [
  "Leipzig",
  "Educación",
  "Empleo",
  "Vivienda",
  "Salud",
  "Integración"
];

const news = [
  {
    tag: "Leipzig",
    title: "Nuevos puntos de asesoría para familias recién llegadas",
    text: "Una guía rápida sobre horarios, idiomas disponibles y documentos recomendados antes de acudir.",
    date: "Actualizado hoy"
  },
  {
    tag: "Empleo",
    title: "Cómo preparar un CV alemán claro y verificable",
    text: "Plantillas, vocabulario útil y errores frecuentes al presentar experiencia internacional.",
    date: "Guía práctica"
  },
  {
    tag: "Salud",
    title: "Primeros pasos para entender el sistema sanitario",
    text: "Seguro médico, citas, urgencias y servicios de interpretación comunitaria.",
    date: "Especial integración"
  }
];

const integrationSections = [
  {
    icon: BookOpen,
    title: "Aprender Alemán",
    items: ["Recursos gratuitos", "Cursos", "Consejos para practicar cada día"]
  },
  {
    icon: Home,
    title: "Vivir en Alemania",
    items: ["Reciclaje", "Transporte", "Convivencia", "Educación", "Sistema de salud"]
  },
  {
    icon: BriefcaseBusiness,
    title: "Empleo",
    items: ["CV alemán", "Entrevistas", "Ofertas laborales verificadas"]
  },
  {
    icon: ShieldCheck,
    title: "Vivienda",
    items: ["Cómo alquilar", "Derechos", "Obligaciones", "Contratos"]
  }
];

const campaigns = [
  {
    title: "Respeta las guías táctiles",
    message:
      "No bloquees las guías táctiles. Un pequeño gesto puede marcar una gran diferencia.",
    items: ["Imagen ilustrativa", "Video", "Infografía", "Compartir en redes"]
  },
  {
    title: "La accesibilidad nos beneficia a todos",
    message:
      "Rampas, ascensores, transporte adaptado y espacios públicos accesibles mejoran la vida diaria de toda la comunidad.",
    items: ["Rampas", "Ascensores", "Transporte adaptado", "Espacios públicos"]
  },
  {
    title: "Diversidad funcional, igualdad de oportunidades",
    message:
      "Promovemos empleo, educación y participación social con autonomía, respeto y oportunidades reales.",
    items: ["Empleo", "Educación", "Participación social"]
  }
];

const directory = [
  "Organizaciones sociales",
  "Ayuda para inmigrantes",
  "Asesoría legal",
  "Centros de empleo",
  "Asociaciones para personas con discapacidad"
];

const events = [
  { type: "Cultura", title: "Encuentro intercultural", date: "12 Jun", place: "Leipzig" },
  { type: "Empleo", title: "Feria laboral multilingüe", date: "19 Jun", place: "Online + presencial" },
  { type: "Curso", title: "Introducción al sistema educativo", date: "24 Jun", place: "Biblioteca municipal" },
  { type: "Inclusión", title: "Taller de accesibilidad urbana", date: "30 Jun", place: "Leipzig" }
];

type LanguageCode = keyof typeof copy;

export default function HomePage() {
  const [language, setLanguage] = useState<LanguageCode>("es");
  const [query, setQuery] = useState("");
  const [contrast, setContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", contrast);
    document.body.classList.toggle("font-large", largeText);
  }, [contrast, largeText]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  const filteredNews = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return news;
    }

    return news.filter((item) =>
      `${item.tag} ${item.title} ${item.text}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/20 bg-[#0b3c5d]/95 text-white backdrop-blur">
        <div className="container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <a className="rounded-lg bg-white px-3 py-2" href="#inicio" aria-label="Konex 360 inicio">
            <Image
              src="/logo.svg"
              alt="Konex 360"
              width={172}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {[
              [t.news, "noticias"],
              [t.integration, "integracion"],
              [t.campaigns, "lotse"],
              [t.events, "eventos"],
              [t.directory, "directorio"]
            ].map(([label, target]) => (
              <a
                className="rounded-lg px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10"
                href={`#${target}`}
                key={target}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="language">
              Seleccionar idioma
            </label>
            <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-[#0B3C5D]">
              <Languages aria-hidden="true" size={18} />
              <select
                className="bg-white text-sm font-bold"
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value as LanguageCode)}
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="relative min-h-[92vh] overflow-hidden pt-20 text-white">
          <Image
            src="/konex360-hero.png"
            alt="Personas diversas en Alemania, incluyendo una persona usuaria de silla de ruedas y una persona con bastón blanco junto a guías táctiles."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0B3C5D]/70" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/82 to-transparent" />
          <div className="container relative flex min-h-[calc(92vh-5rem)] items-center py-16">
            <div className="max-w-3xl">
              <p className="eyebrow text-[#FFB199]">Plataforma comunitaria multilingüe</p>
              <h1 className="mt-4 text-5xl font-black leading-[1.02] md:text-7xl">Konex360</h1>
              <p className="mt-5 text-2xl font-extrabold leading-tight md:text-4xl">{t.slogan}</p>
              <p className="mt-6 max-w-2xl text-lg text-white/88 md:text-xl">{t.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: t.news, target: "noticias", Icon: Newspaper },
                  { label: t.integration, target: "integracion", Icon: BookOpen },
                  { label: t.campaigns, target: "lotse", Icon: Megaphone },
                  { label: t.events, target: "eventos", Icon: CalendarDays },
                  { label: t.directory, target: "directorio", Icon: HeartHandshake }
                ].map(({ label, target, Icon }, index) => (
                  <a
                    className={`btn ${index === 0 ? "btn-primary" : "btn-secondary"}`}
                    href={`#${target}`}
                    key={target}
                  >
                    <Icon aria-hidden="true" size={19} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Herramientas de accesibilidad" className="border-b border-[var(--line)] bg-white py-4">
          <div className="container flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-sm font-bold text-[var(--navy)]">
              <Accessibility aria-hidden="true" />
              Accesibilidad WCAG
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-outline" type="button" onClick={() => setContrast((value) => !value)}>
                Alto contraste
              </button>
              <button className="btn btn-outline" type="button" onClick={() => setLargeText((value) => !value)}>
                Tamaño de letra
              </button>
            </div>
          </div>
        </section>

        <section id="noticias" className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Noticias verificadas</p>
              <h2 className="h2">Información local para tomar mejores decisiones</h2>
              <p className="lead">
                Cobertura local enfocada en Leipzig, con información práctica sobre educación, empleo,
                vivienda, salud e integración.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {newsCategories.map((category) => (
                  <button className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-bold text-[var(--navy)]" key={category}>
                    {category}
                  </button>
                ))}
              </div>
              <label className="relative block min-w-64">
                <span className="sr-only">Buscar noticias</span>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true" size={18} />
                <input
                  className="w-full rounded-lg border border-[var(--line)] bg-white py-3 pl-10 pr-3"
                  placeholder="Buscar noticias"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {filteredNews.map((item) => (
                <article className="card p-5" key={item.title}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-lg bg-[#0B3C5D] px-3 py-1 text-sm font-bold text-white">{item.tag}</span>
                    <span className="text-sm font-bold text-[var(--muted)]">{item.date}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-3 text-[var(--muted)]">{item.text}</p>
                  <div className="mt-5 flex gap-2">
                    <button className="btn btn-outline" type="button" aria-label={`Compartir: ${item.title}`}>
                      <Share2 aria-hidden="true" size={18} />
                    </button>
                    <button className="btn btn-outline" type="button" aria-label={`Comentar: ${item.title}`}>
                      <MessageCircle aria-hidden="true" size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="integracion" className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Integración</p>
              <h2 className="h2">Recursos claros para la vida diaria en Alemania</h2>
              <p className="lead">
                Guías pensadas para personas recién llegadas, familias, estudiantes, trabajadores y voluntariado.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {integrationSections.map(({ icon: Icon, title, items }) => (
                <article className="card p-5" key={title}>
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-[var(--navy)]">{title}</h3>
                  <ul className="mt-4 space-y-2 text-[var(--muted)]">
                    {items.map((item) => (
                      <li className="flex gap-2" key={item}>
                        <ChevronRight className="mt-1 shrink-0 text-[var(--orange)]" aria-hidden="true" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lotse" className="section bg-[#0B3C5D] text-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow text-[#FFB199]">LOTSE - Guía hacia la inclusión</p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">
                Respeto, autonomía e inclusión para personas con discapacidad
              </h2>
              <p className="mt-5 text-lg text-white/82">
                Campañas educativas para que la accesibilidad deje de ser una excepción y se convierta en cultura
                cotidiana.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {campaigns.map((campaign, index) => (
                <article className="rounded-lg border border-white/18 bg-white/8 p-5" key={campaign.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF6B35] text-lg font-black">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-2xl font-black">{campaign.title}</h3>
                  <p className="mt-4 text-white/82">{campaign.message}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {campaign.items.map((item) => (
                      <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#0B3C5D]" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="directorio" className="section bg-white">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow">Directorio de Ayuda</p>
              <h2 className="h2">Conecta con apoyo confiable cerca de ti</h2>
              <p className="lead">
                Un directorio preparado para crecer con filtros por ciudad, idioma, tipo de asesoría y accesibilidad.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {directory.map((item) => (
                <a className="card flex items-center gap-3 p-4 font-bold text-[var(--navy)]" href="#" key={item}>
                  <HeartHandshake className="shrink-0 text-[var(--orange)]" aria-hidden="true" />
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="eventos" className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Eventos</p>
              <h2 className="h2">Calendario comunitario</h2>
              <p className="lead">
                Eventos culturales, ferias de empleo, cursos de integración y actividades inclusivas.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {events.map((event) => (
                <article className="card grid grid-cols-[84px_1fr] gap-4 p-4" key={event.title}>
                  <div className="rounded-lg bg-[#0B3C5D] p-3 text-center font-black text-white">
                    <span className="block text-2xl">{event.date.split(" ")[0]}</span>
                    <span className="block text-sm">{event.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[var(--orange)]">{event.type}</p>
                    <h3 className="mt-1 text-xl font-black text-[var(--navy)]">{event.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-[var(--muted)]">
                      <MapPin aria-hidden="true" size={17} />
                      {event.place}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: Globe2,
                title: "Multilingüe desde el inicio",
                text: "Selector visible para español, alemán, inglés, árabe, ruso y ucraniano, con base lista para contenidos traducidos."
              },
              {
                icon: UsersRound,
                title: "Preparada para comunidad",
                text: "La arquitectura contempla comentarios, chat, directorio empresarial, bolsa de empleo, cursos online y asistencia con IA."
              },
              {
                icon: Accessibility,
                title: "Accesible por diseño",
                text: "Contraste ajustable, navegación por teclado, textos alternativos, estructura semántica y controles visibles."
              }
            ].map(({ icon: Icon, title, text }) => (
              <article className="card p-5" key={title}>
                <span className="icon-tile">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black text-[var(--navy)]">{title}</h3>
                <p className="mt-3 text-[var(--muted)]">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#0B3C5D] py-8 text-white">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-black">Konex360</p>
            <p className="text-white/75">Conectando culturas, construyendo comunidad.</p>
          </div>
          <a className="btn btn-primary" href="#inicio">
            Volver arriba
          </a>
        </div>
      </footer>
    </>
  );
}
