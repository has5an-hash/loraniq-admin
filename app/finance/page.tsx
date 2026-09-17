"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Download,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const expenseRows = [
  { label: "حقوق و منابع انسانی", amount: "۱۸۶٫۴ م", share: 42, delta: "+۳٫۲٪", tone: "purple" },
  { label: "زیرساخت و سرویس‌ها", amount: "۹۴٫۸ م", share: 21, delta: "+۶٫۸٪", tone: "cyan" },
  { label: "بازاریابی و فروش", amount: "۸۲٫۶ م", share: 19, delta: "−۴٫۱٪", tone: "amber" },
  { label: "عملیات و پشتیبانی", amount: "۵۱٫۲ م", share: 12, delta: "+۱٫۷٪", tone: "coral" },
  { label: "سایر", amount: "۲۸٫۹ م", share: 6, delta: "−۲٫۵٪", tone: "slate" },
];

const receivables = [
  { name: "پارس داده", due: "امروز", amount: "۲۸٫۴ م", risk: "کم", tone: "good" },
  { name: "راهکار شمال", due: "۲ روز", amount: "۱۹٫۸ م", risk: "متوسط", tone: "watch" },
  { name: "فناوران شرق", due: "۵ روز", amount: "۱۴٫۲ م", risk: "کم", tone: "good" },
  { name: "گسترش نو", due: "۸ روز", amount: "۱۱٫۶ م", risk: "بالا", tone: "risk" },
];

const obligations = [
  { label: "حقوق ماهانه", date: "۲۸ شهریور", amount: "۱۸۶٫۴ م", status: "تأمین شده" },
  { label: "زیرساخت ابری", date: "۳۰ شهریور", amount: "۳۸٫۲ م", status: "رزرو شده" },
  { label: "مالیات دوره", date: "۵ مهر", amount: "۴۶٫۸ م", status: "برنامه‌ریزی" },
];

const cashPoints = "0,142 60,136 120,148 180,118 240,127 300,91 360,103 420,72 480,85 540,53 600,61 660,31 720,39";
const profitPoints = "0,168 60,157 120,151 180,139 240,128 300,119 360,105 420,94 480,79 540,70 600,58 660,46 720,34";

export default function FinancePage() {
  const [range, setRange] = useState("سه‌ماهه جاری");
  const [focus, setFocus] = useState<"cash" | "profit">("cash");

  return (
    <LoraniqShell active="finance">
      <main id="main-content" className="main-content fin-page">
        <section className="fin-hero" aria-labelledby="page-title">
          <article className="fin-treasury-card">
            <div className="fin-hero-copy">
              <span className="fin-kicker"><i /> treasury pulse · به‌روز</span>
              <h1 id="page-title">نقدینگی را قبل از اینکه مسئله شود، مدیریت کن.</h1>
              <p>تصویر یکپارچه‌ای از پول نقد، سود، هزینه، بودجه، مطالبات و تعهدات داشته باش تا تصمیم مالی بر اساس جریان واقعی کسب‌وکار گرفته شود.</p>
              <div className="fin-actions">
                <Button className="primary-action"><Download /> گزارش مالی</Button>
                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><CalendarDays /> {range}<ChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{["ماه جاری", "سه‌ماهه جاری", "سال مالی"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
              </div>
            </div>
            <div className="fin-cash-vault">
              <span className="fin-vault-icon"><Landmark /></span>
              <span>موجودی نقد در دسترس</span>
              <strong>۱٫۸۴ <small>میلیارد تومان</small></strong>
              <em><ArrowUpRight /> ۱۲٫۶٪ بیشتر از ابتدای فصل</em>
              <div className="fin-runway"><div><span>Runway عملیاتی</span><b>۹٫۴ ماه</b></div><span><i style={{width:"78%"}} /></span></div>
            </div>
            <div className="fin-hero-strip">
              <div><span>ورودی نقد</span><b>۶۸۴٫۲ م</b><small>+۱۴٫۸٪</small></div>
              <div><span>خروجی نقد</span><b>۴۴۳٫۹ م</b><small className="neutral">+۲٫۶٪</small></div>
              <div><span>سود عملیاتی</span><b>۱۸۶٫۵ م</b><small>+۹٫۳٪</small></div>
              <div><span>حاشیه سود</span><b>۲۷٫۳٪</b><small>+۱٫۸٪</small></div>
            </div>
          </article>

          <article className="fin-health-card">
            <div className="fin-section-head"><div><span className="fin-safe"><ShieldCheck /> وضعیت سالم</span><h2>سلامت مالی</h2><p>ترکیب نقدینگی، تعهدات و سودآوری</p></div><Sparkles /></div>
            <div className="fin-health-score"><div><strong>۹۱</strong><span>Financial health</span></div></div>
            <div className="fin-health-list"><div><span>نقدینگی کوتاه‌مدت</span><b>۹۴</b><span className="fin-track"><i style={{width:"94%"}} /></span></div><div><span>پوشش تعهدات</span><b>۸۹</b><span className="fin-track"><i style={{width:"89%"}} /></span></div><div><span>کیفیت سود</span><b>۸۶</b><span className="fin-track"><i style={{width:"86%"}} /></span></div></div>
            <p className="fin-health-note">پوشش نقدی تعهدات ۶۰ روز آینده بالاتر از آستانه امن داخلی است.</p>
          </article>
        </section>

        <section className="fin-metrics" aria-label="شاخص‌های مالی">
          <article className="fin-metric purple"><span className="fin-metric-icon"><Banknote /></span><em><ArrowUpRight />۱۴٫۸٪</em><p>درآمد شناسایی‌شده</p><strong>۶۸۴٫۲ <small>م</small></strong><small>۸۸٫۱ میلیون رشد</small></article>
          <article className="fin-metric green"><span className="fin-metric-icon"><TrendingUp /></span><em><ArrowUpRight />۹٫۳٪</em><p>سود عملیاتی</p><strong>۱۸۶٫۵ <small>م</small></strong><small>حاشیه سود ۲۷٫۳٪</small></article>
          <article className="fin-metric amber"><span className="fin-metric-icon"><ReceiptText /></span><em className="neutral"><ArrowUpRight />۲٫۶٪</em><p>هزینه عملیاتی</p><strong>۴۴۳٫۹ <small>م</small></strong><small>۲٫۱٪ زیر بودجه</small></article>
          <article className="fin-metric coral"><span className="fin-metric-icon"><CreditCard /></span><em className="good"><ArrowDownRight />۸٫۴٪</em><p>مطالبات معوق</p><strong>۳۱٫۷ <small>م</small></strong><small>ریسک وصول کاهش یافته</small></article>
        </section>

        <section className="fin-main-grid">
          <article className="fin-flow-card">
            <div className="fin-chart-head"><div><h2>جریان نقد و سود</h2><p>حرکت نقدینگی واقعی در کنار روند سود عملیاتی</p></div><div className="fin-mode"><button className={focus === "cash" ? "active" : ""} onClick={() => setFocus("cash")}>جریان نقدی</button><button className={focus === "profit" ? "active" : ""} onClick={() => setFocus("profit")}>سود عملیاتی</button></div></div>
            <div className="fin-chart-summary"><div><span>{focus === "cash" ? "خالص جریان نقدی" : "سود عملیاتی دوره"}</span><strong>{focus === "cash" ? "+۲۴۰٫۳ میلیون" : "۱۸۶٫۵ میلیون"}</strong></div><em><ArrowUpRight /> بالاتر از سناریوی پایه</em></div>
            <div className="fin-chart-canvas" role="img" aria-label="نمودار جریان نقد و سود عملیاتی"><svg viewBox="0 0 720 210" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="fin-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7568f4" stopOpacity=".28"/><stop offset="100%" stopColor="#7568f4" stopOpacity="0"/></linearGradient></defs><g className="fin-grid-lines"><line x1="0" y1="36" x2="720" y2="36"/><line x1="0" y1="91" x2="720" y2="91"/><line x1="0" y1="146" x2="720" y2="146"/><line x1="0" y1="202" x2="720" y2="202"/></g><polygon className="fin-cash-area" points={`0,202 ${cashPoints} 720,202`} /><polyline className="fin-profit-line" points={profitPoints}/><polyline className="fin-cash-line" points={cashPoints}/><circle cx="660" cy="31" r="5" fill="var(--card)" stroke="#7568f4" strokeWidth="3"/></svg></div>
            <div className="fin-chart-foot"><span><i className="cash" /> جریان نقدی</span><span><i className="profit" /> سود عملیاتی</span><b>پیش‌بینی نقد پایان فصل: ۲٫۰۳ میلیارد</b></div>
          </article>

          <article className="fin-budget-card">
            <div className="fin-section-head"><div><h2>بودجه در برابر واقعی</h2><p>کنترل انحراف هزینه و درآمد</p></div><CircleDollarSign /></div>
            <div className="fin-budget-ring"><div><strong>۹۶٪</strong><span>دقت بودجه</span></div></div>
            <div className="fin-budget-list"><div><span>درآمد</span><b>+۴٫۲٪</b><em className="good">بالاتر از بودجه</em></div><div><span>هزینه</span><b>−۲٫۱٪</b><em className="good">کمتر از بودجه</em></div><div><span>CAPEX</span><b>+۱٫۳٪</b><em>در محدوده</em></div></div>
            <div className="fin-budget-note"><Sparkles /> بزرگ‌ترین انحراف مثبت مربوط به درآمد قراردادهای سازمانی است.</div>
          </article>
        </section>

        <section className="fin-ops-grid">
          <article className="fin-expense-card">
            <div className="fin-section-head"><div><h2>ترکیب هزینه‌ها</h2><p>سهم و تغییر هزینه‌های عملیاتی</p></div><TrendingDown /></div>
            <div className="fin-expense-list">{expenseRows.map((row) => <div className={`fin-expense-row ${row.tone}`} key={row.label}><span className="fin-expense-dot"/><div><b>{row.label}</b><small>{row.share}٪ از کل هزینه</small></div><span className="fin-expense-bar"><i style={{width:`${row.share * 2}%`}} /></span><strong>{row.amount}</strong><em className={row.delta.startsWith("−") ? "down" : "up"}>{row.delta}</em></div>)}</div>
          </article>

          <article className="fin-liquidity-card">
            <div className="fin-section-head"><div><h2>نقدینگی و Runway</h2><p>تاب‌آوری مالی در سناریوهای مختلف</p></div><Landmark /></div>
            <div className="fin-runway-hero"><strong>۹٫۴</strong><span>ماه Runway</span><em><ArrowUpRight /> +۱٫۱ ماه</em></div>
            <div className="fin-scenarios"><div><span>محافظه‌کارانه</span><b>۷٫۲ ماه</b><i style={{width:"61%"}} /></div><div><span>سناریوی پایه</span><b>۹٫۴ ماه</b><i style={{width:"78%"}} /></div><div><span>رشد هدف</span><b>۱۱٫۸ ماه</b><i style={{width:"92%"}} /></div></div>
          </article>
        </section>

        <section className="fin-bottom-grid">
          <article className="fin-receivable-card">
            <div className="fin-section-head"><div><h2>مطالبات پیشِ رو</h2><p>وصول‌های مهم و ریسک زمانی</p></div><WalletCards /></div>
            <div className="fin-receivable-list">{receivables.map((item) => <div key={item.name}><span className="fin-client-icon">{item.name.slice(0,1)}</span><div><b>{item.name}</b><small>سررسید: {item.due}</small></div><strong>{item.amount}</strong><em className={item.tone}>{item.risk}</em></div>)}</div>
          </article>

          <article className="fin-obligation-card">
            <div className="fin-section-head"><div><h2>تعهدات آینده</h2><p>پرداخت‌های برنامه‌ریزی‌شده</p></div><ReceiptText /></div>
            <div className="fin-obligation-list">{obligations.map((item, index) => <div key={item.label}><span className={`fin-obligation-icon ${index === 0 ? "purple" : index === 1 ? "green" : "amber"}`}><ReceiptText /></span><div><b>{item.label}</b><small>{item.date} · {item.status}</small></div><strong>{item.amount}</strong></div>)}</div>
            <div className="fin-cover"><div><span>پوشش نقدی تعهدات ۶۰ روز</span><b>۲٫۷×</b></div><span className="fin-track"><i style={{width:"88%"}} /></span><small>بالاتر از کف سیاست مالی ۱٫۸×</small></div>
          </article>
        </section>
      </main>
    </LoraniqShell>
  );
}
