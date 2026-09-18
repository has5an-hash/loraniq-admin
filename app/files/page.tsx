"use client";

import "../files-premium.css";

import { useMemo, useState } from "react";
import { Archive, ChevronDown, File, FileArchive, FileImage, FileText, Folder, FolderOpen, Grid2X2, HardDrive, List, MoreHorizontal, Plus, Search, Star, Trash2, UploadCloud } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const files = [
  { id:1,name:"Design System",type:"folder",size:"۲۴ فایل",updated:"۲ دقیقه پیش",owner:"سارا",star:true },
  { id:2,name:"Marketing Assets",type:"folder",size:"۱۸ فایل",updated:"۱ ساعت پیش",owner:"نگار",star:false },
  { id:3,name:"loraniq-dashboard.png",type:"image",size:"۳٫۸ MB",updated:"امروز",owner:"حسن",star:true },
  { id:4,name:"release-notes.pdf",type:"pdf",size:"۱٫۲ MB",updated:"امروز",owner:"آرمان",star:false },
  { id:5,name:"finance-report.xlsx",type:"sheet",size:"۸۴۰ KB",updated:"دیروز",owner:"آوا",star:false },
  { id:6,name:"source-package.zip",type:"archive",size:"۱۲۸ MB",updated:"دیروز",owner:"حسن",star:false },
  { id:7,name:"brand-guidelines.pdf",type:"pdf",size:"۶٫۴ MB",updated:"۳ روز پیش",owner:"سارا",star:true },
  { id:8,name:"customer-research.docx",type:"doc",size:"۲٫۱ MB",updated:"۴ روز پیش",owner:"پارسا",star:false },
];
const iconFor=(type:string)=>type==="folder"?Folder:type==="image"?FileImage:type==="archive"?FileArchive:type==="pdf"||type==="doc"?FileText:File;

export default function FilesPage(){
 const[view,setView]=useState<"grid"|"list">("grid");const[query,setQuery]=useState("");const[scope,setScope]=useState("همه فایل‌ها");const[selected,setSelected]=useState<number[]>([]);const[upload,setUpload]=useState(false);const[uploaded,setUploaded]=useState(false);
 const visible=useMemo(()=>files.filter((item)=>(scope!=="ستاره‌دار"||item.star)&&item.name.toLowerCase().includes(query.toLowerCase())),[query,scope]);
 const toggle=(id:number)=>setSelected((items)=>items.includes(id)?items.filter((item)=>item!==id):[...items,id]);
 return <LoraniqShell active="files"><main id="main-content" className="main-content files-page">
  <section className="files-hero" aria-labelledby="page-title"><div><span className="files-kicker"><HardDrive/> File workspace</span><h1 id="page-title">فایل‌ها، پوشه‌ها و فضای ذخیره‌سازی بدون آشفتگی.</h1><p>جستجو، انتخاب چندتایی، Grid/List، ستاره‌دارها و Upload state در یک File Manager واقعی و responsive.</p></div><div className="storage-card"><div><span>فضای مصرف‌شده</span><b>۶۸٫۴ GB</b><small>از ۱۰۰ GB</small></div><span className="storage-track"><i style={{width:"68.4%"}}/></span><footer><span>۶۸٪ استفاده</span><button>ارتقا فضا</button></footer></div></section>
  <section className="files-shell"><aside className="files-sidebar"><Button onClick={()=>{setUpload(true);setUploaded(false)}}><UploadCloud/> آپلود فایل</Button><nav>{[{n:"همه فایل‌ها",i:FolderOpen},{n:"ستاره‌دار",i:Star},{n:"اخیر",i:Archive},{n:"حذف‌شده",i:Trash2}].map((item)=>{const Icon=item.i;return <button key={item.n} className={scope===item.n?"active":""} onClick={()=>setScope(item.n)}><Icon/><span>{item.n}</span></button>})}</nav><div className="folder-tree"><span>پوشه‌ها</span><button><ChevronDown/><Folder/>محصول</button><button className="nested"><Folder/>Loraniq</button><button className="nested"><Folder/>Research</button><button><ChevronDown/><Folder/>مارکتینگ</button><button className="nested"><Folder/>Campaigns</button></div><div className="file-storage-mini"><HardDrive/><div><b>۳۱٫۶ GB آزاد</b><span>Storage healthy</span></div></div></aside>
   <div className="files-content"><div className="files-toolbar"><div className="files-search"><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="جستجوی فایل و پوشه..." aria-label="جستجوی فایل"/></div><div className="files-view"><button className={view==="grid"?"active":""} onClick={()=>setView("grid")} aria-label="نمای شبکه"><Grid2X2/></button><button className={view==="list"?"active":""} onClick={()=>setView("list")} aria-label="نمای لیست"><List/></button></div><Button variant="outline"><Plus/> پوشه جدید</Button></div>
   {selected.length>0&&<div className="file-bulk"><b>{selected.length.toLocaleString("fa-IR")} مورد انتخاب شده</b><div><button><Star/>ستاره</button><button><Trash2/>حذف</button></div></div>}
   <div className={`files-items ${view}`}>{visible.map((item)=>{const Icon=iconFor(item.type);return <article key={item.id} className={selected.includes(item.id)?"selected":""}><button className="file-select" onClick={()=>toggle(item.id)} aria-label={`انتخاب ${item.name}`}><span>{selected.includes(item.id)?"✓":""}</span></button><span className={`file-icon ${item.type}`}><Icon/></span><div className="file-copy"><h2>{item.name}</h2><p>{item.size} · {item.updated}</p><small>مالک: {item.owner}</small></div>{item.star&&<Star className="file-star"/>}<DropdownMenu><DropdownMenuTrigger asChild><button className="file-menu" aria-label={`عملیات ${item.name}`}><MoreHorizontal/></button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>باز کردن</DropdownMenuItem><DropdownMenuItem>دانلود</DropdownMenuItem><DropdownMenuItem>تغییر نام</DropdownMenuItem><DropdownMenuItem>اشتراک‌گذاری</DropdownMenuItem></DropdownMenuContent></DropdownMenu></article>})}</div>{visible.length===0&&<div className="files-empty"><FolderOpen/><h2>فایلی پیدا نشد</h2><p>جستجو یا فیلتر را تغییر بده.</p></div>}</div></section>
  {upload&&<div className="file-upload-modal" role="dialog" aria-label="آپلود فایل"><div className="file-upload-window"><header><b>آپلود فایل</b><button onClick={()=>setUpload(false)}>×</button></header>{uploaded?<div className="file-upload-success"><UploadCloud/><h2>آپلود کامل شد</h2><p>۳ فایل برای پردازش آماده شدند.</p><Button onClick={()=>setUpload(false)}>تمام</Button></div>:<div className="file-drop"><UploadCloud/><h2>فایل‌ها را اینجا رها کنید</h2><p>PNG, PDF, ZIP, DOCX · حداکثر ۲۵۰ MB</p><Button variant="outline" onClick={()=>setUploaded(true)}>انتخاب فایل آزمایشی</Button><div><span>یا</span></div><Button onClick={()=>setUploaded(true)}>شروع آپلود</Button></div>}</div></div>}
 </main></LoraniqShell>
}
