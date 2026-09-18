"use client";

import "../chat-premium.css";

import { useMemo, useState } from "react";
import { CheckCheck, ChevronLeft, MessageCircle, MoreHorizontal, Paperclip, Phone, Search, Send, Smile, Video } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";

const contacts = [
  { id: 1, name: "سارا راد", role: "Product Designer", online: true, unread: 2, last: "نسخه جدید رو دیدم، خیلی بهتر شده.", time: "۱۰:۴۲" },
  { id: 2, name: "آرمان زمانی", role: "Engineering Lead", online: true, unread: 0, last: "PR نهایی رو تا ظهر merge می‌کنم.", time: "۰۹:۵۸" },
  { id: 3, name: "نگار یوسفی", role: "Growth Manager", online: false, unread: 4, last: "نتایج کمپین آماده شد.", time: "دیروز" },
  { id: 4, name: "پارسا حاتمی", role: "Customer Success", online: false, unread: 0, last: "جلسه فردا تأیید شد.", time: "دیروز" },
  { id: 5, name: "آوا کریمی", role: "Finance", online: true, unread: 0, last: "گزارش بودجه رو فرستادم.", time: "دوشنبه" },
];

const seedMessages = [
  { id: 1, mine: false, text: "سلام، نسخه جدید داشبورد رو دیدم. hierarchy خیلی بهتر شده 👌", time: "۱۰:۳۳" },
  { id: 2, mine: true, text: "عالیه. روی موبایل هم یه دور نگاه کردی؟", time: "۱۰:۳۵" },
  { id: 3, mine: false, text: "آره، کارت‌ها جمع‌وجورتر شدن. فقط spacing بخش Analytics رو همون‌طور نگه داریم.", time: "۱۰:۳۸" },
  { id: 4, mine: true, text: "اوکی. قبل از release نهایی روی RTL/LTR هر دو حالت QA می‌گیریم.", time: "۱۰:۴۰" },
  { id: 5, mine: false, text: "نسخه جدید رو دیدم، خیلی بهتر شده.", time: "۱۰:۴۲" },
];

export default function ChatPage() {
  const [activeId, setActiveId] = useState(1);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState("");
  const [messages, setMessages] = useState(seedMessages);
  const [mobileConversation, setMobileConversation] = useState(false);
  const active = contacts.find((item) => item.id === activeId) ?? contacts[0];
  const filtered = useMemo(() => contacts.filter((item) => `${item.name} ${item.role}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const send = () => {
    const text = composer.trim();
    if (!text) return;
    setMessages((items) => [...items, { id: Date.now(), mine: true, text, time: "الان" }]);
    setComposer("");
  };

  return <LoraniqShell active="chat">
    <main id="main-content" className="main-content chat-page">
      <section className="chat-shell" aria-labelledby="page-title">
        <aside className={`chat-list ${mobileConversation ? "mobile-hidden" : ""}`}>
          <div className="chat-list-head"><div><span>Communication</span><h1 id="page-title">پیام‌ها</h1></div><button aria-label="شروع گفتگوی جدید"><MessageCircle /></button></div>
          <div className="chat-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجوی مخاطب..." aria-label="جستجوی مخاطب" /></div>
          <div className="chat-filter-tabs"><button className="active">همه</button><button>خوانده‌نشده</button><button>گروه‌ها</button></div>
          <div className="chat-contacts">{filtered.map((contact) => <button key={contact.id} className={activeId === contact.id ? "active" : ""} onClick={() => { setActiveId(contact.id); setMobileConversation(true); }}><span className="chat-avatar">{contact.name.slice(0, 1)}<i className={contact.online ? "online" : ""} /></span><span className="chat-contact-copy"><span><b>{contact.name}</b><time>{contact.time}</time></span><small>{contact.last}</small></span>{contact.unread > 0 && <em>{contact.unread.toLocaleString("fa-IR")}</em>}</button>)}</div>
        </aside>

        <section className={`conversation ${mobileConversation ? "mobile-open" : ""}`}>
          <header className="conversation-head"><button className="chat-mobile-back" onClick={() => setMobileConversation(false)} aria-label="بازگشت به گفتگوها"><ChevronLeft /></button><span className="chat-avatar large">{active.name.slice(0,1)}<i className={active.online ? "online" : ""}/></span><div className="conversation-person"><b>{active.name}</b><small>{active.online ? "آنلاین" : active.role}</small></div><div className="conversation-actions"><button aria-label="تماس صوتی"><Phone /></button><button aria-label="تماس تصویری"><Video /></button><button aria-label="عملیات بیشتر"><MoreHorizontal /></button></div></header>
          <div className="conversation-body"><div className="chat-date-divider"><span>امروز</span></div>{messages.map((message) => <div key={message.id} className={`message-row ${message.mine ? "mine" : "theirs"}`}><div className="message-bubble"><p>{message.text}</p><span>{message.time}{message.mine && <CheckCheck />}</span></div></div>)}<div className="typing-state"><span/><span/><span/><small>{active.name} در حال نوشتن است</small></div></div>
          <footer className="composer"><button aria-label="ضمیمه"><Paperclip /></button><textarea rows={1} value={composer} onChange={(event) => setComposer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } }} placeholder="پیام بنویسید..." aria-label="متن پیام"/><button aria-label="ایموجی"><Smile /></button><button className="send-button" onClick={send} aria-label="ارسال پیام"><Send /></button></footer>
        </section>

        <aside className="chat-profile"><div className="chat-profile-avatar">{active.name.slice(0,1)}<i className={active.online ? "online" : ""}/></div><h2>{active.name}</h2><p>{active.role}</p><div className="profile-quick"><button><Phone/><span>تماس</span></button><button><Video/><span>ویدیو</span></button><button><Search/><span>جستجو</span></button></div><div className="profile-info"><div><span>تیم</span><b>محصول لورانیک</b></div><div><span>منطقه زمانی</span><b>تهران · GMT+3:30</b></div><div><span>فایل مشترک</span><b>۱۲ فایل</b></div></div><div className="shared-files"><div><span>آخرین فایل‌ها</span><button>همه</button></div><article><Paperclip/><div><b>dashboard-review.pdf</b><small>۲٫۴ MB</small></div></article><article><Paperclip/><div><b>design-tokens.fig</b><small>۸٫۱ MB</small></div></article></div></aside>
      </section>
    </main>
  </LoraniqShell>;
}
