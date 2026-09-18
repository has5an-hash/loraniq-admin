"use client";

import "../app/auth-polish.css";
import "../app/astra-auth.css";

import "../app/auth-premium.css";

import Link from "next/link";
import { ArrowLeft, Check, Languages, Moon, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { type ReactNode } from "react";
import { useUiPreferences } from "@/components/ui-preferences-provider";

export function AuthShell({children,eyebrow="Loraniq Identity",title="ورود امن و ساده",description="یک تجربه احراز هویت حرفه‌ای، فارسی‌اول و آماده اتصال به backend محصول شما.",backHref="/",backLabel="بازگشت به داشبورد"}:{children:ReactNode;eyebrow?:string;title?:string;description?:string;backHref?:string;backLabel?:string}){
 const{preferences,resolvedTheme,updatePreferences}=useUiPreferences();const rtl=preferences.direction==="rtl";const dark=resolvedTheme==="dark";
 return <main id="main-content" className="auth-layout"><section className="auth-visual"><Link href="/" className="auth-brand" aria-label="Loraniq Admin"><span className="auth-brand-mark"><i/><i/><i/></span><b>لورانیک <em>ادمین</em></b></Link><div className="auth-visual-copy"><span className="auth-eyebrow"><Sparkles/> {eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="auth-trust"><span><Check/> RTL / LTR واقعی</span><span><Check/> Dark mode</span><span><Check/> Keyboard friendly</span></div></div><div className="auth-art" aria-hidden="true"><div className="auth-art-window"><header><i/><i/><i/></header><div className="auth-art-body"><aside><span/><span/><span/><span/></aside><section><div className="auth-art-card hero"><span/><b/><small/></div><div className="auth-art-grid"><div/><div/><div/></div><div className="auth-art-lines"><span/><span/><span/></div></section></div></div><div className="auth-orb one"/><div className="auth-orb two"/></div><footer><ShieldCheck/> Frontend auth templates · بدون secret یا credential داخلی</footer></section><section className="auth-content"><header className="auth-content-top"><Link href={backHref}><ArrowLeft/>{backLabel}</Link><div><button onClick={()=>updatePreferences({direction:rtl?"ltr":"rtl"})} aria-label="تغییر جهت و زبان"><Languages/></button><button onClick={()=>updatePreferences({theme:dark?"light":"dark"})} aria-label="تغییر پوسته">{dark?<Sun/>:<Moon/>}</button></div></header><div className="auth-mobile-heading"><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><div className="auth-form-wrap">{children}</div><footer className="auth-copy">© ۲۰۲۶ Loraniq Admin · UI template</footer></section></main>
}
