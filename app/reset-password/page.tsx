"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, RotateCcw } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage(){
 const[password,setPassword]=useState("");const[confirm,setConfirm]=useState("");const[show,setShow]=useState(false);const[done,setDone]=useState(false);const[error,setError]=useState("");
 const strength=useMemo(()=>password.length>=12&&/[A-Z]/.test(password)&&/\d/.test(password)?"strong":password.length>=8?"medium":"weak",[password]);
 const submit=()=>{if(password.length<8){setError("رمز باید حداقل ۸ کاراکتر باشد.");return}if(password!==confirm){setError("تکرار رمز با رمز جدید یکسان نیست.");return}setError("");setDone(true)};
 return <AuthShell eyebrow="Reset credential" title="رمز تازه؛ مسیر روشن." description="Reset-password UI با strength meter، confirmation و success state؛ token validation واقعی در backend پیاده‌سازی می‌شود.">{done?<div className="auth-card auth-success-state"><span><CheckCircle2/></span><h2>رمز نمونه تغییر کرد</h2><p>برای امنیت واقعی، token باید یک‌بارمصرف، زمان‌دار و سمت سرور اعتبارسنجی شود.</p><Link href="/login/"><Button className="auth-submit">بازگشت به ورود</Button></Link></div>:<div className="auth-card"><div className="auth-card-head"><span><RotateCcw/></span><h2>انتخاب رمز جدید</h2><p>رمزی قوی و متفاوت از رمزهای قبلی انتخاب کنید.</p></div><div className="auth-fields"><label className="auth-field"><b>رمز جدید</b><span className={`auth-input ${error&&password.length<8?"has-error":""}`}><KeyRound/><input aria-label="رمز جدید" type={show?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="حداقل ۸ کاراکتر"/><button onClick={()=>setShow((v)=>!v)} aria-label={show?"پنهان کردن رمز":"نمایش رمز"}>{show?<EyeOff/>:<Eye/>}</button></span><div className={`password-meter ${strength}`}><i/><i/><i/><i/></div></label><label className="auth-field"><b>تکرار رمز</b><span className={`auth-input ${error&&confirm!==password?"has-error":""}`}><KeyRound/><input aria-label="تکرار رمز" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="رمز را دوباره وارد کنید"/></span></label>{error&&<div className="auth-error" role="alert">{error}</div>}</div><Button className="auth-submit" onClick={submit}>ثبت رمز جدید</Button></div>}</AuthShell>
}
