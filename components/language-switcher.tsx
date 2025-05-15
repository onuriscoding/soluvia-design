"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18nContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type LanguageSwitcherProps = {
  variant?: "minimal" | "pill" | "dropdown";
  className?: string;
};

export function LanguageSwitcher({
  variant = "minimal",
  className = "",
}: LanguageSwitcherProps) {
  const { language, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  // Extract the path without the locale prefix
  const getPathWithoutLocale = () => {
    // Remove first part of the path (the locale)
    const segments = pathname.split("/");
    segments.splice(1, 1);
    return segments.join("/") || "/";
  };

  // Get the path for a specific locale
  const getLocalizedPath = (locale: string) => {
    return `/${locale}${
      getPathWithoutLocale() === "/" ? "" : getPathWithoutLocale()
    }`;
  };

  // Navigate to a new locale
  const changeLanguage = (newLang: "en" | "fr") => {
    const newPath = getLocalizedPath(newLang);
    router.push(newPath);
  };

  if (variant === "dropdown") {
    return (
      <div className={`flex items-center ${className}`}>
        <Globe className="h-4 w-4 mr-1" />
        <select
          className="bg-transparent text-ivory/80 border-none focus:outline-none text-sm"
          value={language}
          onChange={(e) => changeLanguage(e.target.value as "en" | "fr")}
        >
          <option value="en">{t("languageSelector.en")}</option>
          <option value="fr">{t("languageSelector.fr")}</option>
        </select>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div
        className={`p-1 rounded-full border border-ivory/10 bg-white/30 backdrop-blur-sm flex items-center ${className}`}
      >
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            language === "en"
              ? "bg-ivory/90 text-rose"
              : "text-charcoal/70 hover:text-charcoal"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            language === "fr"
              ? "bg-ivory/90 text-rose"
              : "text-charcoal/70 hover:text-charcoal"
          }`}
        >
          FR
        </button>
      </div>
    );
  }

  // Minimal variant (default) - just toggles between languages
  return (
    <motion.button
      onClick={() => changeLanguage(language === "en" ? "fr" : "en")}
      className={`flex items-center space-x-1 text-ivory/70 hover:text-ivory transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">{language.toUpperCase()}</span>
    </motion.button>
  );
}
