"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  Code2,
  FileText,
  Gauge,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Moon,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const demos = [
  { slug: "commerce", title: "تجارت", subtitle: "فروش، سفارش و درآمد", tone: "violet", icon: ShoppingBag },
  { slug: "analytics", title: "تحلیل داده", subtitle: "شاخص‌ها و روندها", tone: "blue", icon: BarChart3 },
  { slug: "projects", title: "مدیریت پروژه", subtitle: "تیم، زمان و پیشرفت", tone: "mint", icon: Gauge },
  { slug: "finance", title: "امور مالی", subtitle: "تراکنش و نقدینگی", tone: "orange", icon: WalletCards },
  { slug: "crm", title: "مدیریت مشتری", subtitle: "مشتریان و پیگیری‌ها", tone: "pink", icon: Users },
  { slug: "academy", title: "آکادمی", subtitle: "دوره و دانشجو", tone: "navy", icon: FileText },
  { slug: "calendar", title: "تقویم", subtitle: "رویداد و برنامه‌ریزی", tone: "blue", icon: CalendarDays },
  { slug: "inbox", title: "پیام‌ها", subtitle: "صندوق پیام و فعالیت‌ها", tone: "mint", icon: MessageSquare },
  { slug: "components", title: "کامپوننت‌ها", subtitle: "اجزای رابط کاربری", tone: "violet", icon: Grid2X2 },
  { slug: "settings", title: "تنظیمات", subtitle: "حساب و ترجیحات", tone: "orange", icon: Settings },
];

const features = [
  [LayoutDashboard, "۱۰ فضای کاری تعاملی", "مسیرهای مستقل برای سناریوهای مدیریتی مختلف"],
  [Moon, "حالت روشن و تیره", "تغییر تم در تجربه دمو"],
  [Code2, "React + Next.js + TypeScript", "ساختار مدرن و قابل توسعه"],
  [Gauge, "واکنش‌گرا", "چیدمان متناسب با دسکتاپ، تبلت و موبایل"],
];

const faqs = [
  ["لورانیک دقیقاً چیست؟", "لورانیک یک قالب رابط کاربری مدیریتی فارسی و راست‌چین است که با React، Next.js و TypeScript توسعه داده شده است."],
  ["چند دموی قابل استفاده دارد؟", "نسخه فعلی ۱۰ فضای کاری تعاملی دارد: تجارت، تحلیل داده، پروژه، مالی، CRM، آکادمی، تقویم، پیام‌ها، کامپوننت‌ها و تنظیمات."],
  ["آیا حالت تیره دارد؟", "بله؛ دموهای مدیریتی امکان جابه‌جایی بین حالت روشن و تیره را دارند."],
  ["برای اجرا چه چیزی لازم است؟", "Node.js نسخه 22.13 یا جدیدتر و npm برای نصب وابستگی‌ها، توسعه و Build نیاز است."],
];

function MiniChart() {
  return (
    <svg viewBox="0 0 380 120" className="chart" aria-label="نمودار نمونه">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7667f5" stopOpacity=".26" />
          <stop offset="1" stopColor="#7667f5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 104 C34 92,52 96,80 75 S129 77,155 55 S197 73,225 43 S271 52,300 26 S348 32,380 7 L380 120 L0 120Z" fill="url(#area)" />
      <path d="M0 104 C34 92,52 96,80 75 S129 77,155 55 S197 73,225 43 S271 52,300 26 S348 32,380 7" fill="none" stroke="#7667f5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function DashboardMockup() {
  return (
    <div className="dashboard">
      <aside className="dash-side">
        <div className="mini-brand"><span>لـ</span><b>لورانیک</b></div>
        {[LayoutDashboard, BarChart3, ShoppingBag, Users, CalendarDays].map((Icon, i) => (
          <div className={`dash-nav ${i === 0 ? "active" : ""}`} key={i}>
            <Icon />
            <span>{["پیشخوان", "گزارش‌ها", "فروشگاه", "مشتریان", "تقویم"][i]}</span>
          </div>
        ))}
      </aside>
      <div className="dash-main">
        <div className="dash-top">
          <div><b>پیشخوان لورانیک</b><small>نمونه رابط مدیریتی فارسی</small></div>
          <div className="dash-tools"><Search /><Bell /><span className="avatar">ل</span></div>
        </div>
        <div className="stat-grid">
          <div className="stat primary"><small>درآمد نمونه</small><strong>۱۸٫۴ مـ</strong><em>+۱۲٫۵٪</em></div>
          <div className="stat"><small>سفارش نمونه</small><strong>۲۴۸</strong><em>+۸٫۲٪</em></div>
          <div className="stat"><small>مشتری نمونه</small><strong>۶۴</strong><em>+۴٫۱٪</em></div>
        </div>
        <div className="dash-grid">
          <div className="chart-card">
            <div className="card-head"><b>روند نمونه</b><span>هفتگی</span></div>
            <MiniChart />
            <div className="chart-labels"><span>شنبه</span><span>دوشنبه</span><span>چهارشنبه</span><span>جمعه</span></div>
          </div>
          <div className="activity-card">
            <div className="card-head"><b>فعالیت‌های نمونه</b><span>دمو</span></div>
            {["سفارش جدید", "ثبت مشتری", "گزارش مالی"].map((x, i) => (
              <div className="order" key={x}>
                <span className={`product p${i}`}><Package /></span>
                <div><b>{x}</b><small>داده نمایشی</small></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main dir="rtl" className={dark ? "site dark" : "site"}>
      <header className="navbar">
        <a className="brand" href="#top"><span className="brandmark">L</span><span><b>لورانیک</b><small>پنل مدیریت فارسی</small></span></a>
        <nav className={menu ? "open" : ""}>
          <a href="#demos">دموها</a><a href="#features">ویژگی‌ها</a><a href="#tech">تکنولوژی</a><a href="#faq">سوالات متداول</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="تغییر حالت رنگ">{dark ? <Sun /> : <Moon />}</button>
          <Link className="btn btn-primary" href="/demo/commerce">دموی زنده <ArrowLeft /></Link>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="منو">{menu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles /> نسخه ۱.۰.۰</div>
          <h1>پنل مدیریت فارسی،<br/><span>راست‌چین و توسعه‌پذیر</span></h1>
          <p>لورانیک یک قالب رابط مدیریتی مبتنی بر React، Next.js و TypeScript است که ۱۰ فضای کاری تعاملی برای سناریوهای رایج مدیریتی ارائه می‌کند.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" href="/demo/commerce">ورود به دمو <ArrowLeft /></Link>
            <a className="btn btn-ghost btn-lg" href="#demos">مشاهده فضاهای کاری</a>
          </div>
        </div>
        <div className="hero-visual"><DashboardMockup /></div>
      </section>

      <section className="metrics">
        <div><strong>۱۰</strong><span>فضای کاری</span></div>
        <div><strong>RTL</strong><span>چیدمان فارسی</span></div>
        <div><strong>۲</strong><span>حالت روشن و تیره</span></div>
        <div><strong>1.0.0</strong><span>نسخه محصول</span></div>
      </section>

      <section className="section demos-section" id="demos">
        <div className="section-head"><div><span className="kicker">دموهای واقعی نسخه فعلی</span><h2>۱۰ فضای کاری قابل پیمایش</h2><p>هر کارت مستقیماً به مسیر همان دموی تعاملی متصل است.</p></div></div>
        <div className="demo-grid">
          {demos.map((d) => (
            <article className={`demo-card ${d.tone}`} key={d.slug}>
              <div className="demo-info"><span><d.icon /></span><div><h3>{d.title}</h3><p>{d.subtitle}</p></div></div>
              <div className="demo-preview"><div className="mini-side"/><div className="mini-content"><div className="mini-top"/><div className="mini-stats"><i/><i/><i/></div><div className="mini-chart"><svg viewBox="0 0 200 50"><path d="M0 43 C30 42 25 19 52 27 S78 36 95 19 S122 30 145 12 S170 18 200 2"/></svg></div></div></div>
              <Link href={`/demo/${d.slug}`}>باز کردن دمو <ArrowLeft /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase" id="features">
        <div className="showcase-copy"><span className="kicker light">ویژگی‌های اثبات‌شده</span><h2>تمرکز روی رابط مدیریتی واقعی</h2><p>ادعاهای صفحه معرفی به قابلیت‌هایی محدود شده‌اند که در همین نسخه و مسیرهای دمو قابل مشاهده‌اند.</p></div>
        <div className="apps-grid">
          {features.map(([Icon, title, text]) => {
            const I = Icon as typeof LayoutDashboard;
            return <article key={String(title)}><span className="app-icon"><I /></span><div><h3>{String(title)}</h3><p>{String(text)}</p></div></article>;
          })}
        </div>
      </section>

      <section className="section" id="tech">
        <div className="center-head"><span className="kicker">فناوری</span><h2>پایه فنی نسخه ۱.۰.۰</h2><p>React 19، Next.js 16، TypeScript 5، Recharts و Vinext در `package.json` ثبت شده‌اند.</p></div>
        <div className="apps-grid">
          {["React 19", "Next.js 16", "TypeScript 5", "Recharts"].map((x) => <article key={x}><span className="app-icon"><Code2 /></span><div><h3>{x}</h3><p>جزء ثبت‌شده در وابستگی‌های پروژه</p></div></article>)}
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-title"><span className="kicker">سوالات متداول</span><h2>قبل از شروع</h2></div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <button className={`faq ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(i)} key={q}>
              <span><b>{q}</b><ChevronDown /></span><p>{a}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="buy" id="buy">
        <div className="buy-glow" />
        <div className="buy-icon"><LayoutDashboard /></div>
        <h2>لورانیک را در دمو بررسی کنید</h2>
        <p>پیش از خرید، مسیرهای تعاملی نسخه فعلی را مشاهده کنید.</p>
        <div><Link className="btn btn-white" href="/demo/commerce">ورود به دمو <ArrowLeft /></Link></div>
      </section>

      <footer>
        <div className="copyright"><span>لورانیک ادمین — نسخه 1.0.0</span><span>React · Next.js · TypeScript</span></div>
      </footer>
    </main>
  );
}
