import Link from "next/link";
import { updateReviewStatus } from "./actions";
import { supabaseAdmin } from "@/lib/supabase-admin";

type NewsRow = {
  id: string;
  title_original: string;
  title_translated: string;
  summary_es: string;
  source: string;
  original_url: string;
  category: string;
  status: string;
};

type TransportRow = {
  id: string;
  affected_line: string;
  type: string;
  reason: string;
  summary_simple: string;
  source: string;
  original_url: string;
  status: string;
};

const ReviewButtons = ({ table, id }: { table: string; id: string }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {[
      ["aprobado", "Aprobar"],
      ["publicado", "Publicar"],
      ["archivado", "Rechazar / archivar"]
    ].map(([status, label]) => (
      <form action={updateReviewStatus} key={status}>
        <input name="table" type="hidden" value={table} />
        <input name="id" type="hidden" value={id} />
        <input name="status" type="hidden" value={status} />
        <button className="btn btn-outline" type="submit">
          {label}
        </button>
      </form>
    ))}
  </div>
);

export default async function AdminPage() {
  const newsResult = supabaseAdmin
    ? await supabaseAdmin
        .from("news_items")
        .select("id,title_original,title_translated,summary_es,source,original_url,category,status")
        .eq("status", "pendiente")
        .order("created_at", { ascending: false })
        .limit(25)
    : { data: [] as NewsRow[] };

  const transportResult = supabaseAdmin
    ? await supabaseAdmin
        .from("transport_alerts")
        .select("id,affected_line,type,reason,summary_simple,source,original_url,status")
        .eq("status", "pendiente")
        .order("created_at", { ascending: false })
        .limit(25)
    : { data: [] as TransportRow[] };

  const news = (newsResult.data ?? []) as NewsRow[];
  const transport = (transportResult.data ?? []) as TransportRow[];

  return (
    <main className="min-h-screen bg-[var(--mist)] py-10">
      <div className="container">
        <Link className="btn btn-outline mb-6" href="/">
          Volver a Konex 360
        </Link>
        <div className="section-heading">
          <p className="eyebrow">Panel admin</p>
          <h1 className="h2">Revisión editorial antes de publicar</h1>
          <p className="lead">
            Los bots solo dejan contenido en pendiente. Una persona debe aprobarlo, publicarlo o archivarlo.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-[var(--navy)]">Noticias pendientes</h2>
          <div className="mt-4 grid gap-4">
            {news.length ? (
              news.map((item) => (
                <article className="card p-5" key={item.id}>
                  <p className="text-sm font-black text-[var(--orange)]">{item.category} · {item.source}</p>
                  <h3 className="mt-2 text-xl font-black text-[var(--navy)]">{item.title_translated || item.title_original}</h3>
                  <p className="mt-3 text-[var(--muted)]">{item.summary_es}</p>
                  <a className="mt-3 inline-block font-bold text-[var(--navy)] underline" href={item.original_url} rel="noreferrer" target="_blank">
                    Ver fuente original
                  </a>
                  <ReviewButtons id={item.id} table="news_items" />
                </article>
              ))
            ) : (
              <p className="card p-5 font-bold text-[var(--navy)]">No hay noticias pendientes.</p>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-black text-[var(--navy)]">Alertas de transporte pendientes</h2>
          <div className="mt-4 grid gap-4">
            {transport.length ? (
              transport.map((item) => (
                <article className="card p-5" key={item.id}>
                  <p className="text-sm font-black text-[var(--orange)]">
                    {item.type} · Línea {item.affected_line} · {item.reason}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-[var(--navy)]">{item.source}</h3>
                  <p className="mt-3 text-[var(--muted)]">{item.summary_simple}</p>
                  <a className="mt-3 inline-block font-bold text-[var(--navy)] underline" href={item.original_url} rel="noreferrer" target="_blank">
                    Ver fuente original
                  </a>
                  <ReviewButtons id={item.id} table="transport_alerts" />
                </article>
              ))
            ) : (
              <p className="card p-5 font-bold text-[var(--navy)]">No hay alertas pendientes.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
