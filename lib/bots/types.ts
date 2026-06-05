export type ReviewStatus = "pendiente" | "aprobado" | "publicado" | "archivado";

export type TransportType = "Tram" | "Bus" | "S-Bahn" | "Zug";

export type TransportReason = "obra" | "retraso" | "desvío" | "suspensión" | "evento";

export type SupportedLanguage = "es" | "de" | "en" | "ar" | "ru" | "uk";

export type NewsDraft = {
  title_original: string;
  title_translated: string;
  summary_es: string;
  summary_de: string;
  summary_en: string;
  source: string;
  original_url: string;
  published_at: string | null;
  category: string;
  status: ReviewStatus;
};

export type TransportDraft = {
  affected_line: string;
  type: TransportType;
  reason: TransportReason;
  starts_at: string | null;
  ends_at: string | null;
  summary_simple: string;
  source: string;
  original_url: string;
  status: ReviewStatus;
};

export type FeedSource = {
  name: string;
  category: string;
  url: string;
  kind: "rss" | "html";
  enabled: boolean;
};

export type TransportSource = FeedSource & {
  operator: "LVB" | "MDV" | "Deutsche Bahn" | "MRB" | "Stadt Leipzig";
};
