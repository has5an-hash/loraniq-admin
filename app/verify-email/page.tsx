"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, MailCheck, RefreshCcw } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage(){
 const[resent,setResent]=useState(false);const[verified,setVerified]=useState(false);
 return <AuthShell eyebrow="Email verification" title="یک تأیید کوتاه، یک حساب قابل اعتماد." description="Verification UI با resend feedback و verified state؛ صدور token و اعتبارسنجی واقعی باید سمت backend انجام شود.">{verified?<div className="auth-card auth-success-state"><span><CheckCircle2/></span><h2>ایمیل نمونه تأیید شد</h2><p>اکنون flow می‌تواند در پروژه واقعی حساب را فعال و session ایجاد کند.</p><Link href="/login/"><Button className="auth-submit">ادامه به ورود</Button></Link></div>:<div className="auth-card"><div className="auth-card-head"><span><MailCheck/></span><h2>ایمیل را بررسی کنید</h2><p>پیام تأیید نمونه برای <b>demo@loraniq.dev</b> آماده شده است.</p></div><Button className="auth-submit" onClick={()=>setVerified(true)}><MailCheck/> شبیه‌سازی تأیید لینک</Button><div className="auth-divider">پیام را نمی‌بینید؟</div><Button variant="outline" className="auth-submit" onClick={()=>{setResent(true);window.setTimeout(()=>setResent(false),2200)}}><RefreshCcw/> ارسال دوباره</Button>{resent&&<div className="auth-help" role="status" style={{marginTop:10,textAlign:"center"}}>درخواست ارسال مجدد ثبت شد.</div>}<div className="auth-card-foot"><Link href="/login/">بازگشت به ورود</Link></div></div>}</AuthShell>
}
