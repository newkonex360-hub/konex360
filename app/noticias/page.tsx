import { Newspaper, Search, Share2 } from "lucide-react";
import { PublicHeader } from "@/app/_components/PublicHeader";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Article = {
  id: string;
  titulo: string;
  resumen: string;
  imagen_principal: string | null;
  categoria: string;
  publicado_en: string | null;
};

async function getArticles(): Promise<Article[]> {
  if (!supabase) return [];

  const { data } = await supabase
    .from("articulos")
    .select("id,titulo,resumen,imagen_principal,categoria,publicado_en")
    .eq("estado", "publicado")
    .order("publicado_en", { ascending: false });

  return data ?? [];
}

export default async function NoticiasPage() {
  const articles = await getArticles();
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

            {featured ? (
              <article className="card mt-8 overflow-hidden">
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[320px] bg-[#0B3C5D]">
                    {featured.imagen_principal ? (
                      <img src={featured.imagen_principal} alt={featured.titulo} className="absolute inset-0 h-full w-full object-cover" />
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
                      {featured.publicado_en ? new Date(featured.publicado_en).toLocaleDateString("es-ES") : "Sin fecha"}
                    </p>
                  </div>
                </div>
              </article>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                No hay noticias disponibles.
              </p>
            )}

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => (
                <article className="card overflow-hidden" key={article.id}>
                  {article.imagen_principal ? <img src={article.imagen_principal} alt={article.titulo} className="h-44 w-full object-cover" /> : null}
                  <div className="p-5">
                    <span className="text-sm font-black text-[var(--orange)]">{article.categoria}</span>
                    <h2 className="mt-2 text-xl font-black text-[var(--navy)]">{article.titulo}</h2>
                    <p className="mt-3 text-sm text-[var(--muted)]">{article.resumen}</p>
                    <button className="btn btn-outline mt-5" type="button" aria-label={`Compartir ${article.titulo}`}>
                      <Share2 aria-hidden="true" size={18} />
                      Compartir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
