"use client";

import "../app-breadth-premium.css";

import { useMemo, useState } from "react";
import { useSyncExternalStore } from "react";
import { Bell, BellRing, CheckCheck, CircleAlert, CreditCard, FolderKanban, Mail, Megaphone, RotateCcw, Settings2, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { notificationsStore, unreadCount, type NotificationIconKey } from "@/components/notifications-store";

const icons: Record<NotificationIconKey, typeof Sparkles> = {
  system: Sparkles,
  team: UserPlus,
  payment: CreditCard,
  project: FolderKanban,
  security: ShieldCheck,
  report: Mail,
};

export default function NotificationsPage() {
  const items = useSyncExternalStore(
    notificationsStore.subscribe,
    notificationsStore.getSnapshot,
    notificationsStore.getServerSnapshot,
  );
  const [filter, setFilter] = useState("همه");
  const [channel, setChannel] = useState({ product: true, email: true, security: true });

  const visible = useMemo(
    () => items.filter((item) => filter === "همه" || (filter === "خوانده‌نشده" ? !item.read : item.kind === filter)),
    [items, filter],
  );
  const unread = unreadCount(items);

  return (
    <LoraniqShell active="notifications">
      <main id="main-content" className="main-content notifications-page">
        <section className="notifications-hero" aria-labelledby="page-title">
          <div>
            <span className="notifications-kicker">
              <BellRing /> Notification hub
            </span>
            <h1 id="page-title">اعلان مهم را ببین؛ نویز را کنترل کن.</h1>
            <p>
              Inbox رویدادها، دسته‌بندی، unread state و تنظیم کانال‌ها — هم‌سنخ با پنل اعلان نوار بالا و در یک مرکز
              responsive.
            </p>
            <div className="notifications-actions">
              <Button onClick={() => notificationsStore.markAll()} disabled={!unread}>
                <CheckCheck /> علامت‌گذاری همه به‌عنوان خوانده
              </Button>
              <Button variant="outline" onClick={() => notificationsStore.reset()}>
                <RotateCcw /> بازگردانی دادهٔ نمونه
              </Button>
              <Button variant="outline">
                <Settings2 /> تنظیمات کانال‌ها
              </Button>
            </div>
          </div>
          <div className="notification-pulse">
            <span>Unread</span>
            <strong>{unread.toLocaleString("fa-IR")}</strong>
            <small>از {items.length.toLocaleString("fa-IR")} اعلان اخیر</small>
            <div>
              <i style={{ width: `${items.length ? Math.max(8, (unread / items.length) * 100) : 0}%` }} />
            </div>
          </div>
        </section>

        <section className="notifications-layout">
          <article className="notifications-feed">
            <header>
              <div>
                <h2>مرکز اعلان‌ها</h2>
                <p>رویدادهای محصول، تیم، مالی و پروژه</p>
              </div>
              <span>{visible.length.toLocaleString("fa-IR")} مورد</span>
            </header>
            <div className="notifications-filters">
              {["همه", "خوانده‌نشده", "سیستم", "تیم", "مالی", "پروژه"].map((item) => (
                <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="notification-list">
              {visible.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <button
                    key={item.id}
                    className={item.read ? "read" : "unread"}
                    onClick={() => notificationsStore.markOne(item.id)}
                    title={item.read ? undefined : "علامت‌گذاری به‌عنوان خوانده‌شده"}
                  >
                    <span className={`notification-icon tone-${item.icon}`}>
                      <Icon />
                    </span>
                    <div>
                      <span className="notification-row-head">
                        <b>{item.title}</b>
                        {!item.read && <i />}
                      </span>
                      <p>{item.body}</p>
                      <small>
                        {item.kind} · {item.time}
                      </small>
                    </div>
                  </button>
                );
              })}
              {!visible.length && (
                <div className="notifications-empty">
                  <Bell />
                  <h3>اعلانی در این فیلتر نیست</h3>
                  <p>فیلتر دیگری انتخاب کنید یا همه را بازنشانی کنید.</p>
                </div>
              )}
            </div>
          </article>

          <aside className="notifications-settings">
            <header>
              <Megaphone />
              <div>
                <h2>ترجیحات اعلان</h2>
                <p>کانال‌های مهم را روشن نگه دار.</p>
              </div>
            </header>
            <Preference
              label="اعلان‌های محصول"
              hint="Build، deploy و تغییرات محصول"
              value={channel.product}
              onChange={() => setChannel((v) => ({ ...v, product: !v.product }))}
            />
            <Preference
              label="خلاصه ایمیلی"
              hint="Digest رویدادهای مهم"
              value={channel.email}
              onChange={() => setChannel((v) => ({ ...v, email: !v.email }))}
            />
            <Preference
              label="هشدار امنیتی"
              hint="Login و تغییرات حساس"
              value={channel.security}
              onChange={() => setChannel((v) => ({ ...v, security: !v.security }))}
            />
            <div className="notification-policy">
              <CircleAlert />
              <p>هشدارهای امنیتی بحرانی حتی در حالت کاهش اعلان، داخل پنل نمایش داده می‌شوند.</p>
            </div>
          </aside>
        </section>
      </main>
    </LoraniqShell>
  );
}

function Preference({ label, hint, value, onChange }: { label: string; hint: string; value: boolean; onChange: () => void }) {
  return (
    <button className="notification-preference" aria-pressed={value} onClick={onChange}>
      <div>
        <b>{label}</b>
        <small>{hint}</small>
      </div>
      <span className={value ? "on" : ""}>
        <i />
      </span>
    </button>
  );
}
