import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Noticias", href: "/noticias" },
  { label: "Integracion", href: "/integracion" },
  { label: "Campanas", href: "/campanas" },
  { label: "Lotse", href: "/campana-lotse" },
  { label: "Transporte", href: "/transporte" },
  { label: "Eventos", href: "/eventos" },
  { label: "Contacto", href: "/contacto" }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-[#0B3C5D]/95 text-white backdrop-blur">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <Link className="rounded-lg bg-white px-3 py-2" href="/" aria-label="Konex 360 inicio">
          <Image src="/logo.svg" alt="Konex 360" width={172} height={40} priority className="h-10 w-auto" />
        </Link>

        <nav aria-label="Principal" className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <Link className="rounded-lg px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
