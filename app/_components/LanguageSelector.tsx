"use client";

import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { languages, normalizeLanguage } from "@/lib/i18n";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.language);

  return (
    <label className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 text-[#0B3C5D]">
      <Languages aria-hidden="true" size={18} />
      <span className="sr-only">{t("common.language")}</span>
      <select
        className="bg-white text-sm font-bold"
        aria-label={t("common.language")}
        value={currentLanguage}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
