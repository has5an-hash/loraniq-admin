"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Command,
  CreditCard,
  FileText,
  GraduationCap,
  Grid2X2,
  HelpCircle,
  Home,
  Inbox,
  Layers3,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Sun,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import "./dashboard.css";

type DemoSlug =
  | "commerce"
  | "analytics"
  | "projects"
  | "finance"
  | "crm"
  | "academy"
  | "calendar"
  | "inbox"
  | "components"
  | "settings";

type ModuleItem = {
  slug: DemoSlug;
  label: string;
  icon: LucideIcon;
};

const modules: ModuleItem[] = [
  { slug: "commerce", label: "تجارت", icon: ShoppingBag },
  { slug: "analytics", label: "تحلیل داده", icon: TrendingUp },
  { slug: "projects", label: "پروژه‌ها", icon: Layers3 },
  { slug: "finance", label: "امور مالی", icon: WalletCards },
  { slug: "crm", label: "مشتریان", icon: Users },
  { slug: "academy", label: "آکادمی", icon: GraduationCap },
  { slug: "calendar", label: "تقویم", icon: CalendarDays },
  { slug: "inbox", label: "پیام‌ها", icon: Inbox },
  { slug: "components", label: "کامپوننت‌ها", icon: Grid2X2 },
  { slug: "settings", label: "تنظیمات", icon: Settings },
];

const meta: Record<DemoSlug, { title: string; sub: string }> = {
  commerce: { title: "داشبورد تجارت", sub: "نمونه رابط فروشگاه و سفارش‌ها" },
  analytics: { title: "تحلیل داده", sub: "نمونه شاخص‌ها و روندهای تحلیلی" },
  projects: { title: "مدیریت پروژه‌ها", sub: "نمونه برد پروژه و پیشرفت تیم" },
  finance: { title: "امور مالی", sub: "نمونه جریان نقدی، درآمد و هزینه" },
  crm: { title: "مدیریت مشتریان", sub: "نمونه سرنخ‌ها و پیگیری ارتباطات" },
  academy: { title: "آکادمی آنلاین", sub: "نمونه دوره‌ها و کاربران آموزشی" },
  calendar: { title: "تقویم و برنامه‌ریزی", sub: "نمونه رویدادها و جلسه‌های تیم" },
  inbox: { title: "صندوق پیام", sub: "نمونه مکالمه‌ها و درخواست‌ها" },
  components: { title: "کتابخانه کامپوننت‌ها", sub: "نمونه اجزای رابط کاربری لورانیک" },
  settings: { title: "تنظیمات حساب", sub: "نمونه پروفایل، اعلان و ترجیحات" },
};

const trend = [
  { n: "شنبه", v: 24, p: 18 },
  { n: "یکشنبه", v: 31, p: 23 },
  { n: "دوشنبه", v: 27, p: 21 },
  { n: "سه‌شنبه", v: 45, p: 29 },
  { n: "چهارشنبه", v: 39, p: 33 },
  { n: "پنجشنبه", v: 57, p: 38 },
  { n: "جمعه", v: 64, p: 45 },
];

const orders = [
  { id: "#LR-8421", name: "آرمان رضایی", item: "هدفون بی‌سیم", date: "۱۸ شهریور، ۱۰:۳۵", price: "۳٬۸۴۰٬۰۰۰", status: "پرداخت‌شده" },
  { id: "#LR-8420", name: "سارا احمدی", item: "ساعت هوشمند", date: "۱۸ شهریور، ۰۹:۲۱", price: "۵٬۲۱۰٬۰۰۰", status: "در انتظار" },
  { id: "#LR-8419", name: "مهدی کریمی", item: "کیبورد مکانیکی", date: "۱۷ شهریور، ۲۲:۴۰", price: "۲٬۹۸۰٬۰۰۰", status: "ارسال‌شده" },
  { id: "#LR-8418", name: "نیلوفر صالحی", item: "ماوس ارگونومیک", date: "۱۷ شهریور، ۲۰:۱۲", price: "۱٬۴۵۰٬۰۰۰", status: "پرداخت‌شده" },
];

function Stat({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  tone: string;
}) {
  return (
    <article className="a-stat">
      <span className={tone}><Icon /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <em><TrendingUp /> {delta} نمونه</em>
      </div>
    </article>
  );
}

function Orders() {
  return (
    <section className="a-card orders">
      <header>
        <div><h3>سفارش‌های نمونه</h3><p>داده‌های نمایشی رابط فروشگاه</p></div>
        <button type="button" className="soft-btn">مشاهده همه <ChevronLeft /></button>
      </header>
      <div className="table-wrap">
        <table>
          <thead><tr><th>سفارش</th><th>مشتری</th><th>محصول</th><th>تاریخ</th><th>مبلغ (تومان)</th><th>وضعیت</th></tr></thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td><b>{order.id}</b></td>
                <td><span className={`customer c${index}`}>{order.name[0]}</span>{order.name}</td>
                <td>{order.item}</td>
                <td>{order.date}</td>
                <td><b>{order.price}</b></td>
                <td><em className={`status s${index}`}>{order.status}</em></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Commerce() {
  return (
    <>
      <div className="a-stats">
        <Stat icon={CircleDollarSign} label="درآمد نمونه" value="۸۴۲٫۶ مـ" delta="۱۲٫۵٪" tone="purple" />
        <Stat icon={ShoppingBag} label="سفارش نمونه" value="۲٬۸۴۰" delta="۸٫۲٪" tone="blue" />
        <Stat icon={Users} label="مشتری نمونه" value="۱٬۲۴۸" delta="۶٫۸٪" tone="green" />
        <Stat icon={Package} label="میانگین سبد" value="۲٫۹۶ مـ" delta="۴٫۱٪" tone="orange" />
      </div>
      <div className="a-grid">
        <section className="a-card chart-wide">
          <header><div><h3>روند نمونه</h3><p>مقایسه داده نمایشی هفتگی</p></div><select aria-label="بازه گزارش"><option>۷ روز اخیر</option><option>۳۰ روز اخیر</option></select></header>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trend}>
              <defs><linearGradient id="pv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7367f0" stopOpacity=".35"/><stop offset="1" stopColor="#7367f0" stopOpacity="0"/></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="var(--a-line)" />
              <XAxis dataKey="n" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="#7367f0" strokeWidth={3} fill="url(#pv)" />
              <Area type="monotone" dataKey="p" stroke="#42c7a5" strokeWidth={2} fill="transparent" strokeDasharray="6 5" />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section className="a-card donut">
          <header><div><h3>منابع فروش نمونه</h3><p>سهم کانال‌های نمایشی</p></div><button type="button" aria-label="گزینه‌های نمودار">•••</button></header>
          <ResponsiveContainer width="100%" height={185}>
            <PieChart><Pie data={[{v:48},{v:27},{v:16},{v:9}]} dataKey="v" innerRadius={58} outerRadius={78} paddingAngle={4}>{["#7367f0","#45c7a6","#ff9f67","#5b93e8"].map((color)=><Cell key={color} fill={color}/>)}</Pie></PieChart>
          </ResponsiveContainer>
          <div className="donut-center"><b>۴۸٪</b><small>فروشگاه</small></div>
          <div className="legend"><span><i/>فروشگاه ۴۸٪</span><span><i/>شبکه اجتماعی ۲۷٪</span><span><i/>مارکت‌پلیس ۱۶٪</span><span><i/>سایر ۹٪</span></div>
        </section>
      </div>
      <Orders />
    </>
  );
}

function Analytics() {
  return (
    <>
      <div className="a-stats">
        <Stat icon={Users} label="کاربران نمونه" value="۱۸٬۲۹۴" delta="۹٫۶٪" tone="purple" />
        <Stat icon={TrendingUp} label="نرخ تبدیل نمونه" value="۷٫۸٪" delta="۱٫۴٪" tone="green" />
        <Stat icon={FileText} label="بازدید نمونه" value="۹۶٫۲K" delta="۱۴٫۳٪" tone="blue" />
        <Stat icon={CreditCard} label="ارزش نمونه" value="۶۴۰ هـ" delta="۳٫۹٪" tone="orange" />
      </div>
      <div className="a-grid">
        <section className="a-card chart-wide">
          <header><div><h3>رفتار کاربران</h3><p>داده نمایشی روزانه</p></div></header>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trend}>
              <CartesianGrid vertical={false} stroke="var(--a-line)" />
              <XAxis dataKey="n" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="v" fill="#7367f0" radius={[6,6,0,0]} />
              <Bar dataKey="p" fill="#dcd8ff" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="a-card realtime">
          <header><h3>فعالیت نمونه</h3></header>
          <strong>۱٬۲۸۴</strong><p>کاربر نمایشی</p>
          <div className="pulse-map">{Array.from({ length: 22 }).map((_, index) => <i key={index} />)}</div>
          <span className="live"><i /> بروزرسانی نمایشی</span>
        </section>
      </div>
      <Orders />
    </>
  );
}

function Projects() {
  const cards = [
    { t: "بازطراحی اپلیکیشن", p: 78, tag: "طراحی محصول", color: "purple" },
    { t: "کمپین پاییز", p: 54, tag: "بازاریابی", color: "orange" },
    { t: "داشبورد مدیران", p: 92, tag: "توسعه", color: "green" },
  ];
  return (
    <div className="project-board">
      {["برنامه‌ریزی", "در حال انجام", "بازبینی"].map((column, columnIndex) => (
        <section key={column}>
          <header><b>{column}</b><span>{columnIndex + 2}</span><Plus /></header>
          {cards.slice(columnIndex ? columnIndex - 1 : 0, columnIndex ? 3 : 2).map((card, index) => (
            <article className="task" key={`${column}-${card.t}`}>
              <span className={card.color}>{card.tag}</span><h3>{card.t}</h3>
              <p>کارت نمونه برای نمایش ساختار مدیریت پروژه.</p>
              <div className="progress"><i style={{ width: `${card.p}%` }} /></div><small>{card.p}٪ تکمیل نمونه</small>
              <footer><div className="mini-faces"><i>ن</i><i>ع</i><i>م</i></div><span><MessageCircle /> {index + 3}</span></footer>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}

function CalendarView() {
  return (
    <section className="a-card calendar-view">
      <header><div><h3>شهریور ۱۴۰۵</h3><p>تقویم نمایشی رابط</p></div><div><button type="button" aria-label="ماه بعد"><ChevronRight/></button><button type="button">امروز</button><button type="button" aria-label="ماه قبل"><ChevronLeft/></button></div></header>
      <div className="week">
        {["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"].map((day)=><b key={day}>{day}</b>)}
        {Array.from({length:35}).map((_,index)=><span className={index===17?"today":""} key={index}><i>{index<2?29+index:index-1}</i>{[7,10,17,23].includes(index)&&<em>{index===17?"جلسه تیم محصول":"بررسی پروژه"}</em>}</span>)}
      </div>
    </section>
  );
}

function Components() {
  return (
    <div className="component-grid">
      <section className="a-card"><header><h3>دکمه‌ها و وضعیت‌ها</h3></header><div className="component-row"><button type="button" className="primary-btn">عملیات اصلی</button><button type="button" className="soft-btn">دکمه ثانویه</button><button type="button" className="danger-btn">حذف</button><span className="status s0">موفق</span><span className="status s1">در انتظار</span></div></section>
      <section className="a-card"><header><h3>ورودی‌ها</h3></header><div className="form-row"><label>نام کامل<input placeholder="مثلاً نگار احمدی"/></label><label>نقش کاربر<select><option>مدیر محصول</option></select></label><label className="toggle-label"><span>اعلان‌ها</span><i className="toggle"/></label></div></section>
      <section className="a-card"><header><h3>هشدارها و پیام‌ها</h3></header><div className="alerts"><p className="success"><CheckCircle2/> تغییرات نمونه ذخیره شد.</p><p className="info"><HelpCircle/> نسخه محصول ۱.۰.۰ است.</p></div></section>
      <Orders />
    </div>
  );
}

function Generic({ slug }: { slug: DemoSlug }) {
  if (slug === "projects") return <Projects />;
  if (slug === "calendar") return <CalendarView />;
  if (slug === "components") return <Components />;

  const labels: Record<"finance" | "crm" | "academy" | "inbox" | "settings", string[]> = {
    finance: ["موجودی نمونه", "درآمد نمونه", "هزینه نمونه", "فاکتور نمونه"],
    crm: ["مشتری نمونه", "سرنخ نمونه", "نرخ موفقیت", "پیگیری نمونه"],
    academy: ["دانشجوی نمونه", "دوره نمونه", "درآمد نمونه", "رضایت نمونه"],
    inbox: ["پیام نمونه", "پاسخ نمونه", "زمان پاسخ", "رضایت نمونه"],
    settings: ["امنیت حساب", "اعلان‌ها", "اعضای تیم", "فضای مصرفی"],
  };

  const safeSlug = slug === "finance" || slug === "crm" || slug === "academy" || slug === "inbox" || slug === "settings" ? slug : "finance";
  const icons: LucideIcon[] = [WalletCards, TrendingUp, Users, FileText];
  const values = ["۱۲٫۸K", "۸۴٪", "۲٬۴۸۰", "۲۴"];
  const tones = ["purple", "green", "blue", "orange"];

  return (
    <>
      <div className="a-stats">
        {labels[safeSlug].map((label, index) => <Stat key={label} icon={icons[index]} label={label} value={values[index]} delta={`${12-index*2}٪`} tone={tones[index]} />)}
      </div>
      <div className="a-grid">
        <section className="a-card chart-wide"><header><div><h3>گزارش نمونه</h3><p>روند هفت روز نمایشی</p></div></header><ResponsiveContainer width="100%" height={300}><AreaChart data={trend}><CartesianGrid vertical={false} stroke="var(--a-line)"/><XAxis dataKey="n" axisLine={false} tickLine={false}/><YAxis hide/><Tooltip/><Area type="monotone" dataKey="v" stroke="#7367f0" strokeWidth={3} fill="url(#pv)"/></AreaChart></ResponsiveContainer></section>
        <section className="a-card quick-list"><header><h3>فعالیت‌های نمونه</h3></header>{orders.map((order,index)=><div key={order.id}><span className={`customer c${index}`}>{order.name[0]}</span><p><b>{order.name}</b><small>{order.date}</small></p><CheckCircle2/></div>)}</section>
      </div>
      <Orders />
    </>
  );
}

export default function AdminDemo({ slug }: { slug: string }) {
  const currentSlug = (modules.some((item) => item.slug === slug) ? slug : "commerce") as DemoSlug;
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const currentMeta = meta[currentSlug];
  const content = useMemo(() => {
    if (currentSlug === "commerce") return <Commerce />;
    if (currentSlug === "analytics") return <Analytics />;
    return <Generic slug={currentSlug} />;
  }, [currentSlug]);

  return (
    <main dir="rtl" className={`admin ${dark ? "a-dark" : ""}`}>
      <aside className={`admin-side ${mobile ? "show" : ""}`}>
        <div className="admin-brand"><span>L</span><div><b>لورانیک</b><small>نسخه ۱.۰.۰</small></div><button type="button" onClick={() => setMobile(false)} aria-label="بستن منو"><X/></button></div>
        <nav>
          <small>فضای کاری</small>
          <Link href="/demo/commerce" className={currentSlug === "commerce" ? "active" : ""}><LayoutDashboard/>پیشخوان</Link>
          {modules.slice(1,6).map((item) => <Link href={`/demo/${item.slug}`} className={currentSlug === item.slug ? "active" : ""} key={item.slug}><item.icon/>{item.label}</Link>)}
          <small>ابزارها</small>
          {modules.slice(6).map((item) => <Link href={`/demo/${item.slug}`} className={currentSlug === item.slug ? "active" : ""} key={item.slug}><item.icon/>{item.label}{item.slug === "inbox" && <em>۶</em>}</Link>)}
        </nav>
        <div className="help-card"><HelpCircle/><b>راهنمای لورانیک</b><p>راهنمای نصب و شخصی‌سازی داخل بسته محصول است.</p></div>
        <Link className="back-link" href="/"><Home/> بازگشت به لندینگ</Link>
      </aside>

      <section className="admin-page">
        <header className="admin-top">
          <button type="button" className="admin-menu" onClick={() => setMobile(true)} aria-label="باز کردن منو"><Menu/></button>
          <label className="admin-search"><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجو در لورانیک..."/><kbd><Command/> K</kbd></label>
          <div className="top-actions"><button type="button" onClick={() => setDark(!dark)} aria-label="تغییر تم">{dark ? <Sun/> : <Moon/>}</button><button type="button" className="bell" aria-label="اعلان‌ها"><Bell/><i/></button><span className="top-user"><span>کاربر نمونه<small>مدیر محصول</small></span><i>ل</i></span></div>
        </header>

        <div className="admin-content">
          <div className="page-head"><div><p>لورانیک / {currentMeta.title}</p><h1>{currentMeta.title}</h1><span>{currentMeta.sub}</span></div><div><button type="button" className="soft-btn"><CalendarDays/> بازه نمونه</button><button type="button" className="primary-btn"><Plus/> عملیات نمونه</button></div></div>
          {query && <div className="search-result">نتیجه نمایشی برای «{query}» در {currentMeta.title}</div>}
          {content}
        </div>
      </section>
    </main>
  );
}
