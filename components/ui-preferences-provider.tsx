"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type DirectionMode = "rtl" | "ltr";
export type DensityMode = "comfortable" | "compact";
export type SkinMode = "soft" | "bordered";
export type ContentWidthMode = "fluid" | "boxed";
export type SidebarMode = "full" | "compact";
export type MotionMode = "full" | "reduced";

export type UiPreferences = {
  theme: ThemeMode;
  direction: DirectionMode;
  density: DensityMode;
  skin: SkinMode;
  contentWidth: ContentWidthMode;
  sidebar: SidebarMode;
  motion: MotionMode;
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
};

type UiPreferencesContextValue = {
  preferences: UiPreferences;
  resolvedTheme: "light" | "dark";
  updatePreferences: (patch: Partial<UiPreferences>) => void;
  resetPreferences: () => void;
};

const UiPreferencesContext = createContext<UiPreferencesContextValue | null>(null);

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
}

export function UiPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UiPreferences>(defaultUiPreferences);
  const [systemThemeTick, setSystemThemeTick] = useState(0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UiPreferences>;
        const next = { ...defaultUiPreferences, ...parsed };
        setPreferences(next);
        applyPreferences(next);
        return;
      }
    } catch {
      // Invalid local preference data should never break the application shell.
    }
    applyPreferences(defaultUiPreferences);
  }, []);

  useEffect(() => {
    applyPreferences(preferences);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch { /* storage can be unavailable */ }
  }, [preferences, systemThemeTick]);

  useEffect(() => {
    if (preferences.theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemThemeTick((value) => value + 1);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preferences.theme]);

  const value = useMemo<UiPreferencesContextValue>(() => ({
    preferences,
    resolvedTheme: resolveTheme(preferences.theme),
    updatePreferences: (patch) => setPreferences((current) => ({ ...current, ...patch })),
    resetPreferences: () => setPreferences(defaultUiPreferences),
  }), [preferences, systemThemeTick]);

  return <UiPreferencesContext.Provider value={value}>{children}</UiPreferencesContext.Provider>;
}

export function useUiPreferences() {
  const value = useContext(UiPreferencesContext);
  if (!value) throw new Error("useUiPreferences must be used inside UiPreferencesProvider");
  return value;
}
