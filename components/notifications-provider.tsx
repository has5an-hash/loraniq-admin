"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type NotificationItem = { id: number; title: string; body: string; kind: string; time: string; read: boolean; icon?: string };
const seed: NotificationItem[] = [
  { id: 1, title: "نسخه جدید آماده بررسی است", body: "Build لورانیک با موفقیت در محیط Preview منتشر شد.", kind: "سیستم", time: "۲ دقیقه پیش", read: false },
  { id: 2, title: "سارا به پروژه اضافه شد", body: "عضویت سارا یوسفی در Loraniq Commerce تأیید شد.", kind: "تیم", time: "۱۸ دقیقه پیش", read: false },
  { id: 3, title: "پرداخت INV-2048 ثبت شد", body: "پرداخت با موفقیت دریافت شد.", kind: "مالی", time: "۱ ساعت پیش", read: true },
  { id: 4, title: "ریسک پروژه افزایش یافت", body: "Dorsa Intelligence به آستانه هشدار برنامه‌زمان‌بندی رسید.", kind: "پروژه", time: "۲ ساعت پیش", read: false },
];
type State = { read: number[]; cleared: boolean };
const key = "loraniq-notifications-v1";
let snapshot: State = { read: [], cleared: false };
let hydrated = false;
const listeners = new Set<() => void>();
function read(): State { if (typeof window === "undefined") return { read: [], cleared: false }; try { return JSON.parse(window.localStorage.getItem(key) || "{\"read\":[],\"cleared\":false}") as State; } catch { return { read: [], cleared: false }; } }
function getSnapshot() { if (typeof window !== "undefined" && !hydrated) { snapshot = read(); hydrated = true; } return snapshot; }
function subscribe(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener); }
function publish(next: State) { snapshot = next; hydrated = true; try { window.localStorage.setItem(key, JSON.stringify(next)); } catch {} listeners.forEach((listener) => listener()); }
type Context = { items: NotificationItem[]; unreadCount: number; markRead: (id: number) => void; markAllRead: () => void; clear: () => void };
const NotificationContext = createContext<Context | null>(null);
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => ({ read: [], cleared: false }));
  const items = useMemo(() => state.cleared ? [] : seed.map((item) => ({ ...item, read: item.read || state.read.includes(item.id) })), [state]);
  const markRead = useCallback((id: number) => publish({ ...getSnapshot(), read: [...new Set([...getSnapshot().read, id])] }), []);
  const markAllRead = useCallback(() => publish({ ...getSnapshot(), read: seed.map((item) => item.id) }), []);
  const clear = useCallback(() => publish({ ...getSnapshot(), cleared: true }), []);
  const value = useMemo(() => ({ items, unreadCount: items.filter((item) => !item.read).length, markRead, markAllRead, clear }), [items, markRead, markAllRead, clear]);
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
export function useNotificationCenter() { const value = useContext(NotificationContext); if (!value) throw new Error("useNotificationCenter must be used inside NotificationsProvider"); return value; }
