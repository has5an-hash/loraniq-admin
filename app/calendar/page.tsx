"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, Plus, UsersRound, Video } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";

const events = [
  { day: 3, title: "مرور OKR محصول", time: "۰۹:۳۰", type: "product", place: "اتاق استراتژی", people: 6 },
  { day: 5, title: "جلسه تیم فروش", time: "۱۱:۰۰", type: "sales", place: "Google Meet", people: 9 },
  { day: 8, title: "انتشار نسخه ۲.۴", time: "۱۴:۰۰", type: "release", place: "Remote", people: 4 },
  { day: 12, title: "مصاحبه مشتریان", time: "۱۰:۱۵", type: "customer", place: "استودیو ۲", people: 3 },
  { day: 16, title: "Sprint Planning", time: "۰۸:۴۵", type: "product", place: "اتاق لورانیک", people: 8 },
  { day: 16, title: "دموی محصول", time: "۱۵:۳۰", type: "sales", place: "Google Meet", people: 12 },
  { day: 21, title: "بررسی مالی ماه", time: "۱۳:۰۰", type: "release", place: "طبقه ۳", people: 5 },
  { day: 24, title: "Design Critique", time: "۱۰:۰۰", type: "customer", place: "Design Room", people: 7 },
  { day: 28, title: "Retro تیم", time: "۱۶:۰۰", type: "product", place: "Remote", people: 8 },
];
const weekdays=["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];
const typeLabel:Record<string,string>={product:"محصول",sales:"فروش",release:"عملیات",customer:"مشتری"};

export default function CalendarPage(){
  const [view,setView]=useState<"month"|"week">("month");
  const [selectedDay,setSelectedDay]=useState(16);
  const [offset,setOffset]=useState(0);
  const [created,setCreated]=useState(false);
  const month=offset===0?"مهر ۱۴۰۵":offset>0?"آبان ۱۴۰۵":"شهریور ۱۴۰۵";
  const selected=useMemo(()=>events.filter((event)=>event.day===selectedDay),[selectedDay]);
  const days=Array.from({length:view==="month"?35:7},(_,index)=>view==="month"?index+1:14+index);
  return <LoraniqShell active="calendar">
    <main id="main-content" className="main-content calendar-page">
      <section className="calendar-hero" aria-labelledby="page-title"><div><span className="calendar-kicker"><CalendarDays/> Schedule center</span><h1 id="page-title">زمان، تیم و تصمیم‌ها در یک تقویم آرام و دقیق.</h1><p>نمای ماه و هفته، رویدادهای رنگ‌بندی‌شده، جزئیات جلسه و ایجاد سریع رویداد در یک تجربه کاملاً Responsive.</p></div><div className="calendar-hero-stat"><span>این ماه</span><strong>۳۴ رویداد</strong><small>۸ جلسه مهم · ۴ ددلاین</small></div></section>
      <section className="calendar-shell">
        <div className="calendar-toolbar"><div className="calendar-nav"><Button variant="outline" size="icon" aria-label="ماه قبل" onClick={()=>setOffset((v)=>v-1)}><ChevronRight/></Button><div><span>تقویم کاری</span><h2>{month}</h2></div><Button variant="outline" size="icon" aria-label="ماه بعد" onClick={()=>setOffset((v)=>v+1)}><ChevronLeft/></Button></div><div className="calendar-actions"><div className="calendar-view-switch"><button className={view==="month"?"active":""} onClick={()=>setView("month")}>ماه</button><button className={view==="week"?"active":""} onClick={()=>setView("week")}>هفته</button></div><Button onClick={()=>setCreated(true)}><Plus/> رویداد جدید</Button></div></div>
        {created&&<div className="calendar-created"><span><Plus/></span><div><b>رویداد جدید آماده ثبت است</b><small>این State برای نمایش بازخورد عملیات سریع طراحی شده است.</small></div><button onClick={()=>setCreated(false)}>بستن</button></div>}
        <div className="calendar-layout"><div className="calendar-board"><div className="calendar-weekdays">{weekdays.map((day)=><span key={day}>{day}</span>)}</div><div className={`calendar-grid ${view}`}>
          {days.map((day)=>{const dayEvents=events.filter((event)=>event.day===day);return <button key={day} className={`calendar-day ${selectedDay===day?"selected":""}`} onClick={()=>setSelectedDay(day)}><span className="calendar-date">{day.toLocaleString("fa-IR")}</span><div className="calendar-day-events">{dayEvents.slice(0,2).map((event)=><span className={event.type} key={event.title}><i/>{event.time} · {event.title}</span>)}{dayEvents.length>2&&<small>+{dayEvents.length-2}</small>}</div></button>})}
        </div></div><aside className="calendar-detail"><div className="calendar-detail-head"><span>روز انتخاب‌شده</span><strong>{selectedDay.toLocaleString("fa-IR")} {month}</strong></div>{selected.length?<div className="calendar-event-list">{selected.map((event)=><article key={event.title} className={event.type}><span className="calendar-event-icon"><CalendarDays/></span><div><span className="calendar-event-type">{typeLabel[event.type]}</span><h3>{event.title}</h3><p><Clock3/>{event.time}</p><p>{event.place.includes("Meet")?<Video/>:<MapPin/>}{event.place}</p><p><UsersRound/>{event.people.toLocaleString("fa-IR")} نفر</p></div></article>)}</div>:<div className="calendar-empty"><CalendarDays/><h3>رویدادی ثبت نشده</h3><p>برای این روز برنامه‌ای وجود ندارد.</p></div>}<div className="calendar-agenda"><h3>برنامه امروز</h3><div><span>۰۹:۳۰</span><b>Standup محصول</b></div><div><span>۱۲:۰۰</span><b>تمرکز بدون جلسه</b></div><div><span>۱۵:۳۰</span><b>Demo & Review</b></div></div></aside></div>
      </section>
    </main>
  </LoraniqShell>
}
