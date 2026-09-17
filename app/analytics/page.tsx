"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronDown, Download, Eye, MousePointerClick, ShoppingCart, Sparkles, UsersRound } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const sources = [
  { label: "جستجوی ارگانیک", value: "۳۸٫۴٪", visits: "۴۸٬۲۱۰", progress: 84 },
  { label: "تبلیغات کلیکی", value: "۲۶٫۱٪", visits: "۳۲٬۷۴۰", progress: 64 },
  { label: "شبکه‌های اجتماعی", value: "۱۹٫۷٪", visits: "۲۴٬۶۸۰", progress: 49 },
  { label: "ورود مستقیم", value: "۱۵٫۸٪", visits: "۱۹٬۸۱۰", progress: 39 },
];

const countries = [
  { name: "ایران", share: "۶۸٫۲٪", users: "۸۵٬۴۳۰" },
  { name: "امارات", share: "۹٫۶٪", users: "۱۲٬۰۴۰" },
  { name: "ترکیه", share: "۷٫۴٪", users: "۹٬۲۸۰" },
  { name: "آلمان", share: "۵٫۹٪", users: "۷٬۳۹۰" },
];

const points = "0,148 45,131 90,138 135,108 180,115 225,78 270,91 315,67 360,76 405,42 450,53 495,26 540,35 585,15";

export default function AnalyticsPage() {
  const [range, setRange] = useState("۳۰ روز گذشته");

  return (
    <LoraniqShell active="analytics">
      <main id="main-content" className="main-content">
        <section className="page-heading" aria-labelledby="page-title">
          <div>
            <p className="breadcrumb">خانه / داشبورد / <span>تحلیل داده</span></p>
            <h1 id="page-title">تحلیل رفتار و رشد</h1>
            <p>تصویر یکپارچه از جذب، تعامل، تبدیل و کیفیت ترافیک.</p>
          </div>
          <div className="heading-actions">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" className="date-button"><CalendarDays />{range}<ChevronDown /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">{["۷ روز گذشته", "۳۰ روز گذشته", "سه‌ماهه جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent>
            </DropdownMenu>
            <Button className="primary-action"><Download />خروجی تحلیل</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="شاخص‌های تحلیلی">
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon violet"><Eye /></span><span className="trend up"><ArrowUpRight />۱۴٫۲٪</span></div><p>بازدید کل</p><h2>۱٫۲۸ <small>میلیون</small></h2><span className="comparison up"><ArrowUpRight /> ۱۵۹ هزار بیشتر از دوره قبل</span></article>
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon cyan"><UsersRound /></span><span className="trend up"><ArrowUpRight />۹٫۸٪</span></div><p>کاربران فعال</p><h2>۱۲۵٬۳۴۰</h2><span className="comparison up"><ArrowUpRight /> نرخ بازگشت ۴۲٫۶٪</span></article>
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon amber"><MousePointerClick /></span><span className="trend up"><ArrowUpRight />۳٫۱٪</span></div><p>نرخ تعامل</p><h2>۶۸٫۴٪</h2><div className="kpi-bottom"><span>هدف ماه</span><b>۷۵٪</b></div><Progress value={68.4} /></article>
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon coral"><ShoppingCart /></span><span className="trend up"><ArrowUpRight />۱۱٫۶٪</span></div><p>نرخ تبدیل</p><h2>۴٫۸٪</h2><span className="comparison down"><ArrowDownRight /> ریزش قیف ۱٫۲٪ کمتر شده</span></article>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(300px,.75fr)]">
          <article className="panel p-5 sm:p-6">
            <div className="panel-head"><div><h2>روند کاربران فعال</h2><p>مقایسه بازدیدکننده یکتا و تعامل مؤثر</p></div><span className="live-badge"><i /> زنده</span></div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4"><div><span className="text-xs text-muted-foreground">کاربران فعال این دوره</span><div className="mt-1 text-3xl font-bold">۱۲۵٬۳۴۰</div></div><div className="flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-primary" />کاربر فعال</span><span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-emerald-500" />تعامل مؤثر</span></div></div>
            <div className="mt-5 h-[280px] w-full overflow-hidden rounded-xl border border-border bg-[var(--surface-2)] p-3" role="img" aria-label="نمودار روند افزایشی کاربران فعال">
              <svg viewBox="0 0 600 210" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true"><defs><linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7367e8" stopOpacity=".3" /><stop offset="100%" stopColor="#7367e8" stopOpacity="0" /></linearGradient></defs><g stroke="currentColor" className="text-border"><line x1="0" y1="35" x2="600" y2="35"/><line x1="0" y1="90" x2="600" y2="90"/><line x1="0" y1="145" x2="600" y2="145"/><line x1="0" y1="200" x2="600" y2="200"/></g><polygon points={`0,200 ${points} 585,200`} fill="url(#analytics-area)"/><polyline points={points} fill="none" stroke="#7367e8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><polyline points="0,170 65,160 130,148 195,134 260,125 325,104 390,94 455,78 520,65 585,50" fill="none" stroke="#13a892" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round"/></svg>
            </div>
            <div className="mt-3 grid grid-cols-4 text-center text-[10px] text-muted-foreground sm:grid-cols-7"><span>فروردین</span><span>اردیبهشت</span><span>خرداد</span><span>تیر</span><span className="hidden sm:block">مرداد</span><span className="hidden sm:block">شهریور</span><span className="hidden sm:block">مهر</span></div>
          </article>

          <article className="panel p-5 sm:p-6">
            <div className="panel-head"><div><h2>منابع جذب</h2><p>سهم کانال‌ها از ترافیک باکیفیت</p></div></div>
            <div className="mt-5 grid gap-5">{sources.map((source) => <div key={source.label}><div className="mb-2 flex items-center justify-between gap-3"><div><b className="text-xs">{source.label}</b><p className="mt-1 text-[10px] text-muted-foreground">{source.visits} بازدید</p></div><strong className="text-sm">{source.value}</strong></div><Progress value={source.progress} /></div>)}</div>
          </article>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="panel p-5 sm:p-6">
            <div className="panel-head"><div><h2>قیف تبدیل</h2><p>از مشاهده صفحه تا خرید موفق</p></div><Sparkles className="h-5 w-5 text-primary" /></div>
            <div className="mt-6 grid gap-3"><div className="rounded-xl border border-border bg-[var(--surface-2)] p-4"><div className="flex justify-between text-xs"><span>مشاهده محصول</span><b>۸۹٬۴۲۰</b></div><Progress className="mt-3" value={100} /></div><div className="mx-auto w-[86%] rounded-xl border border-border bg-[var(--surface-2)] p-4"><div className="flex justify-between text-xs"><span>افزودن به سبد</span><b>۲۲٬۷۶۰</b></div><Progress className="mt-3" value={72} /></div><div className="mx-auto w-[72%] rounded-xl border border-border bg-[var(--surface-2)] p-4"><div className="flex justify-between text-xs"><span>شروع پرداخت</span><b>۹٬۸۴۰</b></div><Progress className="mt-3" value={49} /></div><div className="mx-auto w-[58%] rounded-xl border border-primary/25 bg-primary/5 p-4"><div className="flex justify-between text-xs"><span>خرید موفق</span><b>۴٬۲۹۱</b></div><Progress className="mt-3" value={32} /></div></div>
          </article>

          <article className="panel p-5 sm:p-6">
            <div className="panel-head"><div><h2>پراکندگی جغرافیایی</h2><p>کاربران فعال بر اساس موقعیت</p></div></div>
            <div className="mt-5 grid gap-1">{countries.map((country, index) => <div key={country.name} className="flex items-center gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-muted"><span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-xs font-bold text-primary">{index + 1}</span><div className="min-w-0 flex-1"><b className="text-xs">{country.name}</b><p className="mt-1 text-[10px] text-muted-foreground">{country.users} کاربر</p></div><strong className="text-sm">{country.share}</strong></div>)}</div>
          </article>
        </section>
      </main>
    </LoraniqShell>
  );
}
