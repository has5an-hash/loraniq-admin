"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommandPalette } from "@/components/command-palette";
import type { LucideIcon } from "lucide-react";

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
  const router = useRouter();

  return (
    <>
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        query={query}
        onQueryChange={setQuery}
        items={commandItems}
        onSelect={(item) => {
          const target = commandItems.find(
            (candidate) => candidate.label === item.label && candidate.labelEn === item.labelEn,
          );
          if (!target) return;
          setPaletteOpen(false);
          router.push(target.href);
        }}
      />

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
              <kbd>↑ / ↓</kbd> {rtl ? "انتخاب نتیجه" : "Select result"} · <kbd>Enter</kbd>{" "}
              {rtl ? "باز کردن" : "Open"} · <kbd>Esc</kbd> {rtl ? "بستن" : "Close"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
