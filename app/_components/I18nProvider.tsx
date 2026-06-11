"use client";

import { I18nextProvider } from "react-i18next";
import i18n, { defaultLanguage, getLanguageDirection, languageStorageKey, normalizeLanguage } from "@/lib/i18n";
import { useEffect, useState } from "react";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    const browserLanguage = window.navigator.language;
    const language = normalizeLanguage(storedLanguage ?? browserLanguage ?? defaultLanguage);

    i18n.changeLanguage(language).finally(() => {
      document.documentElement.lang = language;
      document.documentElement.dir = getLanguageDirection(language);
      window.localStorage.setItem(languageStorageKey, language);
      setReady(true);
    });

    const handleLanguageChanged = (nextLanguage: string) => {
      const normalized = normalizeLanguage(nextLanguage);
      document.documentElement.lang = normalized;
      document.documentElement.dir = getLanguageDirection(normalized);
      window.localStorage.setItem(languageStorageKey, normalized);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{ready ? children : null}</I18nextProvider>;
}
