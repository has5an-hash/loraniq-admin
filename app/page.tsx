"use client";

import { useState } from "react";
import {
  Activity,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Download,
  FolderKanban,
  MoreHorizontal,
  PackageCheck,
  Plus,
  ShoppingCart,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserRoundPlus,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const orders = [
  { id: "LQ-8421", name: "سارا محمدی", initials: "سم", product: "اشتراک سازمانی", amount: "۱۸٬۴۹۰٬۰۰۰", status: "پرداخت‌شده", tone: "success" },
  { id: "LQ-8419", name: "آرمان کریمی", initials: "آک", product: "بسته فروشگاهی", amount: "۹٬۸۵۰٬۰۰۰", status: "در حال بررسی", tone: "warning" },
  { id: "LQ-8417", name: "نگار توکلی", initials: "نت", product: "داشبورد مالی", amount: "۱۲٬۳۰۰٬۰۰۰", status: "پرداخت‌شده", tone: "success" },
  { id: "LQ-8412", name: "شرکت رایان", initials: "شر", product: "لایسنس توسعه", amount: "۷٬۲۸۰٬۰۰۰", status: "ناموفق", tone: "danger" },
];

const chartPoints = "0,142 46,126 91,134 137,96 183,107 229,72 274,89 320,51 366,61 411,35 457,48 503,17 548,29 594,8";

function MiniSpark({ down = false }: { down?: boolean }) {
  const color = down ? "#f15b6c" : "#13a892";
  return <svg aria-hidden="true" viewBox="0 0 96 36" className="h-9 w-24" preserveAspectRatio="none"><path d={down ? "M1 8 C19 3 25 24 41 16 S64 34 95 29" : "M1 29 C18 31 25 14 41 20 S66 3 95 8"} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" /></svg>;
}

export default function Home() {
  const [range, setRange] = useState("۳۰ روز گذشته");
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  return (
    <LoraniqShell active="executive">
      <main id="main-content" className="main-content">
        <section className="page-heading" aria-labelledby="page-title">
          <div>
            <p className="breadcrumb">خانه / داشبورد / <span>نمای مدیریتی</span></p>
            <h1 id="page-title">صبح بخیر، حسن 👋</h1>
            <p>تصویر امروز کسب‌وکار شما؛ دقیق، کوتاه و قابل اقدام.</p>
          </div>
          <div className="heading-actions">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" className="date-button"><CalendarDays />{range}<ChevronDown /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {["۷ روز گذشته", "۳۰ روز گذشته", "سه‌ماهه جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}{range === item && <Check className="ms-auto" />}</DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="primary-action" onClick={() => notify("گزارش مدیریتی آماده دانلود شد")}><Download />دریافت گزارش</Button>
          </div>
        </section>

        <section className="kpi-grid" aria-label="شاخص‌های کلیدی">
          <article className="kpi-card feature-kpi"><div className="kpi-top"><span className="metric-icon violet"><CircleDollarSign /></span><span className="trend up"><TrendingUp />۱۲٫۸٪</span></div><p>درآمد خالص</p><h2>۲۸۴٫۶ <small>میلیون تومان</small></h2><div className="kpi-bottom"><span>هدف ماهانه</span><b>۸۷٪</b></div><Progress value={87} /></article>
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon cyan"><ShoppingCart /></span><MiniSpark /></div><p>سفارش‌های جدید</p><h2>۱٬۸۴۲</h2><span className="comparison up"><TrendingUp /> ۸٫۲٪ نسبت به قبل</span></article>
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon amber"><UserRoundPlus /></span><MiniSpark /></div><p>مشتریان تازه</p><h2>۴۶۸</h2><span className="comparison up"><TrendingUp /> ۵٫۶٪ نسبت به قبل</span></article>
          <article className="kpi-card"><div className="kpi-top"><span className="metric-icon coral"><Activity /></span><MiniSpark down /></div><p>نرخ ریزش</p><h2>۲٫۴٪</h2><span className="comparison down"><TrendingDown /> ۰٫۳٪ بهبود</span></article>
        </section>

        <section className="dashboard-grid">
          <article className="panel revenue-panel">
            <div className="panel-head"><div><h2>روند درآمد</h2><p>مقایسه عملکرد واقعی با هدف تعیین‌شده</p></div><button className="panel-menu" aria-label="گزینه‌های نمودار"><MoreHorizontal /></button></div>
            <div className="chart-summary"><div><span>درآمد این ماه</span><strong>۲۸۴٫۶ میلیون</strong></div><div className="legend"><span><i className="solid" />عملکرد واقعی</span><span><i className="dashed" />هدف</span></div></div>
            <div className="line-chart" role="img" aria-label="نمودار درآمد با روند افزایشی در هفت ماه اخیر"><div className="y-labels"><span>۳۰۰</span><span>۲۰۰</span><span>۱۰۰</span><span>۰</span></div><svg viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7267e8" stopOpacity=".28" /><stop offset="100%" stopColor="#7267e8" stopOpacity="0" /></linearGradient></defs><g className="grid-lines"><line x1="0" y1="25" x2="600" y2="25"/><line x1="0" y1="75" x2="600" y2="75"/><line x1="0" y1="125" x2="600" y2="125"/><line x1="0" y1="175" x2="600" y2="175"/></g><polyline className="goal-line" points="0,152 100,135 200,115 300,94 400,72 500,50 600,29" /><polygon className="area-fill" points={`0,175 ${chartPoints} 594,175`} /><polyline className="main-line" points={chartPoints} /><circle cx="503" cy="17" r="5" className="chart-dot" /></svg><div className="x-labels"><span>فروردین</span><span>اردیبهشت</span><span>خرداد</span><span>تیر</span><span>مرداد</span><span>شهریور</span><span>مهر</span></div></div>
          </article>

          <article className="panel target-panel"><div className="panel-head"><div><h2>عملکرد تیم</h2><p>پیشرفت اهداف فصل جاری</p></div><span className="live-badge"><i /> به‌روز</span></div><div className="radial-wrap"><div className="radial"><div><strong>۷۸٪</strong><span>پیشرفت کل</span></div></div></div><div className="team-stats"><div><span className="dot violet-dot" /><p>فروش</p><b>۹۲٪</b></div><div><span className="dot cyan-dot" /><p>بازاریابی</p><b>۷۴٪</b></div><div><span className="dot amber-dot" /><p>محصول</p><b>۶۸٪</b></div></div><button className="text-action" onClick={() => notify("جزئیات عملکرد تیم باز شد")}>مشاهده جزئیات عملکرد <span>←</span></button></article>
        </section>

        <section className="lower-grid">
          <article className="panel orders-panel"><div className="panel-head"><div><h2>آخرین سفارش‌ها</h2><p>وضعیت تراکنش‌های تازه ثبت‌شده</p></div><button className="text-link" onClick={() => notify("همه سفارش‌ها نمایش داده شد")}>مشاهده همه</button></div><div className="table-wrap"><table><thead><tr><th>سفارش</th><th>مشتری</th><th>محصول</th><th>مبلغ (تومان)</th><th>وضعیت</th><th><span className="sr-only">عملیات</span></th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><b>{order.id}</b></td><td><div className="customer"><span>{order.initials}</span><b>{order.name}</b></div></td><td>{order.product}</td><td>{order.amount}</td><td><span className={`status ${order.tone}`}><i />{order.status}</span></td><td><button className="row-action" aria-label={`عملیات سفارش ${order.id}`}><MoreHorizontal /></button></td></tr>)}</tbody></table></div><div className="mobile-orders">{orders.map((order) => <div className="order-card" key={order.id}><div><span className="avatar small">{order.initials}</span><p><b>{order.name}</b><small>{order.id} · {order.product}</small></p></div><div><b>{order.amount}</b><span className={`status ${order.tone}`}><i />{order.status}</span></div></div>)}</div></article>
          <article className="panel activity-panel"><div className="panel-head"><div><h2>فعالیت‌های اخیر</h2><p>رویدادهای مهم امروز</p></div><button className="panel-menu" aria-label="گزینه‌های فعالیت"><MoreHorizontal /></button></div><div className="timeline"><div><span className="timeline-icon green"><PackageCheck /></span><p><b>سفارش LQ-8421 تکمیل شد</b><small>پرداخت با موفقیت تأیید شد</small></p><time>۱۰ دقیقه پیش</time></div><div><span className="timeline-icon purple"><UserRoundPlus /></span><p><b>عضو تازه به تیم پیوست</b><small>مریم سلیمانی · تیم محصول</small></p><time>۴۵ دقیقه پیش</time></div><div><span className="timeline-icon orange"><FolderKanban /></span><p><b>نسخه ۲٫۴ آماده بررسی است</b><small>۵ تغییر در انتظار تأیید</small></p><time>۲ ساعت پیش</time></div></div><div className="quick-note"><span><Sparkles /></span><div><b>خلاصه هوشمند روز</b><p>درآمد امروز ۱۶٪ بیشتر از میانگین ۳۰ روزه است.</p></div></div></article>
        </section>
      </main>

      {toast && <div className="toast" role="status"><Check />{toast}</div>}
      <button className="floating-action" aria-label="ایجاد مورد جدید" onClick={() => notify("فرم ایجاد مورد جدید آماده است")}><Plus /></button>
    </LoraniqShell>
  );
}
