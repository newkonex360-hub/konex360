"use client";

import Image from "next/image";
import Link from "next/link";
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
  MapPin,
  Megaphone,
  Newspaper,
  Recycle,
  Search,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/app/_components/LanguageSelector";
import { articleSelectFields, getLocalizedArticleField, type LocalizedArticle } from "@/lib/articles";
import { normalizeLanguage } from "@/lib/i18n";

const newsCategoryKeys = ["Leipzig", "nav.integration", "nav.recycling", "Empleo", "Vivienda", "Salud"];

type PublishedTransportAlert = {
  id: string;
  affectedLine: string;
  type: string;
  reason: string;
  text: string;
  source: string;
  originalUrl: string;
};

const integrationSections = [
  {
    icon: BookOpen,
    title: "Aprender alemán",
    text: "Recursos gratuitos, cursos locales, vocabulario práctico y consejos para practicar cada día."
  },
  {
    icon: Home,
    title: "Vivir en Alemania",
    text: "Convivencia, normas del edificio, horarios de descanso, sistema de salud y trámites básicos."
  },
  {
    icon: BriefcaseBusiness,
    title: "Empleo",
    text: "Cómo preparar un CV alemán, entrevistas, búsqueda laboral y derechos básicos en el trabajo."
  },
  {
    icon: ShieldCheck,
    title: "Vivienda",
    text: "Cómo alquilar, entender contratos, obligaciones, fianza y dónde buscar asesoría."
  }
];

const recyclingIntegration = [
  {
    title: "Separación de residuos",
    text: "Aprende qué va en el contenedor azul, amarillo, marrón, negro y en los puntos de vidrio."
  },
  {
    title: "Depósito Pfand",
    text: "Botellas y latas con Pfand se devuelven en máquinas de supermercados para recuperar el depósito."
  },
  {
    title: "Convivencia en edificios",
    text: "Respeta horarios de descanso, zonas comunes, buzones, limpieza y normas del contrato."
  },
  {
    title: "Primeros trámites",
    text: "Información básica para Anmeldung, seguro médico, escuela, cursos de idioma y asesoría."
  }
];

const helpDirectory = [
  {
    title: "Ayuda para inmigrantes",
    text: "Orientación inicial, idioma, formularios, acompañamiento y derivación a servicios locales."
  },
  {
    title: "Asesoría legal",
    text: "Puntos de contacto para residencia, familia, trabajo, vivienda y situaciones urgentes."
  },
  {
    title: "Centros de empleo",
    text: "Información para búsqueda laboral, reconocimiento de títulos y formación profesional."
  },
  {
    title: "Organizaciones sociales",
    text: "Redes comunitarias, apoyo familiar, bancos de alimentos y actividades de integración."
  },
  {
    title: "Apoyo discapacidad",
    text: "Asociaciones y servicios para accesibilidad, movilidad, inclusión y derechos."
  }
];

const transportGuides = [
  {
    title: "Billetes y abonos",
    text: "Cómo elegir ticket diario, mensual o Deutschlandticket y validar el viaje cuando corresponde."
  },
  {
    title: "Tranvía y bus",
    text: "Consejos para leer horarios, paradas, conexiones y avisos de cambios en el transporte público."
  },
  {
    title: "Bicicleta y patinetes",
    text: "Uso responsable: no bloquear aceras, rampas, entradas ni guías podotáctiles."
  },
  {
    title: "Accesibilidad",
    text: "Prioriza rampas, ascensores, espacios reservados y apoyo a personas con movilidad reducida."
  }
];

const tactileGuideFacts = [
  "Son superficies con relieve que se detectan con el bastón blanco o con los pies.",
  "Ayudan a orientarse en estaciones, aceras, cruces y espacios públicos.",
  "Aumentan la autonomía porque permiten seguir rutas seguras sin depender siempre de otra persona.",
  "Cuando se bloquean, una persona puede perder la referencia del camino."
];

const lotseDonts = [
  "Estacionar bicicletas sobre las guías.",
  "Colocar patinetes eléctricos sobre las guías.",
  "Bloquear el paso con mercancías.",
  "Permanecer de pie sobre ellas sin necesidad.",
  "Utilizarlas como zona de espera."
];

const lotseDos = [
  "Mantener las guías libres.",
  "Explicar su función a los niños.",
  "Ayudar cuando sea necesario.",
  "Respetar la accesibilidad urbana.",
  "Reportar obstáculos peligrosos."
];

const campaignTranslations = ["Español", "Alemán", "Inglés", "Árabe", "Ruso", "Ucraniano"];
const futureLotseTopics = ["Personas mayores", "Perros guía", "Accesibilidad urbana", "Diversidad funcional"];
const lotseValues = ["Respeto", "Empatía", "Inclusión", "Convivencia", "Solidaridad"];

const events = [
  { type: "Cultura", title: "Encuentro intercultural", date: "12 Jun", place: "Leipzig" },
  { type: "Empleo", title: "Feria laboral multilingüe", date: "19 Jun", place: "Online + presencial" },
  { type: "Curso", title: "Introducción al sistema educativo", date: "24 Jun", place: "Biblioteca municipal" },
  { type: "Inclusión", title: "Taller de accesibilidad urbana", date: "30 Jun", place: "Leipzig" }
];

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const [query, setQuery] = useState("");
  const [contrast, setContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [activeNews, setActiveNews] = useState(0);
  const [articles, setArticles] = useState<LocalizedArticle[]>([]);
  const [supabaseArticleError, setSupabaseArticleError] = useState<string | null>(null);
  const [publishedAlerts, setPublishedAlerts] = useState<PublishedTransportAlert[]>([]);

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
    if (!supabase) return;
    const client = supabase;

    const loadPublishedContent = async () => {
      const [articlesResult, alertResult] = await Promise.all([
        client
          .from("articulos")
          .select(articleSelectFields)
          .eq("estado", "publicado")
          .order("publicado_en", { ascending: false, nullsFirst: false })
          .limit(8),
        client
          .from("transport_alerts")
          .select("id,affected_line,type,reason,summary_simple,source,original_url")
          .eq("status", "publicado")
          .order("created_at", { ascending: false })
          .limit(8)
      ]);

      if (articlesResult.error) {
        setSupabaseArticleError(
          `${articlesResult.error.message}${articlesResult.error.details ? ` Detalles: ${articlesResult.error.details}` : ""}`
        );
      }

      if (articlesResult.data) {
        setArticles(articlesResult.data as unknown as LocalizedArticle[]);
        setSupabaseArticleError(null);
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
    const normalized = query.trim().toLowerCase();
    if (!normalized) return articles;
    return articles.filter((item) => {
      const title = getLocalizedArticleField(item, "titulo", language).text;
      const summary = getLocalizedArticleField(item, "resumen", language).text;
      return `${item.categoria ?? ""} ${title} ${summary}`.toLowerCase().includes(normalized);
    });
  }, [articles, language, query]);

  const activeNewsIndex = filteredNews.length ? Math.min(activeNews, filteredNews.length - 1) : 0;
  const featuredNews = filteredNews[activeNewsIndex];
  const featuredTitle = featuredNews ? getLocalizedArticleField(featuredNews, "titulo", language) : null;
  const featuredSummary = featuredNews ? getLocalizedArticleField(featuredNews, "resumen", language) : null;

  useEffect(() => {
    setActiveNews(0);
  }, [query]);

  useEffect(() => {
    if (filteredNews.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveNews((index) => (index + 1) % filteredNews.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [filteredNews.length]);

  const showNextNews = () => setActiveNews((index) => (filteredNews.length ? (index + 1) % filteredNews.length : 0));
  const showPreviousNews = () =>
    setActiveNews((index) => (filteredNews.length ? (index - 1 + filteredNews.length) % filteredNews.length : 0));

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t("common.readMore")}
      </a>

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/20 bg-[#0b3c5d]/95 text-white backdrop-blur">
        <div className="container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <a className="rounded-lg bg-white px-3 py-2" href="#inicio" aria-label="Konex 360 inicio">
            <Image src="/logo.svg" alt="Konex 360" width={172} height={40} priority className="h-10 w-auto" />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {[
              [t("nav.news"), "/noticias"],
              [t("nav.integration"), "/integracion"],
              [t("nav.lotse"), "/campana-lotse"],
              [t("nav.transport"), "/transporte"],
              [t("nav.directory"), "#directorio"],
              [t("nav.events"), "/eventos"]
            ].map(([label, target]) => (
              <a className="rounded-lg px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10" href={target} key={target}>
                {label}
              </a>
            ))}
          </nav>

          <LanguageSelector />
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="relative min-h-[92vh] overflow-hidden pt-20 text-white">
          <Image
            src="/konex360-hero.png"
            alt="Personas diversas en Alemania participando en la comunidad."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0B3C5D]/70" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/82 to-transparent" />
          <div className="container relative flex min-h-[calc(92vh-5rem)] items-center py-16">
            <div className="max-w-3xl">
              <p className="eyebrow text-[#FFB199]">{t("home.platform")}</p>
              <h1 className="mt-4 text-5xl font-black leading-[1.02] md:text-7xl">Konex 360</h1>
              <p className="mt-5 text-2xl font-extrabold leading-tight md:text-4xl">
                {t("home.slogan")}
              </p>
              <p className="mt-6 max-w-2xl text-lg text-white/88 md:text-xl">
                {t("home.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: t("nav.news"), target: "/noticias", Icon: Newspaper },
                  { label: t("nav.integration"), target: "/integracion", Icon: BookOpen },
                  { label: t("nav.lotse"), target: "/campana-lotse", Icon: Megaphone },
                  { label: t("nav.transport"), target: "/transporte", Icon: BusFront },
                  { label: t("nav.directory"), target: "#directorio", Icon: HeartHandshake },
                  { label: t("nav.events"), target: "/eventos", Icon: CalendarDays }
                ].map(({ label, target, Icon }, index) => (
                  <a className={`btn ${index === 0 ? "btn-primary" : "btn-secondary"}`} href={target} key={target}>
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
              {t("accessibility.title")}
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-outline" type="button" onClick={() => setContrast((value) => !value)}>
                {t("accessibility.contrast")}
              </button>
              <button className="btn btn-outline" type="button" onClick={() => setLargeText((value) => !value)}>
                {t("accessibility.fontSize")}
              </button>
            </div>
          </div>
        </section>

        <section id="noticias" className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t("news.verified")}</p>
              <h2 className="h2">{t("news.heading")}</h2>
              <p className="lead">
                {t("news.lead")}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {newsCategoryKeys.map((category) => (
                  <button className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-bold text-[var(--navy)]" key={category}>
                    {category.includes(".") ? t(category) : category}
                  </button>
                ))}
              </div>
              <label className="relative block min-w-64">
                <span className="sr-only">{t("common.searchNews")}</span>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true" size={18} />
                <input
                  className="w-full rounded-lg border border-[var(--line)] bg-white py-3 pl-10 pr-3"
                  placeholder={t("common.searchNews")}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            {supabaseArticleError ? (
              <div className="mt-6 rounded-lg border border-[#C1121F] bg-white p-5 text-[#8A0F18]" role="alert">
                <p className="font-black">{t("common.supabaseError")}</p>
                <p className="mt-2 text-sm">{supabaseArticleError}</p>
              </div>
            ) : null}

            {featuredNews ? (
              <div className="mt-8">
                <article className="card overflow-hidden">
                  <div className="grid min-h-[560px] lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="relative min-h-[360px] bg-[#0B3C5D] p-6 text-white md:p-8 lg:min-h-[560px]">
                      {featuredNews.imagen_url ? (
                        <img
                          src={featuredNews.imagen_url}
                          alt={featuredTitle?.text ?? ""}
                          className="absolute inset-0 h-full w-full object-cover opacity-48"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[#0B3C5D]/66" />
                      <div className="relative flex min-h-[300px] flex-col justify-end lg:min-h-[496px]">
                        <span className="w-fit rounded-lg bg-[#FF6B35] px-3 py-1 text-sm font-black">{featuredNews.categoria}</span>
                        <h3 className="mt-6 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{featuredTitle?.text}</h3>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between bg-white p-6 md:p-8">
                      <div>
                        <p className="eyebrow">{t("nav.news")}</p>
                        <h4 className="mt-3 text-3xl font-black leading-tight text-[var(--navy)]">{t("news.community")}</h4>
                        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{featuredSummary?.text}</p>
                        {featuredTitle?.isFallback || featuredSummary?.isFallback ? (
                          <span className="mt-4 inline-flex rounded-lg bg-[var(--mist)] px-3 py-2 text-sm font-bold text-[var(--navy)]">
                            {t("common.translationSoon")}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-8 flex flex-wrap items-center gap-2">
                        <button className="btn btn-outline" type="button" onClick={showPreviousNews} aria-label="Noticia anterior">
                          <ArrowLeft aria-hidden="true" size={18} />
                        </button>
                        <button className="btn btn-outline" type="button" onClick={showNextNews} aria-label="Noticia siguiente">
                          <ArrowRight aria-hidden="true" size={18} />
                        </button>
                        <Link className="btn btn-primary" href={`/noticias/${featuredNews.slug ?? featuredNews.id}`}>
                          {t("common.readFullNews")}
                        </Link>
                        <span className="rounded-lg bg-[var(--mist)] px-3 py-2 text-sm font-bold text-[var(--navy)]">
                          {activeNewsIndex + 1} de {filteredNews.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                {t("common.noNews")}
              </p>
            )}
          </div>
        </section>

        <section id="integracion" className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t("nav.integration")}</p>
              <h2 className="h2">{t("integration.heading")}</h2>
              <p className="lead">
                {t("integration.lead")}
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
                <p className="eyebrow">{t("nav.integration")}</p>
                <h3 className="mt-2 text-2xl font-black text-[var(--navy)]">{t("integration.material")}</h3>
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
              <h2 className="h2">Dónde pedir apoyo en Leipzig</h2>
              <p className="lead">
                Organizaciones, asesoría legal, empleo, apoyo social y servicios de inclusión.
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
              alt="Persona con bastón blanco siguiendo una guía podotáctil libre de obstáculos."
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0B3C5D]/76" />
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B3C5D] via-[#0B3C5D]/86 to-transparent" />
            <div className="container relative grid min-h-[86vh] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-3xl">
                <p className="eyebrow text-[#FFB199]">Campaña Lotse</p>
                <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                  Lotse: Pequeñas acciones, gran impacto
                </h2>
                <p className="mt-6 text-lg text-white/88 md:text-2xl">
                  Respetar las guías podotáctiles es respetar la independencia, la seguridad y la dignidad de miles de personas.
                </p>
                <a className="btn btn-primary mt-8" href="#lotse-campana">
                  Conocer la campaña
                </a>
              </div>

              <div className="justify-self-center rounded-lg border border-white/20 bg-white p-5 text-[#0B3C5D] shadow-2xl">
                <Image
                  src="/lotse-mascot.png"
                  alt="Mascota oficial Lotse, perro guía amigable de la campaña de accesibilidad."
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
                <p className="eyebrow">¿Por qué existen?</p>
                <h2 className="h2">Las guías podotáctiles son orientación, seguridad y autonomía</h2>
                <p className="lead">
                  Ayudan a personas con discapacidad visual a desplazarse con mayor independencia.
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
                <p className="eyebrow">Qué no debemos hacer</p>
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
                <p className="eyebrow">Qué debemos hacer</p>
                <h2 className="h2">Pequeñas acciones que abren la ciudad</h2>
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
                <h3 className="mt-3 text-3xl font-black">Estas líneas ayudan a las personas a encontrar su camino.</h3>
                <p className="mt-4 text-white/82">
                  Para niñas y niños: cuando veas estas líneas en el suelo, déjalas libres. Son como un mapa que se puede tocar.
                </p>
              </article>

              <article className="rounded-lg border border-white/18 bg-white/8 p-6">
                <span className="icon-tile bg-white text-[#0B3C5D]">
                  <HandHeart aria-hidden="true" />
                </span>
                <p className="eyebrow mt-6 text-[#FFB199]">Mensaje para nuevos inmigrantes</p>
                <h3 className="mt-3 text-3xl font-black">En Alemania, las guías podotáctiles son parte del respeto urbano.</h3>
                <p className="mt-4 text-white/82">
                  No pongas bicicletas, patinetes, cajas o maletas encima. Si ves un obstáculo peligroso, repórtalo cuando sea posible.
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
                <Image src="/lotse-mascot.png" alt="Mascota Lotse, perro guía" width={72} height={72} className="h-16 w-16 rounded-lg object-cover" />
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
                Información práctica para tranvía, bus, bicicleta y patinetes, sin bloquear la accesibilidad de otras personas.
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
                Los avisos de transporte aparecerán aquí solo después de revisión humana.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {publishedAlerts.length ? (
                publishedAlerts.map((alert) => (
                  <article className="card border-l-4 border-l-[#C1121F] p-5" key={alert.id}>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-[#C1121F]" aria-hidden="true" />
                      <p className="font-black text-[var(--navy)]">
                        {alert.type} · Línea {alert.affectedLine}
                      </p>
                    </div>
                    <p className="mt-2 text-sm font-bold text-[var(--orange)]">{alert.reason} · {alert.source}</p>
                    <p className="mt-3 text-[var(--muted)]">{alert.text}</p>
                  </article>
                ))
              ) : (
                <article className="card p-5 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-[var(--orange)]" aria-hidden="true" />
                    <p className="font-black text-[var(--navy)]">No hay alertas importantes publicadas.</p>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <section id="actualizaciones" className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Últimas actualizaciones</p>
              <h2 className="h2">Lo más reciente aprobado por el equipo</h2>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {filteredNews.slice(0, 3).map((item) => {
                const title = getLocalizedArticleField(item, "titulo", language);
                const summary = getLocalizedArticleField(item, "resumen", language);
                return (
                <Link className="card block p-5 no-underline transition hover:-translate-y-1 hover:shadow-xl" href={`/noticias/${item.slug ?? item.id}`} key={item.id}>
                  <div className="flex items-center gap-3">
                    <Clock3 className="text-[var(--orange)]" aria-hidden="true" />
                    <span className="text-sm font-black text-[var(--orange)]">{item.categoria}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-[var(--navy)]">{title.text}</h3>
                  <p className="mt-3 text-[var(--muted)]">{summary.text}</p>
                  {title.isFallback || summary.isFallback ? (
                    <span className="mt-3 inline-flex rounded-lg bg-white px-2 py-1 text-xs font-bold text-[var(--navy)]">
                      {t("common.translationSoon")}
                    </span>
                  ) : null}
                  <p className="mt-4 text-sm font-bold text-[var(--muted)]">
                    {item.publicado_en ? new Date(item.publicado_en).toLocaleDateString("es-ES") : t("common.readMore")}
                  </p>
                </Link>
              )})}
            </div>
          </div>
        </section>

        <section id="eventos" className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Eventos</p>
              <h2 className="h2">Calendario comunitario</h2>
              <p className="lead">Eventos culturales, ferias de empleo, cursos de integración y actividades inclusivas.</p>
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
                title: "Traducción preparada",
                text: "El selector de idioma queda visible, pero el contenido público permanece limpio en español hasta conectar traducciones reales."
              },
              {
                icon: UsersRound,
                title: "Preparada para comunidad",
                text: "Base para noticias, chat comunitario, bolsa de empleo, cursos online y asistencia con IA."
              },
              {
                icon: Accessibility,
                title: "Accesible por diseño",
                text: "Contraste ajustable, navegación por teclado, textos alternativos y estructura semántica."
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
            <p className="text-xl font-black">Konex 360</p>
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
