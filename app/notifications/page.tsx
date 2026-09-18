"use client";

import "../app-breadth-premium.css";

import { useMemo, useState } from "react";
import { Bell, BellRing, CheckCheck, CircleAlert, CreditCard, FolderKanban, Mail, Megaphone, Settings2, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { useNotificationCenter } from "@/components/notifications-provider";

const seed=[
{id:1,title:"نسخه جدید آماده بررسی است",body:"Build لورانیک با موفقیت در محیط Preview منتشر شد.",kind:"سیستم",time:"۲ دقیقه پیش",read:false,icon:"system"},
{id:2,title:"سارا به پروژه اضافه شد",body:"عضویت سارا یوسفی در Loraniq Commerce تأیید شد.",kind:"تیم",time:"۱۸ دقیقه پیش",read:false,icon:"team"},
{id:3,title:"پرداخت INV-2048 ثبت شد",body:"پرداخت ۱۸۶٫۴ میلیون تومان با موفقیت دریافت شد.",kind:"مالی",time:"۱ ساعت پیش",read:true,icon:"payment"},
{id:4,title:"ریسک پروژه افزایش یافت",body:"Dorsa Intelligence به آستانه هشدار برنامه زمان‌بندی رسید.",kind:"پروژه",time:"۲ ساعت پیش",read:false,icon:"project"},
{id:5,title:"سیاست امنیتی به‌روزرسانی شد",body:"نشست‌های قدیمی در بازبینی امنیتی بعدی منقضی می‌شوند.",kind:"سیستم",time:"امروز",read:true,icon:"security"},
{id:6,title:"گزارش هفتگی آماده است",body:"خلاصه عملکرد فروش و عملیات برای مرور مدیریتی آماده شد.",kind:"سیستم",time:"دیروز",read:true,icon:"report"},
];
const icons={system:Sparkles,team:UserPlus,payment:CreditCard,project:FolderKanban,security:ShieldCheck,report:Mail};
export default function NotificationsPage(){
 const {items,unreadCount:unread,markRead,markAllRead,clear}=useNotificationCenter();const setItems=(updater:(current:typeof items)=>typeof items)=>updater(items).filter((item)=>item.read).forEach((item)=>markRead(item.id));const[filter,setFilter]=useState("همه");const[channel,setChannel]=useState({product:true,email:true,security:true});
 const visible=useMemo(()=>items.filter((item)=>filter==="همه"||(filter==="خوانده‌نشده"?!item.read:item.kind===filter)),[items,filter]);
 const markAll=markAllRead;
 return <LoraniqShell active="notifications"><main id="main-content" className="main-content notifications-page">
  <section className="notifications-hero" aria-labelledby="page-title"><div><span className="notifications-kicker"><BellRing/> Notification hub</span><h1 id="page-title">اعلان مهم را ببین؛ نویز را کنترل کن.</h1><p>Inbox رویدادها، دسته‌بندی، unread state و تنظیم کانال‌ها در یک مرکز اعلان responsive.</p><div className="notifications-actions"><Button onClick={markAll} disabled={!unread}><CheckCheck/> علامت‌گذاری همه به‌عنوان خوانده</Button><Button variant="outline"><Settings2/> تنظیمات کانال‌ها</Button></div></div><div className="notification-pulse"><span>Unread</span><strong>{unread.toLocaleString("fa-IR")}</strong><small>از {items.length.toLocaleString("fa-IR")} اعلان اخیر</small><div><i style={{width:`${Math.max(8,(unread/items.length)*100)}%`}}/></div></div></section>
  <section className="notifications-layout"><article className="notifications-feed"><header><div><h2>مرکز اعلان‌ها</h2><p>رویدادهای محصول، تیم، مالی و پروژه</p></div><span>{visible.length.toLocaleString("fa-IR")} مورد</span></header><div className="notifications-filters">{["همه","خوانده‌نشده","سیستم","تیم","مالی","پروژه"].map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</div><div className="notification-list">{visible.map((item)=>{const Icon=icons[item.icon as keyof typeof icons];return <button key={item.id} className={item.read?"read":"unread"} onClick={()=>setItems((current)=>current.map((entry)=>entry.id===item.id?{...entry,read:true}:entry))}><span className={`notification-icon tone-${item.icon}`}><Icon/></span><div><span className="notification-row-head"><b>{item.title}</b>{!item.read&&<i/>}</span><p>{item.body}</p><small>{item.kind} · {item.time}</small></div></button>})}{!visible.length&&<div className="notifications-empty"><Bell/><h3>اعلانی در این فیلتر نیست</h3><p>فیلتر دیگری انتخاب کنید.</p></div>}</div></article>
   <aside className="notifications-settings"><header><Megaphone/><div><h2>ترجیحات اعلان</h2><p>کانال‌های مهم را روشن نگه دار.</p></div></header><Preference label="اعلان‌های محصول" hint="Build، deploy و تغییرات محصول" value={channel.product} onChange={()=>setChannel((v)=>({...v,product:!v.product}))}/><Preference label="خلاصه ایمیلی" hint="Digest رویدادهای مهم" value={channel.email} onChange={()=>setChannel((v)=>({...v,email:!v.email}))}/><Preference label="هشدار امنیتی" hint="Login و تغییرات حساس" value={channel.security} onChange={()=>setChannel((v)=>({...v,security:!v.security}))}/><div className="notification-policy"><CircleAlert/><p>هشدارهای امنیتی بحرانی حتی در حالت کاهش اعلان، داخل پنل نمایش داده می‌شوند.</p></div></aside>
  </section>
 </main></LoraniqShell>
}
function Preference({label,hint,value,onChange}:{label:string;hint:string;value:boolean;onChange:()=>void}){return <button className="notification-preference" aria-pressed={value} onClick={onChange}><div><b>{label}</b><small>{hint}</small></div><span className={value?"on":""}><i/></span></button>}
