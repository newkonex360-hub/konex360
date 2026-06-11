import type { LanguageCode } from "@/lib/i18n";

export const articleSelectFields = [
  "id",
  "slug",
  "titulo",
  "resumen",
  "contenido",
  "categoria",
  "imagen_url",
  "estado",
  "fuente_url",
  "publicado_en",
  "titulo_es",
  "titulo_de",
  "titulo_ru",
  "titulo_ar",
  "resumen_es",
  "resumen_de",
  "resumen_ru",
  "resumen_ar",
  "contenido_es",
  "contenido_de",
  "contenido_ru",
  "contenido_ar"
].join(",");

export type LocalizedArticle = {
  id: string;
  slug: string | null;
  titulo: string | null;
  resumen: string | null;
  contenido: string | null;
  categoria: string | null;
  imagen_url: string | null;
  estado: string;
  fuente_url: string | null;
  publicado_en: string | null;
  titulo_es?: string | null;
  titulo_de?: string | null;
  titulo_ru?: string | null;
  titulo_ar?: string | null;
  resumen_es?: string | null;
  resumen_de?: string | null;
  resumen_ru?: string | null;
  resumen_ar?: string | null;
  contenido_es?: string | null;
  contenido_de?: string | null;
  contenido_ru?: string | null;
  contenido_ar?: string | null;
};

type ArticleField = "titulo" | "resumen" | "contenido";

export function getLocalizedArticleField(article: LocalizedArticle, field: ArticleField, language: LanguageCode) {
  const localized = article[`${field}_${language}` as keyof LocalizedArticle];
  const spanish = article[`${field}_es` as keyof LocalizedArticle];
  const fallback = article[field];

  if (typeof localized === "string" && localized.trim()) {
    return { text: localized, isFallback: false };
  }

  if (typeof spanish === "string" && spanish.trim()) {
    return { text: spanish, isFallback: language !== "es" };
  }

  return { text: fallback ?? "", isFallback: language !== "es" };
}
