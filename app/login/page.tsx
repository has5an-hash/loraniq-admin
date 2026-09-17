"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function LoginPage(){
 const[show,setShow]=useState(false);const[email,setEmail]=useState("demo@loraniq.dev");const[password,setPassword]=useState("LoraniqDemo!1");const[error,setError]=useState("");const[done,setDone]=useState(false);
 const submit=()=>{if(!email.includes("@")||password.length<8){setError("ایمیل معتبر و رمز حداقل ۸ کاراکتری وارد کنید.");return}setError("");setDone(true)};
 return <AuthShell eyebrow="Welcome back" title="فضای کاری‌ات آماده است." description="ورود نمونه با validation و state واقعی؛ برای پروژه نهایی می‌تواند به NextAuth، API اختصاصی یا هر backend استاندارد متصل شود.">{done?<div className="auth-card auth-success-state"><span><CheckCircle2/></span><h2>ورود نمونه موفق بود</h2><p>این state برای نمایش تجربه UI است و به session واقعی متصل نیست.</p><Link href="/"><Button className="auth-submit">ورود به داشبورد</Button></Link></div>:<div className="auth-card"><div className="auth-card-head"><span><LockKeyhole/></span><h2>ورود به لورانیک</h2><p>برای ادامه اطلاعات حساب نمونه را وارد کنید.</p></div><div className="auth-fields"><label className="auth-field"><b>ایمیل</b><span className={`auth-input ${error&&!email.includes("@")?"has-error":""}`}><Mail/><input aria-label="ایمیل ورود" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="email"/></span></label><label className="auth-field"><span><b>رمز عبور</b><Link href="/forgot-password/">رمز را فراموش کرده‌اید؟</Link></span><span className={`auth-input ${error&&password.length<8?"has-error":""}`}><KeyRound/><input aria-label="رمز عبور" type={show?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password"/><button type="button" onClick={()=>setShow((v)=>!v)} aria-label={show?"پنهان کردن رمز":"نمایش رمز"}>{show?<EyeOff/>:<Eye/>}</button></span></label>{error&&<div className="auth-error" role="alert">{error}</div>}<label className="auth-remember"><input type="checkbox" defaultChecked/><span>مرا به خاطر بسپار</span></label></div><Button className="auth-submit" onClick={submit}>ورود</Button><div className="auth-divider">یا ادامه با</div><div className="auth-secondary"><button>Google</button><button>GitHub</button></div><div className="auth-card-foot">حساب ندارید؟ <Link href="/register/">ساخت حساب نمونه</Link></div></div>}</AuthShell>
}
