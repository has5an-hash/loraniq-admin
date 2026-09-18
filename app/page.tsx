"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  MoreHorizontal,
  PackageCheck,
  Plus,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  UserRoundPlus,
  UsersRound,
  WalletCards,
  Zap,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const orders = [
  { id: "LQ-8421", name: "سارا محمدی", initials: "سم", product: "اشتراک سازمانی", amount: "۱۸٬۴۹۰٬۰۰۰", status: "پرداخت‌شده", tone: "success" },
  { id: "LQ-8419", name: "آرمان کریمی", initials: "آک", product: "بسته فروشگاهی", amount: "۹٬۸۵۰٬۰۰۰", status: "در حال بررسی", tone: "warning" },
  { id: "LQ-8417", name: "نگار توکلی", initials: "نت", product: "داشبورد مالی", amount: "۱۲٬۳۰۰٬۰۰۰", status: "پرداخت‌شده", tone: "success" },
  { id: "LQ-8412", name: "شرکت رایان", initials: "شر", product: "لایسنس توسعه", amount: "۷٬۲۸۰٬۰۰۰", status: "ناموفق", tone: "danger" },
];

const activity = [
  { title: "سفارش LQ-8421 تکمیل شد", meta: "پرداخت با موفقیت تأیید شد", time: "۱۰ دقیقه پیش", icon: PackageCheck },
  { title: "عضو تازه به تیم پیوست", meta: "مریم سلیمانی · تیم محصول", time: "۴۵ دقیقه پیش", icon: UserRoundPlus },
  { title: "هدف فروش هفتگی به‌روزرسانی شد", meta: "۹۱٪ از برنامه محقق شده", time: "۲ ساعت پیش", icon: Target },
];

const chartPoints = "0,160 55,145 110,151 165,118 220,132 275,92 330,105 385,70 440,84 495,53 550,67 605,34 660,44 715,18";
const goalPoints = "0,172 70,160 140,146 210,130 280,118 350,103 420,89 490,74 560,61 630,47 715,34";

function MiniLine({ tone = "#8d83ff", down = false }: { tone?: string; down?: boolean }) {
  return (
    <svg className="exec-mini-line" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true" style={{ ["--stat-accent" as string]: tone }}>
      <path d={down ? "M1 5 C19 2 25 19 41 13 S64 25 99 23" : "M1 23 C18 25 25 11 42 16 S67 2 99 7"} />
    </svg>
  );
}

export default function Home() {
  const [range, setRange] = useState("۳۰ روز گذشته");

  return (
    <LoraniqShell active="executive">
      <main id="main-content" className="main-content">
        <section className="exec-hero" aria-labelledby="page-title">
          <article className="exec-hero-main">
            <div className="exec-hero-copy">
              <span className="exec-eyebrow"><i /> Business pulse · زنده</span>
              <h1 id="page-title">سلام حسن، امروز روی رشد تمرکز داریم.</h1>
              <p>تصویر مدیریتی لورانیک، شاخص‌های اصلی فروش، سود، تیم و جریان نقدی را در یک نگاه قابل اقدام جمع می‌کند.</p>
              <div className="exec-hero-actions">
                <Button className="primary-action"><Download /> دریافت گزارش مدیریتی</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="outline"><CalendarDays /> {range}<ChevronDown /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">{["۷ روز گذشته", "۳۰ روز گذشته", "سه‌ماهه جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="exec-hero-orb" role="img" aria-label="۸۷ درصد تحقق هدف درآمد"><div><strong>۸۷٪</strong><span>تحقق هدف</span></div></div>
            <div className="exec-hero-strip">
              <div><span>درآمد امروز</span><strong>۱۸٫۶ میلیون</strong></div>
              <div><span>سفارش موفق</span><strong>۳۲۸ سفارش</strong></div>
              <div><span>حاشیه سود</span><strong>۳۶٫۴٪</strong></div>
            </div>
          </article>

          <article className="exec-focus-card">
            <div className="exec-focus-head"><div><h2>ریتم کسب‌وکار</h2><p>سه سیگنال مهم برای تصمیم امروز</p></div><span className="exec-live"><i /> زنده</span></div>
            <div className="exec-focus-score"><strong>۹۱</strong><span><ArrowUpRight /> +۶ امتیاز</span></div>
            <p className="exec-focus-copy">فروش و رضایت مشتری بالاتر از میانگین‌اند؛ ظرفیت عملیات هنوز جا برای رشد دارد.</p>
            <div className="exec-focus-lines">
              <div className="exec-focus-line"><span className="violet" /><label>فروش</label><b>۹۲٪</b></div>
              <div className="exec-focus-line"><span className="cyan" /><label>رضایت مشتری</label><b>۸۸٪</b></div>
              <div className="exec-focus-line"><span className="amber" /><label>ظرفیت عملیات</label><b>۷۴٪</b></div>
            </div>
            <div className="exec-team"><div className="exec-avatars"><span>حم</span><span>مس</span><span>آک</span><span>+۴</span></div><small>۷ عضو فعال امروز</small></div>
          </article>
        </section>

        <section className="exec-stat-grid" aria-label="شاخص‌های کلیدی">
          <article className="exec-stat" style={{ ["--stat-accent" as string]: "#8d83ff" }}>
            <div className="exec-stat-head"><span className="exec-stat-icon"><CircleDollarSign /></span><span className="exec-stat-trend"><TrendingUp />۱۲٫۸٪</span></div>
            <p className="exec-stat-label">درآمد خالص</p><div className="exec-stat-value"><strong>۲۸۴٫۶</strong><small>میلیون تومان</small></div><MiniLine />
          </article>
          <article className="exec-stat" style={{ ["--stat-accent" as string]: "#12a891" }}>
            <div className="exec-stat-head"><span className="exec-stat-icon"><ShoppingBag /></span><span className="exec-stat-trend"><TrendingUp />۸٫۲٪</span></div>
            <p className="exec-stat-label">سفارش‌های جدید</p><div className="exec-stat-value"><strong>۱٬۸۴۲</strong><small>سفارش</small></div><MiniLine tone="#12a891" />
          </article>
          <article className="exec-stat" style={{ ["--stat-accent" as string]: "#f2a641" }}>
            <div className="exec-stat-head"><span className="exec-stat-icon"><UsersRound /></span><span className="exec-stat-trend"><ArrowUpRight />۵٫۶٪</span></div>
            <p className="exec-stat-label">مشتریان تازه</p><div className="exec-stat-value"><strong>۴۶۸</strong><small>مشتری</small></div><MiniLine tone="#f2a641" />
          </article>
          <article className="exec-stat" style={{ ["--stat-accent" as string]: "#e85f72" }}>
            <div className="exec-stat-head"><span className="exec-stat-icon"><WalletCards /></span><span className="exec-stat-trend down"><TrendingDown />۰٫۳٪</span></div>
            <p className="exec-stat-label">نرخ ریزش</p><div className="exec-stat-value"><strong>۲٫۴٪</strong><small>بهبود یافته</small></div><MiniLine tone="#e85f72" down />
          </article>
        </section>

        <section className="exec-main-grid">
          <article className="exec-chart-card">
            <div className="exec-chart-head"><div><h2>روند درآمد و هدف</h2><p>عملکرد واقعی در برابر برنامه رشد ماهانه</p></div><button className="panel-menu" aria-label="گزینه‌های نمودار"><MoreHorizontal /></button></div>
            <div className="exec-chart-total"><span>درآمد این دوره</span><strong>۲۸۴٫۶ میلیون تومان</strong></div>
            <div className="exec-chart-wrap" role="img" aria-label="نمودار روند درآمد و هدف">
              <svg viewBox="0 0 720 210" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="exec-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8d83ff" stopOpacity=".34" /><stop offset="100%" stopColor="#8d83ff" stopOpacity="0" /></linearGradient></defs>
                <g className="exec-chart-grid"><line x1="0" y1="35" x2="720" y2="35"/><line x1="0" y1="90" x2="720" y2="90"/><line x1="0" y1="145" x2="720" y2="145"/><line x1="0" y1="200" x2="720" y2="200"/></g>
                <polygon className="exec-chart-area" points={`0,200 ${chartPoints} 715,200`} />
                <polyline className="exec-chart-goal" points={goalPoints} />
                <polyline className="exec-chart-line" points={chartPoints} />
                <circle cx="605" cy="34" r="5" fill="var(--card)" stroke="#8d83ff" strokeWidth="3" />
              </svg>
            </div>
            <div className="exec-chart-legend"><span><i /> عملکرد واقعی</span><span><i className="goal" /> هدف برنامه</span></div>
            <div className="exec-chart-insights"><div><span>بهترین روز</span><b>پنجشنبه · ۱۸٫۹م</b></div><div><span>میانگین روزانه</span><b>۹٫۴ میلیون</b></div><div><span>فاصله تا هدف</span><b>۴۲٫۱ میلیون</b></div></div>
          </article>

          <div className="exec-side-stack">
            <article className="exec-goal-card"><h2>هدف فصل جاری</h2><p>پیشرفت تجمعی تیم‌ها</p><div className="exec-goal-ring"><div><strong>۷۸٪</strong><span>پیشرفت کل</span></div></div><div className="exec-goal-meta"><div><span>فروش</span><b>۹۲٪</b></div><div><span>محصول</span><b>۶۸٪</b></div><div><span>بازاریابی</span><b>۷۴٪</b></div></div></article>
            <article className="exec-cash-card"><h2>جریان نقدی هفتگی</h2><p>ورودی خالص نسبت به هزینه‌ها</p><div className="exec-bars" role="img" aria-label="نمودار میله‌ای جریان نقدی"><i className="exec-bar" style={{height:"42%"}}/><i className="exec-bar" style={{height:"58%"}}/><i className="exec-bar" style={{height:"51%"}}/><i className="exec-bar" style={{height:"72%"}}/><i className="exec-bar" style={{height:"67%"}}/><i className="exec-bar" style={{height:"88%"}}/><i className="exec-bar" style={{height:"79%"}}/></div><div className="exec-cash-foot"><span>خالص هفته</span><b>+۴۶٫۲ میلیون</b></div></article>
          </div>
        </section>

        <section className="exec-lower-grid">
          <article className="exec-orders-card">
            <div className="exec-card-head"><div><h2>آخرین سفارش‌ها</h2><p>تراکنش‌های تازه و وضعیت پردازش</p></div><button className="exec-card-link">مشاهده همه</button></div>
            <table className="exec-order-table" tabIndex={0} aria-label="آخرین سفارش‌ها"><thead><tr><th>سفارش</th><th>مشتری</th><th>محصول</th><th>مبلغ</th><th>وضعیت</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><b>{order.id}</b></td><td><div className="exec-customer"><span>{order.initials}</span><b>{order.name}</b></div></td><td>{order.product}</td><td>{order.amount}</td><td><span className={`exec-status ${order.tone}`}>{order.status}</span></td></tr>)}</tbody></table>
          </article>

          <article className="exec-activity-card">
            <div className="exec-card-head"><div><h2>فعالیت‌های مهم</h2><p>رویدادهایی که ارزش توجه دارند</p></div><Zap className="h-5 w-5 text-primary" /></div>
            <div className="exec-activity-list">{activity.map((item) => { const Icon = item.icon; return <div className="exec-activity-item" key={item.title}><span className="exec-activity-icon"><Icon /></span><div><b>{item.title}</b><small>{item.meta}</small></div><time>{item.time}</time></div>; })}</div>
            <div className="exec-ai-note"><Sparkles /><div><b>خلاصه مدیریتی</b><p>روند فروش مثبت است؛ بیشترین فرصت امروز در بهبود ظرفیت عملیات دیده می‌شود.</p></div></div>
            <Button variant="outline" className="mt-3 w-full"><Plus /> ایجاد اقدام جدید</Button>
          </article>
        </section>
      </main>
    </LoraniqShell>
  );
}
