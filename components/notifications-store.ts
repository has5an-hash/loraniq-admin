"use client";

/* Shared notifications store — one source of truth for the topbar bell,
   the dropdown panel and the /notifications hub page.
   Mirrors the external-store pattern used by ui-preferences-provider. */

export type NotificationIconKey = "system" | "team" | "payment" | "project" | "security" | "report";

export type LoraniqNotification = {
  id: number;
  title: string;
  body: string;
  kind: string;
  kindEn: string;
  time: string;
  timeEn: string;
  read: boolean;
  icon: NotificationIconKey;
};

const STORAGE_KEY = "loraniq-notifications-v2";

export const notificationSeed: LoraniqNotification[] = [
  { id: 1, title: "نسخه جدید آماده بررسی است", body: "Build لورانیک با موفقیت در محیط Preview منتشر شد.", kind: "سیستم", kindEn: "System", time: "۲ دقیقه پیش", timeEn: "2 min ago", read: false, icon: "system" },
  { id: 2, title: "سارا به پروژه اضافه شد", body: "عضویت سارا یوسفی در Loraniq Commerce تأیید شد.", kind: "تیم", kindEn: "Team", time: "۱۸ دقیقه پیش", timeEn: "18 min ago", read: false, icon: "team" },
  { id: 3, title: "پرداخت INV-2048 ثبت شد", body: "پرداخت ۱۸۶٫۴ میلیون تومان با موفقیت دریافت شد.", kind: "مالی", kindEn: "Finance", time: "۱ ساعت پیش", timeEn: "1 h ago", read: false, icon: "payment" },
  { id: 4, title: "ریسک پروژه افزایش یافت", body: "Dorsa Intelligence به آستانه هشدار برنامه زمان‌بندی رسید.", kind: "پروژه", kindEn: "Project", time: "۲ ساعت پیش", timeEn: "2 h ago", read: false, icon: "project" },
  { id: 5, title: "سیاست امنیتی به‌روزرسانی شد", body: "نشست‌های قدیمی در بازبینی امنیتی بعدی منقضی می‌شوند.", kind: "سیستم", kindEn: "System", time: "امروز", timeEn: "Today", read: true, icon: "security" },
  { id: 6, title: "گزارش هفتگی آماده است", body: "خلاصه عملکرد فروش و عملیات برای مرور مدیریتی آماده شد.", kind: "سیستم", kindEn: "System", time: "دیروز", timeEn: "Yesterday", read: true, icon: "report" },
];

const listeners = new Set<() => void>();
let items: LoraniqNotification[] = notificationSeed;
let storageRead = false;

function readStorage(): LoraniqNotification[] {
  if (typeof window === "undefined") return notificationSeed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return notificationSeed;
    const parsed = JSON.parse(raw) as LoraniqNotification[];
    if (!Array.isArray(parsed) || !parsed.length) return notificationSeed;
    return parsed;
  } catch {
    return notificationSeed;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage may be unavailable */
  }
}

function publish(next: LoraniqNotification[]) {
  items = next;
  persist();
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  if (typeof window !== "undefined" && !storageRead) {
    items = readStorage();
    storageRead = true;
  }
  return items;
}

function getServerSnapshot() {
  return notificationSeed;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const notificationsStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  markOne(id: number) {
    if (!getSnapshot().some((item) => item.id === id && !item.read)) return;
    publish(getSnapshot().map((item) => (item.id === id ? { ...item, read: true } : item)));
  },
  markAll() {
    if (!getSnapshot().some((item) => !item.read)) return;
    publish(getSnapshot().map((item) => ({ ...item, read: true })));
  },
  clearAll() {
    publish([]);
  },
  reset() {
    publish(notificationSeed);
  },
};

export function unreadCount(list: LoraniqNotification[]) {
  return list.filter((item) => !item.read).length;
}
