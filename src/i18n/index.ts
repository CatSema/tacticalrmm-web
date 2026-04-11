import { createI18n } from "vue-i18n";
import { Quasar } from "quasar";
import quasarEnUS from "quasar/lang/en-US";
import quasarRu from "quasar/lang/ru";

import en from "@/i18n/en";
import ru from "@/i18n/ru";

export const supportedLocales = ["en", "ru"] as const;
export type AppLocale = (typeof supportedLocales)[number];

export const fallbackLocale: AppLocale = "en";
export const localeStorageKey = "ui_locale";

const localeAliases: Record<string, AppLocale> = {
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  ru: "ru",
  "ru-ru": "ru",
};

const messages = {
  en,
  ru,
};

const quasarLanguagePacks = {
  en: quasarEnUS,
  ru: quasarRu,
};

function isClientSide(): boolean {
  return typeof window !== "undefined";
}

export function normalizeLocale(value: unknown): AppLocale | null {
  if (typeof value !== "string") {
    return null;
  }

  const locale = value.trim().toLowerCase();
  return localeAliases[locale] ?? null;
}

export function getLocaleFromStorage(): AppLocale | null {
  if (!isClientSide()) {
    return null;
  }

  return normalizeLocale(window.localStorage.getItem(localeStorageKey));
}

export function getLocaleFromBrowser(): AppLocale | null {
  if (!isClientSide()) {
    return null;
  }

  return normalizeLocale(window.navigator.language);
}

export function getLocaleFromProfile(payload: unknown): AppLocale | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const profile = payload as Record<string, unknown>;
  const candidates = [
    profile.locale,
    profile.language,
    profile.lang,
    profile.ui_locale,
    typeof profile.user === "object" && profile.user
      ? (profile.user as Record<string, unknown>).locale
      : null,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

export function resolveInitialLocale(): AppLocale {
  return getLocaleFromStorage() ?? getLocaleFromBrowser() ?? fallbackLocale;
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: resolveInitialLocale(),
  fallbackLocale,
  messages,
});

export async function setLocale(locale: unknown): Promise<AppLocale> {
  const nextLocale = normalizeLocale(locale) ?? fallbackLocale;

  i18n.global.locale.value = nextLocale;

  if (isClientSide()) {
    window.localStorage.setItem(localeStorageKey, nextLocale);
  }

  await Quasar.lang.set(quasarLanguagePacks[nextLocale]);

  return nextLocale;
}
