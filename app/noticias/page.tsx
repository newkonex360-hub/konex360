"use client";

import Link from "next/link";
import { Newspaper, Search, Share2 } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { articleSelectFields, getLocalizedArticleField, type LocalizedArticle } from "@/lib/articles";
import { normalizeLanguage } from "@/lib/i18n";

async function getArticles(): Promise<{ articles: LocalizedArticle[]; error: string | null }> {
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
    .order("publicado_en", { ascending: false, nullsFirst: false });

  return {
    articles: (data ?? []) as unknown as LocalizedArticle[],
    error: error ? `${error.message}${error.details ? ` Detalles: ${error.details}` : ""}` : null
  };
}

export default function NoticiasPage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.language);
  const [articles, setArticles] = useState<LocalizedArticle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getArticles().then((result) => {
      setArticles(result.articles);
      setError(result.error);
    });
  }, []);

  const featured = articles[0];
  const featuredTitle = featured ? getLocalizedArticleField(featured, "titulo", language) : null;
  const featuredSummary = featured ? getLocalizedArticleField(featured, "resumen", language) : null;

  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t("nav.news")}</p>
              <h1 className="h2">{t("news.heading")}</h1>
              <p className="lead">
                {t("news.lead")}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-white p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 font-black text-[var(--navy)]">
                <Newspaper aria-hidden="true" />
                {t("news.verified")}
              </div>
              <label className="relative block min-w-64">
                <span className="sr-only">{t("common.searchNews")}</span>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true" size={18} />
                <input className="w-full rounded-lg border border-[var(--line)] bg-white py-3 pl-10 pr-3" placeholder={t("common.searchNews")} disabled />
              </label>
            </div>

            {error ? (
              <div className="mt-6 rounded-lg border border-[#C1121F] bg-white p-5 text-[#8A0F18]" role="alert">
                <p className="font-black">{t("common.supabaseError")}</p>
                <p className="mt-2 text-sm">{error}</p>
              </div>
            ) : null}

            {featured ? (
              <Link className="card mt-8 block overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-xl" href={`/noticias/${featured.slug ?? featured.id}`}>
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[320px] bg-[#0B3C5D]">
                    {featured.imagen_url ? (
                      <img src={featured.imagen_url} alt={featuredTitle?.text ?? ""} className="absolute inset-0 h-full w-full object-cover" />
                    ) : null}
                    <div className="absolute inset-0 bg-[#0B3C5D]/50" />
                    <div className="relative flex h-full min-h-[320px] items-end p-6 text-white">
                      <span className="rounded-lg bg-[#FF6B35] px-3 py-1 text-sm font-bold">{featured.categoria}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="eyebrow">{t("articles.featured")}</p>
                    <h2 className="mt-3 text-3xl font-black leading-tight text-[var(--navy)]">{featuredTitle?.text}</h2>
                    <p className="mt-4 text-[var(--muted)]">{featuredSummary?.text}</p>
                    {featuredTitle?.isFallback || featuredSummary?.isFallback ? (
                      <span className="mt-4 inline-flex rounded-lg bg-[var(--mist)] px-3 py-2 text-sm font-bold text-[var(--navy)]">
                        {t("common.translationSoon")}
                      </span>
                    ) : null}
                    <p className="mt-5 text-sm font-bold text-[var(--muted)]">
                      {featured.publicado_en ? new Date(featured.publicado_en).toLocaleDateString("es-ES") : t("common.readFullNews")}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                {t("common.noNews")}
              </p>
            )}

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => {
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
                    <h2 className="mt-2 text-xl font-black text-[var(--navy)]">{title.text}</h2>
                    <p className="mt-3 text-sm text-[var(--muted)]">{summary.text}</p>
                    {title.isFallback || summary.isFallback ? (
                      <span className="mt-3 inline-flex rounded-lg bg-[var(--mist)] px-2 py-1 text-xs font-bold text-[var(--navy)]">
                        {t("common.translationSoon")}
                      </span>
                    ) : null}
                    <span className="btn btn-outline mt-5" aria-label={`Abrir ${article.titulo}`}>
                      <Share2 aria-hidden="true" size={18} />
                      {t("common.readMore")}
                    </span>
                  </div>
                </Link>
              )})}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
