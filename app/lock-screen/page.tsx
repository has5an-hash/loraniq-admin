"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, LockKeyhole } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function LockScreenPage(){
 const[password,setPassword]=useState("");const[show,setShow]=useState(false);const[done,setDone]=useState(false);const[error,setError]=useState("");
 const unlock=()=>{if(password.length<8){setError("برای نمونه، رمز حداقل ۸ کاراکتری وارد کنید.");return}setError("");setDone(true)};
 return <AuthShell eyebrow="Session locked" title="فضای کاری قفل است، نه از دست رفته." description="Lock-screen UI برای sessionهای موقت؛ قفل و unlock واقعی باید توسط session backend کنترل شود.">{done?<div className="auth-card auth-success-state"><span><CheckCircle2/></span><h2>قفل نمونه باز شد</h2><p>در پیاده‌سازی واقعی باید session سمت سرور دوباره اعتبارسنجی شود.</p><Link href="/"><Button className="auth-submit">بازگشت به داشبورد</Button></Link></div>:<div className="auth-card"><div className="auth-card-head"><span><LockKeyhole/></span><h2>خوش برگشتی حسن</h2><p>برای ادامه، رمز حساب را دوباره وارد کنید.</p></div><div className="auth-fields"><label className="auth-field"><b>رمز عبور</b><span className={`auth-input ${error?"has-error":""}`}><KeyRound/><input aria-label="رمز قفل صفحه" type={show?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="رمز عبور"/><button onClick={()=>setShow((v)=>!v)} aria-label={show?"پنهان کردن رمز":"نمایش رمز"}>{show?<EyeOff/>:<Eye/>}</button></span>{error&&<small className="auth-error">{error}</small>}</label></div><Button className="auth-submit" onClick={unlock}>باز کردن قفل</Button></div>}</AuthShell>
}
