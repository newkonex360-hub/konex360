import Link from "next/link";
import { Newspaper, Search, Share2 } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Article = {
  id: string;
  slug: string | null;
  titulo: string;
  resumen: string;
  contenido: string | null;
  categoria: string;
  imagen_url: string | null;
  estado: string;
  fuente_url: string | null;
  publicado_en: string | null;
};

type ArticleResult = {
  articles: Article[];
  error: string | null;
};

async function getArticles(): Promise<ArticleResult> {
  if (!supabase) {
    return {
      articles: [],
      error: "Supabase no esta configurado. Revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    };
  }

  const { data, error } = await supabase
    .from("articulos")
    .select("id,titulo,slug,resumen,contenido,categoria,imagen_url,estado,fuente_url,publicado_en")
    .eq("estado", "publicado")
    .order("publicado_en", { ascending: false, nullsFirst: false });

  return {
    articles: data ?? [],
    error: error ? `${error.message}${error.details ? ` Detalles: ${error.details}` : ""}` : null
  };
}

export default async function NoticiasPage() {
  const { articles, error } = await getArticles();
  const featured = articles[0];

  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-[var(--mist)]">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Noticias</p>
              <h1 className="h2">Noticias publicadas para la comunidad Konex360</h1>
              <p className="lead">
                Informacion revisada por el equipo antes de publicarse. Los articulos enlazan siempre a sus fuentes cuando corresponda.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-white p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 font-black text-[var(--navy)]">
                <Newspaper aria-hidden="true" />
                Ultimas noticias publicadas
              </div>
              <label className="relative block min-w-64">
                <span className="sr-only">Buscar noticias</span>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" aria-hidden="true" size={18} />
                <input className="w-full rounded-lg border border-[var(--line)] bg-white py-3 pl-10 pr-3" placeholder="Buscar proximamente" disabled />
              </label>
            </div>

            {error ? (
              <div className="mt-6 rounded-lg border border-[#C1121F] bg-white p-5 text-[#8A0F18]" role="alert">
                <p className="font-black">Error de Supabase</p>
                <p className="mt-2 text-sm">{error}</p>
              </div>
            ) : null}

            {featured ? (
              <Link className="card mt-8 block overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-xl" href={`/noticias/${featured.slug ?? featured.id}`}>
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[320px] bg-[#0B3C5D]">
                    {featured.imagen_url ? (
                      <img src={featured.imagen_url} alt={featured.titulo} className="absolute inset-0 h-full w-full object-cover" />
                    ) : null}
                    <div className="absolute inset-0 bg-[#0B3C5D]/50" />
                    <div className="relative flex h-full min-h-[320px] items-end p-6 text-white">
                      <span className="rounded-lg bg-[#FF6B35] px-3 py-1 text-sm font-bold">{featured.categoria}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="eyebrow">Destacada</p>
                    <h2 className="mt-3 text-3xl font-black leading-tight text-[var(--navy)]">{featured.titulo}</h2>
                    <p className="mt-4 text-[var(--muted)]">{featured.resumen}</p>
                    <p className="mt-5 text-sm font-bold text-[var(--muted)]">
                      {featured.publicado_en ? new Date(featured.publicado_en).toLocaleDateString("es-ES") : "Leer noticia completa"}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                No hay noticias disponibles.
              </p>
            )}

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => (
                <Link
                  className="card block overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-xl"
                  href={`/noticias/${article.slug ?? article.id}`}
                  key={article.id}
                >
                  {article.imagen_url ? <img src={article.imagen_url} alt={article.titulo} className="h-44 w-full object-cover" /> : null}
                  <div className="p-5">
                    <span className="text-sm font-black text-[var(--orange)]">{article.categoria}</span>
                    <h2 className="mt-2 text-xl font-black text-[var(--navy)]">{article.titulo}</h2>
                    <p className="mt-3 text-sm text-[var(--muted)]">{article.resumen}</p>
                    <span className="btn btn-outline mt-5" aria-label={`Abrir ${article.titulo}`}>
                      <Share2 aria-hidden="true" size={18} />
                      Leer noticia
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
