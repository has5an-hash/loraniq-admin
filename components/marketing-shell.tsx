"use client";

import "../app/astra-marketing.css";

import Link from "next/link";
import { ArrowLeft, Languages, Moon, Sparkles, Sun } from "lucide-react";
import { type ReactNode } from "react";
import { useUiPreferences } from "@/components/ui-preferences-provider";

export function MarketingShell({ children, landing = false }: { children: ReactNode; landing?: boolean }) {
  const { preferences, resolvedTheme, updatePreferences } = useUiPreferences();
  const rtl = preferences.direction === "rtl";
  const dark = resolvedTheme === "dark";
  const copy = rtl ? {
    brand: "لورانیک", brandSuffix: "ادمین", nav: ["ویژگی‌ها", "دموها", "معماری", "کامپوننت‌ها"], landingNav: ["دموها", "امکانات", "برنامه‌ها", "صفحات", "کارت‌ها", "معماری", "پشتیبانی"], navLabel: "ناوبری صفحه معرفی", directionLabel: "انتخاب جهت صفحه", directionToggle: "تغییر جهت و زبان", themeToggle: "تغییر پوسته", open: "ورود به پنل", openLabel: "ورود به پنل لورانیک", footer: "قالب مدیریت فارسی، دو جهته و مستقل؛ ساخته‌شده برای توسعه‌ی واقعی، نه فقط تصویر فروش.", footerLinks: ["دموها", "کامپوننت‌ها", "ورود"], year: "۲۰۲۶ · لورانیک ادمین",
  } : {
    brand: "Loraniq", brandSuffix: "Admin", nav: ["Features", "Demos", "Architecture", "Components"], landingNav: ["Demos", "Capabilities", "Apps", "Pages", "Cards", "Architecture", "Support"], navLabel: "Marketing navigation", directionLabel: "Page direction", directionToggle: "Change direction and language", themeToggle: "Change theme", open: "Open workspace", openLabel: "Open Loraniq workspace", footer: "A bilingual, bidirectional admin system built for real product development, not just a sales screenshot.", footerLinks: ["Demos", "Components", "Auth"], year: "2026 · Loraniq Admin",
  };
  const navItems = landing
    ? rtl
      ? [{ href: "#demos", label: copy.landingNav[0] }, { href: "#features", label: copy.landingNav[1] }, { href: "#apps", label: copy.landingNav[2] }, { href: "#pages", label: copy.landingNav[3] }, { href: "#cards", label: copy.landingNav[4] }, { href: "#architecture", label: copy.landingNav[5] }, { href: "#support", label: copy.landingNav[6] }]
      : [{ href: "#demos", label: copy.landingNav[0] }, { href: "#features", label: copy.landingNav[1] }, { href: "#apps", label: copy.landingNav[2] }, { href: "#pages", label: copy.landingNav[3] }, { href: "#cards", label: copy.landingNav[4] }, { href: "#architecture", label: copy.landingNav[5] }, { href: "#support", label: copy.landingNav[6] }]
    : rtl
      ? [{ href: "#features", label: copy.nav[0] }, { href: "/demos/", label: copy.nav[1] }, { href: "#architecture", label: copy.nav[2] }, { href: "/components/", label: copy.nav[3] }]
      : [{ href: "#features", label: copy.nav[0] }, { href: "/demos/", label: copy.nav[1] }, { href: "#architecture", label: copy.nav[2] }, { href: "/components/", label: copy.nav[3] }];

  return (
    <div className={`marketing-shell${landing ? " landing-marketing-shell" : ""}`}>
      <header className="marketing-nav">
        <Link className="marketing-brand" href="/landing/">
          <span><i /><i /><i /></span>
          <b>{copy.brand} <em>{copy.brandSuffix}</em></b>
        </Link>
        <nav aria-label={copy.navLabel}>
          {navItems.map((item) =>
            item.href.startsWith("#") ? <a href={item.href} key={item.href}>{item.label}</a> : <Link href={item.href} key={item.href}>{item.label}</Link>,
          )}
        </nav>
        <div className="marketing-actions">
          <div className="marketing-direction-control" role="group" aria-label={copy.directionLabel}>
            <button type="button" aria-pressed={rtl} className={rtl ? "is-active" : ""} onClick={() => updatePreferences({ direction: "rtl" })}>{rtl ? "راست‌چین" : "RTL"}</button>
            <button type="button" aria-pressed={!rtl} className={!rtl ? "is-active" : ""} onClick={() => updatePreferences({ direction: "ltr" })}>{rtl ? "چپ‌چین" : "LTR"}</button>
          </div>
          <button onClick={() => updatePreferences({ direction: rtl ? "ltr" : "rtl" })} aria-label={copy.directionToggle}>
            <Languages />
          </button>
          <button onClick={() => updatePreferences({ theme: dark ? "light" : "dark" })} aria-label={copy.themeToggle}>
            {dark ? <Sun /> : <Moon />}
          </button>
          <Link className="marketing-primary" href="/" aria-label={copy.openLabel}>
            <span>{copy.open}</span>
            <ArrowLeft />
          </Link>
        </div>
      </header>
      {children}
      <footer className="marketing-footer" id="support">
        <div className="marketing-brand">
          <span><i /><i /><i /></span>
          <b>{copy.brand} <em>{copy.brandSuffix}</em></b>
        </div>
        <p>{copy.footer}</p>
        <div><Link href="/demos/">{copy.footerLinks[0]}</Link><Link href="/components/">{copy.footerLinks[1]}</Link><Link href="/login/">{copy.footerLinks[2]}</Link></div>
        <small><Sparkles /> {copy.year}</small>
      </footer>
    </div>
  );
}
