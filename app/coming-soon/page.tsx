"use client";

import { useState } from "react";
import { BellRing, CheckCircle2, Rocket } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage(){const[email,setEmail]=useState("");const[done,setDone]=useState(false);return <AuthShell eyebrow="Coming soon" title="نسخه بعدی نزدیک است." description="Coming-soon state با CTA، email validation ساده و feedback؛ ارسال واقعی باید به سرویس خبرنامه متصل شود."><div className="auth-card utility-card">{done?<div className="auth-success-state"><span><CheckCircle2/></span><h2>درخواست نمونه ثبت شد</h2><p>در محصول واقعی این state به provider ایمیل یا CRM متصل می‌شود.</p></div>:<><div className="auth-card-head"><span><Rocket/></span><h2>در صف انتشار</h2><p>برای دریافت اعلان نسخه بعد، ایمیل را وارد کنید.</p></div><label className="auth-field" style={{marginTop:20}}><b>ایمیل</b><span className="auth-input"><BellRing/><input aria-label="ایمیل اعلان انتشار" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@company.com"/></span></label><Button className="auth-submit" disabled={!email.includes("@")} onClick={()=>setDone(true)}>خبرم کن</Button></>}</div></AuthShell>}
