"use client";

import { useState, type ComponentType } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type AstraCommandItem = {
  label: string;
  labelEn: string;
  icon: ComponentType<{ className?: string }>;
};

export function CommandPalette({
  open,
  onOpenChange,
  query,
  onQueryChange,
  items,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (query: string) => void;
  items: AstraCommandItem[];
  onSelect: (item: AstraCommandItem) => void;
}) {
  const [index, setIndex] = useState(0);
  const active = Math.min(index, Math.max(items.length - 1, 0));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="command-dialog" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>جستجوی سریع</DialogTitle>
          <DialogDescription>صفحه را جستجو و با کلیدهای جهت و Enter انتخاب کنید.</DialogDescription>
        </DialogHeader>

        <div className="command-search">
          <Search />
          <input
            autoFocus
            aria-label="جستجوی سریع صفحات"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-options"
            aria-activedescendant={items.length ? `command-${active}` : undefined}
            value={query}
            placeholder="کجا می‌خواهید بروید؟"
            onChange={(event) => {
              onQueryChange(event.target.value);
              setIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                if (items.length) {
                  setIndex(
                    (active + (event.key === "ArrowDown" ? 1 : -1) + items.length) %
                      items.length,
                  );
                }
              }
              if (event.key === "Enter" && items[active]) {
                event.preventDefault();
                onSelect(items[active]);
              }
            }}
          />
          <kbd>ESC</kbd>
        </div>

        <div id="command-options" role="listbox" aria-label="صفحات" className="command-results">
          {items.map((item, itemIndex) => {
            const Icon = item.icon;
            return (
              <button
                id={`command-${itemIndex}`}
                role="option"
                aria-selected={itemIndex === active}
                key={item.label}
                className={itemIndex === active ? "selected" : ""}
                onMouseEnter={() => setIndex(itemIndex)}
                onClick={() => onSelect(item)}
              >
                <Icon />
                <span>
                  <b>{item.label}</b>
                  <small>{item.labelEn}</small>
                </span>
              </button>
            );
          })}
          {!items.length && <p className="empty-command">صفحه‌ای با این نام پیدا نشد.</p>}
        </div>

        <div className="command-footer">↑ ↓ جابه‌جایی &nbsp; · &nbsp; Enter انتخاب &nbsp; · &nbsp; Esc بستن</div>
      </DialogContent>
    </Dialog>
  );
}
