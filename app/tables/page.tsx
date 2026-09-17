"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Check, ChevronDown, Columns3, Filter, MoreHorizontal, RefreshCw, Search, SlidersHorizontal, Trash2, UsersRound, XCircle } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const rows = [
  { id: 1, name: "آرمان زمانی", email: "arman@loraniq.dev", company: "اُربیتا", status: "فعال", plan: "Enterprise", value: 128400000, last: "۲ دقیقه پیش" },
  { id: 2, name: "سارا راد", email: "sara@novin.io", company: "نوین تک", status: "فعال", plan: "Growth", value: 86700000, last: "۱۸ دقیقه پیش" },
  { id: 3, name: "پارسا حاتمی", email: "parsa@atlas.co", company: "اطلس", status: "در انتظار", plan: "Growth", value: 59400000, last: "۱ ساعت پیش" },
  { id: 4, name: "مهسا فرهمند", email: "mahsa@pixel.ir", company: "پیکسل", status: "فعال", plan: "Enterprise", value: 149200000, last: "۳ ساعت پیش" },
  { id: 5, name: "نیما شفیعی", email: "nima@rahnama.app", company: "راهنما", status: "غیرفعال", plan: "Starter", value: 21400000, last: "دیروز" },
  { id: 6, name: "نگار یوسفی", email: "negar@dorsa.ai", company: "درسا", status: "فعال", plan: "Growth", value: 73100000, last: "دیروز" },
  { id: 7, name: "علی مهران", email: "ali@hamrah.dev", company: "همراه", status: "در انتظار", plan: "Starter", value: 38200000, last: "۲ روز پیش" },
  { id: 8, name: "آوا کریمی", email: "ava@vista.studio", company: "ویستا", status: "فعال", plan: "Enterprise", value: 164800000, last: "۲ روز پیش" },
  { id: 9, name: "سام قاسمی", email: "sam@hexa.co", company: "هگزا", status: "غیرفعال", plan: "Starter", value: 18700000, last: "۳ روز پیش" },
  { id: 10, name: "دریا احمدی", email: "darya@lumen.ir", company: "لومن", status: "فعال", plan: "Growth", value: 92500000, last: "۴ روز پیش" },
];

const pageSize = 6;
const money = (value: number) => `${new Intl.NumberFormat("fa-IR").format(value / 1_000_000)} م`;

export default function TablesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("همه");
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [columns, setColumns] = useState({ company: true, plan: true, value: true, last: true });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = rows.filter((row) => (status === "همه" || row.status === status) && (!normalized || `${row.name} ${row.email} ${row.company}`.toLowerCase().includes(normalized)));
    return [...result].sort((a, b) => sortDesc ? b.value - a.value : a.value - b.value);
  }, [query, status, sortDesc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((row) => selected.includes(row.id));

  const toggleRow = (id: number) => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const toggleVisible = () => setSelected((items) => allVisibleSelected ? items.filter((id) => !visibleRows.some((row) => row.id === id)) : Array.from(new Set([...items, ...visibleRows.map((row) => row.id)])));
  const refresh = () => { setError(false); setLoading(true); window.setTimeout(() => setLoading(false), 700); };

  return (
    <LoraniqShell active="executive">
      <main id="main-content" className="main-content table-page">
        <section className="table-hero" aria-labelledby="page-title">
          <div><span className="table-kicker"><SlidersHorizontal /> Data workspace</span><h1 id="page-title">جدول داده‌ای که برای کار واقعی ساخته شده.</h1><p>جستجو، مرتب‌سازی، فیلتر، انتخاب چندتایی و عملیات گروهی بدون شلوغی بصری؛ در موبایل هم داده به کارت‌های قابل‌اسکن تبدیل می‌شود.</p></div>
          <div className="table-hero-stats"><div><span>رکورد فعال</span><strong>۸٬۴۲۶</strong><small>+۱۲٫۴٪ این ماه</small></div><div><span>انتخاب فعلی</span><strong>{selected.length.toLocaleString("fa-IR")}</strong><small>برای عملیات گروهی</small></div></div>
        </section>

        <section className="data-panel">
          <div className="data-toolbar">
            <div className="data-search"><Search /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="نام، ایمیل یا شرکت..." aria-label="جستجوی جدول" /></div>
            <div className="data-toolbar-actions">
              <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><Filter /> {status}<ChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{["همه","فعال","در انتظار","غیرفعال"].map((item) => <DropdownMenuItem key={item} onClick={() => { setStatus(item); setPage(1); }}>{item}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
              <Button variant="outline" onClick={() => setSortDesc((value) => !value)}><ArrowDownUp /> {sortDesc ? "ارزش بیشتر" : "ارزش کمتر"}</Button>
              <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><Columns3 /> ستون‌ها</Button></DropdownMenuTrigger><DropdownMenuContent align="end">{Object.entries(columns).map(([key, value]) => <DropdownMenuCheckboxItem key={key} checked={value} onCheckedChange={(checked) => setColumns((items) => ({...items,[key]:Boolean(checked)}))}>{({company:"شرکت",plan:"پلن",value:"ارزش",last:"آخرین فعالیت"} as Record<string,string>)[key]}</DropdownMenuCheckboxItem>)}</DropdownMenuContent></DropdownMenu>
              <Button variant="outline" onClick={refresh} disabled={loading}><RefreshCw className={loading ? "animate-spin" : ""} /> تازه‌سازی</Button>
            </div>
          </div>

          {selected.length > 0 && <div className="bulk-bar"><div><span className="bulk-check"><Check /></span><b>{selected.length.toLocaleString("fa-IR")} ردیف انتخاب شده</b><span>عملیات گروهی آماده است.</span></div><div><Button size="sm" variant="outline">تغییر وضعیت</Button><Button size="sm" variant="outline" className="bulk-danger" onClick={() => setSelected([])}><Trash2 /> حذف انتخاب</Button></div></div>}

          {error ? <div className="data-state error"><XCircle /><h2>دریافت داده با خطا روبه‌رو شد</h2><p>وضعیت خطا در طراحی جدول هم پوشش داده شده است.</p><Button onClick={refresh}>تلاش دوباره</Button></div> : loading ? <div className="table-skeleton" aria-label="در حال بارگذاری"><i/><i/><i/><i/><i/></div> : filtered.length === 0 ? <div className="data-state"><UsersRound /><h2>رکوردی مطابق فیلتر پیدا نشد</h2><p>فیلترها را تغییر بده یا جستجو را پاک کن.</p><Button variant="outline" onClick={() => { setQuery(""); setStatus("همه"); }}>پاک‌کردن فیلترها</Button></div> : <>
            <div className="desktop-table-wrap"><table className="premium-table"><thead><tr><th><button className={`row-check ${allVisibleSelected ? "checked" : ""}`} onClick={toggleVisible} aria-label="انتخاب همه ردیف‌های صفحه">{allVisibleSelected && <Check />}</button></th><th>مشتری</th>{columns.company&&<th>شرکت</th>}<th>وضعیت</th>{columns.plan&&<th>پلن</th>}{columns.value&&<th>ارزش مشتری</th>}{columns.last&&<th>آخرین فعالیت</th>}<th /></tr></thead><tbody>{visibleRows.map((row) => <tr key={row.id} className={selected.includes(row.id) ? "selected" : ""}><td><button className={`row-check ${selected.includes(row.id) ? "checked" : ""}`} onClick={() => toggleRow(row.id)} aria-label={`انتخاب ${row.name}`}>{selected.includes(row.id)&&<Check/>}</button></td><td><div className="customer-cell"><span>{row.name.slice(0,1)}</span><div><b>{row.name}</b><small>{row.email}</small></div></div></td>{columns.company&&<td>{row.company}</td>}<td><span className={`status-chip ${row.status === "فعال" ? "success" : row.status === "در انتظار" ? "waiting" : "muted"}`}>{row.status}</span></td>{columns.plan&&<td><span className="plan-chip">{row.plan}</span></td>}{columns.value&&<td><b>{money(row.value)}</b></td>}{columns.last&&<td className="muted-cell">{row.last}</td>}<td><DropdownMenu><DropdownMenuTrigger asChild><button className="row-menu" aria-label={`عملیات ${row.name}`}><MoreHorizontal /></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>مشاهده پروفایل</DropdownMenuItem><DropdownMenuItem>ویرایش رکورد</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem variant="destructive">حذف</DropdownMenuItem></DropdownMenuContent></DropdownMenu></td></tr>)}</tbody></table></div>
            <div className="mobile-data-cards">{visibleRows.map((row) => <article key={row.id} className={selected.includes(row.id) ? "selected" : ""}><div className="mobile-data-head"><div className="customer-cell"><span>{row.name.slice(0,1)}</span><div><b>{row.name}</b><small>{row.email}</small></div></div><button className={`row-check ${selected.includes(row.id) ? "checked" : ""}`} onClick={() => toggleRow(row.id)} aria-label={`انتخاب ${row.name}`}>{selected.includes(row.id)&&<Check/>}</button></div><div className="mobile-data-grid"><div><span>شرکت</span><b>{row.company}</b></div><div><span>پلن</span><b>{row.plan}</b></div><div><span>ارزش</span><b>{money(row.value)}</b></div><div><span>وضعیت</span><span className={`status-chip ${row.status === "فعال" ? "success" : row.status === "در انتظار" ? "waiting" : "muted"}`}>{row.status}</span></div></div></article>)}</div>
          </>}

          <div className="table-footer"><div><span>نمایش</span><b>{filtered.length ? ((currentPage-1)*pageSize+1).toLocaleString("fa-IR") : "۰"}–{Math.min(currentPage*pageSize,filtered.length).toLocaleString("fa-IR")}</b><span>از</span><b>{filtered.length.toLocaleString("fa-IR")}</b></div><div className="pager"><Button size="sm" variant="outline" disabled={currentPage===1} onClick={() => setPage((p) => Math.max(1,p-1))}>قبلی</Button><span>صفحه {currentPage.toLocaleString("fa-IR")} از {totalPages.toLocaleString("fa-IR")}</span><Button size="sm" variant="outline" disabled={currentPage===totalPages} onClick={() => setPage((p) => Math.min(totalPages,p+1))}>بعدی</Button></div></div>
          <button className="error-demo" onClick={() => setError(true)}>نمایش وضعیت خطا برای QA</button>
        </section>
      </main>
    </LoraniqShell>
  );
}
