"use client";

import "../search-premium.css";

import { useMemo, useState } from "react";
import { ArrowUpLeft, Clock3, Command, FileText, FolderKanban, Search, Settings, Sparkles, UserRound, X } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";

const results=[
 {id:1,type:"صفحه",title:"داشبورد تحلیل داده",meta:"Analytics · Dashboard",icon:"page",keywords:"analytics dashboard تحلیل داده"},
 {id:2,type:"کاربر",title:"سارا یوسفی",meta:"Product Designer · آنلاین",icon:"user",keywords:"sara سارا user product designer"},
 {id:3,type:"فایل",title:"release-notes.pdf",meta:"PDF · ۱٫۲ مگابایت · امروز",icon:"file",keywords:"release notes pdf فایل"},
 {id:4,type:"پروژه",title:"Dorsa Intelligence",meta:"ریسک · ۴۲٪ پیشرفت",icon:"project",keywords:"dorsa intelligence project پروژه"},
 {id:5,type:"تنظیمات",title:"حالت تیره و RTL/LTR",meta:"Appearance Settings",icon:"settings",keywords:"dark rtl ltr theme تنظیمات"},
 {id:6,type:"صفحه",title:"مدیریت فایل",meta:"File Manager · Application",icon:"page",keywords:"file manager مدیریت فایل"},
 {id:7,type:"کاربر",title:"آرمان زمانی",meta:"Frontend Engineer · ۴ دقیقه پیش",icon:"user",keywords:"arman آرمان user engineer"},
 {id:8,type:"پروژه",title:"Loraniq Commerce",meta:"در حال اجرا · ۷۸٪",icon:"project",keywords:"commerce project فروشگاه پروژه"},
];
const iconMap={page:Sparkles,user:UserRound,file:FileText,project:FolderKanban,settings:Settings};
const filters=["همه","صفحه","کاربر","فایل","پروژه","تنظیمات"];
export default function SearchPage(){
 const[query,setQuery]=useState("");const[filter,setFilter]=useState("همه");const[recent,setRecent]=useState(["Dorsa","Invoice","Dark mode"]);
 const visible=useMemo(()=>results.filter((item)=>(filter==="همه"||item.type===filter)&&`${item.title} ${item.meta} ${item.keywords}`.toLowerCase().includes(query.toLowerCase())),[query,filter]);
 const submitRecent=(value:string)=>{setQuery(value);setRecent((items)=>[value,...items.filter((item)=>item!==value)].slice(0,4))};
 return <LoraniqShell active="search"><main id="main-content" className="main-content search-page">
  <section className="search-hero" aria-labelledby="page-title"><div><span className="search-kicker"><Command/> Search command center</span><h1 id="page-title">هر چیزی را با یک جستجوی واحد پیدا کن.</h1><p>صفحه، کاربر، پروژه، فایل و تنظیمات در یک تجربه سریع، keyboard-friendly و فارسی‌اول.</p></div><div className="search-shortcut"><span><Command/> K</span><b>جستجوی سریع از هر صفحه</b><small>Command Palette و Search Center روی یک معماری مشترک</small></div></section>
  <section className="search-surface"><div className="search-main-input"><Search/><input autoFocus value={query} onChange={(e)=>setQuery(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"&&query.trim())submitRecent(query.trim())}} placeholder="مثلاً کاربر، فاکتور، پروژه یا تنظیمات..." aria-label="جستجوی سراسری"/>{query&&<button onClick={()=>setQuery("")} aria-label="پاک کردن جستجو"><X/></button>}<kbd>Enter</kbd></div><div className="search-filters">{filters.map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</div>
   {!query&&<div className="search-empty-start"><div className="recent-searches"><header><div><Clock3/><b>جستجوهای اخیر</b></div><button onClick={()=>setRecent([])}>پاک کردن</button></header>{recent.length?<div>{recent.map((item)=><button key={item} onClick={()=>submitRecent(item)}><Clock3/><span>{item}</span><ArrowUpLeft/></button>)}</div>:<p>هنوز جستجوی اخیری ندارید.</p>}</div><div className="quick-searches"><header><Sparkles/><b>میانبرهای پیشنهادی</b></header><button onClick={()=>submitRecent("Dorsa")}><span>پروژه‌های در ریسک</span><small>Projects</small></button><button onClick={()=>submitRecent("Invoice")}><span>فاکتورهای مالی</span><small>Finance</small></button><button onClick={()=>submitRecent("Dark mode")}><span>تنظیم ظاهر</span><small>Settings</small></button></div></div>}
   {query&&<div className="search-results"><header><div><b>{visible.length.toLocaleString("fa-IR")} نتیجه</b><span>برای «{query}»</span></div><small>{filter==="همه"?"همه دسته‌ها":filter}</small></header>{visible.length?<div className="search-result-list">{visible.map((item)=>{const Icon=iconMap[item.icon as keyof typeof iconMap];return <button key={item.id} onClick={()=>submitRecent(item.title)}><span className={`search-result-icon type-${item.icon}`}><Icon/></span><div><b>{item.title}</b><small>{item.meta}</small></div><span className="search-result-type">{item.type}</span><ArrowUpLeft/></button>})}</div>:<div className="search-no-result"><Search/><h2>نتیجه‌ای پیدا نشد</h2><p>عبارت دیگری امتحان کنید یا فیلتر دسته‌بندی را تغییر دهید.</p><Button variant="outline" onClick={()=>{setQuery("");setFilter("همه")}}>بازنشانی جستجو</Button></div>}</div>}
  </section>
 </main></LoraniqShell>
}
