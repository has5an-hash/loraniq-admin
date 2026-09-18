"use client";

import "../settings-premium.css";
import { Check, Palette, RotateCcw, WandSparkles } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { useUiPreferences, type UiPreferences } from "@/components/ui-preferences-provider";

type Field = keyof UiPreferences;
type Option = { value: string; label: string; hint: string; swatch?: string };

const groups: Array<{ title: string; description: string; field: Field; options: Option[] }> = [
  { title: "حالت رنگ", description: "Light، Dark یا هماهنگ با سیستم.", field: "theme", options: [
    { value: "light", label: "روشن", hint: "سطوح سفید و کنتراست نرم" },
    { value: "dark", label: "تیره", hint: "Dark مستقل و کم‌درخشش" },
    { value: "system", label: "سیستم", hint: "هماهنگ با دستگاه" },
  ] },
  { title: "جهت رابط", description: "RTL و LTR واقعی در تمام layout.", field: "direction", options: [
    { value: "rtl", label: "RTL / فارسی", hint: "پیش‌فرض محصول" },
    { value: "ltr", label: "LTR / English", hint: "جهت چپ به راست" },
  ] },
  { title: "تراکم", description: "برای مانیتورهای مدیریتی یا کار روزانه.", field: "density", options: [
    { value: "comfortable", label: "راحت", hint: "فضای تنفس بیشتر" },
    { value: "compact", label: "فشرده", hint: "داده بیشتر در viewport" },
  ] },
  { title: "Skin", description: "عمق بصری کارت‌ها و مرزها.", field: "skin", options: [
    { value: "soft", label: "Soft", hint: "سایه بسیار نرم" },
    { value: "bordered", label: "Bordered", hint: "مرز واضح‌تر" },
    { value: "semi-dark", label: "Semi-dark", hint: "Sidebar تیره" },
  ] },
  { title: "عرض محتوا", description: "برای داشبورد عریض یا تمرکز بیشتر.", field: "contentWidth", options: [
    { value: "fluid", label: "Fluid", hint: "استفاده حداکثری از فضا" },
    { value: "boxed", label: "Boxed", hint: "حداکثر عرض کنترل‌شده" },
  ] },
  { title: "Sidebar", description: "ناوبری کامل یا حالت فشرده.", field: "sidebar", options: [
    { value: "full", label: "کامل", hint: "آیکن و عنوان" },
    { value: "compact", label: "Compact", hint: "تمرکز روی آیکن‌ها" },
  ] },
  { title: "Motion", description: "انیمیشن با احترام به ترجیح کاربر.", field: "motion", options: [
    { value: "full", label: "Full motion", hint: "transition نرم" },
    { value: "reduced", label: "Reduced", hint: "حداقل حرکت" },
  ] },
  { title: "Accent", description: "رنگ CTA، focus، badge و stateها.", field: "accent", options: [
    { value: "violet", label: "Violet", hint: "استاندارد SaaS", swatch: "accent-violet" },
    { value: "blue", label: "Blue", hint: "رسمی و سازمانی", swatch: "accent-blue" },
    { value: "emerald", label: "Emerald", hint: "عملیاتی و زنده", swatch: "accent-emerald" },
    { value: "rose", label: "Rose", hint: "پررنگ و برجسته", swatch: "accent-rose" },
    { value: "amber", label: "Amber", hint: "گرم و متفاوت", swatch: "accent-amber" },
  ] },
];

function Choice({ group }: { group: (typeof groups)[number] }) {
  const { preferences, updatePreferences } = useUiPreferences();
  return <section className="settings-card"><header><div><h2>{group.title}</h2><p>{group.description}</p></div></header><div className="settings-options">
    {group.options.map((option) => { const active = preferences[group.field] === option.value; return <button key={option.value} className={active ? "active" : ""} aria-pressed={active} onClick={() => updatePreferences({ [group.field]: option.value } as Partial<UiPreferences>)}><span>{active ? <Check /> : <i />}{option.swatch ? <em className={`accent-swatch ${option.swatch}`} /> : null}</span><div><b>{option.label}</b><small>{option.hint}</small></div></button>; })}
  </div></section>;
}

export default function SettingsPage() {
  const { resetPreferences } = useUiPreferences();
  return <LoraniqShell active="settings"><main id="main-content" className="main-content settings-page">
    <section className="settings-hero"><div><span className="settings-kicker"><WandSparkles /> Personalization system</span><h1>ظاهر و رفتار لورانیک را مثل یک محصول enterprise تنظیم کن.</h1><p>تنظیمات در کل پنل ذخیره می‌شوند و روی تم، جهت، تراکم، skin، عرض محتوا، sidebar، motion و رنگ اصلی اثر واقعی دارند.</p></div><div className="settings-preview"><div className="preview-shell"><aside><i /><i /><i /><i /></aside><section><header /><div className="preview-grid"><article /><article /><article /></div><div className="preview-chart"><span /><span /><span /><span /><span /></div></section></div><small>Live preference preview</small></div></section>
    <div className="settings-grid">{groups.map((group) => <Choice key={group.field} group={group} />)}<section className="settings-card settings-reset"><header><div><h2>بازنشانی</h2><p>همه ترجیحات به حالت استاندارد برمی‌گردند.</p></div><Palette /></header><Button variant="outline" onClick={resetPreferences}><RotateCcw /> بازنشانی تنظیمات</Button></section></div>
  </main></LoraniqShell>;
}
