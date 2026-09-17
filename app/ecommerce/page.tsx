"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  PackageCheck,
  PackageX,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const liveOrders = [
  { id: "LQ-92841", customer: "سارا محمودی", amount: "۱٬۸۹۰٬۰۰۰", state: "پرداخت شد", tone: "success" },
  { id: "LQ-92840", customer: "آریا کریمی", amount: "۳٬۴۶۰٬۰۰۰", state: "در پردازش", tone: "warning" },
  { id: "LQ-92839", customer: "نگار توکلی", amount: "۷۹۰٬۰۰۰", state: "ارسال شد", tone: "info" },
];

const products = [
  { name: "هدفون Nova X1", sku: "NX-101", sales: "۸۶۴", revenue: "۱۷۸٫۴ م", stock: 72, growth: "+۱۸٫۶٪" },
  { name: "ساعت Orbit Mini", sku: "OM-220", sales: "۷۱۲", revenue: "۱۴۲٫۹ م", stock: 48, growth: "+۱۲٫۱٪" },
  { name: "کیبورد Frame 75", sku: "KF-075", sales: "۵۳۹", revenue: "۱۱۹٫۶ م", stock: 31, growth: "+۸٫۴٪" },
  { name: "ماوس Pulse Air", sku: "PA-310", sales: "۴۱۸", revenue: "۸۶٫۲ م", stock: 19, growth: "−۲٫۳٪" },
];

const inventory = [
  { name: "ماوس Pulse Air", sku: "PA-310", days: "۲ روز", stock: 19, level: 82 },
  { name: "داک Core Hub", sku: "CH-440", days: "۳ روز", stock: 24, level: 68 },
  { name: "وب‌کم Halo 4K", sku: "HK-400", days: "۵ روز", stock: 36, level: 49 },
];

const channels = [
  { label: "وب‌سایت", value: "۵۶٪", amount: "۲۷۲٫۳ م", color: "#7568f4" },
  { label: "مارکت‌پلیس", value: "۲۴٪", amount: "۱۱۶٫۷ م", color: "#12a891" },
  { label: "شبکه اجتماعی", value: "۱۳٪", amount: "۶۳٫۲ م", color: "#f2a641" },
  { label: "فروش مستقیم", value: "۷٪", amount: "۳۴٫۰ م", color: "#e85f72" },
];

const salesPoints = "0,164 60,151 120,158 180,121 240,133 300,92 360,106 420,74 480,86 540,48 600,61 660,30 720,42";
const targetPoints = "0,173 60,161 120,149 180,137 240,124 300,112 360,99 420,87 480,75 540,63 600,51 660,39 720,27";

export default function EcommercePage() {
  const [range, setRange] = useState("۳۰ روز گذشته");
  const [mode, setMode] = useState<"revenue" | "orders">("revenue");

  return (
    <LoraniqShell active="ecommerce">
      <main id="main-content" className="main-content eco-page">
        <section className="eco-hero" aria-labelledby="page-title">
          <article className="eco-command-card">
            <div className="eco-command-copy">
              <span className="eco-kicker"><i /> commerce command · زنده</span>
              <h1 id="page-title">فروش را فقط نبین؛ همان لحظه هدایتش کن.</h1>
              <p>درآمد، سفارش، موجودی، تبدیل و عملیات ارسال در یک اتاق فرمان؛ با تمرکز روی سیگنال‌هایی که واقعاً روی رشد فروش اثر دارند.</p>
              <div className="eco-actions">
                <Button className="primary-action"><Download /> دریافت گزارش فروش</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="outline"><CalendarDays /> {range}<ChevronDown /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">{["۷ روز گذشته", "۳۰ روز گذشته", "سه‌ماهه جاری"].map((item) => <DropdownMenuItem key={item} onClick={() => setRange(item)}>{item}</DropdownMenuItem>)}</DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="eco-hero-value">
              <span>فروش خالص دوره</span>
              <strong>۴۸۶٫۲ <small>میلیون تومان</small></strong>
              <em><ArrowUpRight /> ۱۸٫۴٪ نسبت به دوره قبل</em>
              <div className="eco-goal-line"><span><i /></span><b>۸۱٪ هدف ماهانه</b></div>
            </div>
            <div className="eco-hero-strip">
              <div><span>سفارش موفق</span><b>۳٬۸۴۲</b></div>
              <div><span>میانگین سبد</span><b>۱٫۲۶ م</b></div>
              <div><span>نرخ تبدیل</span><b>۵٫۸٪</b></div>
              <div><span>مرجوعی</span><b>۱٫۷٪</b></div>
            </div>
          </article>

          <article className="eco-live-orders">
            <div className="eco-section-head"><div><span className="eco-live-dot"><i /> زنده</span><h2>نبض سفارش‌ها</h2><p>آخرین خریدهای ثبت‌شده</p></div><ShoppingBag /></div>
            <div className="eco-order-stream">{liveOrders.map((order) => <div className="eco-order-row" key={order.id}><span className="eco-order-avatar">{order.customer.slice(0,1)}</span><div><b>{order.customer}</b><small>{order.id}</small></div><strong>{order.amount}</strong><em className={order.tone}>{order.state}</em></div>)}</div>
            <div className="eco-fulfillment"><div><span><Truck /> آماده ارسال</span><b>۸۴٪</b></div><span className="eco-track"><i style={{width:"84%"}} /></span><p>۲۶ سفارش تا پایان شیفت باید تحویل لجستیک شوند.</p></div>
          </article>
        </section>

        <section className="eco-metrics" aria-label="شاخص‌های فروشگاه">
          <article className="eco-metric violet"><div className="eco-metric-icon"><CircleDollarSign /></div><span className="eco-trend"><ArrowUpRight />۱۸٫۴٪</span><p>فروش خالص</p><strong>۴۸۶٫۲ <small>م</small></strong><em>+۷۵٫۶ میلیون رشد</em></article>
          <article className="eco-metric cyan"><div className="eco-metric-icon"><ShoppingBag /></div><span className="eco-trend"><ArrowUpRight />۱۲٫۷٪</span><p>سفارش موفق</p><strong>۳٬۸۴۲</strong><em>۴۳۲ سفارش بیشتر</em></article>
          <article className="eco-metric amber"><div className="eco-metric-icon"><WalletCards /></div><span className="eco-trend"><ArrowUpRight />۴٫۹٪</span><p>ارزش متوسط سبد</p><strong>۱٫۲۶ <small>م</small></strong><em>هدف: ۱٫۳ میلیون</em></article>
          <article className="eco-metric coral"><div className="eco-metric-icon"><PackageX /></div><span className="eco-trend bad"><ArrowDownRight />۰٫۶٪</span><p>نرخ مرجوعی</p><strong>۱٫۷٪</strong><em>بهتر از سقف ۲٫۵٪</em></article>
        </section>

        <section className="eco-main-grid">
          <article className="eco-sales-card">
            <div className="eco-chart-head"><div><h2>فروش در برابر هدف</h2><p>عملکرد واقعی و مسیر هدف در طول دوره</p></div><div className="eco-mode"><button className={mode === "revenue" ? "active" : ""} onClick={() => setMode("revenue")}>درآمد</button><button className={mode === "orders" ? "active" : ""} onClick={() => setMode("orders")}>سفارش</button></div></div>
            <div className="eco-chart-summary"><div><span>{mode === "revenue" ? "فروش ثبت‌شده" : "سفارش‌های ثبت‌شده"}</span><strong>{mode === "revenue" ? "۴۸۶٫۲ میلیون" : "۳٬۸۴۲ سفارش"}</strong></div><em><ArrowUpRight /> روند بالاتر از هدف هفتگی</em></div>
            <div className="eco-chart-canvas" role="img" aria-label="نمودار فروش و هدف فروشگاه">
              <svg viewBox="0 0 720 210" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="eco-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7568f4" stopOpacity=".28"/><stop offset="100%" stopColor="#7568f4" stopOpacity="0"/></linearGradient></defs><g className="eco-grid-lines"><line x1="0" y1="36" x2="720" y2="36"/><line x1="0" y1="92" x2="720" y2="92"/><line x1="0" y1="148" x2="720" y2="148"/><line x1="0" y1="202" x2="720" y2="202"/></g><polygon className="eco-sales-area" points={`0,202 ${salesPoints} 720,202`} /><polyline className="eco-target-line" points={targetPoints}/><polyline className="eco-sales-line" points={salesPoints}/><circle cx="660" cy="30" r="5" fill="var(--card)" stroke="#7568f4" strokeWidth="3"/></svg>
            </div>
            <div className="eco-chart-foot"><span><i className="actual" /> فروش واقعی</span><span><i className="target" /> هدف دوره</span><b>پیش‌بینی پایان ماه: ۶۱۲ م</b></div>
          </article>

          <article className="eco-channel-card">
            <div className="eco-section-head"><div><h2>کانال‌های درآمد</h2><p>ترکیب فروش خالص</p></div><Store /></div>
            <div className="eco-channel-ring"><div><strong>۴۸۶</strong><span>میلیون</span></div></div>
            <div className="eco-channel-list">{channels.map((channel) => <div key={channel.label} style={{["--channel" as string]:channel.color}}><i /><span><b>{channel.label}</b><small>{channel.amount}</small></span><strong>{channel.value}</strong></div>)}</div>
          </article>
        </section>

        <section className="eco-ops-grid">
          <article className="eco-products-card">
            <div className="eco-section-head"><div><h2>محصولات برتر</h2><p>بر اساس درآمد و شتاب فروش</p></div><Sparkles /></div>
            <div className="eco-product-list">{products.map((product, index) => <div className="eco-product-row" key={product.sku}><span className="eco-product-rank">{index + 1}</span><div className="eco-product-copy"><b>{product.name}</b><small>{product.sku}</small></div><div><span>فروش</span><b>{product.sales}</b></div><div><span>درآمد</span><b>{product.revenue}</b></div><div className="eco-stock"><span>موجودی {product.stock}٪</span><span className="eco-track"><i style={{width:`${product.stock}%`}} /></span></div><em className={product.growth.includes("−") ? "down" : "up"}>{product.growth}</em></div>)}</div>
          </article>

          <article className="eco-funnel-card">
            <div className="eco-section-head"><div><h2>قیف خرید</h2><p>از مشاهده محصول تا پرداخت</p></div><UsersRound /></div>
            <div className="eco-funnel-total"><strong>۹۲٬۴۱۰</strong><span>بازدید واجد شرایط</span></div>
            <div className="eco-funnel-steps"><div style={{["--w" as string]:"100%"}}><span>مشاهده محصول</span><b>۹۲٬۴۱۰</b></div><div style={{["--w" as string]:"74%"}}><span>افزودن به سبد</span><b>۲۶٬۸۴۰</b></div><div style={{["--w" as string]:"54%"}}><span>شروع پرداخت</span><b>۱۰٬۹۲۰</b></div><div style={{["--w" as string]:"38%"}}><span>خرید موفق</span><b>۳٬۸۴۲</b></div></div>
            <div className="eco-funnel-note"><ArrowUpRight /> بیشترین بهبود این دوره در مرحله «شروع پرداخت» ثبت شده است.</div>
          </article>
        </section>

        <section className="eco-bottom-grid">
          <article className="eco-inventory-card">
            <div className="eco-section-head"><div><h2>موجودی در خطر</h2><p>اقلام نزدیک به نقطه سفارش</p></div><Boxes /></div>
            <div className="eco-inventory-list">{inventory.map((item) => <div key={item.sku}><span className="eco-inventory-icon"><PackageX /></span><div><b>{item.name}</b><small>{item.sku} · {item.stock} عدد باقی‌مانده</small><span className="eco-track"><i style={{width:`${item.level}%`}} /></span></div><strong>{item.days}</strong></div>)}</div>
            <Button variant="outline" className="eco-full-button"><Boxes /> مشاهده برنامه تأمین</Button>
          </article>

          <article className="eco-logistics-card">
            <div className="eco-section-head"><div><h2>عملیات ارسال امروز</h2><p>سلامت جریان fulfilment</p></div><Truck /></div>
            <div className="eco-logistics-grid"><div><span className="eco-logistics-icon purple"><PackageCheck /></span><strong>۲۴۸</strong><small>آماده ارسال</small></div><div><span className="eco-logistics-icon green"><Truck /></span><strong>۱۹۶</strong><small>تحویل پیک</small></div><div><span className="eco-logistics-icon amber"><Clock3 /></span><strong>۲۶</strong><small>نیازمند اقدام</small></div></div>
            <div className="eco-timeline"><span><i className="done" /><b>۰۸:۳۰</b><small>پردازش دسته صبح تکمیل شد</small></span><span><i className="done" /><b>۱۲:۱۵</b><small>۱۹۶ بسته تحویل لجستیک شد</small></span><span><i /><b>۱۶:۰۰</b><small>مهلت تحویل دسته عصر</small></span></div>
          </article>
        </section>
      </main>
    </LoraniqShell>
  );
}
