import type { LanguageCode } from "@/lib/i18n";

export const baseArticleSelectFields = [
  "id",
  "slug",
  "titulo",
  "resumen",
  "contenido",
  "categoria",
  "imagen_url",
  "estado",
  "fuente_url",
  "publicado_en"
].join(",");

export const localizedArticleSelectFields = [
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

export const articleSelectFields = localizedArticleSelectFields;

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

type SupabaseArticleError = {
  message?: string;
  details?: string | null;
  hint?: string | null;
  code?: string | null;
};

type ArticleField = "titulo" | "resumen" | "contenido";

export function formatArticleError(error: SupabaseArticleError | null | undefined) {
  if (!error) return null;

  return `${error.message ?? "Error desconocido de Supabase"}${error.details ? ` Detalles: ${error.details}` : ""}`;
}

export function shouldRetryWithBaseArticleFields(error: SupabaseArticleError | null | undefined) {
  if (!error) return false;

  const text = `${error.message ?? ""} ${error.details ?? ""} ${error.hint ?? ""} ${error.code ?? ""}`.toLowerCase();

  return (
    text.includes("titulo_es") ||
    text.includes("titulo_de") ||
    text.includes("titulo_ru") ||
    text.includes("titulo_ar") ||
    text.includes("resumen_es") ||
    text.includes("resumen_de") ||
    text.includes("resumen_ru") ||
    text.includes("resumen_ar") ||
    text.includes("contenido_es") ||
    text.includes("contenido_de") ||
    text.includes("contenido_ru") ||
    text.includes("contenido_ar") ||
    (text.includes("schema cache") && text.includes("articulos")) ||
    (text.includes("could not find") && text.includes("articulos")) ||
    (text.includes("does not exist") && text.includes("articulos"))
  );
}

export async function queryArticlesWithFallback<T>(
  runQuery: (selectFields: string) => PromiseLike<{ data: unknown; error: SupabaseArticleError | null }>
) {
  const localizedResult = await runQuery(localizedArticleSelectFields);

  if (!localizedResult.error || !shouldRetryWithBaseArticleFields(localizedResult.error)) {
    return {
      data: localizedResult.data as T | null,
      error: formatArticleError(localizedResult.error)
    };
  }

  const baseResult = await runQuery(baseArticleSelectFields);

  return {
    data: baseResult.data as T | null,
    error: formatArticleError(baseResult.error)
  };
}

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
