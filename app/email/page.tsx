"use client";

import { useMemo, useState } from "react";
import { Archive, ChevronLeft, Inbox, Mail, MailOpen, MoreHorizontal, Paperclip, PenLine, Reply, Search, Send, Star, Trash2, X } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";

const mailSeed = [
  { id: 1, from: "سارا راد", subject: "Review نهایی Design System", preview: "همه Tokenها رو مرور کردم و دو نکته برای حالت Dark دارم...", time: "۱۰:۲۶", unread: true, starred: true, label: "محصول", body: "سلام،\n\nهمه Tokenهای نسخه جدید رو مرور کردم. ساختار خیلی تمیزتر شده و فقط دو نکته برای کنتراست حالت Dark و فاصله کارت‌های موبایل دارم. فایل Review رو هم ضمیمه کردم.\n\nممنون" },
  { id: 2, from: "آرمان زمانی", subject: "CI / Pages deployment", preview: "Run آخر بدون خطا deploy شد و artifactها هم سالم هستند.", time: "۰۹:۴۱", unread: true, starred: false, label: "فنی", body: "Run آخر بدون خطا deploy شد. Static build، Typecheck و Browser QA همگی سبز هستند. Artifact اسکرین‌شات‌ها هم آماده بررسی بصری است." },
  { id: 3, from: "نگار یوسفی", subject: "گزارش کمپین مهر", preview: "نرخ تبدیل ۱۲٪ رشد کرده و Organic بهترین کانال بوده...", time: "دیروز", unread: false, starred: false, label: "مارکتینگ", body: "گزارش کامل کمپین مهر آماده است. نرخ تبدیل نسبت به دوره قبل ۱۲٪ رشد کرده و Organic Search همچنان باکیفیت‌ترین کانال جذب بوده است." },
  { id: 4, from: "Finance Ops", subject: "بودجه Q4 تأیید شد", preview: "نسخه نهایی بودجه در پوشه مشترک قرار گرفت.", time: "دیروز", unread: false, starred: true, label: "مالی", body: "بودجه Q4 تأیید شد. نسخه نهایی به همراه Breakdown واحدها در پوشه مشترک قرار گرفته است." },
  { id: 5, from: "پارسا حاتمی", subject: "Voice of Customer — هفته ۳", preview: "سه الگوی پرتکرار از مصاحبه مشتریان استخراج شد...", time: "دوشنبه", unread: false, starred: false, label: "مشتری", body: "از مصاحبه‌های این هفته سه الگوی پرتکرار استخراج کردیم: onboarding، سرعت گزارش‌گیری و دسترسی موبایل. خلاصه را برای جلسه محصول آماده کرده‌ام." },
  { id: 6, from: "GitHub", subject: "Security alert resolved", preview: "Dependency advisory has been resolved in main.", time: "یکشنبه", unread: false, starred: false, label: "فنی", body: "The dependency advisory has been resolved on the default branch. No further action is required for this alert." },
];

export default function EmailPage() {
  const [mails, setMails] = useState(mailSeed);
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState("صندوق ورودی");
  const [compose, setCompose] = useState(false);
  const [sent, setSent] = useState(false);
  const [mobileReader, setMobileReader] = useState(false);
  const selected = mails.find((mail) => mail.id === selectedId) ?? mails[0];
  const filtered = useMemo(() => mails.filter((mail) => `${mail.from} ${mail.subject} ${mail.preview}`.toLowerCase().includes(query.toLowerCase()) && (folder !== "ستاره‌دار" || mail.starred)), [mails, query, folder]);
  const openMail = (id: number) => { setSelectedId(id); setMails((items) => items.map((mail) => mail.id === id ? { ...mail, unread: false } : mail)); setMobileReader(true); };
  const toggleStar = (id: number) => setMails((items) => items.map((mail) => mail.id === id ? { ...mail, starred: !mail.starred } : mail));

  return <LoraniqShell active="email">
    <main id="main-content" className="main-content email-page">
      <section className="mail-shell" aria-labelledby="page-title">
        <aside className="mail-sidebar"><Button className="compose-button" onClick={() => { setCompose(true); setSent(false); }}><PenLine /> نوشتن ایمیل</Button><nav>{[{n:"صندوق ورودی",i:Inbox,c:mails.filter((m)=>m.unread).length},{n:"ستاره‌دار",i:Star},{n:"ارسال‌شده",i:Send},{n:"آرشیو",i:Archive},{n:"حذف‌شده",i:Trash2}].map((item)=>{const Icon=item.i;return <button key={item.n} className={folder===item.n?"active":""} onClick={()=>setFolder(item.n)}><Icon/><span>{item.n}</span>{item.c ? <em>{item.c.toLocaleString("fa-IR")}</em> : null}</button>})}</nav><div className="mail-labels"><span>برچسب‌ها</span><button><i className="purple"/>محصول</button><button><i className="green"/>فنی</button><button><i className="amber"/>مارکتینگ</button><button><i className="coral"/>مشتری</button></div></aside>

        <section className={`mail-list ${mobileReader ? "mobile-hidden" : ""}`}><header className="mail-list-head"><div><span>Email workspace</span><h1 id="page-title">{folder}</h1></div><button aria-label="عملیات ایمیل"><MoreHorizontal/></button></header><div className="mail-search"><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="جستجو در ایمیل‌ها..." aria-label="جستجوی ایمیل"/></div><div className="mail-list-actions"><button><MailOpen/> خواندن همه</button><button><Archive/> آرشیو</button></div><div className="mail-items">{filtered.map((mail)=><article key={mail.id} className={`${mail.unread?"unread":""} ${selectedId===mail.id?"selected":""}`}><button className={`mail-star ${mail.starred?"active":""}`} onClick={()=>toggleStar(mail.id)} aria-label={`ستاره ${mail.subject}`}><Star/></button><button className="mail-open" onClick={()=>openMail(mail.id)}><span className="mail-avatar">{mail.from.slice(0,1)}</span><div className="mail-row-copy"><span><b>{mail.from}</b><time>{mail.time}</time></span><h2>{mail.subject}</h2><p>{mail.preview}</p><small>{mail.label}</small></div></button></article>)}</div>{filtered.length===0&&<div className="mail-empty"><Mail/><h2>ایمیلی پیدا نشد</h2><p>عبارت جستجو یا پوشه را تغییر بده.</p></div>}</section>

        <article className={`mail-reader ${mobileReader ? "mobile-open" : ""}`}><header><button className="mail-mobile-back" onClick={()=>setMobileReader(false)} aria-label="بازگشت به ایمیل‌ها"><ChevronLeft/></button><div className="mail-reader-actions"><button aria-label="آرشیو"><Archive/></button><button aria-label="حذف"><Trash2/></button><button aria-label="بیشتر"><MoreHorizontal/></button></div></header><div className="mail-reader-body"><div className="mail-subject-row"><div><span className="mail-label-chip">{selected.label}</span><h2>{selected.subject}</h2></div><button className={selected.starred?"active":""} onClick={()=>toggleStar(selected.id)}><Star/></button></div><div className="mail-sender"><span className="mail-avatar large">{selected.from.slice(0,1)}</span><div><b>{selected.from}</b><small>به: حسن مجتهدی &lt;hassan@loraniq.dev&gt;</small></div><time>{selected.time}</time></div><div className="mail-body-text">{selected.body.split("\n").map((line,index)=><p key={index}>{line || " "}</p>)}</div><div className="mail-attachment"><Paperclip/><div><b>review-notes.pdf</b><small>۲٫۴ MB · PDF</small></div><Button size="sm" variant="outline">دانلود</Button></div><div className="mail-reply-actions"><Button variant="outline"><Reply/> پاسخ</Button><Button variant="outline"><ChevronLeft/> فوروارد</Button></div></div></article>
      </section>

      {compose && <div className="compose-modal" role="dialog" aria-label="نوشتن ایمیل"><div className="compose-window"><header><b>پیام جدید</b><button onClick={()=>setCompose(false)} aria-label="بستن نوشتن ایمیل"><X/></button></header>{sent?<div className="compose-success"><Send/><h2>ایمیل ارسال شد</h2><p>Success state واقعی برای عملیات ارسال.</p><Button onClick={()=>setCompose(false)}>بستن</Button></div>:<div className="compose-fields"><label><span>به</span><input placeholder="name@company.com" dir="ltr"/></label><label><span>موضوع</span><input placeholder="موضوع ایمیل"/></label><textarea placeholder="متن پیام..." rows={10}/><footer><div><button><Paperclip/></button></div><Button onClick={()=>setSent(true)}><Send/> ارسال</Button></footer></div>}</div></div>}
    </main>
  </LoraniqShell>;
}
