"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function TwoFactorPage(){
 const[digits,setDigits]=useState(["1","4","8","2","6","9"]);const[done,setDone]=useState(false);const[error,setError]=useState("");const refs=useRef<Array<HTMLInputElement|null>>([]);
 const update=(index:number,value:string)=>{const digit=value.replace(/\D/g,"").slice(-1);setDigits((items)=>items.map((item,i)=>i===index?digit:item));if(digit&&index<5)refs.current[index+1]?.focus()};
 const submit=()=>{if(digits.some((item)=>!item)){setError("کد ۶ رقمی را کامل وارد کنید.");return}setError("");setDone(true)};
 return <AuthShell eyebrow="Two-step verification" title="یک لایه دیگر برای اطمینان." description="OTP UI با keyboard flow و validation؛ بررسی کد واقعی باید سمت سرور و همراه rate-limit انجام شود.">{done?<div className="auth-card auth-success-state"><span><CheckCircle2/></span><h2>کد نمونه تأیید شد</h2><p>این تأیید فقط state نمایشی قالب است و جایگزین 2FA backend نیست.</p><Link href="/"><Button className="auth-submit">ادامه</Button></Link></div>:<div className="auth-card"><div className="auth-card-head"><span><ShieldCheck/></span><h2>تأیید دومرحله‌ای</h2><p>کد ۶ رقمی ارسال‌شده به دستگاه امن را وارد کنید.</p></div><div className="otp-grid" dir="ltr">{digits.map((digit,index)=><input key={index} ref={(node)=>{refs.current[index]=node}} aria-label={`رقم ${index+1}`} inputMode="numeric" maxLength={1} value={digit} onChange={(e)=>update(index,e.target.value)} onKeyDown={(e)=>{if(e.key==="Backspace"&&!digits[index]&&index>0)refs.current[index-1]?.focus()}}/>)}</div>{error&&<div className="auth-error" role="alert" style={{marginTop:10}}>{error}</div>}<Button className="auth-submit" onClick={submit}>تأیید کد</Button><div className="auth-card-foot">کد دریافت نشد؟ <button type="button">ارسال دوباره</button></div></div>}</AuthShell>
}
