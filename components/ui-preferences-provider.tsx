"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type DirectionMode = "rtl" | "ltr";
export type DensityMode = "comfortable" | "compact";
export type SkinMode = "soft" | "bordered" | "semi-dark";
export type ContentWidthMode = "fluid" | "boxed";
export type SidebarMode = "full" | "compact";
export type MotionMode = "full" | "reduced";
export type AccentMode = "violet" | "blue" | "emerald" | "rose" | "amber";

export type UiPreferences = {
  theme: ThemeMode;
  direction: DirectionMode;
  density: DensityMode;
  skin: SkinMode;
  contentWidth: ContentWidthMode;
  sidebar: SidebarMode;
  motion: MotionMode;
  accent: AccentMode;
};

const STORAGE_KEY = "loraniq-ui-preferences-v1";
export const defaultUiPreferences: UiPreferences = {
  theme: "light",
  direction: "rtl",
  density: "comfortable",
  skin: "soft",
  contentWidth: "fluid",
  sidebar: "full",
  motion: "full",
  accent: "violet",
};

type UiPreferencesContextValue = {
  preferences: UiPreferences;
  resolvedTheme: "light" | "dark";
  updatePreferences: (patch: Partial<UiPreferences>) => void;
  resetPreferences: () => void;
};

const UiPreferencesContext = createContext<UiPreferencesContextValue | null>(null);
let clientSnapshot = defaultUiPreferences;
let storageRead = false;
const listeners = new Set<() => void>();

function normalizePreferences(value: Partial<UiPreferences> | null | undefined): UiPreferences {
  return { ...defaultUiPreferences, ...(value ?? {}) };
}

function readStorage(): UiPreferences {
  if (typeof window === "undefined") return defaultUiPreferences;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizePreferences(JSON.parse(raw) as Partial<UiPreferences>) : defaultUiPreferences;
  } catch {
    return defaultUiPreferences;
  }
}

function getSnapshot() {
  if (typeof window !== "undefined" && !storageRead) {
    clientSnapshot = readStorage();
    storageRead = true;
  }
  return clientSnapshot;
}

function getServerSnapshot() {
  return defaultUiPreferences;
}

function publish(next: UiPreferences) {
  clientSnapshot = next;
  storageRead = true;
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage may be unavailable */ }
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window === "undefined") return () => listeners.delete(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    clientSnapshot = readStorage();
    storageRead = true;
    listeners.forEach((entry) => entry());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function resolveTheme(theme: ThemeMode): "light" | "dark" {
  if (theme !== "system") return theme;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyPreferences(preferences: UiPreferences) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const theme = resolveTheme(preferences.theme);
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dir = preferences.direction;
  root.lang = preferences.direction === "rtl" ? "fa" : "en";
  root.dataset.themeMode = preferences.theme;
  root.dataset.density = preferences.density;
  root.dataset.skin = preferences.skin;
  root.dataset.contentWidth = preferences.contentWidth;
  root.dataset.sidebar = preferences.sidebar;
  root.dataset.motion = preferences.motion;
  root.dataset.accent = preferences.accent;
}

export function UiPreferencesProvider({ children }: { children: ReactNode }) {
  const preferences = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [systemThemeTick, setSystemThemeTick] = useState(0);
  const resolvedTheme = resolveTheme(preferences.theme);

  useEffect(() => {
    applyPreferences(preferences);
  }, [preferences, systemThemeTick]);

  useEffect(() => {
    if (preferences.theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemThemeTick((value) => value + 1);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preferences.theme]);

  const updatePreferences = useCallback((patch: Partial<UiPreferences>) => {
    publish({ ...getSnapshot(), ...patch });
  }, []);
  const resetPreferences = useCallback(() => publish(defaultUiPreferences), []);

  const value = useMemo<UiPreferencesContextValue>(() => ({
    preferences,
    resolvedTheme,
    updatePreferences,
    resetPreferences,
  }), [preferences, resolvedTheme, updatePreferences, resetPreferences]);

  return <UiPreferencesContext.Provider value={value}>{children}</UiPreferencesContext.Provider>;
}

export function useUiPreferences() {
  const value = useContext(UiPreferencesContext);
  if (!value) throw new Error("useUiPreferences must be used inside UiPreferencesProvider");
  return value;
}
