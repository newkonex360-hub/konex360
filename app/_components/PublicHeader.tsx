"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/app/_components/LanguageSelector";

const links = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.news", href: "/noticias" },
  { labelKey: "nav.integration", href: "/integracion" },
  { labelKey: "nav.campaigns", href: "/campanas" },
  { labelKey: "nav.lotse", href: "/campana-lotse" },
  { labelKey: "nav.transport", href: "/transporte" },
  { labelKey: "nav.events", href: "/eventos" },
  { labelKey: "nav.contact", href: "/contacto" }
];

export function PublicHeader() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-[#0B3C5D]/95 text-white backdrop-blur">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <Link className="rounded-lg bg-white px-3 py-2" href="/" aria-label="Konex 360">
          <Image src="/logo.svg" alt="Konex 360" width={172} height={40} priority className="h-10 w-auto" />
        </Link>

        <nav aria-label="Principal" className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <Link className="rounded-lg px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10" href={link.href} key={link.href}>
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <LanguageSelector />
      </div>
    </header>
  );
}
