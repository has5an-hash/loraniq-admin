"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, ChevronDown, FileUp, Loader2, Mail, MapPin, Phone, ShieldCheck, Sparkles, UserRound, XCircle } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";

const initial = { name: "", email: "", phone: "", company: "", role: "مدیر محصول", city: "تهران", notes: "", consent: false };

export default function FormsPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const validateStep = () => {
    const next: Record<string,string> = {};
    if (step === 1) {
      if (!form.name.trim()) next.name = "نام و نام خانوادگی الزامی است.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "ایمیل معتبر وارد کنید.";
      if (form.phone.replace(/\D/g,"").length < 10) next.phone = "شماره تماس کامل وارد کنید.";
    }
    if (step === 2 && !form.company.trim()) next.company = "نام سازمان الزامی است.";
    if (step === 3 && !form.consent) next.consent = "برای ادامه باید قوانین را تأیید کنید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const nextStep = () => { if (validateStep()) setStep((value) => Math.min(3,value+1)); };
  const submit = (event: FormEvent) => { event.preventDefault(); if (!validateStep()) return; setSubmitting(true); window.setTimeout(() => { setSubmitting(false); setSuccess(true); }, 850); };
  const reset = () => { setForm(initial); setErrors({}); setStep(1); setSuccess(false); };

  return (
    <LoraniqShell active="forms">
      <main id="main-content" className="main-content form-page">
        <section className="form-hero" aria-labelledby="page-title"><div><span className="form-kicker"><Sparkles /> Form system</span><h1 id="page-title">فرم‌هایی که فقط زیبا نیستند؛ درست رفتار می‌کنند.</h1><p>Validation، کمک‌متن، خطا، موفقیت، Loading، Disabled، Wizard و ورودی‌های فارسی در یک سیستم منسجم و قابل استفاده.</p></div><div className="form-hero-card"><ShieldCheck/><div><span>وضعیت دسترس‌پذیری</span><strong>Focus + Labels</strong><small>همه کنترل‌های این دمو Label و State دارند.</small></div></div></section>

        <section className="form-layout">
          <aside className="form-progress-card"><div className="form-progress-head"><span>فرآیند ایجاد حساب سازمانی</span><b>{step.toLocaleString("fa-IR")} / ۳</b></div><div className="form-progress-line"><i style={{width:`${step/3*100}%`}} /></div>{[{n:1,t:"اطلاعات فردی",d:"هویت و راه ارتباطی",icon:UserRound},{n:2,t:"اطلاعات سازمان",d:"نقش و محل فعالیت",icon:MapPin},{n:3,t:"تأیید و ارسال",d:"مرور نهایی درخواست",icon:ShieldCheck}].map((item) => { const Icon=item.icon; return <button key={item.n} className={`form-step ${step===item.n?"active":""} ${step>item.n?"done":""}`} onClick={() => step>item.n && setStep(item.n)}><span>{step>item.n?<Check/>:<Icon/>}</span><div><b>{item.t}</b><small>{item.d}</small></div></button>; })}<div className="form-guidance"><Sparkles/><p>هر مرحله فقط همان داده‌ای را می‌گیرد که برای تصمیم بعدی لازم است.</p></div></aside>

          <form className="form-card" onSubmit={submit} noValidate>
            {success ? <div className="form-success"><span><CheckCircle2/></span><h2>درخواست با موفقیت ثبت شد</h2><p>این State واقعی موفقیت فرم است و بدون تغییر صفحه نمایش داده می‌شود.</p><Button type="button" onClick={reset}>ثبت درخواست جدید</Button></div> : <>
              <div className="form-card-head"><div><span>مرحله {step.toLocaleString("fa-IR")}</span><h2>{step===1?"اطلاعات فردی":step===2?"اطلاعات سازمان":"مرور و تأیید"}</h2><p>{step===1?"راه ارتباطی و هویت کاربر را وارد کنید.":step===2?"اطلاعات محیط کاری و نقش را تکمیل کنید.":"اطلاعات را مرور و قوانین را تأیید کنید."}</p></div><span className="form-security"><ShieldCheck/> داده آزمایشی</span></div>

              {step===1 && <div className="form-grid"><Field label="نام و نام خانوادگی" required error={errors.name}><div className="input-shell"><UserRound/><input value={form.name} onChange={(e)=>update("name",e.target.value)} placeholder="مثلاً حسن مجتهدی" aria-invalid={Boolean(errors.name)} /></div></Field><Field label="ایمیل کاری" required hint="اعلان‌های مهم به این ایمیل ارسال می‌شود." error={errors.email}><div className="input-shell"><Mail/><input dir="ltr" value={form.email} onChange={(e)=>update("email",e.target.value)} placeholder="name@company.com" aria-invalid={Boolean(errors.email)} /></div></Field><Field label="شماره تماس" required error={errors.phone}><div className="input-shell"><Phone/><input inputMode="tel" dir="ltr" value={form.phone} onChange={(e)=>update("phone",e.target.value)} placeholder="0912 000 0000" aria-invalid={Boolean(errors.phone)} /></div></Field><Field label="تاریخ شروع پیشنهادی"><div className="input-shell"><CalendarDays/><input type="text" placeholder="۱۴۰۵/۰۷/۰۱" /></div></Field></div>}

              {step===2 && <div className="form-grid"><Field label="نام سازمان" required error={errors.company}><div className="input-shell"><Sparkles/><input value={form.company} onChange={(e)=>update("company",e.target.value)} placeholder="نام شرکت یا تیم" aria-invalid={Boolean(errors.company)} /></div></Field><Field label="نقش سازمانی"><div className="select-shell"><select value={form.role} onChange={(e)=>update("role",e.target.value)}><option>مدیر محصول</option><option>مدیرعامل</option><option>مدیر فروش</option><option>توسعه‌دهنده</option></select><ChevronDown/></div></Field><Field label="شهر فعالیت"><div className="select-shell"><select value={form.city} onChange={(e)=>update("city",e.target.value)}><option>تهران</option><option>اصفهان</option><option>شیراز</option><option>تبریز</option><option>مشهد</option></select><ChevronDown/></div></Field><Field label="اندازه تیم" hint="برای پیشنهاد تنظیمات مناسب استفاده می‌شود."><div className="radio-row">{["۱–۵","۶–۲۰","۲۱–۵۰","۵۰+"].map((item)=><label key={item}><input type="radio" name="team" defaultChecked={item==="۶–۲۰"}/><span>{item}</span></label>)}</div></Field><Field label="توضیحات" wide><textarea value={form.notes} onChange={(e)=>update("notes",e.target.value)} placeholder="اگر نیاز یا سناریوی خاصی دارید بنویسید..." rows={5}/></Field><Field label="فایل معرفی" wide hint="PDF یا DOCX تا ۵ مگابایت"><button type="button" className="upload-zone"><FileUp/><b>فایل را بکشید یا انتخاب کنید</b><span>فایلی انتخاب نشده</span></button></Field></div>}

              {step===3 && <div className="review-panel"><div className="review-grid"><Review label="نام" value={form.name||"—"}/><Review label="ایمیل" value={form.email||"—"}/><Review label="سازمان" value={form.company||"—"}/><Review label="نقش" value={form.role}/><Review label="شهر" value={form.city}/><Review label="توضیحات" value={form.notes||"بدون توضیح"}/></div><label className={`consent-row ${errors.consent?"has-error":""}`}><input type="checkbox" checked={form.consent} onChange={(e)=>update("consent",e.target.checked)}/><span className="fake-check">{form.consent&&<Check/>}</span><div><b>قوانین و شرایط استفاده را می‌پذیرم.</b><small>این نمونه برای نمایش Checkbox، error state و focus state طراحی شده است.</small></div></label>{errors.consent&&<p className="field-error"><XCircle/>{errors.consent}</p>}<div className="review-notice"><ShieldCheck/><div><b>آماده ارسال</b><span>پس از ارسال، دکمه وارد Loading state می‌شود و Success state نمایش داده خواهد شد.</span></div></div></div>}

              <div className="form-actions"><Button type="button" variant="outline" disabled={step===1||submitting} onClick={()=>setStep((value)=>Math.max(1,value-1))}><ArrowRight/> مرحله قبل</Button>{step<3?<Button type="button" onClick={nextStep}>ادامه <ArrowLeft/></Button>:<Button type="submit" disabled={submitting}>{submitting?<><Loader2 className="animate-spin"/>در حال ارسال...</>:<>ثبت نهایی<Check/></>}</Button>}</div>
            </>}
          </form>
        </section>
      </main>
    </LoraniqShell>
  );
}

function Field({label,required,hint,error,wide,children}:{label:string;required?:boolean;hint?:string;error?:string;wide?:boolean;children:React.ReactNode}){return <label className={`field-wrap ${wide?"wide":""} ${error?"has-error":""}`}><span className="field-label">{label}{required&&<i>*</i>}</span>{children}{hint&&!error&&<small className="field-hint">{hint}</small>}{error&&<small className="field-error"><XCircle/>{error}</small>}</label>}
function Review({label,value}:{label:string;value:string}){return <div className="review-item"><span>{label}</span><b>{value}</b></div>}
