"use client";
import Link from "next/link";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotificationCenter } from "@/components/notifications-provider";
export function NotificationBell({ rtl }: { rtl: boolean }) {
  const { items, unreadCount, markRead, markAllRead, clear } = useNotificationCenter();
  return <Popover><PopoverTrigger className="square-button icon-button bell-button notification-bell" aria-label="اعلان‌ها"><Bell />{unreadCount ? <b className="bell-badge">{unreadCount}</b> : null}</PopoverTrigger><PopoverContent dir={rtl ? "rtl" : "ltr"} align="end" className="bell-panel"><header><div><b>{rtl ? "اعلان‌ها" : "Notifications"}</b><small>{unreadCount ? `${unreadCount} خوانده‌نشده` : "همه خوانده شده‌اند"}</small></div><span><button aria-label="علامت‌گذاری همه" onClick={markAllRead}><CheckCheck /></button><button aria-label="پاک کردن اعلان‌ها" onClick={clear}><Trash2 /></button></span></header><div className="bell-list">{items.length ? items.slice(0, 4).map((item) => <button key={item.id} className={!item.read ? "unread" : ""} onClick={() => markRead(item.id)}><b>{item.title}</b><small>{item.body}</small><em>{item.time}</em></button>) : <p>اعلانی برای نمایش نیست.</p>}</div><Link href="/notifications/">مشاهده همه اعلان‌ها</Link></PopoverContent></Popover>;
}
