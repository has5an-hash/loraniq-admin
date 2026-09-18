"use client";

import "../flagship-polish.css";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Download,
  Eye,
  Gauge,
  MousePointerClick,
  Search,
  ShoppingCart,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const sources = [
  { label: "جستجوی ارگانیک", users: "۴۸٬۲۱۰", share: "۳۸٫۴٪", color: "#8d83ff" },
  { label: "تبلیغات کلیکی", users: "۳۲٬۷۴۰", share: "۲۶٫۱٪", color: "#12a891" },
  { label: "شبکه‌های اجتماعی", users: "۲۴٬۶۸۰", share: "۱۹٫۷٪", color: "#f2a641" },
  { label: "ورود مستقیم", users: "۱۹٬۸۱۰", share: "۱۵٫۸٪", color: "#e85f72" },
];

const countries = [
  { name: "ایران", users: "۸۵٬۴۳۰", share: "۶۸٫۲٪" },
  { name: "امارات", users: "۱۲٬۰۴۰", share: "۹٫۶٪" },
  { name: "ترکیه", users: "۹٬۲۸۰", share: "۷٫۴٪" },
  { name: "آلمان", users: "۷٬۳۹۰", share: "۵٫۹٪" },
];

const pages = [
  { mark: "P", path: "/pricing", title: "قیمت‌گذاری", views: "۸۶٬۳۱۰", conversion: "۷٫۲٪", duration: "۳:۴۸" },
  { mark: "D", path: "/dashboard", title: "داشبورد محصول", views: "۷۱٬۹۴۰", conversion: "۶٫۵٪", duration: "۵:۱۲" },
  { mark: "C", path: "/checkout", title: "تکمیل خرید", views: "۳۴٬۶۲۰", conversion: "۱۲٫۸٪", duration: "۲:۱۷" },
  { mark: "H", path: "/help", title: "مرکز راهنما", views: "۲۱٬۸۹۰", conversion: "۲٫۱٪", duration: "۴:۰۳" },
];

const cohorts = [
  { label: "این هفته", cells: [82, 68, 59, 52, 47, 42] },
  { label: "۱ هفته قبل", cells: [78, 64, 55, 49, 43, 38] },
  { label: "۲ هفته قبل", cells: [73, 60, 51, 44, 39, 34] },
  { label: "۳ هفته قبل", cells: [69, 56, 48, 41, 35, 31] },
];

const activePoints = "0,160 60,143 120,149 180,116 240,128 300,91 360,104 420,67 480,79 540,45 600,57 660,27 720,39";
const engagedPoints = "0,179 60,169 120,158 180,145 240,136 300,122 360,108 420,95 480,82 540,68 600,55 660,43 720,31";

export default function AnalyticsPage() {
  const [range, setRange] = useState("۳۰ روز گذشته");

  return (
    <LoraniqShell active="analytics">
      <main id="main-content" className="main-content">
        <section className="ana-hero" aria-labelledby="page-title">
          <article className="ana-hero-main">
            <span className="ana-kicker"><i /> Signal center · به‌روز</span>
            <h1 id="page-title" className="ana-title">تحلیل داده‌ای که به تصمیم تبدیل می‌شود.</h1>
            <p className="ana-lead">جذب، تعامل، بازگشت و تبدیل را در یک نمای متمرکز ببین؛ بدون اینکه بین ده‌ها گزارش پراکنده جابه‌جا شوی.</p>
            <div className="ana-actions">
              <Button className="primary-action"><Download /> خروجی تحلیل</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline"><CalendarDays /> {range}<ChevronDown /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">{["۷ روز گذشته", "۳۰ روز گذشته", "سه‌ماهه جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent>
              </DropdownMenu>
            </div>
            <svg className="ana-live-spark" viewBox="0 0 210 78" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="ana-hero-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12a891" stopOpacity=".26"/><stop offset="100%" stopColor="#12a891" stopOpacity="0"/></linearGradient></defs>
              <path className="area" d="M0 66 C25 61 33 44 56 51 S91 26 113 34 S149 13 170 24 S194 8 210 11 L210 78 L0 78 Z" />
              <path className="line" d="M0 66 C25 61 33 44 56 51 S91 26 113 34 S149 13 170 24 S194 8 210 11" />
            </svg>
          </article>

          <article className="ana-quality-card">
            <div className="ana-card-head"><div><h2>کیفیت ترافیک</h2><p>امتیاز ترکیبی جذب و تعامل</p></div><span className="ana-live-pill"><i /> زنده</span></div>
            <div className="ana-quality-score"><strong>۸۴</strong><span><ArrowUpRight /> +۵٫۲٪</span></div>
            <p className="ana-quality-copy">ورودی ارگانیک و بازگشت کاربران رشد کرده؛ نرخ خروج صفحات فرود هنوز جای بهبود دارد.</p>
            <div className="ana-quality-bars">
              <div className="ana-quality-row"><label>کیفیت جذب</label><span className="ana-track"><i style={{width:"88%"}} /></span><b>۸۸</b></div>
              <div className="ana-quality-row"><label>تعامل</label><span className="ana-track"><i style={{width:"79%"}} /></span><b>۷۹</b></div>
              <div className="ana-quality-row"><label>بازگشت</label><span className="ana-track"><i style={{width:"72%"}} /></span><b>۷۲</b></div>
            </div>
          </article>
        </section>

        <section className="ana-metric-ribbon" aria-label="شاخص‌های تحلیلی">
          <article className="ana-metric" style={{["--metric" as string]:"#8d83ff"}}><div className="ana-metric-top"><span className="ana-metric-icon"><Eye /></span><span className="ana-metric-trend"><ArrowUpRight />۱۴٫۲٪</span></div><p>بازدید کل</p><strong>۱٫۲۸ <small>میلیون</small></strong><div className="ana-metric-foot">۱۵۹ هزار بیشتر از دوره قبل</div></article>
          <article className="ana-metric" style={{["--metric" as string]:"#12a891"}}><div className="ana-metric-top"><span className="ana-metric-icon"><UsersRound /></span><span className="ana-metric-trend"><ArrowUpRight />۹٫۸٪</span></div><p>کاربران فعال</p><strong>۱۲۵٬۳۴۰</strong><div className="ana-metric-foot">نرخ بازگشت ۴۲٫۶٪</div></article>
          <article className="ana-metric" style={{["--metric" as string]:"#f2a641"}}><div className="ana-metric-top"><span className="ana-metric-icon"><MousePointerClick /></span><span className="ana-metric-trend"><ArrowUpRight />۳٫۱٪</span></div><p>نرخ تعامل</p><strong>۶۸٫۴٪</strong><div className="ana-metric-foot">هدف دوره ۷۵٪</div></article>
          <article className="ana-metric" style={{["--metric" as string]:"#e85f72"}}><div className="ana-metric-top"><span className="ana-metric-icon"><ShoppingCart /></span><span className="ana-metric-trend bad"><ArrowDownRight />۱٫۲٪</span></div><p>نرخ تبدیل</p><strong>۴٫۸٪</strong><div className="ana-metric-foot">ریزش قیف کمتر شده</div></article>
        </section>

        <section className="ana-main-grid">
          <article className="ana-chart-card">
            <div className="ana-chart-toolbar"><div className="ana-card-head"><div><h2>روند کاربران و تعامل</h2><p>رفتار واقعی در برابر کیفیت تعامل مؤثر</p></div></div><div className="ana-segments"><span className="active">۳۰ روز</span><span>هفته</span><span>روز</span></div></div>
            <div className="ana-chart-summary"><div><span>کاربران فعال این دوره</span><strong>۱۲۵٬۳۴۰</strong></div><em><ArrowUpRight className="inline h-3 w-3" /> ۹٫۸٪ رشد پایدار</em></div>
            <div className="ana-chart-canvas" role="img" aria-label="نمودار کاربران فعال و تعامل مؤثر">
              <svg viewBox="0 0 720 210" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="ana-main-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8d83ff" stopOpacity=".30"/><stop offset="100%" stopColor="#8d83ff" stopOpacity="0"/></linearGradient><linearGradient id="ana-second-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12a891" stopOpacity=".12"/><stop offset="100%" stopColor="#12a891" stopOpacity="0"/></linearGradient></defs>
                <g className="ana-grid"><line x1="0" y1="35" x2="720" y2="35"/><line x1="0" y1="90" x2="720" y2="90"/><line x1="0" y1="145" x2="720" y2="145"/><line x1="0" y1="200" x2="720" y2="200"/></g>
                <polygon className="ana-main-area" points={`0,200 ${activePoints} 720,200`} /><polygon className="ana-second-area" points={`0,200 ${engagedPoints} 720,200`} />
                <polyline className="ana-second-line" points={engagedPoints}/><polyline className="ana-main-line" points={activePoints}/><circle cx="660" cy="27" r="5" fill="var(--card)" stroke="#8d83ff" strokeWidth="3"/>
              </svg>
            </div>
            <div className="ana-chart-legend"><span><i /> کاربران فعال</span><span><i className="cyan" /> تعامل مؤثر</span></div>
          </article>

          <article className="ana-source-card">
            <div className="ana-card-head"><div><h2>ترکیب کانال‌ها</h2><p>سهم منابع جذب از ترافیک باکیفیت</p></div><Search className="h-5 w-5 text-primary" /></div>
            <div className="ana-source-donut"><div><strong>۱۲۵K</strong><span>ورودی مؤثر</span></div></div>
            <div className="ana-source-list">{sources.map((source) => <div className="ana-source-item" key={source.label} style={{["--source" as string]:source.color}}><span className="ana-source-dot"/><div><b>{source.label}</b><small>{source.users} بازدید</small></div><strong>{source.share}</strong></div>)}</div>
          </article>
        </section>

        <section className="ana-insight-grid">
          <article className="ana-funnel-card">
            <div className="ana-card-head"><div><h2>قیف تبدیل</h2><p>از مشاهده تا خرید موفق</p></div><Sparkles className="h-5 w-5 text-primary" /></div>
            <div className="ana-funnel">
              <div className="ana-funnel-step" style={{["--w" as string]:"100%"}}><div><span>مشاهده محصول</span><b>۸۹٬۴۲۰</b></div><span className="ana-track"><i style={{width:"100%"}}/></span></div>
              <div className="ana-funnel-step" style={{["--w" as string]:"86%"}}><div><span>افزودن به سبد</span><b>۲۲٬۷۶۰</b></div><span className="ana-track"><i style={{width:"72%"}}/></span></div>
              <div className="ana-funnel-step" style={{["--w" as string]:"72%"}}><div><span>شروع پرداخت</span><b>۹٬۸۴۰</b></div><span className="ana-track"><i style={{width:"49%"}}/></span></div>
              <div className="ana-funnel-step" style={{["--w" as string]:"58%"}}><div><span>خرید موفق</span><b>۴٬۲۹۱</b></div><span className="ana-track"><i style={{width:"32%"}}/></span></div>
            </div>
          </article>

          <article className="ana-cohort-card">
            <div className="ana-card-head"><div><h2>بازگشت کاربران</h2><p>Cohort retention در شش بازه</p></div><Gauge className="h-5 w-5 text-primary" /></div>
            <div className="ana-cohort-labels"><span>گروه</span><span>روز ۱</span><span>۳</span><span>۷</span><span>۱۴</span><span>۲۱</span><span>۳۰</span></div>
            {cohorts.map((cohort) => <div className="ana-cohort-row" key={cohort.label}><label>{cohort.label}</label>{cohort.cells.map((cell,index) => <span key={`${cohort.label}-${index}`} className="ana-heat" style={{["--heat" as string]:cell}}>{cell}%</span>)}</div>)}
          </article>

          <article className="ana-geo-card">
            <div className="ana-card-head"><div><h2>بازارهای فعال</h2><p>توزیع کاربران بر اساس موقعیت</p></div></div>
            <div className="ana-geo-list">{countries.map((country,index) => <div className="ana-geo-item" key={country.name}><span className="ana-rank">{index+1}</span><div><b>{country.name}</b><small>{country.users} کاربر</small></div><strong>{country.share}</strong></div>)}</div>
          </article>
        </section>

        <section className="ana-pages-card">
          <div className="ana-pages-head"><div className="ana-card-head"><div><h2>صفحات با بیشترین اثر</h2><p>ترکیب بازدید، تبدیل و زمان تعامل</p></div></div><Button variant="outline" size="sm">مشاهده گزارش کامل</Button></div>
          <table className="ana-pages-table"><thead><tr><th>صفحه</th><th>بازدید</th><th>نرخ تبدیل</th><th>میانگین زمان</th></tr></thead><tbody>{pages.map((page) => <tr key={page.path}><td><div className="ana-page-path"><span>{page.mark}</span><div><b>{page.title}</b><small className="block text-muted-foreground">{page.path}</small></div></div></td><td>{page.views}</td><td>{page.conversion}</td><td>{page.duration}</td></tr>)}</tbody></table>
        </section>
      </main>
    </LoraniqShell>
  );
}
