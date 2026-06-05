import type { RssItem } from "./rss";
import type { NewsDraft, TransportDraft, TransportReason, TransportType } from "./types";

const truncate = (value: string, max = 360) => {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trim()}…` : clean;
};

export const createNewsDraft = (item: RssItem, source: string, category: string): NewsDraft => {
  const fallbackSummary = truncate(item.description || item.title, 300);

  return {
    title_original: item.title,
    title_translated: item.title,
    summary_es: fallbackSummary,
    summary_de: fallbackSummary,
    summary_en: fallbackSummary,
    source,
    original_url: item.link,
    published_at: item.pubDate ? new Date(item.pubDate).toISOString() : null,
    category,
    status: "pendiente"
  };
};

const detectTransportType = (text: string): TransportType => {
  const value = text.toLowerCase();
  if (value.includes("s-bahn") || value.includes("s bahn")) return "S-Bahn";
  if (value.includes("zug") || value.includes("bahn") || value.includes("train")) return "Zug";
  if (value.includes("bus")) return "Bus";
  return "Tram";
};

const detectReason = (text: string): TransportReason => {
  const value = text.toLowerCase();
  if (value.includes("umleitung") || value.includes("desví") || value.includes("desvi")) return "desvío";
  if (value.includes("verspät") || value.includes("retras")) return "retraso";
  if (value.includes("sperr") || value.includes("suspensión") || value.includes("ausfall")) return "suspensión";
  if (value.includes("event") || value.includes("veranstaltung")) return "evento";
  return "obra";
};

const detectLine = (text: string) => {
  const match = text.match(/\b(?:linie|linea|línea|tram|bus|s)\s*([a-z]?\d{1,3})\b/i);
  return match?.[1]?.toUpperCase() ?? "Por confirmar";
};

export const createTransportDraft = (item: RssItem, source: string): TransportDraft => {
  const text = `${item.title} ${item.description}`;

  return {
    affected_line: detectLine(text),
    type: detectTransportType(text),
    reason: detectReason(text),
    starts_at: item.pubDate ? new Date(item.pubDate).toISOString() : null,
    ends_at: null,
    summary_simple: truncate(item.description || item.title, 260),
    source,
    original_url: item.link,
    status: "pendiente"
  };
};
