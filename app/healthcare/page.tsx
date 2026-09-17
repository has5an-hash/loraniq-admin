"use client";

import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Download,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const departments = [
  { name: "داخلی", occupancy: 82, wait: "۱۸ دقیقه", visits: "۱۸۴", color: "#7568f4" },
  { name: "قلب", occupancy: 71, wait: "۱۴ دقیقه", visits: "۱۲۸", color: "#e85f72" },
  { name: "اطفال", occupancy: 64, wait: "۲۱ دقیقه", visits: "۱۴۶", color: "#12a891" },
  { name: "تصویربرداری", occupancy: 76, wait: "۲۷ دقیقه", visits: "۹۲", color: "#f2a641" },
];

const clinicians = [
  { name: "دکتر مهسا نادری", role: "داخلی", load: 86, patients: "۲۴", state: "فعال" },
  { name: "دکتر آرش زمانی", role: "قلب", load: 74, patients: "۱۸", state: "فعال" },
  { name: "دکتر نیلوفر کاوه", role: "اطفال", load: 67, patients: "۲۱", state: "استراحت" },
  { name: "دکتر سپهر احمدی", role: "عمومی", load: 79, patients: "۲۶", state: "فعال" },
];

const alerts = [
  { title: "فشار پذیرش در بازه ۱۷ تا ۱۹", meta: "پیشنهاد: افزایش یک میز تریاژ", tone: "amber" },
  { title: "۳ تخت داخلی آماده ترخیص", meta: "فرآیند ترخیص بیش از ۴۰ دقیقه متوقف است", tone: "purple" },
  { title: "کیفیت پاسخ‌گویی بالاتر از هدف", meta: "SLA امروز ۹۴٪", tone: "green" },
];

const visitsPoints = "0,159 60,146 120,152 180,124 240,130 300,96 360,107 420,73 480,86 540,55 600,62 660,33 720,44";
const waitPoints = "0,58 60,64 120,57 180,70 240,65 300,78 360,72 420,85 480,79 540,91 600,86 660,97 720,89";

export default function HealthcarePage() {
  const [range, setRange] = useState("امروز");
  const [focus, setFocus] = useState<"flow" | "wait">("flow");

  return (
    <LoraniqShell active="healthcare">
      <main id="main-content" className="main-content health-page">
        <section className="health-hero" aria-labelledby="page-title">
          <article className="health-command-card">
            <div className="health-hero-copy">
              <span className="health-kicker"><i /> care operations · زنده</span>
              <h1 id="page-title">جریان مراقبت را از پذیرش تا ترخیص، یک‌جا ببین.</h1>
              <p>ظرفیت، زمان انتظار، تریاژ، تیم درمان و کیفیت عملیات را در یک نمای مدیریتی متمرکز کن تا گلوگاه‌های روز قبل از تبدیل‌شدن به بحران دیده شوند.</p>
              <div className="health-actions"><Button className="primary-action"><Download /> گزارش عملیات</Button><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><CalendarDays /> {range}<ChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{["امروز", "۷ روز گذشته", "ماه جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu></div>
            </div>
            <div className="health-live-score"><span className="health-heart"><HeartPulse /></span><span>Care flow score</span><strong>۹۲</strong><em><ArrowUpRight /> ۴ امتیاز بهتر از میانگین هفته</em><div className="health-score-line"><span><i style={{width:"92%"}} /></span><b>عملیات پایدار</b></div></div>
            <div className="health-hero-strip"><div><span>مراجعه امروز</span><b>۷۴۸</b><small>+۸٫۲٪</small></div><div><span>میانگین انتظار</span><b>۱۹ دقیقه</b><small>−۱۲٪</small></div><div><span>اشغال تخت</span><b>۷۴٪</b><small className="neutral">+۳٪</small></div><div><span>SLA پاسخ‌گویی</span><b>۹۴٪</b><small>+۵٪</small></div></div>
          </article>

          <article className="health-triage-card">
            <div className="health-section-head"><div><span className="health-live"><i /> تریاژ زنده</span><h2>صف پذیرش</h2><p>اولویت و زمان انتظار فعلی</p></div><Activity /></div>
            <div className="health-triage-total"><strong>۳۷</strong><span>نفر در صف فعال</span></div>
            <div className="health-triage-list"><div className="critical"><span><i /> فوری</span><b>۴</b><small>میانگین ۳ دقیقه</small></div><div className="priority"><span><i /> اولویت‌دار</span><b>۱۲</b><small>میانگین ۱۱ دقیقه</small></div><div className="normal"><span><i /> عادی</span><b>۲۱</b><small>میانگین ۲۶ دقیقه</small></div></div>
            <div className="health-triage-note"><Sparkles /> بار پذیرش تا ۴۵ دقیقه آینده افزایش متوسط دارد؛ ظرفیت فعلی پاسخ‌گو است.</div>
          </article>
        </section>

        <section className="health-metrics" aria-label="شاخص‌های عملیات سلامت">
          <article className="health-metric purple"><span className="health-metric-icon"><UsersRound /></span><em><ArrowUpRight />۸٫۲٪</em><p>مراجعه امروز</p><strong>۷۴۸</strong><small>۵۷ مراجعه بیشتر</small></article>
          <article className="health-metric green"><span className="health-metric-icon"><Clock3 /></span><em className="good"><ArrowDownRight />۱۲٪</em><p>زمان انتظار</p><strong>۱۹ <small>دقیقه</small></strong><small>هدف عملیاتی زیر ۲۵ دقیقه</small></article>
          <article className="health-metric amber"><span className="health-metric-icon"><BedDouble /></span><em className="neutral"><ArrowUpRight />۳٪</em><p>اشغال تخت</p><strong>۷۴٪</strong><small>۲۶٪ ظرفیت آزاد</small></article>
          <article className="health-metric coral"><span className="health-metric-icon"><ClipboardCheck /></span><em><ArrowUpRight />۵٪</em><p>SLA پاسخ‌گویی</p><strong>۹۴٪</strong><small>۴٪ بالاتر از هدف</small></article>
        </section>

        <section className="health-main-grid">
          <article className="health-flow-card">
            <div className="health-chart-head"><div><h2>جریان مراجعه و زمان انتظار</h2><p>فشار ورودی در برابر زمان پاسخ‌گویی عملیاتی</p></div><div className="health-mode"><button className={focus === "flow" ? "active" : ""} onClick={() => setFocus("flow")}>جریان مراجعه</button><button className={focus === "wait" ? "active" : ""} onClick={() => setFocus("wait")}>زمان انتظار</button></div></div>
            <div className="health-chart-summary"><div><span>{focus === "flow" ? "مراجعه ثبت‌شده امروز" : "میانگین زمان انتظار"}</span><strong>{focus === "flow" ? "۷۴۸ مراجعه" : "۱۹ دقیقه"}</strong></div><em><ArrowUpRight /> وضعیت در محدوده هدف</em></div>
            <div className="health-chart-canvas" role="img" aria-label="نمودار جریان مراجعه و زمان انتظار"><svg viewBox="0 0 720 210" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="health-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#12a891" stopOpacity=".26"/><stop offset="100%" stopColor="#12a891" stopOpacity="0"/></linearGradient></defs><g className="health-grid-lines"><line x1="0" y1="36" x2="720" y2="36"/><line x1="0" y1="91" x2="720" y2="91"/><line x1="0" y1="146" x2="720" y2="146"/><line x1="0" y1="202" x2="720" y2="202"/></g><polygon className="health-visits-area" points={`0,202 ${visitsPoints} 720,202`} /><polyline className="health-wait-line" points={waitPoints}/><polyline className="health-visits-line" points={visitsPoints}/><circle cx="660" cy="33" r="5" fill="var(--card)" stroke="#12a891" strokeWidth="3"/></svg></div>
            <div className="health-chart-foot"><span><i className="visits" /> تعداد مراجعه</span><span><i className="wait" /> زمان انتظار</span><b>اوج پیش‌بینی‌شده بعدی: ساعت ۱۸:۱۰</b></div>
          </article>

          <article className="health-capacity-card">
            <div className="health-section-head"><div><h2>ظرفیت مرکز</h2><p>تخت، اتاق و ظرفیت خدمت</p></div><BedDouble /></div>
            <div className="health-capacity-ring"><div><strong>۷۴٪</strong><span>اشغال کل</span></div></div>
            <div className="health-capacity-list"><div><span>تخت فعال</span><b>۱۱۸ / ۱۵۹</b></div><div><span>اتاق معاینه</span><b>۲۱ / ۲۶</b></div><div><span>صندلی تزریق</span><b>۱۴ / ۱۸</b></div><div><span>ظرفیت رزرو</span><b>۲۶٪</b></div></div>
            <div className="health-capacity-note"><ShieldCheck /> ظرفیت بحرانی در هیچ بخش فعال نشده است.</div>
          </article>
        </section>

        <section className="health-ops-grid">
          <article className="health-dept-card">
            <div className="health-section-head"><div><h2>فشار بخش‌ها</h2><p>اشغال، مراجعه و انتظار به تفکیک بخش</p></div><Stethoscope /></div>
            <div className="health-dept-list">{departments.map((dept) => <div key={dept.name} style={{["--dept" as string]:dept.color}}><span className="health-dept-dot"/><div><b>{dept.name}</b><small>{dept.visits} مراجعه امروز</small></div><div className="health-dept-load"><span>اشغال {dept.occupancy}٪</span><span><i style={{width:`${dept.occupancy}%`}} /></span></div><strong>{dept.wait}</strong></div>)}</div>
          </article>

          <article className="health-quality-card">
            <div className="health-section-head"><div><h2>کیفیت عملیات</h2><p>شاخص‌های سرویس روز</p></div><ShieldCheck /></div>
            <div className="health-quality-score"><strong>۹۴</strong><span>Quality index</span><em><ArrowUpRight /> +۵٪</em></div>
            <div className="health-quality-bars"><div><label>پاسخ در SLA</label><span><i style={{width:"94%"}} /></span><b>۹۴٪</b></div><div><label>ترخیص به‌موقع</label><span><i style={{width:"87%"}} /></span><b>۸۷٪</b></div><div><label>تکمیل مستندات</label><span><i style={{width:"91%"}} /></span><b>۹۱٪</b></div></div>
          </article>
        </section>

        <section className="health-bottom-grid">
          <article className="health-clinician-card">
            <div className="health-section-head"><div><h2>بار تیم درمان</h2><p>توزیع بار و تعداد مراجع فعال</p></div><UserRoundCheck /></div>
            <div className="health-clinician-list">{clinicians.map((person) => <div key={person.name}><span className="health-avatar">{person.name.replace("دکتر ","").slice(0,1)}</span><div><b>{person.name}</b><small>{person.role} · {person.patients} مراجع</small></div><div className="health-clinician-load"><span>بار {person.load}٪</span><span><i style={{width:`${person.load}%`}} /></span></div><em className={person.state === "فعال" ? "active" : "break"}>{person.state}</em></div>)}</div>
          </article>

          <article className="health-alert-card">
            <div className="health-section-head"><div><h2>سیگنال‌های عملیاتی</h2><p>مواردی که نیازمند توجه مدیریت‌اند</p></div><Sparkles /></div>
            <div className="health-alert-list">{alerts.map((alert) => <div className={alert.tone} key={alert.title}><span><Activity /></span><div><b>{alert.title}</b><small>{alert.meta}</small></div></div>)}</div>
            <div className="health-discharge"><div><span>ترخیص‌های برنامه‌ریزی‌شده امروز</span><b>۴۳ / ۵۲</b></div><span><i style={{width:"83%"}} /></span><small>۹ پرونده برای تکمیل فرآیند باقی مانده است.</small></div>
          </article>
        </section>
      </main>
    </LoraniqShell>
  );
}
