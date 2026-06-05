"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Accessibility,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  BusFront,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock3,
  Flag,
  Globe2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  Languages,
  MapPin,
  Megaphone,
  MessageCircle,
  Newspaper,
  Recycle,
  Search,
  Share2,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const languages = [
  { code: "es", label: "EspaÃ±ol" },
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "ar", label: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©" },
  { code: "ru", label: "Ð ÑƒÑÑÐºÐ¸Ð¹" },
  { code: "uk", label: "Ð£ÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ°" }
];

const copy = {
  es: {
    slogan: "Conectando culturas, construyendo comunidad",
    intro:
      "Noticias verificadas, recursos de integraciÃ³n y campaÃ±as educativas para vivir, participar y prosperar en Alemania.",
    news: "Noticias",
    integration: "IntegraciÃ³n",
    campaigns: "CampaÃ±as Sociales",
    events: "Eventos"
  },
  de: {
    slogan: "Kulturen verbinden, Gemeinschaft gestalten",
    intro:
      "Verifizierte Nachrichten, Integrationsressourcen und Bildungskampagnen fuer ein aktives Leben in Deutschland.",
    news: "Nachrichten",
    integration: "Integration",
    campaigns: "Soziale Kampagnen",
    events: "Veranstaltungen"
  },
  en: {
    slogan: "Connecting cultures, building community",
    intro:
      "Verified news, integration resources and educational campaigns for living, participating and thriving in Germany.",
    news: "News",
    integration: "Integration",
    campaigns: "Social Campaigns",
    events: "Events"
  },
  ar: {
    slogan: "Ù†ØµÙ„ Ø§Ù„Ø«Ù‚Ø§ÙØ§Øª ÙˆÙ†Ø¨Ù†ÙŠ Ø§Ù„Ù…Ø¬ØªÙ…Ø¹",
    intro:
      "Ø£Ø®Ø¨Ø§Ø± Ù…ÙˆØ«ÙˆÙ‚Ø© ÙˆÙ…ÙˆØ§Ø±Ø¯ Ù„Ù„Ø§Ù†Ø¯Ù…Ø§Ø¬ ÙˆØ­Ù…Ù„Ø§Øª ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ù„Ù„Ø­ÙŠØ§Ø© ÙˆØ§Ù„Ù…Ø´Ø§Ø±ÙƒØ© ÙÙŠ Ø£Ù„Ù…Ø§Ù†ÙŠØ§.",
    news: "Ø§Ù„Ø£Ø®Ø¨Ø§Ø±",
    integration: "Ø§Ù„Ø§Ù†Ø¯Ù…Ø§Ø¬",
    campaigns: "Ø­Ù…Ù„Ø§Øª Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ©",
    events: "Ø§Ù„ÙØ¹Ø§Ù„ÙŠØ§Øª"
  },
  ru: {
    slogan: "Ð¡Ð¾ÐµÐ´Ð¸Ð½ÑÐµÐ¼ ÐºÑƒÐ»ÑŒÑ‚ÑƒÑ€Ñ‹, ÑÑ‚Ñ€Ð¾Ð¸Ð¼ ÑÐ¾Ð¾Ð±Ñ‰ÐµÑÑ‚Ð²Ð¾",
    intro:
      "ÐŸÑ€Ð¾Ð²ÐµÑ€ÐµÐ½Ð½Ñ‹Ðµ Ð½Ð¾Ð²Ð¾ÑÑ‚Ð¸, Ñ€ÐµÑÑƒÑ€ÑÑ‹ Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ð¸ Ð¸ Ð¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ ÐºÐ°Ð¼Ð¿Ð°Ð½Ð¸Ð¸ Ð´Ð»Ñ Ð¶Ð¸Ð·Ð½Ð¸ Ð² Ð“ÐµÑ€Ð¼Ð°Ð½Ð¸Ð¸.",
    news: "ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸",
    integration: "Ð˜Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ñ",
    campaigns: "Ð¡Ð¾Ñ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ðµ ÐºÐ°Ð¼Ð¿Ð°Ð½Ð¸Ð¸",
    events: "Ð¡Ð¾Ð±Ñ‹Ñ‚Ð¸Ñ"
  },
  uk: {
    slogan: "ÐŸÐ¾Ñ”Ð´Ð½ÑƒÑ”Ð¼Ð¾ ÐºÑƒÐ»ÑŒÑ‚ÑƒÑ€Ð¸, Ð±ÑƒÐ´ÑƒÑ”Ð¼Ð¾ ÑÐ¿Ñ–Ð»ÑŒÐ½Ð¾Ñ‚Ñƒ",
    intro:
      "ÐŸÐµÑ€ÐµÐ²Ñ–Ñ€ÐµÐ½Ñ– Ð½Ð¾Ð²Ð¸Ð½Ð¸, Ñ€ÐµÑÑƒÑ€ÑÐ¸ Ñ–Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ñ–Ñ— Ñ‚Ð° Ð¾ÑÐ²Ñ–Ñ‚Ð½Ñ– ÐºÐ°Ð¼Ð¿Ð°Ð½Ñ–Ñ— Ð´Ð»Ñ Ð¶Ð¸Ñ‚Ñ‚Ñ Ð² ÐÑ–Ð¼ÐµÑ‡Ñ‡Ð¸Ð½Ñ–.",
    news: "ÐÐ¾Ð²Ð¸Ð½Ð¸",
    integration: "Ð†Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ñ–Ñ",
    campaigns: "Ð¡Ð¾Ñ†Ñ–Ð°Ð»ÑŒÐ½Ñ– ÐºÐ°Ð¼Ð¿Ð°Ð½Ñ–Ñ—",
    events: "ÐŸÐ¾Ð´Ñ–Ñ—"
  }
};

const newsCategories = [
  "Leipzig",
  "EducaciÃ³n",
  "Empleo",
  "Vivienda",
  "Salud",
  "IntegraciÃ³n"
];

const news = [
  {
    tag: "Leipzig",
    title: "Nuevos puntos de asesorÃ­a para familias reciÃ©n llegadas",
    text: "Una guÃ­a rÃ¡pida sobre horarios, idiomas disponibles y documentos recomendados antes de acudir.",
    date: "Actualizado hoy"
  },
  {
    tag: "Empleo",
    title: "CÃ³mo preparar un CV alemÃ¡n claro y verificable",
    text: "Plantillas, vocabulario Ãºtil y errores frecuentes al presentar experiencia internacional.",
    date: "GuÃ­a prÃ¡ctica"
  },
  {
    tag: "Salud",
    title: "Primeros pasos para entender el sistema sanitario",
    text: "Seguro mÃ©dico, citas, urgencias y servicios de interpretaciÃ³n comunitaria.",
    date: "Especial integraciÃ³n"
  }
];

type PublishedNews = {
  id: string;
  tag: string;
  title: string;
  text: string;
  date: string;
  source?: string;
  originalUrl?: string;
};

type PublishedTransportAlert = {
  id: string;
  affectedLine: string;
  type: string;
  reason: string;
  text: string;
  source: string;
  originalUrl: string;
};

const recyclingIntegration = [
  {
    title: "SeparaciÃ³n de residuos",
    text: "Aprende quÃ© va en el contenedor azul, amarillo, marrÃ³n, negro y en los puntos de vidrio."
  },
  {
    title: "DepÃ³sito Pfand",
    text: "Botellas y latas con Pfand se devuelven en mÃ¡quinas de supermercados para recuperar el depÃ³sito."
  },
  {
    title: "Convivencia en edificios",
    text: "Respeta horarios de descanso, zonas comunes, buzones, limpieza y normas del contrato de alquiler."
  },
  {
    title: "Primeros trÃ¡mites",
    text: "InformaciÃ³n bÃ¡sica para Anmeldung, seguro mÃ©dico, escuela, cursos de idioma y asesorÃ­a comunitaria."
  }
];

const transportGuides = [
  {
    title: "Billetes y abonos",
    text: "CÃ³mo elegir ticket diario, mensual o Deutschlandticket y validar el viaje cuando corresponde."
  },
  {
    title: "TranvÃ­a y bus",
    text: "Consejos para leer horarios, paradas, conexiones y avisos de cambios en el transporte pÃºblico."
  },
  {
    title: "Bicicleta y patinetes",
    text: "Uso responsable: no bloquear aceras, rampas, entradas ni guÃ­as podotÃ¡ctiles."
  },
  {
    title: "Accesibilidad",
    text: "Prioriza rampas, ascensores, espacios reservados y apoyo a personas con movilidad reducida."
  }
];

const integrationSections = [
  {
    icon: BookOpen,
    title: "Aprender alemÃ¡n",
    text: "Recursos gratuitos, cursos locales, vocabulario prÃ¡ctico y consejos para practicar cada dÃ­a."
  },
  {
    icon: Recycle,
    title: "Vivir en Alemania",
    text: "Reciclaje, convivencia, normas del edificio, horarios de descanso y trÃ¡mites bÃ¡sicos."
  },
  {
    icon: BriefcaseBusiness,
    title: "Empleo",
    text: "CÃ³mo preparar un CV alemÃ¡n, entrevistas, bÃºsqueda laboral y derechos bÃ¡sicos en el trabajo."
  },
  {
    icon: ShieldCheck,
    title: "Vivienda",
    text: "CÃ³mo alquilar, entender contratos, obligaciones, fianza y dÃ³nde buscar asesorÃ­a."
  }
];

const helpDirectory = [
  {
    title: "Ayuda para inmigrantes",
    text: "OrientaciÃ³n inicial, idioma, formularios, acompaÃ±amiento y derivaciÃ³n a servicios locales."
  },
  {
    title: "AsesorÃ­a legal",
    text: "Puntos de contacto para residencia, familia, trabajo, vivienda y situaciones urgentes."
  },
  {
    title: "Centros de empleo",
    text: "InformaciÃ³n para bÃºsqueda laboral, reconocimiento de tÃ­tulos y formaciÃ³n profesional."
  },
  {
    title: "Organizaciones sociales",
    text: "Redes comunitarias, bancos de alimentos, apoyo familiar y actividades de integraciÃ³n."
  },
  {
    title: "Apoyo discapacidad",
    text: "Asociaciones y servicios para accesibilidad, movilidad, inclusiÃ³n y derechos."
  }
];

const tactileGuideFacts = [
  "Son superficies con relieve que se detectan con el bastÃ³n blanco o con los pies.",
  "Ayudan a orientarse en estaciones, aceras, cruces y espacios pÃºblicos.",
  "Aumentan la autonomÃ­a porque permiten seguir rutas seguras sin depender siempre de otra persona.",
  "Son una seÃ±al urbana esencial: cuando se bloquean, una persona puede perder la referencia del camino."
];

const lotseDonts = [
  "Estacionar bicicletas sobre las guÃ­as.",
  "Colocar patinetes elÃ©ctricos sobre las guÃ­as.",
  "Bloquear el paso con mercancÃ­as.",
  "Permanecer de pie sobre ellas sin necesidad.",
  "Utilizarlas como zona de espera."
];

const lotseDos = [
  "Mantener las guÃ­as libres.",
  "Explicar su funciÃ³n a los niÃ±os.",
  "Ayudar cuando sea necesario.",
  "Respetar la accesibilidad urbana.",
  "Reportar obstÃ¡culos peligrosos."
];

const campaignTranslations = ["EspaÃ±ol", "AlemÃ¡n", "InglÃ©s", "Ãrabe", "Ruso", "Ucraniano"];

const futureLotseTopics = [
  "Personas mayores",
  "Perros guÃ­a",
  "Accesibilidad urbana",
  "Diversidad funcional"
];

const lotseValues = ["Respeto", "EmpatÃ­a", "InclusiÃ³n", "Convivencia", "Solidaridad"];

const events = [
  { type: "Cultura", title: "Encuentro intercultural", date: "12 Jun", place: "Leipzig" },
  { type: "Empleo", title: "Feria laboral multilingÃ¼e", date: "19 Jun", place: "Online + presencial" },
  { type: "Curso", title: "IntroducciÃ³n al sistema educativo", date: "24 Jun", place: "Biblioteca municipal" },
  { type: "InclusiÃ³n", title: "Taller de accesibilidad urbana", date: "30 Jun", place: "Leipzig" }
];

type LanguageCode = keyof typeof copy;

export default function HomePage() {
  const [language, setLanguage] = useState<LanguageCode>("es");
  const [query, setQuery] = useState("");
  const [contrast, setContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [activeNews, setActiveNews] = useState(0);
  const [publishedNews, setPublishedNews] = useState<PublishedNews[]>([]);
  const [publishedAlerts, setPublishedAlerts] = useState<PublishedTransportAlert[]>([]);
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

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const client = supabase;

    const loadPublishedContent = async () => {
      const [newsResult, alertResult] = await Promise.all([
        client
          .from("news_items")
          .select("id,title_translated,summary_es,source,original_url,published_at,category")
          .eq("status", "publicado")
          .order("created_at", { ascending: false })
          .limit(8),
        client
          .from("transport_alerts")
          .select("id,affected_line,type,reason,summary_simple,source,original_url")
          .eq("status", "publicado")
          .order("created_at", { ascending: false })
          .limit(8)
      ]);

      if (newsResult.data) {
        setPublishedNews(
          newsResult.data.map((item) => ({
            id: item.id,
            tag: item.category,
            title: item.title_translated,
            text: item.summary_es,
            date: item.published_at ? new Date(item.published_at).toLocaleDateString("es-ES") : "Publicado",
            source: item.source,
            originalUrl: item.original_url
          }))
        );
      }

      if (alertResult.data) {
        setPublishedAlerts(
          alertResult.data.map((item) => ({
            id: item.id,
            affectedLine: item.affected_line,
            type: item.type,
            reason: item.reason,
            text: item.summary_simple,
            source: item.source,
            originalUrl: item.original_url
          }))
        );
      }
    };

    loadPublishedContent().catch(() => undefined);
  }, []);

  const filteredNews = useMemo(() => {
    const availableNews = publishedNews.length ? publishedNews : news.map((item, index) => ({ ...item, id: `local-${index}` }));
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return availableNews;
    }

    return availableNews.filter((item) =>
      `${item.tag} ${item.title} ${item.text}`.toLowerCase().includes(normalized)
    );
  }, [publishedNews, query]);

  const activeNewsIndex = filteredNews.length ? Math.min(activeNews, filteredNews.length - 1) : 0;
  const featuredNews = filteredNews[activeNewsIndex];

  useEffect(() => {
    setActiveNews(0);
  }, [query]);

  const showNextNews = () => {
    setActiveNews((index) => (filteredNews.length ? (index + 1) % filteredNews.length : 0));
  };

  const showPreviousNews = () => {
    setActiveNews((index) =>
      filteredNews.length ? (index - 1 + filteredNews.length) % filteredNews.length : 0
    );
  };

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
              ["Integración", "integracion"],
              ["Campaña Lotse", "lotse"],
              ["Transporte", "transporte"],
              ["Directorio", "directorio"],
              [t.events, "eventos"],
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
            alt="Personas diversas en Alemania, incluyendo una persona usuaria de silla de ruedas y una persona con bastÃ³n blanco junto a guÃ­as tÃ¡ctiles."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0B3C5D]/70" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/82 to-transparent" />
          <div className="container relative flex min-h-[calc(92vh-5rem)] items-center py-16">
            <div className="max-w-3xl">
              <p className="eyebrow text-[#FFB199]">Plataforma comunitaria multilingÃ¼e</p>
              <h1 className="mt-4 text-5xl font-black leading-[1.02] md:text-7xl">Konex360</h1>
              <p className="mt-5 text-2xl font-extrabold leading-tight md:text-4xl">{t.slogan}</p>
              <p className="mt-6 max-w-2xl text-lg text-white/88 md:text-xl">{t.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: t.news, target: "noticias", Icon: Newspaper },
                  { label: "Integración", target: "integracion", Icon: BookOpen },
                  { label: "Campaña Lotse", target: "lotse", Icon: Megaphone },
                  { label: "Transporte", target: "transporte", Icon: BusFront },
                  { label: "Directorio de ayuda", target: "directorio", Icon: HeartHandshake },
                  { label: t.events, target: "eventos", Icon: CalendarDays }
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
                TamaÃ±o de letra
              </button>
            </div>
          </div>
        </section>

        <section id="noticias" className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Noticias verificadas</p>
              <h2 className="h2">InformaciÃ³n local para tomar mejores decisiones</h2>
              <p className="lead">
                Cobertura local enfocada en Leipzig, con informaciÃ³n prÃ¡ctica sobre educaciÃ³n, empleo,
                vivienda, salud e integraciÃ³n.
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

            {featuredNews ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <article className="card overflow-hidden">
                  <div className="grid min-h-[360px] md:grid-cols-[0.9fr_1.1fr]">
                    <div className="bg-[#0B3C5D] p-6 text-white">
                      <span className="rounded-lg bg-[#FF6B35] px-3 py-1 text-sm font-bold">
                        {featuredNews.tag}
                      </span>
                      <h3 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
                        {featuredNews.title}
                      </h3>
                      <p className="mt-4 text-white/82">{featuredNews.text}</p>
                      <p className="mt-6 text-sm font-bold text-white/75">
                        {activeNewsIndex + 1} de {filteredNews.length} Â· {featuredNews.date}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between bg-white p-6">
                      <div>
                        <p className="eyebrow">Carrusel de noticias</p>
                        <h4 className="mt-3 text-2xl font-black text-[var(--navy)]">
                          InformaciÃ³n Ãºtil para Leipzig
                        </h4>
                        <p className="mt-3 text-[var(--muted)]">
                          Avanza entre titulares importantes y comparte la informaciÃ³n con tu comunidad.
                        </p>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-2">
                        <button className="btn btn-outline" type="button" onClick={showPreviousNews} aria-label="Noticia anterior">
                          <ArrowLeft aria-hidden="true" size={18} />
                        </button>
                        <button className="btn btn-outline" type="button" onClick={showNextNews} aria-label="Noticia siguiente">
                          <ArrowRight aria-hidden="true" size={18} />
                        </button>
                        <button className="btn btn-outline" type="button" aria-label={`Compartir: ${featuredNews.title}`}>
                          <Share2 aria-hidden="true" size={18} />
                        </button>
                        <button className="btn btn-outline" type="button" aria-label={`Comentar: ${featuredNews.title}`}>
                          <MessageCircle aria-hidden="true" size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>

                <div className="grid gap-4">
                  {filteredNews.map((item, index) => (
                    <button
                      className={`card p-4 text-left transition ${
                        index === activeNewsIndex ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/30" : ""
                      }`}
                      key={item.title}
                      type="button"
                      onClick={() => setActiveNews(index)}
                    >
                      <span className="text-sm font-black text-[var(--orange)]">{item.tag}</span>
                      <h3 className="mt-2 text-lg font-black text-[var(--navy)]">{item.title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{item.date}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                No hay noticias que coincidan con la bÃºsqueda.
              </p>
            )}
          </div>
        </section>

        <section id="integracion" className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">IntegraciÃ³n</p>
              <h2 className="h2">Recursos para adaptarse a la vida cotidiana en Leipzig</h2>
              <p className="lead">
                GuÃ­as simples para personas reciÃ©n llegadas: reciclaje, convivencia, primeros trÃ¡mites y hÃ¡bitos que
                ayudan a participar mejor en la comunidad.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {integrationSections.map(({ icon: Icon, title, text }) => (
                <article className="card p-5" key={title}>
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-[var(--navy)]">{title}</h3>
                  <p className="mt-3 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-lg border border-[var(--line)] bg-[var(--mist)] p-5">
              <div className="section-heading">
                <p className="eyebrow">Reciclaje dentro de integraciÃ³n</p>
                <h3 className="mt-2 text-2xl font-black text-[var(--navy)]">Una guÃ­a prÃ¡ctica para la vida diaria</h3>
                <p className="lead">
                  Separar residuos, entender el Pfand y respetar las normas de convivencia ayuda a sentirse parte de la comunidad.
                </p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {recyclingIntegration.map((item) => (
                  <article className="rounded-lg bg-white p-4" key={item.title}>
                    <Recycle className="text-[var(--orange)]" aria-hidden="true" />
                    <h4 className="mt-3 font-black text-[var(--navy)]">{item.title}</h4>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="directorio" className="section bg-[var(--mist)]">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="section-heading">
              <p className="eyebrow">Directorio de Ayuda</p>
              <h2 className="h2">DÃ³nde pedir apoyo en Leipzig</h2>
              <p className="lead">
                Un espacio para reunir organizaciones, asesorÃ­a legal, empleo, apoyo social y servicios de inclusiÃ³n.
                Este bloque puede crecer con telÃ©fonos, direcciones, horarios e idiomas disponibles.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {helpDirectory.map((item) => (
                <article className="card flex gap-3 p-4" key={item.title}>
                  <HeartHandshake className="mt-1 shrink-0 text-[var(--orange)]" aria-hidden="true" />
                  <div>
                    <h3 className="font-black text-[var(--navy)]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lotse" className="bg-white">
          <div className="relative min-h-[86vh] overflow-hidden bg-[#0B3C5D] text-white">
            <Image
              src="/lotse-campaign-hero.png"
              alt="Persona con bastÃ³n blanco siguiendo una guÃ­a podotÃ¡ctil libre de obstÃ¡culos."
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0B3C5D]/76" />
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/86 to-transparent" />
            <div className="container relative grid min-h-[86vh] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-3xl">
                <p className="eyebrow text-[#FFB199]">CampaÃ±a Lotse</p>
                <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                  Lotse: PequeÃ±as acciones, gran impacto
                </h2>
                <p className="mt-6 text-lg text-white/88 md:text-2xl">
                  Respetar las guÃ­as podotÃ¡ctiles es respetar la independencia, la seguridad y la dignidad de miles
                  de personas.
                </p>
                <a className="btn btn-primary mt-8" href="#lotse-campana">
                  Conocer la campaÃ±a
                </a>
              </div>

              <div className="justify-self-center rounded-lg border border-white/20 bg-white p-5 text-[#0B3C5D] shadow-2xl">
                <Image
                  src="/lotse-mascot.png"
                  alt="Mascota oficial Lotse, perro guÃ­a amigable de la campaÃ±a de accesibilidad."
                  width={360}
                  height={360}
                  className="aspect-square w-64 rounded-lg object-cover md:w-80"
                />
                <p className="mt-4 text-center text-xl font-black">LOTSE muestra el camino</p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {lotseValues.map((value) => (
                    <span className="rounded-lg bg-[var(--mist)] px-3 py-2 text-center text-sm font-bold" key={value}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="lotse-campana" className="section bg-white">
            <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="section-heading">
                <p className="eyebrow">Â¿Por quÃ© existen?</p>
                <h2 className="h2">Las guÃ­as podotÃ¡ctiles son orientaciÃ³n, seguridad y autonomÃ­a</h2>
                <p className="lead">
                  Son parte de la accesibilidad urbana. Ayudan a personas con discapacidad visual a desplazarse con
                  mayor independencia en estaciones, aceras y espacios pÃºblicos.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {tactileGuideFacts.map((fact, index) => (
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
          </div>

          <div className="section bg-[var(--mist)]">
            <div className="container">
              <div className="section-heading">
                <p className="eyebrow">QuÃ© no debemos hacer</p>
                <h2 className="h2">No bloquees el camino</h2>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {lotseDonts.map((item) => (
                  <article className="card border-l-4 border-l-[#C1121F] p-5" key={item}>
                    <CircleX className="text-[#C1121F]" aria-hidden="true" size={34} />
                    <p className="mt-4 font-bold text-[var(--navy)]">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="section bg-white">
            <div className="container">
              <div className="section-heading">
                <p className="eyebrow">QuÃ© debemos hacer</p>
                <h2 className="h2">PequeÃ±as acciones que abren la ciudad</h2>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {lotseDos.map((item) => (
                  <article className="card border-l-4 border-l-[#168A51] p-5" key={item}>
                    <CircleCheck className="text-[#168A51]" aria-hidden="true" size={34} />
                    <p className="mt-4 font-bold text-[var(--navy)]">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="section bg-[#0B3C5D] text-white">
            <div className="container grid gap-5 lg:grid-cols-2">
              <article className="rounded-lg border border-white/18 bg-white/8 p-6">
                <span className="icon-tile bg-white text-[#0B3C5D]">
                  <GraduationCap aria-hidden="true" />
                </span>
                <p className="eyebrow mt-6 text-[#FFB199]">Mensaje para escuelas</p>
                <h3 className="mt-3 text-3xl font-black">Estas lÃ­neas ayudan a las personas a encontrar su camino.</h3>
                <p className="mt-4 text-white/82">
                  Para niÃ±as y niÃ±os: cuando veas estas lÃ­neas en el suelo, dÃ©jalas libres. Son como un mapa que se
                  puede tocar.
                </p>
              </article>

              <article className="rounded-lg border border-white/18 bg-white/8 p-6">
                <span className="icon-tile bg-white text-[#0B3C5D]">
                  <HandHeart aria-hidden="true" />
                </span>
                <p className="eyebrow mt-6 text-[#FFB199]">Mensaje para nuevos inmigrantes</p>
                <h3 className="mt-3 text-3xl font-black">En Alemania, las guÃ­as podotÃ¡ctiles son parte del respeto urbano.</h3>
                <p className="mt-4 text-white/82">
                  Indican rutas seguras para personas con discapacidad visual. No pongas bicicletas, patinetes,
                  cajas o maletas encima. Si ves un obstÃ¡culo peligroso, repÃ³rtalo cuando sea posible.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {campaignTranslations.map((languageName) => (
                    <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#0B3C5D]" key={languageName}>
                      {languageName}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="bg-white py-10">
            <div className="container flex flex-col gap-6 rounded-lg border border-[var(--line)] p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Image src="/logo.svg" alt="Konex 360" width={170} height={40} className="h-10 w-auto" />
                <Image src="/lotse-mascot.png" alt="Mascota Lotse, perro guÃ­a" width={72} height={72} className="h-16 w-16 rounded-lg object-cover" />
              </div>
              <div>
                <p className="text-2xl font-black text-[var(--navy)]">Una ciudad accesible beneficia a todos.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {futureLotseTopics.map((topic) => (
                    <span className="rounded-lg bg-[var(--mist)] px-3 py-2 text-sm font-bold text-[var(--navy)]" key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="transporte" className="section bg-[var(--mist)]">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="section-heading">
              <p className="eyebrow">Transporte</p>
              <h2 className="h2">Moverse por Leipzig con seguridad y respeto</h2>
              <p className="lead">
                InformaciÃ³n prÃ¡ctica para usar tranvÃ­a, bus, bicicleta y patinetes sin bloquear la accesibilidad de
                otras personas.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {transportGuides.map((item) => (
                <article className="card p-5" key={item.title}>
                  <span className="icon-tile">
                    <BusFront aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-3 text-[var(--muted)]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="alertas" className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Alertas importantes</p>
              <h2 className="h2">Avisos revisados antes de publicarse</h2>
              <p className="lead">
                Los avisos de LVB, MDV, Deutsche Bahn, MRB y Stadt Leipzig se muestran aquÃ­ solo despuÃ©s de revisiÃ³n humana.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {publishedAlerts.length ? (
                publishedAlerts.map((alert) => (
                  <article className="card border-l-4 border-l-[#C1121F] p-5" key={alert.id}>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-[#C1121F]" aria-hidden="true" />
                      <p className="font-black text-[var(--navy)]">
                        {alert.type} Â· LÃ­nea {alert.affectedLine}
                      </p>
                    </div>
                    <p className="mt-2 text-sm font-bold text-[var(--orange)]">{alert.reason} Â· {alert.source}</p>
                    <p className="mt-3 text-[var(--muted)]">{alert.text}</p>
                    <a className="mt-3 inline-block font-bold text-[var(--navy)] underline" href={alert.originalUrl} rel="noreferrer" target="_blank">
                      Fuente original
                    </a>
                  </article>
                ))
              ) : (
                <article className="card p-5 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-[var(--orange)]" aria-hidden="true" />
                    <p className="font-black text-[var(--navy)]">No hay alertas importantes publicadas.</p>
                  </div>
                  <p className="mt-3 text-[var(--muted)]">
                    Cuando el bot de transporte detecte avisos y el equipo los publique, aparecerÃ¡n en esta secciÃ³n.
                  </p>
                </article>
              )}
            </div>
          </div>
        </section>

        <section id="actualizaciones" className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Ãšltimas actualizaciones</p>
              <h2 className="h2">Lo mÃ¡s reciente aprobado por el equipo</h2>
              <p className="lead">
                Un resumen rÃ¡pido de noticias y avisos publicados despuÃ©s de revisiÃ³n editorial.
              </p>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[...filteredNews.slice(0, 2), ...publishedAlerts.slice(0, 1).map((alert) => ({
                id: alert.id,
                tag: "Transporte",
                title: `${alert.type} ${alert.affectedLine}`,
                text: alert.text,
                date: alert.reason
              }))].map((item) => (
                <article className="card p-5" key={item.id}>
                  <div className="flex items-center gap-3">
                    <Clock3 className="text-[var(--orange)]" aria-hidden="true" />
                    <span className="text-sm font-black text-[var(--orange)]">{item.tag}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-3 text-[var(--muted)]">{item.text}</p>
                  <p className="mt-4 text-sm font-bold text-[var(--muted)]">{item.date}</p>
                </article>
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
                Eventos culturales, ferias de empleo, cursos de integraciÃ³n y actividades inclusivas.
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
                title: "MultilingÃ¼e desde el inicio",
                text: "Selector visible para espaÃ±ol, alemÃ¡n, inglÃ©s, Ã¡rabe, ruso y ucraniano, con base lista para contenidos traducidos."
              },
              {
                icon: UsersRound,
                title: "Preparada para comunidad",
                text: "La arquitectura contempla comentarios, chat comunitario, bolsa de empleo, cursos online y asistencia con IA."
              },
              {
                icon: Accessibility,
                title: "Accesible por diseÃ±o",
                text: "Contraste ajustable, navegaciÃ³n por teclado, textos alternativos, estructura semÃ¡ntica y controles visibles."
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
