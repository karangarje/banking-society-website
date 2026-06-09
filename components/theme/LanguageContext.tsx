"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "@/locales/en.json";
import mr from "@/locales/mr.json";

type Locale = "en" | "mr";
type TranslationDict = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, any> = { en, mr };

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bk-locale") as Locale | null;
    if (stored === "en" || stored === "mr") {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("bk-locale", newLocale);
  }, []);

  // Translation helper function supporting nested dot-notated keys (e.g., "nav.home")
  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let current: any = translations[locale];

      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k];
        } else {
          return key; // Return key itself as fallback
        }
      }

      return typeof current === "string" ? current : key;
    },
    [locale]
  );

  // Prevent flash of default language
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
