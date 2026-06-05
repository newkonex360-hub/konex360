import type { FeedSource, TransportSource } from "./types";

export const newsSources: FeedSource[] = [
  {
    name: "Stadt Leipzig",
    category: "Leipzig",
    url: "https://www.leipzig.de/news",
    kind: "html",
    enabled: true
  },
  {
    name: "Sachsen.de",
    category: "Integración",
    url: "https://www.medienservice.sachsen.de/medien/news",
    kind: "html",
    enabled: true
  },
  {
    name: "Leipziger Gruppe",
    category: "Leipzig",
    url: "https://www.l.de/presse/pressemitteilungen/",
    kind: "html",
    enabled: true
  }
];

export const transportSources: TransportSource[] = [
  {
    name: "LVB Verkehrsmeldungen",
    operator: "LVB",
    category: "Transporte",
    url: "https://www.l.de/verkehrsbetriebe/fahrgastinformation/verkehrsmeldungen/",
    kind: "html",
    enabled: true
  },
  {
    name: "MDV Störungsmeldungen",
    operator: "MDV",
    category: "Transporte",
    url: "https://www.mdv.de/fahrplanauskunft/stoerungsmeldungen",
    kind: "html",
    enabled: true
  },
  {
    name: "Deutsche Bahn Reiseinformationen",
    operator: "Deutsche Bahn",
    category: "Transporte",
    url: "https://www.bahn.de/service/fahrplaene/aktuell",
    kind: "html",
    enabled: true
  },
  {
    name: "MRB Meldungen",
    operator: "MRB",
    category: "Transporte",
    url: "https://www.mitteldeutsche-regiobahn.de/de/strecken/verkehrsmeldungen",
    kind: "html",
    enabled: true
  },
  {
    name: "Stadt Leipzig Verkehr",
    operator: "Stadt Leipzig",
    category: "Transporte",
    url: "https://www.leipzig.de/umwelt-und-verkehr",
    kind: "html",
    enabled: true
  }
];
