"use client";



import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  Boxes,
  CalendarDays,
  ChartNoAxesCombined,
  CircleHelp,
  Columns3,
  Command as CommandIcon,
  FileText,
  FolderKanban,
  HardDrive,
  HeartPulse,
  Languages,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  PanelLeft,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Table2,
  UserCog,
  UsersRound,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { useUiPreferences } from "@/components/ui-preferences-provider";

const LoraniqOverlays = dynamic(() => import("@/components/loraniq-overlays").then((mod) => mod.LoraniqOverlays), { ssr: false });

type NavigationKey =
  | "executive"
  | "analytics"
  | "ecommerce"
  | "crm"
  | "finance"
  | "healthcare"
  | "tables"
  | "forms"
  | "calendar"
  | "projects"
  | "chat"
  | "email"
  | "files"
  | "invoice"
  | "components"
  | "search"
  | "notifications"
  | "kanban"
  | "users"
  | "settings";

type NavigationItem = {
  key: NavigationKey;
  label: string;
  labelEn: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
};

const dashboards: NavigationItem[] = [
  { key: "executive", label: "نمای مدیریتی", labelEn: "Executive", icon: LayoutDashboard, href: "/" },
  { key: "analytics", label: "تحلیل داده", labelEn: "Analytics", icon: ChartNoAxesCombined, href: "/analytics/" },
  { key: "ecommerce", label: "فروشگاه", labelEn: "Ecommerce", icon: ShoppingBag, href: "/ecommerce/" },
  { key: "crm", label: "مدیریت مشتری", labelEn: "CRM", icon: UsersRound, href: "/crm/" },
  { key: "finance", label: "امور مالی", labelEn: "Finance", icon: WalletCards, href: "/finance/" },
  { key: "healthcare", label: "سلامت", labelEn: "Healthcare", icon: HeartPulse, href: "/healthcare/" },
];

const applications: NavigationItem[] = [
  { key: "search", label: "جستجوی سراسری", labelEn: "Global Search", icon: Search, href: "/search/" },
  { key: "notifications", label: "اعلان‌ها", labelEn: "Notifications", icon: Bell, href: "/notifications/", badge: "۳" },
  { key: "tables", label: "جداول پیشرفته", labelEn: "Data Tables", icon: Table2, href: "/tables/" },
  { key: "forms", label: "فرم‌ها", labelEn: "Forms", icon: FileText, href: "/forms/" },
  { key: "calendar", label: "تقویم", labelEn: "Calendar", icon: CalendarDays, href: "/calendar/" },
  { key: "projects", label: "پروژه‌ها", labelEn: "Projects", icon: FolderKanban, href: "/projects/" },
  { key: "kanban", label: "کانبان", labelEn: "Kanban", icon: Columns3, href: "/kanban/" },
  { key: "users", label: "مدیریت کاربران", labelEn: "User Management", icon: UserCog, href: "/users/" },
  { key: "chat", label: "گفتگو", labelEn: "Chat", icon: MessageCircle, href: "/chat/", badge: "۲" },
  { key: "email", label: "ایمیل", labelEn: "Email", icon: Mail, href: "/email/", badge: "۲" },
  { key: "files", label: "مدیریت فایل", labelEn: "File Manager", icon: HardDrive, href: "/files/" },
  { key: "invoice", label: "فاکتورها", labelEn: "Invoice", icon: ReceiptText, href: "/invoice/" },
  { key: "components", label: "آزمایشگاه UI", labelEn: "UI Components", icon: Boxes, href: "/components/" },
];

const settings: NavigationItem = {
  key: "settings",
  label: "تنظیمات نمایش",
  labelEn: "Appearance Settings",
  icon: Settings,
  href: "/settings/",
};

const allNavigation = [...dashboards, ...applications, settings];

function resolveActive(pathname: string, fallback: NavigationKey): NavigationKey {
  const match = allNavigation.find((item) => item.href !== "/" && pathname.includes(item.href.replaceAll("/", "")));
  if (match) return match.key;
  return pathname === "/" ? "executive" : fallback;
}

export function LoraniqShell({
  children,
  active = "executive",
}: {
  children: ReactNode;
  active?: NavigationKey;
}) {
  const pathname = usePathname() ?? "/";
  const { preferences, resolvedTheme, updatePreferences } = useUiPreferences();
  const rtl = preferences.direction === "rtl";
  const dark = resolvedTheme === "dark";
  const routeActive = resolveActive(pathname, active);
  const activeItem = allNavigation.find((item) => item.key === routeActive) ?? dashboards[0];
  const ActiveIcon = activeItem.icon;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);

  const commandItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return allNavigation;
    return allNavigation.filter((item) =>
      `${item.label} ${item.labelEn}`.toLowerCase().includes(needle)
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setPaletteOpen(true);
      }
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const renderLink = (item: NavigationItem) => {
    const Icon = item.icon;
    const selected = item.key === routeActive;
    return (
      <Link
        key={item.key}
        className={`nav-link nav-item ${selected ? "selected active" : ""}`}
        href={item.href}
        aria-current={selected ? "page" : undefined}
        onClick={() => setMobileOpen(false)}
      >
        <Icon />
        <span>{rtl ? item.label : item.labelEn}</span>
        {item.badge ? <small className="nav-badge">{item.badge}</small> : null}
        {selected ? <i className="active-pip" aria-hidden="true" /> : null}
      </Link>
    );
  };

  return (
    <div className="studio-shell app-shell">
      <a href="#main-content" className="skip-link">
        پرش به محتوای اصلی
      </a>

      {mobileOpen ? (
        <button
          className="sidebar-backdrop"
          aria-label="بستن منو"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`studio-sidebar sidebar ${mobileOpen ? "is-open" : ""}`}
        aria-label="ناوبری اصلی"
      >
        <div className="sidebar-head">
          <Link className="studio-brand brand-lockup" href="/" onClick={() => setMobileOpen(false)}>
            <span className="monogram" aria-hidden="true">
              L<span>•</span>
            </span>
            <span className="brand-name">
              لورانیک
              <small>LORANIQ / WORKSPACE</small>
            </span>
          </Link>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="بستن منو">
            <X />
          </button>
        </div>

        <div className="sidebar-scroll">
          <div className="workspace-switch">
            <span className="workspace-avatar">ل</span>
            <div>
              <b>{rtl ? "فضای کاری لورانیک" : "Loraniq Workspace"}</b>
              <small>
                {rtl ? "طرح حرفه‌ای" : "Professional plan"} <i>PRO</i>
              </small>
            </div>
            <ShieldCheck size={17} />
          </div>

          <p className="nav-caption nav-eyebrow">{rtl ? "فضای مدیریت" : "Dashboards"}</p>
          <nav className="nav-stack">{dashboards.map(renderLink)}</nav>

          <p className="nav-caption nav-eyebrow nav-space">{rtl ? "ابزارها و اپلیکیشن‌ها" : "Apps & tools"}</p>
          <nav className="nav-stack">{applications.map(renderLink)}</nav>

          <p className="nav-caption nav-eyebrow nav-space">{rtl ? "ترجیحات" : "Preferences"}</p>
          <nav className="nav-stack">
            {renderLink(settings)}
            <button className="nav-link nav-item" onClick={() => setHelpOpen(true)}>
              <CircleHelp />
              <span>{rtl ? "راهنما و میان‌برها" : "Help & shortcuts"}</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom sidebar-foot">
          <div className="workspace-note workspace-card">
            <span className="tiny-orbit workspace-icon">
              <Sparkles />
            </span>
            <div>
              <b>{rtl ? "یک نگاه، تصمیم‌های بهتر." : "One view, better decisions."}</b>
              <p>
                {rtl
                  ? "همهٔ آنچه برای مدیریت روزانه نیاز دارید، در یک فضای منظم."
                  : "Everything you need for daily management in one calm workspace."}
              </p>
              <button onClick={() => setHelpOpen(true)}>
                {rtl ? "کشف امکانات" : "Explore features"}
              </button>
            </div>
          </div>
          <div className="sidebar-status">
            <i />
            {rtl ? "نسخهٔ پیش‌نمایش" : "Preview build"}
            <span>1.0</span>
          </div>
        </div>
      </aside>

      <div className="studio-body app-body">
        <header className="studio-topbar topbar">
          <div className="topbar-context">
            <button
              className="square-button icon-button mobile-menu menu-button"
              aria-label="باز کردن منو"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>
            <span className="context-mark">
              <ActiveIcon size={18} />
            </span>
            <span>
              {rtl ? "فضای کاری" : "Workspace"}
              <span className="slash">/</span>
              <b>{rtl ? activeItem.label : activeItem.labelEn}</b>
            </span>
            <span className="demo-tag">{rtl ? "دادهٔ نمونه" : "Demo data"}</span>
          </div>

          <div className="topbar-tools topbar-actions">
            <button
              className="search-button search-trigger"
              onClick={() => {
                setQuery("");
                setPaletteOpen(true);
              }}
              aria-label="جستجو در لورانیک"
            >
              <Search />
              <span>{rtl ? "جستجو" : "Search"}</span>
              <kbd>
                <CommandIcon /> K
              </kbd>
            </button>

            <span className="tool-divider" />

            <button
              className="square-button icon-button sidebar-quick-toggle"
              onClick={() =>
                updatePreferences({ sidebar: preferences.sidebar === "full" ? "compact" : "full" })
              }
              aria-label="تغییر حالت سایدبار"
              aria-pressed={preferences.sidebar === "compact"}
            >
              <PanelLeft />
            </button>

            <button
              className="square-button icon-button"
              aria-label="تغییر جهت و زبان"
              onClick={() => updatePreferences({ direction: rtl ? "ltr" : "rtl" })}
            >
              <Languages />
            </button>

            <button
              className="square-button icon-button"
              aria-label="تغییر پوسته"
              onClick={() => updatePreferences({ theme: dark ? "light" : "dark" })}
            >
              {dark ? <Sun /> : <Moon />}
            </button>

            <Link className="square-button icon-button bell-button notification" href="/notifications/" aria-label="اعلان‌ها">
              <Bell />
              <i />
            </Link>

            <button className="user-avatar avatar" aria-label="پروفایل نمایشی" onClick={() => setHelpOpen(true)}>
              حم
            </button>
          </div>
        </header>

        {children}
      </div>

      {(paletteOpen || helpOpen) ? (
        <LoraniqOverlays
          rtl={rtl}
          paletteOpen={paletteOpen}
          setPaletteOpen={setPaletteOpen}
          query={query}
          setQuery={setQuery}
          commandItems={commandItems}
          helpOpen={helpOpen}
          setHelpOpen={setHelpOpen}
        />
      ) : null}
    </div>
  );
}
