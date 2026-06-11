"use client";

import Link from "next/link";
import { BookOpen, BriefcaseBusiness, Home, Recycle, ShieldCheck } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { articleSelectFields, getLocalizedArticleField, type LocalizedArticle } from "@/lib/articles";
import { normalizeLanguage } from "@/lib/i18n";

const guides = [
  { icon: BookOpen, title: "Aprender aleman", text: "Cursos, recursos gratuitos, vocabulario util y consejos para practicar cada dia." },
  { icon: Home, title: "Vivir en Alemania", text: "Convivencia, salud, escuela, tramites basicos y normas del edificio." },
  { icon: BriefcaseBusiness, title: "Empleo", text: "CV aleman, entrevistas, derechos laborales y primeros pasos para buscar trabajo." },
  { icon: ShieldCheck, title: "Vivienda", text: "Contratos, fianza, obligaciones y orientacion para alquilar con mas seguridad." }
];

const recycling = [
  { title: "Azul", text: "Papel y carton limpios." },
  { title: "Amarillo", text: "Envases, plasticos, latas y embalajes ligeros." },
  { title: "Marron", text: "Residuos organicos cuando el edificio tiene Bioabfall." },
  { title: "Negro", text: "Resto de basura que no va en otros contenedores." },
  { title: "Vidrio", text: "Botellas sin Pfand separadas por color en contenedores publicos." },
  { title: "Pfand", text: "Botellas y latas con deposito se devuelven en supermercados." }
];

type ArticleResult = {
  articles: LocalizedArticle[];
  error: string | null;
};

async function getIntegrationArticles(): Promise<ArticleResult> {
  if (!supabase) {
    return {
      articles: [],
      error: "Supabase no esta configurado. Revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    };
  }

  const { data, error } = await supabase
    .from("articulos")
    .select(articleSelectFields)
    .eq("estado", "publicado")
    .or("categoria.ilike.integracion,categoria.ilike.integración")
    .order("publicado_en", { ascending: false, nullsFirst: false });

  return {
    articles: (data ?? []) as unknown as LocalizedArticle[],
    error: error ? `${error.message}${error.details ? ` Detalles: ${error.details}` : ""}` : null
  };
}

export default function IntegracionPage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const [articles, setArticles] = useState<LocalizedArticle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getIntegrationArticles().then((result) => {
      setArticles(result.articles);
      setError(result.error);
    });
  }, []);

  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t("nav.integration")}</p>
              <h1 className="h2">{t("integration.heading")}</h1>
              <p className="lead">{t("integration.lead")}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {guides.map(({ icon: Icon, title, text }) => (
                <article className="card p-5" key={title}>
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-xl font-black text-[var(--navy)]">{title}</h2>
                  <p className="mt-3 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t("nav.recycling")}</p>
              <h2 className="h2">{t("recycling.title")}</h2>
              <p className="lead">{t("recycling.lead")}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recycling.map((item) => (
                <article className="card p-5" key={item.title}>
                  <Recycle className="text-[var(--orange)]" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-black text-[var(--navy)]">Contenedor {item.title}</h3>
                  <p className="mt-2 text-[var(--muted)]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t("nav.integration")}</p>
              <h2 className="h2">{t("integration.material")}</h2>
            </div>

            {error ? (
              <div className="mt-6 rounded-lg border border-[#C1121F] bg-white p-5 text-[#8A0F18]" role="alert">
                <p className="font-black">{t("common.supabaseError")}</p>
                <p className="mt-2 text-sm">{error}</p>
              </div>
            ) : null}

            {articles.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => {
                  const title = getLocalizedArticleField(article, "titulo", language);
                  const summary = getLocalizedArticleField(article, "resumen", language);
                  return (
                  <Link
                    className="card block overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-xl"
                    href={`/noticias/${article.slug ?? article.id}`}
                    key={article.id}
                  >
                    {article.imagen_url ? <img src={article.imagen_url} alt={title.text} className="h-44 w-full object-cover" /> : null}
                    <div className="p-5">
                      <span className="text-sm font-black text-[var(--orange)]">{article.categoria}</span>
                      <h3 className="mt-2 text-xl font-black text-[var(--navy)]">{title.text}</h3>
                      <p className="mt-3 text-sm text-[var(--muted)]">{summary.text}</p>
                      {title.isFallback || summary.isFallback ? (
                        <span className="mt-3 inline-flex rounded-lg bg-[var(--mist)] px-2 py-1 text-xs font-bold text-[var(--navy)]">
                          {t("common.translationSoon")}
                        </span>
                      ) : null}
                      <span className="btn btn-outline mt-5">{t("common.readMore")}</span>
                    </div>
                  </Link>
                )})}
              </div>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                {t("common.noNews")}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
