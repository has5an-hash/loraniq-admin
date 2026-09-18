"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Bell, BellRing, Check, CheckCheck, CreditCard, FolderKanban, Inbox, Mail, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { notificationsStore, unreadCount, type LoraniqNotification, type NotificationIconKey } from "@/components/notifications-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const icons: Record<NotificationIconKey, typeof Sparkles> = {
  system: Sparkles,
  team: UserPlus,
  payment: CreditCard,
  project: FolderKanban,
  security: ShieldCheck,
  report: Mail,
};

export function NotificationBell({ rtl }: { rtl: boolean }) {
  const items = useSyncExternalStore(
    notificationsStore.subscribe,
    notificationsStore.getSnapshot,
    notificationsStore.getServerSnapshot,
  );
  const unread = unreadCount(items);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const latest = items.slice(0, 5);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="square-button icon-button bell-button"
        aria-label={
          rtl
            ? unread
              ? `${unread.toLocaleString("fa-IR")} اعلان خوانده‌نشده`
              : "اعلان‌ها"
            : unread
              ? `${unread} unread notifications`
              : "Notifications"
        }
      >
        <Bell />
        {unread > 0 ? (
          <i className="bell-badge" aria-hidden="true">
            {unread > 9 ? "۹+" : unread.toLocaleString("fa-IR")}
          </i>
        ) : null}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        dir={rtl ? "rtl" : "ltr"}
        avoidCollisions
        className="notification-panel"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <div ref={panelRef} className="notification-panel-inner">
          <header className="notification-panel-head">
            <div>
              <b>{rtl ? "اعلان‌ها" : "Notifications"}</b>
              <small>{rtl ? `${unread.toLocaleString("fa-IR")} خوانده‌نشده` : `${unread} unread`}</small>
            </div>
            <button
              type="button"
              className="notification-panel-action"
              onClick={() => notificationsStore.markAll()}
              disabled={!unread}
            >
              <CheckCheck />
              {rtl ? "خوانده شد" : "Mark all read"}
            </button>
          </header>

          <div className="notification-panel-list">
            {latest.length ? (
              latest.map((item: LoraniqNotification) => {
                const Icon = icons[item.icon];
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={item.read ? "notification-panel-item read" : "notification-panel-item unread"}
                    onClick={() => notificationsStore.markOne(item.id)}
                    title={item.read ? undefined : rtl ? "علامت‌گذاری به‌عنوان خوانده‌شده" : "Mark as read"}
                  >
                    <span className={`notification-icon tone-${item.icon}`}>
                      <Icon />
                    </span>
                    <span className="notification-panel-copy">
                      <b>{item.title}</b>
                      <small>{item.body}</small>
                      <em>
                        {rtl ? item.kind : item.kind} · {rtl ? item.time : item.timeEn}
                      </em>
                    </span>
                    {!item.read ? (
                      <i className="notification-dot" aria-hidden="true" />
                    ) : (
                      <Check className="notification-read-check" aria-label={rtl ? "خوانده‌شده" : "Read"} />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="notification-panel-empty">
                <Inbox />
                <b>{rtl ? "اعلانی ندارید" : "You're all caught up"}</b>
                <p>{rtl ? "رویدادهای جدید همین‌جا نمایش داده می‌شوند." : "New events will appear here."}</p>
                <button type="button" onClick={() => notificationsStore.reset()}>
                  {rtl ? "بازگردانی دادهٔ نمونه" : "Restore sample data"}
                </button>
              </div>
            )}
          </div>

          <footer className="notification-panel-foot">
            <BellRing />
            <Link href="/notifications/" onClick={() => setOpen(false)}>
              {rtl ? "مشاهده همه اعلان‌ها" : "View all notifications"}
            </Link>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
