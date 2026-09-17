"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage(){
 const[email,setEmail]=useState("");const[sent,setSent]=useState(false);const[error,setError]=useState("");
 const submit=()=>{if(!email.includes("@")){setError("یک ایمیل معتبر وارد کنید.");return}setError("");setSent(true)};
 return <AuthShell eyebrow="Account recovery" title="بازگشت به حساب، بدون اصطکاک." description="Recovery UI ساده و واضح با stateهای validation و success؛ ارسال واقعی ایمیل باید به سرویس backend پروژه متصل شود.">{sent?<div className="auth-card auth-success-state"><span><CheckCircle2/></span><h2>لینک نمونه آماده شد</h2><p>در محصول واقعی، backend باید توکن یک‌بارمصرف و تاریخ انقضا را تولید و ایمیل را ارسال کند.</p><Link href="/reset-password/"><Button className="auth-submit">مشاهده صفحه بازنشانی</Button></Link></div>:<div className="auth-card"><div className="auth-card-head"><span><Mail/></span><h2>بازیابی رمز عبور</h2><p>ایمیل حساب را وارد کنید تا flow بازنشانی آغاز شود.</p></div><div className="auth-fields"><label className="auth-field"><b>ایمیل</b><span className={`auth-input ${error?"has-error":""}`}><Mail/><input aria-label="ایمیل بازیابی" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@company.com"/></span>{error&&<small className="auth-error">{error}</small>}</label></div><Button className="auth-submit" onClick={submit}><Send/> ادامه</Button><div className="auth-card-foot"><Link href="/login/">بازگشت به ورود</Link></div></div>}</AuthShell>
}
