import { BookOpen, BriefcaseBusiness, Home, Recycle, ShieldCheck } from "lucide-react";
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

async function getIntegrationArticles(): Promise<Article[]> {
  if (!supabase) return [];

  const { data } = await supabase
    .from("articulos")
    .select("id,titulo,resumen,imagen_principal,categoria,publicado_en")
    .eq("estado", "publicado")
    .or("categoria.eq.integracion,categoria.eq.integración")
    .order("publicado_en", { ascending: false });

  return data ?? [];
}

export default async function IntegracionPage() {
  const articles = await getIntegrationArticles();

  return (
    <>
      <PublicHeader />
      <main>
        <section className="section bg-white">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Integracion</p>
              <h1 className="h2">Guias practicas para vivir mejor en Leipzig</h1>
              <p className="lead">Idioma, empleo, vivienda, convivencia y reciclaje explicados con lenguaje claro.</p>
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
              <p className="eyebrow">Campana de reciclaje</p>
              <h2 className="h2">Reciclar bien tambien es integrarse</h2>
              <p className="lead">Separar residuos correctamente ayuda a cuidar Leipzig, evitar multas y convivir mejor en comunidad.</p>
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
              <p className="eyebrow">Articulos de integracion</p>
              <h2 className="h2">Contenido publicado desde Supabase</h2>
            </div>

            {articles.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <article className="card overflow-hidden" key={article.id}>
                    {article.imagen_principal ? <img src={article.imagen_principal} alt={article.titulo} className="h-44 w-full object-cover" /> : null}
                    <div className="p-5">
                      <span className="text-sm font-black text-[var(--orange)]">{article.categoria}</span>
                      <h3 className="mt-2 text-xl font-black text-[var(--navy)]">{article.titulo}</h3>
                      <p className="mt-3 text-sm text-[var(--muted)]">{article.resumen}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5 font-bold text-[var(--navy)]">
                No hay articulos de integracion disponibles.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
