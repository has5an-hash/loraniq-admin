"use client";

import "../invoice-premium.css";

import { useMemo, useState } from "react";
import { Banknote, CheckCircle2, Download, FileText, MoreHorizontal, Plus, Search, Send, WalletCards } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const invoices=[
{id:"INV-2048",client:"Northstar Labs",amount:"۱۸۶٫۴ م",raw:186.4,status:"پرداخت‌شده",date:"۲۱ مهر",due:"۲۵ مهر",items:[{n:"طراحی داشبورد",q:1,p:"۹۸٫۰ م"},{n:"توسعه کامپوننت‌ها",q:1,p:"۷۲٫۴ م"},{n:"QA و تحویل",q:1,p:"۱۶٫۰ م"}]},
{id:"INV-2047",client:"Atlas Group",amount:"۹۴٫۸ م",raw:94.8,status:"در انتظار",date:"۱۹ مهر",due:"۲۹ مهر",items:[{n:"نسخه موبایل",q:1,p:"۶۴٫۸ م"},{n:"تحقیق UX",q:1,p:"۳۰٫۰ م"}]},
{id:"INV-2046",client:"Vista Studio",amount:"۱۲۸٫۰ م",raw:128,status:"سررسید گذشته",date:"۱۵ مهر",due:"۲۰ مهر",items:[{n:"Brand OS",q:1,p:"۱۲۸٫۰ م"}]},
{id:"INV-2045",client:"Dorsa AI",amount:"۲۴۸٫۵ م",raw:248.5,status:"پیش‌نویس",date:"۱۴ مهر",due:"۳۰ مهر",items:[{n:"Analytics platform",q:1,p:"۱۸۸٫۵ م"},{n:"Integration",q:1,p:"۶۰٫۰ م"}]},
{id:"INV-2044",client:"Lumen Finance",amount:"۷۶٫۲ م",raw:76.2,status:"پرداخت‌شده",date:"۱۰ مهر",due:"۱۸ مهر",items:[{n:"Finance module",q:1,p:"۷۶٫۲ م"}]},
];

export default function InvoicePage(){
 const[selectedId,setSelectedId]=useState("INV-2048");const[query,setQuery]=useState("");const[filter,setFilter]=useState("همه");const[sent,setSent]=useState(false);
 const selected=invoices.find((item)=>item.id===selectedId)??invoices[0];
 const visible=useMemo(()=>invoices.filter((item)=>(filter==="همه"||item.status===filter)&&`${item.id} ${item.client}`.toLowerCase().includes(query.toLowerCase())),[query,filter]);
 const paid=invoices.filter((item)=>item.status==="پرداخت‌شده").reduce((s,i)=>s+i.raw,0);
 return <LoraniqShell active="invoice"><main id="main-content" className="main-content invoice-page">
  <section className="invoice-hero" aria-labelledby="page-title"><div><span className="invoice-kicker"><FileText/> Billing desk</span><h1 id="page-title">فاکتور، دریافت و وضعیت پرداخت در یک نمای مالی شفاف.</h1><p>لیست فاکتورها، فیلتر وضعیت، پیش‌نمایش کامل، آیتم‌ها و عملیات ارسال برای یک workflow واقعی مالی.</p></div><div className="invoice-hero-stats"><div><span>دریافت‌شده</span><strong>{paid.toLocaleString("fa-IR")} م</strong><small>این ماه</small></div><div><span>در انتظار</span><strong>۹۴٫۸ م</strong><small>۱ فاکتور</small></div></div></section>
  {sent&&<div className="invoice-sent"><CheckCircle2/><div><b>فاکتور برای مشتری ارسال شد</b><span>وضعیت ارسال با موفقیت ثبت شد.</span></div><button onClick={()=>setSent(false)}>بستن</button></div>}
  <section className="invoice-shell"><aside className="invoice-list"><div className="invoice-list-toolbar"><div className="invoice-search"><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="جستجوی فاکتور..." aria-label="جستجوی فاکتور"/></div><Button size="icon" aria-label="فاکتور جدید"><Plus/></Button></div><div className="invoice-filters">{["همه","پرداخت‌شده","در انتظار","سررسید گذشته","پیش‌نویس"].map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</div><div className="invoice-items">{visible.map((invoice)=><button key={invoice.id} className={selectedId===invoice.id?"active":""} onClick={()=>setSelectedId(invoice.id)}><span className="invoice-icon"><FileText/></span><div><span><b>{invoice.id}</b><time>{invoice.date}</time></span><h2>{invoice.client}</h2><footer><strong>{invoice.amount}</strong><em className={invoice.status==="پرداخت‌شده"?"paid":invoice.status==="سررسید گذشته"?"late":invoice.status==="در انتظار"?"pending":"draft"}>{invoice.status}</em></footer></div></button>)}</div></aside>
   <article className="invoice-preview"><header><div><span>پیش‌نمایش فاکتور</span><h2>{selected.id}</h2></div><div className="invoice-preview-actions"><Button variant="outline"><Download/> دانلود PDF</Button><Button onClick={()=>setSent(true)}><Send/> ارسال</Button><DropdownMenu><DropdownMenuTrigger asChild><button aria-label="عملیات فاکتور"><MoreHorizontal/></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>ویرایش</DropdownMenuItem><DropdownMenuItem>کپی لینک پرداخت</DropdownMenuItem><DropdownMenuItem>ثبت پرداخت</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></header><div className="invoice-paper"><div className="invoice-brand-row"><div><span className="invoice-mark">LQ</span><div><b>Loraniq Studio</b><small>تهران · ایران</small></div></div><div><span>فاکتور</span><strong>{selected.id}</strong></div></div><div className="invoice-parties"><div><span>صورتحساب برای</span><b>{selected.client}</b><small>billing@client.example</small></div><div><span>تاریخ صدور</span><b>{selected.date}</b><span>سررسید</span><b>{selected.due}</b></div></div><div className="invoice-table"><div className="invoice-table-head"><span>شرح</span><span>تعداد</span><span>مبلغ</span></div>{selected.items.map((item)=><div className="invoice-line" key={item.n}><span>{item.n}</span><span>{item.q.toLocaleString("fa-IR")}</span><strong>{item.p}</strong></div>)}</div><div className="invoice-totals"><div><span>جمع جزء</span><b>{selected.amount}</b></div><div><span>مالیات</span><b>۰</b></div><div className="grand"><span>مبلغ نهایی</span><strong>{selected.amount}</strong></div></div><div className="invoice-payment"><WalletCards/><div><b>وضعیت پرداخت</b><span>{selected.status}</span></div><em className={selected.status==="پرداخت‌شده"?"paid":selected.status==="سررسید گذشته"?"late":"pending"}>{selected.status}</em></div><footer className="invoice-note"><Banknote/><p>با تشکر از همکاری شما. اطلاعات پرداخت و شرایط قرارداد در نسخه رسمی فاکتور درج می‌شود.</p></footer></div></article>
  </section>
 </main></LoraniqShell>
}
