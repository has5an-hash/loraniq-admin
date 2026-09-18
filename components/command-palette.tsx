"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Clock3, Eraser, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type PaletteCommand = {
  id: string;
  label: string;
  labelEn: string;
  group: string;
  groupEn: string;
  icon: LucideIcon;
  run: () => void;
};

const RECENTS_KEY = "loraniq-recent-searches-v1";
const RECENTS_LIMIT = 5;

function readRecents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed.slice(0, RECENTS_LIMIT) : [];
  } catch {
    return [];
  }
}

function writeRecents(list: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, RECENTS_LIMIT)));
  } catch {
    /* storage may be unavailable */
  }
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[ىي]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ًٌٍَُِّْـ\u200c]/g, "")
    .replace(/[ه]$/g, (m, offset, full) => (offset > 0 && /[ابثجحخدذرزسشصضطظعغفقکلمنوهپچژگ]$/.test(full.slice(0, offset)) ? "" : m))
    .trim();
}

/* Subsequence match: every character of the needle must appear in order in the
   haystack. Keeps "کالب" → "مدیریت کاربران" and "dsbrd" → "داشبورد" findable. */
function looseMatch(haystack: string, needle: string) {
  if (!needle) return true;
  let cursor = 0;
  for (const char of needle) {
    if (char === " ") continue;
    cursor = haystack.indexOf(char, cursor);
    if (cursor === -1) return false;
    cursor += 1;
  }
  return true;
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  rtl,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaletteCommand[];
  rtl: boolean;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [recents, setRecents] = useState<string[]>(() => readRecents());
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const needle = normalize(query);
    const matched = needle
      ? items.filter((item) =>
          looseMatch(normalize(`${item.label} ${item.labelEn} ${item.group} ${item.groupEn}`), needle),
        )
      : items;
    const map = new Map<string, PaletteCommand[]>();
    for (const item of matched) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, [items, query]);

  const flat = useMemo(() => groups.flatMap(([, list]) => list), [groups]);
  const active = Math.min(index, Math.max(flat.length - 1, 0));
  const showRecents = !query.trim() && recents.length > 0;

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const commit = (command: PaletteCommand) => {
    const term = query.trim();
    if (term) {
      const next = [term, ...recents.filter((item) => item !== term)].slice(0, RECENTS_LIMIT);
      setRecents(next);
      writeRecents(next);
    }
    onOpenChange(false);
    command.run();
  };

  const groupedIndex = (() => {
    let counter = 0;
    return groups.map(([group, list]) => {
      const start = counter;
      counter += list.length;
      return { group, list, start };
    });
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="command-dialog" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>{rtl ? "جستجوی سریع" : "Quick search"}</DialogTitle>
          <DialogDescription>
            {rtl
              ? "صفحه یا عملیات را جستجو کنید و با کلیدهای جهت و Enter انتخاب کنید."
              : "Search pages or actions and pick one with arrow keys and Enter."}
          </DialogDescription>
        </DialogHeader>

        <div className="command-search">
          <Search />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            enterKeyHint="search"
            aria-label={rtl ? "جستجوی سریع صفحات و عملیات" : "Quick search pages and actions"}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-options"
            aria-activedescendant={flat.length ? `command-${active}` : undefined}
            value={query}
            placeholder={rtl ? "نام صفحه یا عملیات را بنویسید…" : "Search pages or actions…"}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                if (flat.length) {
                  setIndex((active + (event.key === "ArrowDown" ? 1 : -1) + flat.length) % flat.length);
                }
              }
              if (event.key === "Enter" && flat[active]) {
                event.preventDefault();
                commit(flat[active]);
              }
            }}
          />
          {query ? (
            <button
              type="button"
              className="command-clear"
              aria-label={rtl ? "پاک کردن جستجو" : "Clear search"}
              onClick={() => {
                setQuery("");
                setIndex(0);
                inputRef.current?.focus();
              }}
            >
              <X />
            </button>
          ) : null}
          <kbd>ESC</kbd>
        </div>

        <div id="command-options" role="listbox" aria-label={rtl ? "نتایج" : "Results"} className="command-results" ref={listRef}>
          {showRecents ? (
            <div className="command-recent">
              <p className="command-label">
                <Clock3 />
                {rtl ? "جستجوهای اخیر" : "Recent searches"}
              </p>
              {recents.map((term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setIndex(0);
                    inputRef.current?.focus();
                  }}
                >
                  <Clock3 />
                  <b>{term}</b>
                  <small>{rtl ? "جستجو" : "Search"}</small>
                </button>
              ))}
              <button
                type="button"
                className="command-recent-clear"
                onClick={() => {
                  setRecents([]);
                  writeRecents([]);
                }}
              >
                <Eraser />
                {rtl ? "پاک کردن سابقه" : "Clear history"}
              </button>
            </div>
          ) : null}

          {groupedIndex.map(({ group, list, start }) => (
            <div key={group}>
              <p className="command-label">{group}</p>
              {list.map((item, itemIndex) => {
                const Icon = item.icon;
                const itemActive = start + itemIndex === active;
                return (
                  <button
                    type="button"
                    id={`command-${start + itemIndex}`}
                    data-index={start + itemIndex}
                    role="option"
                    aria-selected={itemActive}
                    key={item.id}
                    className={itemActive ? "selected" : ""}
                    onMouseEnter={() => setIndex(start + itemIndex)}
                    onClick={() => commit(item)}
                  >
                    <Icon />
                    <span>
                      <b>{rtl ? item.label : item.labelEn}</b>
                      <small>{rtl ? item.labelEn : item.label}</small>
                    </span>
                    <em>{rtl ? "↵" : "↵"}</em>
                  </button>
                );
              })}
            </div>
          ))}

          {!flat.length ? (
            <div className="empty-command">
              <Search />
              <b>{rtl ? "چیزی پیدا نشد" : "Nothing found"}</b>
              <p>{rtl ? "عبارت دیگری را امتحان کنید." : "Try a different term."}</p>
            </div>
          ) : null}
        </div>

        <div className="command-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> {rtl ? "جابه‌جایی" : "Navigate"}
          </span>
          <span>
            <kbd>Enter</kbd> {rtl ? "انتخاب" : "Select"}
          </span>
          <span>
            <kbd>Esc</kbd> {rtl ? "بستن" : "Close"}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
