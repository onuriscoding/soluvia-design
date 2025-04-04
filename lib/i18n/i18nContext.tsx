"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "./en.json";
import frTranslations from "./fr.json";

type Language = "en" | "fr";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

// Create context with default values
const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const useI18n = () => useContext(I18nContext);

export function I18nProvider({
  children,
  defaultLang = "en",
}: {
  children: React.ReactNode;
  defaultLang?: Language;
}) {
  // Initialize language state with the defaultLang prop
  const [language, setLanguage] = useState<Language>(defaultLang as Language);

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    try {
      const keys = key.split(".");

      // Use the current language, fallback to English if needed
      const langPack = translations[language] || translations.en;

      // Navigate through the keys
      let result = keys.reduce((obj: any, k: string) => {
        return obj && obj[k] !== undefined ? obj[k] : undefined;
      }, langPack);

      // If not found in current language, try English as fallback
      if (result === undefined && language !== "en") {
        result = keys.reduce((obj: any, k: string) => {
          return obj && obj[k] !== undefined ? obj[k] : undefined;
        }, translations.en);
      }

      // Handle template strings with variables (e.g., "copyright": "© {year} Soluvia Design")
      if (typeof result === "string" && result.includes("{year}")) {
        result = result.replace("{year}", new Date().getFullYear().toString());
      }

      return result !== undefined ? result : key;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
