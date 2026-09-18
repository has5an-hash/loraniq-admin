"use client";

import "../app-breadth-premium.css";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, CircleAlert, Clock3, GripVertical, MoreHorizontal, Plus, Search, Sparkles, Tag, UsersRound } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const seed=[
{id:1,title:"نهایی‌کردن checkout responsive",column:"todo",priority:"بالا",tag:"Commerce",owner:"سارا",due:"امروز"},
{id:2,title:"بازبینی ساختار Notification Center",column:"todo",priority:"متوسط",tag:"Core",owner:"آرمان",due:"۲۵ مهر"},
{id:3,title:"بهینه‌سازی query داشبورد مالی",column:"doing",priority:"بالا",tag:"Finance",owner:"پارسا",due:"۲۴ مهر"},
{id:4,title:"تست RTL تقویم در تبلت",column:"doing",priority:"متوسط",tag:"QA",owner:"نگار",due:"۲۶ مهر"},
{id:5,title:"مرور کنتراست Dark Mode",column:"review",priority:"بالا",tag:"Design",owner:"سارا",due:"امروز"},
{id:6,title:"مستند‌سازی Provider تنظیمات",column:"review",priority:"پایین",tag:"Docs",owner:"آرمان",due:"۲۷ مهر"},
{id:7,title:"Baseline Design System",column:"done",priority:"متوسط",tag:"Core",owner:"حسن",due:"۲۱ مهر"},
{id:8,title:"QA شش داشبورد اصلی",column:"done",priority:"بالا",tag:"QA",owner:"نگار",due:"۲۲ مهر"},
];
const cols=[{key:"todo",label:"برای انجام",tone:"violet"},{key:"doing",label:"در حال انجام",tone:"blue"},{key:"review",label:"بازبینی",tone:"amber"},{key:"done",label:"انجام‌شده",tone:"green"}];
export default function KanbanPage(){
 const[tasks,setTasks]=useState(seed);const[query,setQuery]=useState("");const[created,setCreated]=useState(false);
 const visible=useMemo(()=>tasks.filter((task)=>task.title.toLowerCase().includes(query.toLowerCase())),[tasks,query]);
 const move=(id:number,delta:number)=>setTasks((current)=>current.map((task)=>{if(task.id!==id)return task;const index=cols.findIndex((col)=>col.key===task.column);const next=Math.max(0,Math.min(cols.length-1,index+delta));return {...task,column:cols[next].key}}));
 const addTask=()=>{const id=Math.max(...tasks.map((task)=>task.id))+1;setTasks((current)=>[{id,title:"Task جدید لورانیک",column:"todo",priority:"متوسط",tag:"New",owner:"حسن",due:"این هفته"},...current]);setCreated(true);window.setTimeout(()=>setCreated(false),1800)};
 return <LoraniqShell active="kanban"><main id="main-content" className="main-content kanban-page">
  <section className="kanban-hero" aria-labelledby="page-title"><div><span className="kanban-kicker"><Sparkles/> Workflow board</span><h1 id="page-title">کار را از ایده تا Done، شفاف حرکت بده.</h1><p>Board عملیاتی با جستجو، priority، ownership، deadline و حرکت واقعی کارت بین ستون‌ها؛ بدون وابستگی به کتابخانه drag پولی.</p><div className="kanban-actions"><Button onClick={addTask}><Plus/> Task جدید</Button><Button variant="outline"><UsersRound/> اعضای Sprint</Button></div></div><div className="kanban-sprint"><span>Sprint 08</span><strong>۶۸٪</strong><small>پیشرفت این چرخه</small><div><i style={{width:"68%"}}/></div><footer><span><Clock3/> ۶ روز باقی‌مانده</span><span><CheckCircle2/> ۸ تکمیل</span></footer></div></section>
  {created&&<div className="kanban-toast"><CheckCircle2/> Task جدید در ستون «برای انجام» ساخته شد.</div>}
  <section className="kanban-toolbar"><div className="kanban-search"><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="جستجوی Task..." aria-label="جستجوی کانبان"/></div><div className="kanban-stats"><span><i className="risk"/> {tasks.filter((task)=>task.priority==="بالا"&&task.column!=="done").length.toLocaleString("fa-IR")} اولویت بالا</span><span><i/> {tasks.filter((task)=>task.column!=="done").length.toLocaleString("fa-IR")} باز</span></div></section>
  <section className="kanban-board" aria-label="برد کانبان">{cols.map((col)=><div className={`kanban-column tone-${col.tone}`} key={col.key}><header><div><i/><b>{col.label}</b><span>{visible.filter((task)=>task.column===col.key).length.toLocaleString("fa-IR")}</span></div><button aria-label={`افزودن به ${col.label}`} onClick={addTask}><Plus/></button></header><div className="kanban-stack">{visible.filter((task)=>task.column===col.key).map((task)=><article key={task.id} className="kanban-card"><div className="kanban-card-top"><span className={`priority-${task.priority==="بالا"?"high":task.priority==="متوسط"?"medium":"low"}`}>{task.priority}</span><DropdownMenu><DropdownMenuTrigger asChild><button aria-label={`عملیات ${task.title}`}><MoreHorizontal/></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={()=>move(task.id,-1)}>انتقال به ستون قبل</DropdownMenuItem><DropdownMenuItem onClick={()=>move(task.id,1)}>انتقال به ستون بعد</DropdownMenuItem><DropdownMenuItem>ویرایش Task</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div><h2>{task.title}</h2><div className="kanban-tags"><span><Tag/> {task.tag}</span><span><CalendarDays/> {task.due}</span></div><footer><span className="kanban-avatar">{task.owner.slice(0,1)}</span><b>{task.owner}</b><div className="kanban-move">{col.key!=="todo"&&<button aria-label={`انتقال ${task.title} به ستون قبل`} onClick={()=>move(task.id,-1)}><ChevronRight/></button>}<GripVertical/>{col.key!=="done"&&<button aria-label={`انتقال ${task.title} به ستون بعد`} onClick={()=>move(task.id,1)}><ChevronLeft/></button>}</div></footer></article>)}{!visible.some((task)=>task.column===col.key)&&<div className="kanban-empty"><CircleAlert/><span>کارت مطابق جستجو وجود ندارد.</span></div>}</div></div>)}</section>
 </main></LoraniqShell>
}
