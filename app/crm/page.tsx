"use client";

import "../crm-premium.css";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Download,
  HeartHandshake,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const segments = [
  { name: "وفادار و پرارزش", count: "۴٬۸۲۰", share: "۱۷٪", value: "۸٫۴ م", color: "#12a891" },
  { name: "در حال رشد", count: "۸٬۶۴۰", share: "۳۰٪", value: "۴٫۹ م", color: "#7568f4" },
  { name: "خرید مناسبتی", count: "۹٬۲۱۰", share: "۳۲٪", value: "۲٫۸ م", color: "#f2a641" },
  { name: "در معرض ریزش", count: "۵٬۷۹۰", share: "۲۰٪", value: "۱٫۶ م", color: "#e85f72" },
];

const accounts = [
  { name: "گروه آریا", owner: "سارا مرادی", value: "۲۸٫۶ م", health: 94, state: "در حال توسعه" },
  { name: "نوآوران شرق", owner: "محمد رضایی", value: "۲۲٫۱ م", health: 86, state: "پایدار" },
  { name: "فراگستر", owner: "نیلوفر احمدی", value: "۱۸٫۴ م", health: 71, state: "نیازمند توجه" },
  { name: "راهکار پویا", owner: "امیر حاتمی", value: "۱۵٫۹ م", health: 64, state: "ریسک متوسط" },
];

const timeline = [
  { icon: Mail, title: "کمپین بازگشت مشتری ارسال شد", meta: "۱۱ دقیقه پیش · ۱٬۲۴۰ مخاطب", tone: "purple" },
  { icon: Phone, title: "تماس موفق با حساب آریا", meta: "۳۸ دقیقه پیش · نتیجه: تمدید", tone: "green" },
  { icon: MessageSquareText, title: "۳ گفت‌وگوی پشتیبانی اولویت‌دار", meta: "۵۲ دقیقه پیش · SLA زیر ۳۰ دقیقه", tone: "amber" },
  { icon: UserRoundCheck, title: "۲۶ مشتری به سگمنت وفادار منتقل شدند", meta: "۲ ساعت پیش · خودکار", tone: "cyan" },
];

const retentionPoints = "0,64 60,70 120,60 180,56 240,62 300,47 360,43 420,48 480,35 540,31 600,37 660,24 720,19";
const valuePoints = "0,151 60,145 120,136 180,124 240,119 300,106 360,96 420,83 480,75 540,63 600,51 660,42 720,29";

export default function CrmPage() {
  const [range, setRange] = useState("سه‌ماهه جاری");
  const [focus, setFocus] = useState<"retention" | "value">("retention");

  return (
    <LoraniqShell active="crm">
      <main id="main-content" className="main-content crm-page">
        <section className="crm-hero" aria-labelledby="page-title">
          <article className="crm-hero-main">
            <div className="crm-hero-copy">
              <span className="crm-kicker"><i /> customer intelligence · زنده</span>
              <h1 id="page-title">هر مشتری یک سیگنال است؛ قبل از ریزش آن را ببین.</h1>
              <p>ارزش طول عمر، وفاداری، تعامل و ریسک ریزش را در یک نمای عملیاتی ترکیب کن تا تیم فروش و تجربه مشتری دقیق‌تر اقدام کنند.</p>
              <div className="crm-actions"><Button className="primary-action"><Download /> خروجی مشتریان</Button><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><CalendarDays /> {range}<ChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{["۳۰ روز گذشته", "سه‌ماهه جاری", "سال جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu></div>
            </div>
            <div className="crm-hero-score"><div className="crm-orbit"><span><strong>۸۸</strong><small>Customer health</small></span></div><em><ArrowUpRight /> ۶ امتیاز بهتر از فصل قبل</em></div>
            <div className="crm-hero-stats"><div><span>مشتری فعال</span><b>۲۸٬۴۶۰</b><small>+۸٫۷٪</small></div><div><span>ارزش طول عمر</span><b>۴٫۸ م</b><small>+۱۲٫۳٪</small></div><div><span>حفظ مشتری</span><b>۷۲٫۶٪</b><small>+۴٫۱٪</small></div></div>
          </article>

          <article className="crm-priority-card">
            <div className="crm-section-head"><div><span className="crm-priority-label"><Sparkles /> فرصت امروز</span><h2>مشتریان قابل نجات</h2><p>ارزش بالا + افت تعامل</p></div><ShieldCheck /></div>
            <div className="crm-priority-number"><strong>۳۸۴</strong><span>مشتری در اولویت</span></div>
            <div className="crm-priority-value"><span>ارزش در معرض ریسک</span><b>۶۴٫۸ میلیون</b></div>
            <div className="crm-priority-bars"><div><label>کاهش تعامل</label><span><i style={{width:"76%"}} /></span><b>۷۶٪</b></div><div><label>احتمال بازگشت</label><span><i style={{width:"68%"}} /></span><b>۶۸٪</b></div><div><label>پوشش تیم</label><span><i style={{width:"52%"}} /></span><b>۵۲٪</b></div></div>
            <Button variant="outline" className="crm-full-button">ساخت لیست اقدام</Button>
          </article>
        </section>

        <section className="crm-metrics" aria-label="شاخص‌های مشتری">
          <article className="crm-metric purple"><span className="crm-metric-icon"><UsersRound /></span><em><ArrowUpRight />۸٫۷٪</em><p>مشتریان فعال</p><strong>۲۸٬۴۶۰</strong><small>۲٬۲۸۰ مشتری بیشتر</small></article>
          <article className="crm-metric green"><span className="crm-metric-icon"><HeartHandshake /></span><em><ArrowUpRight />۴٫۱٪</em><p>نرخ حفظ مشتری</p><strong>۷۲٫۶٪</strong><small>هدف فصل ۷۵٪</small></article>
          <article className="crm-metric amber"><span className="crm-metric-icon"><TrendingUp /></span><em><ArrowUpRight />۱۲٫۳٪</em><p>CLV میانگین</p><strong>۴٫۸ <small>م</small></strong><small>رشد پایدار ارزش</small></article>
          <article className="crm-metric coral"><span className="crm-metric-icon"><MessageSquareText /></span><em className="down"><ArrowDownRight />۹٫۲٪</em><p>زمان پاسخ</p><strong>۱۸ <small>دقیقه</small></strong><small>بهتر از SLA هدف</small></article>
        </section>

        <section className="crm-main-grid">
          <article className="crm-lifecycle-card">
            <div className="crm-chart-head"><div><h2>مسیر حفظ و ارزش مشتری</h2><p>روند حفظ مشتری و ارزش طول عمر در طول دوره</p></div><div className="crm-mode"><button className={focus === "retention" ? "active" : ""} onClick={() => setFocus("retention")}>حفظ مشتری</button><button className={focus === "value" ? "active" : ""} onClick={() => setFocus("value")}>ارزش مشتری</button></div></div>
            <div className="crm-chart-summary"><div><span>{focus === "retention" ? "حفظ مشتری این دوره" : "ارزش طول عمر میانگین"}</span><strong>{focus === "retention" ? "۷۲٫۶٪" : "۴٫۸ میلیون"}</strong></div><em><ArrowUpRight /> روند بهتر از دوره قبل</em></div>
            <div className="crm-chart-canvas" role="img" aria-label="نمودار حفظ مشتری و ارزش طول عمر"><svg viewBox="0 0 720 190" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="crm-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12a891" stopOpacity=".25"/><stop offset="100%" stopColor="#12a891" stopOpacity="0"/></linearGradient></defs><g className="crm-grid-lines"><line x1="0" y1="36" x2="720" y2="36"/><line x1="0" y1="86" x2="720" y2="86"/><line x1="0" y1="136" x2="720" y2="136"/><line x1="0" y1="184" x2="720" y2="184"/></g><polygon className="crm-retention-area" points={`0,184 ${retentionPoints} 720,184`} /><polyline className="crm-value-line" points={valuePoints}/><polyline className="crm-retention-line" points={retentionPoints}/><circle cx="720" cy="19" r="5" fill="var(--card)" stroke="#12a891" strokeWidth="3"/></svg></div>
            <div className="crm-chart-foot"><span><i className="retention" /> حفظ مشتری</span><span><i className="value" /> ارزش طول عمر</span><b>ریزش پیش‌بینی‌شده: ۶٫۸٪</b></div>
          </article>

          <article className="crm-segment-card">
            <div className="crm-section-head"><div><h2>سگمنت‌های مشتری</h2><p>ترکیب پایگاه مشتری بر اساس رفتار</p></div><UsersRound /></div>
            <div className="crm-segment-ring"><div><strong>۲۸٫۴K</strong><span>مشتری فعال</span></div></div>
            <div className="crm-segment-list">{segments.map((segment) => <div key={segment.name} style={{["--segment" as string]:segment.color}}><i /><span><b>{segment.name}</b><small>{segment.count} مشتری · CLV {segment.value}</small></span><strong>{segment.share}</strong></div>)}</div>
          </article>
        </section>

        <section className="crm-accounts-grid">
          <article className="crm-accounts-card">
            <div className="crm-section-head"><div><h2>حساب‌های اولویت‌دار</h2><p>ارزش بالا، سلامت و مالک ارتباط</p></div><UserRoundCheck /></div>
            <div className="crm-account-list">{accounts.map((account, index) => <div className="crm-account-row" key={account.name}><span className="crm-rank">{index + 1}</span><div><b>{account.name}</b><small>مالک: {account.owner}</small></div><div><span>ارزش</span><b>{account.value}</b></div><div className="crm-health"><span>سلامت {account.health}</span><span><i style={{width:`${account.health}%`}} /></span></div><em className={account.health < 70 ? "risk" : account.health < 80 ? "watch" : "good"}>{account.state}</em></div>)}</div>
          </article>

          <article className="crm-churn-card">
            <div className="crm-section-head"><div><h2>ریسک ریزش</h2><p>پیش‌بینی ۳۰ روز آینده</p></div><ShieldCheck /></div>
            <div className="crm-churn-score"><strong>۶٫۸٪</strong><span>ریزش پیش‌بینی‌شده</span><em><ArrowDownRight /> ۱٫۴٪ بهتر</em></div>
            <div className="crm-risk-bars"><div><label>قطع تعامل</label><span><i style={{width:"72%"}} /></span><b>۴۱۲</b></div><div><label>افت خرید</label><span><i style={{width:"56%"}} /></span><b>۳۲۱</b></div><div><label>تیکت حل‌نشده</label><span><i style={{width:"34%"}} /></span><b>۱۹۸</b></div></div>
            <div className="crm-ai-note"><Sparkles /> ۶۲٪ از مشتریان پرریسک با یک کمپین بازگشت هدفمند، احتمال بازیابی بالاتر از ۵۰٪ دارند.</div>
          </article>
        </section>

        <section className="crm-bottom-grid">
          <article className="crm-activity-card">
            <div className="crm-section-head"><div><h2>جریان تعاملات</h2><p>آخرین فعالیت‌های معنادار تیم و مشتری</p></div><MessageSquareText /></div>
            <div className="crm-timeline">{timeline.map((item) => { const Icon = item.icon; return <div key={item.title}><span className={`crm-event-icon ${item.tone}`}><Icon /></span><div><b>{item.title}</b><small>{item.meta}</small></div></div>; })}</div>
          </article>

          <article className="crm-opportunity-card">
            <div className="crm-section-head"><div><h2>فرصت رشد حساب‌ها</h2><p>ترکیب توسعه، تمدید و بازگشت</p></div><Sparkles /></div>
            <div className="crm-opportunity-value"><span>ارزش فرصت باز</span><strong>۱۲۸٫۶ <small>میلیون</small></strong><em><ArrowUpRight /> ۱۶٫۲٪ رشد</em></div>
            <div className="crm-opportunity-grid"><div><b>۵۴٫۲ م</b><span>توسعه حساب</span></div><div><b>۴۶٫۸ م</b><span>تمدید</span></div><div><b>۲۷٫۶ م</b><span>بازگشت</span></div></div>
            <div className="crm-opportunity-progress"><span><i style={{width:"79%"}} /></span><div><b>۷۹٪ پوشش هدف</b><small>۳۴٫۱ میلیون تا هدف فصل</small></div></div>
          </article>
        </section>
      </main>
    </LoraniqShell>
  );
}
