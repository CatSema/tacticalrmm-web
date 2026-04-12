import { createI18n } from "vue-i18n";
import { Quasar } from "quasar";
import quasarEnUS from "quasar/lang/en-US";

// Dynamically load all locale modules: src/i18n/<code>/index.ts
const localeModules = import.meta.glob<{ default: Record<string, unknown> }>(
  "@/i18n/*/index.ts",
  { eager: true },
);

// Human-readable locale names — add entries here when adding a new language
const localeNames: Record<string, string> = {
  en: "English",
  it: "Italiano",
  ru: "Русский",
};

// Build messages from discovered index modules
// Each locale controls what it imports — partial translations are fine.
const messages: Record<string, Record<string, unknown>> = {};

for (const [path, mod] of Object.entries(localeModules)) {
  const match = path.match(/\/i18n\/([^/]+)\//);
  if (!match) continue;
  const code = match[1];
  messages[code] = mod.default;
}

// Build sorted locale list from available messages
export const locales = Object.keys(messages)
  .filter((code) => Object.keys(messages[code]).length > 0)
  .sort((a, b) => {
    const la = localeNames[a] ?? a.toUpperCase();
    const lb = localeNames[b] ?? b.toUpperCase();
    return la.localeCompare(lb);
  })
  .map((code) => ({
    label: localeNames[code] ?? code.toUpperCase(),
    value: code,
  }));

export const supportedLocales = locales.map((l) => l.value) as string[];
export type AppLocale = (typeof supportedLocales)[number];

export const fallbackLocale: AppLocale = "en";
export const localeStorageKey = "ui_locale";

// Build aliases automatically: en → en, en-us → en, etc.
const localeAliases: Record<string, AppLocale> = {};
for (const code of supportedLocales) {
  localeAliases[code] = code as AppLocale;
  localeAliases[`${code}-${code.toUpperCase()}`] = code as AppLocale;
}

// Quasar language packs — fallback to en-US if locale pack is missing
const quasarPacks: Record<string, unknown> = {
  en: quasarEnUS,
};

// Try to load Quasar packs for other locales if available
try {
  const quasarRu = require("quasar/lang/ru");
  quasarPacks.ru = quasarRu.default ?? quasarRu;
} catch {
  // Quasar Russian pack not available
}

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

  const quasarLang = quasarPacks[nextLocale] ?? quasarPacks.en;
  await Quasar.lang.set(quasarLang);

  return nextLocale;
}
