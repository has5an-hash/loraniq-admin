"use client";

import Link from "next/link";
import { Search, type LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type CommandItem = {
  key: string;
  label: string;
  labelEn: string;
  href: string;
  icon: LucideIcon;
};

export function LoraniqOverlays({
  rtl,
  paletteOpen,
  setPaletteOpen,
  query,
  setQuery,
  commandItems,
  helpOpen,
  setHelpOpen,
}: {
  rtl: boolean;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  query: string;
  setQuery: (value: string) => void;
  commandItems: CommandItem[];
  helpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
}) {
  return (
    <>
      <Dialog open={paletteOpen} onOpenChange={setPaletteOpen}>
        <DialogContent className="command-dialog" showCloseButton={false}>
          <DialogHeader className="sr-only">
            <DialogTitle>جستجوی سریع</DialogTitle>
            <DialogDescription>در صفحات و عملیات لورانیک جستجو کنید</DialogDescription>
          </DialogHeader>
          <div className="command-search">
            <Search />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="نام صفحه یا عملیات را بنویسید..."
            />
            <kbd>ESC</kbd>
          </div>
          <p className="command-label">{rtl ? "پیشنهادها" : "Suggestions"}</p>
          <div className="command-results">
            {commandItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.key} href={item.href} onClick={() => setPaletteOpen(false)}>
                  <Icon />
                  <span>
                    <b>{item.label}</b>
                    <small>{item.labelEn}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="detail-dialog">
          <DialogHeader>
            <DialogTitle>{rtl ? "لورانیک؛ فضای کاری حرفه‌ای" : "Loraniq professional workspace"}</DialogTitle>
            <DialogDescription>
              {rtl
                ? "میان‌برها و کنترل‌های اصلی قالب در همین پیش‌نمایش فعال‌اند."
                : "Core shortcuts and display controls are active in this preview."}
            </DialogDescription>
          </DialogHeader>
          <div className="help-copy">
            <p>
              <kbd>Ctrl / ⌘ + K</kbd> {rtl ? "جستجوی سریع صفحات" : "Quick page search"}
            </p>
            <p>
              <kbd>Tab</kbd> {rtl ? "حرکت بین کنترل‌ها" : "Move through controls"} · <kbd>Esc</kbd>{" "}
              {rtl ? "بستن پنجره یا منوی موبایل" : "Close dialogs or mobile navigation"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
