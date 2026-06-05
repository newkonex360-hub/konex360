import { supabaseAdmin } from "@/lib/supabase-admin";
import { parseHtmlList, parseRss } from "./rss";
import { createNewsDraft, createTransportDraft } from "./normalize";
import type { FeedSource, TransportSource } from "./types";

const fetchFeed = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Konex360Bot/1.0; editorial review only"
    },
    next: {
      revalidate: 0
    }
  });

  if (!response.ok) {
    throw new Error(`No se pudo leer la fuente ${url}: ${response.status}`);
  }

  return response.text();
};

export const importNewsFromSources = async (sources: FeedSource[], options?: { dryRun?: boolean }) => {
  if (!supabaseAdmin && !options?.dryRun) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  const client = supabaseAdmin;
  const enabledSources = sources.filter((source) => source.enabled);
  const drafts = [];
  const errors: Array<{ source: string; error: string }> = [];

  for (const source of enabledSources) {
    try {
      const content = await fetchFeed(source.url);
      const items =
        source.kind === "rss" ? parseRss(content).slice(0, 20) : parseHtmlList(content, source.url).slice(0, 20);
      drafts.push(...items.map((item) => createNewsDraft(item, source.name, source.category)));
    } catch (error) {
      errors.push({
        source: source.name,
        error: error instanceof Error ? error.message : "Error leyendo fuente"
      });
    }
  }

  if (options?.dryRun) return { inserted: 0, drafts, errors };
  if (!drafts.length) return { inserted: 0, drafts: [], errors };

  if (!client) {
    throw new Error("Supabase admin no configurado.");
  }

  const { error } = await client
    .from("news_items")
    .upsert(drafts, { onConflict: "original_url", ignoreDuplicates: true });

  if (error) throw error;

  return { inserted: drafts.length, drafts, errors };
};

export const importTransportFromSources = async (sources: TransportSource[], options?: { dryRun?: boolean }) => {
  if (!supabaseAdmin && !options?.dryRun) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  const client = supabaseAdmin;
  const enabledSources = sources.filter((source) => source.enabled);
  const drafts = [];
  const errors: Array<{ source: string; error: string }> = [];

  for (const source of enabledSources) {
    try {
      const content = await fetchFeed(source.url);
      const items =
        source.kind === "rss" ? parseRss(content).slice(0, 20) : parseHtmlList(content, source.url).slice(0, 20);
      drafts.push(...items.map((item) => createTransportDraft(item, source.name)));
    } catch (error) {
      errors.push({
        source: source.name,
        error: error instanceof Error ? error.message : "Error leyendo fuente"
      });
    }
  }

  if (options?.dryRun) return { inserted: 0, drafts, errors };
  if (!drafts.length) return { inserted: 0, drafts: [], errors };

  if (!client) {
    throw new Error("Supabase admin no configurado.");
  }

  const { error } = await client
    .from("transport_alerts")
    .upsert(drafts, { onConflict: "original_url", ignoreDuplicates: true });

  if (error) throw error;

  return { inserted: drafts.length, drafts, errors };
};
