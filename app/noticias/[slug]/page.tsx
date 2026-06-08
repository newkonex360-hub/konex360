import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { PublicHeader } from "@/app/_components/PublicHeader";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Article = {
  id: string;
  slug: string | null;
  titulo: string;
  resumen: string | null;
  contenido: string | null;
  categoria: string | null;
  imagen_url: string | null;
  estado: string;
  fuente_url: string | null;
  publicado_en: string | null;
};

type ArticleResult = {
  article: Article | null;
  error: string | null;
};

async function getArticle(slug: string): Promise<ArticleResult> {
  if (!supabase) {
    return {
      article: null,
      error: "Supabase no esta configurado. Revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    };
  }

  const { data, error } = await supabase
    .from("articulos")
    .select("id,titulo,slug,resumen,contenido,categoria,imagen_url,estado,fuente_url,publicado_en")
    .eq("slug", slug)
    .eq("estado", "publicado")
    .maybeSingle();

  return {
    article: data ?? null,
    error: error ? `${error.message}${error.details ? ` Detalles: ${error.details}` : ""}` : null
  };
}

function MarkdownArticleContent({ content }: { content: string | null }) {
  if (!content) {
    return <p>No hay contenido completo disponible para este articulo.</p>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        h1: ({ children }) => (
          <h2 className="mt-10 text-3xl font-black leading-tight text-[var(--navy)] md:text-4xl">{children}</h2>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 text-2xl font-black leading-tight text-[var(--navy)] md:text-3xl">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-xl font-black leading-tight text-[#087F7A] md:text-2xl">{children}</h3>
        ),
        p: ({ children }) => <p className="mt-5 break-words text-lg leading-8 text-[var(--ink)]">{children}</p>,
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-8 text-[var(--ink)]">{children}</ul>,
        ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-8 text-[var(--ink)]">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        a: ({ children, href }) => (
          <a className="font-bold text-[var(--navy)] underline decoration-[#FF6B35] decoration-2 underline-offset-4" href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
        img: ({ alt, src, title }) => (
          <img
            src={src ?? ""}
            alt={alt ?? ""}
            title={title}
            loading="lazy"
            className="my-8 max-h-[560px] w-full rounded-lg border border-[var(--line)] object-cover shadow-lg"
          />
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-4 border-l-[#FF6B35] bg-[var(--mist)] p-5 text-lg font-bold leading-8 text-[var(--navy)]">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => <strong className="font-black text-[var(--navy)]">{children}</strong>
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { article, error } = await getArticle(decodeURIComponent(slug));

  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-[var(--mist)]">
          <div className="container">
            <Link className="btn btn-outline bg-white" href="/noticias">
              <ArrowLeft aria-hidden="true" size={18} />
              Volver a noticias
            </Link>

            {error ? (
              <div className="mt-6 rounded-lg border border-[#C1121F] bg-white p-5 text-[#8A0F18]" role="alert">
                <p className="font-black">Error de Supabase</p>
                <p className="mt-2 text-sm">{error}</p>
              </div>
            ) : null}

            {!article ? (
              <div className="card mt-8 p-6">
                <p className="eyebrow">Noticias</p>
                <h1 className="mt-3 text-3xl font-black text-[var(--navy)]">Artículo no encontrado</h1>
                <p className="mt-3 text-[var(--muted)]">El articulo no existe, no esta publicado o el enlace no es correcto.</p>
              </div>
            ) : (
              <article className="mt-8 overflow-hidden rounded-lg border border-[var(--line)] bg-white">
                {article.imagen_url ? (
                  <img src={article.imagen_url} alt={article.titulo} className="max-h-[520px] w-full object-cover" />
                ) : null}

                <div className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8 lg:py-12">
                  <div className="flex flex-wrap items-center gap-3">
                    {article.categoria ? (
                      <span className="rounded-lg bg-[#FF6B35] px-3 py-1 text-sm font-black text-white">{article.categoria}</span>
                    ) : null}
                    <span className="flex items-center gap-2 text-sm font-bold text-[var(--muted)]">
                      <CalendarDays aria-hidden="true" size={17} />
                      {article.publicado_en ? new Date(article.publicado_en).toLocaleDateString("es-ES") : "Fecha pendiente"}
                    </span>
                  </div>

                  <h1 className="mt-5 text-4xl font-black leading-tight text-[var(--navy)] md:text-5xl">{article.titulo}</h1>
                  {article.resumen ? <p className="mt-5 text-xl leading-relaxed text-[var(--muted)]">{article.resumen}</p> : null}

                  <div className="mt-8">
                    <MarkdownArticleContent content={article.contenido} />
                  </div>

                  {article.fuente_url ? (
                    <div className="mt-10 border-t border-[var(--line)] pt-6">
                      <a className="btn btn-outline" href={article.fuente_url} target="_blank" rel="noreferrer">
                        <ExternalLink aria-hidden="true" size={18} />
                        Ver fuente original
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
