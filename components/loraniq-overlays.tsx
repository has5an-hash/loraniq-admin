"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CommandPalette, type PaletteCommand } from "@/components/command-palette";

export function LoraniqOverlays({
  rtl,
  paletteOpen,
  setPaletteOpen,
  paletteSession,
  commands,
  helpOpen,
  setHelpOpen,
}: {
  rtl: boolean;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  paletteSession: number;
  commands: PaletteCommand[];
  helpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
}) {
  return (
    <>
      <CommandPalette key={paletteSession} open={paletteOpen} onOpenChange={setPaletteOpen} items={commands} rtl={rtl} />

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
              <kbd>Ctrl / ⌘ + K</kbd> {rtl ? "جستجوی سریع صفحات و عملیات" : "Quick page & action search"}
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
