"use client";

import { Check, Contrast, Gauge, LayoutGrid, Monitor, Moon, MoveHorizontal, PanelLeft, RotateCcw, Sparkles, Sun, WandSparkles } from "lucide-react";
import { LoraniqShell } from "@/components/loraniq-shell";
import { Button } from "@/components/ui/button";
import { useUiPreferences, type UiPreferences } from "@/components/ui-preferences-provider";

type Option<T extends string> = { value:T; label:string; hint:string };
function Choice<T extends keyof UiPreferences>({title,description,field,options}:{title:string;description:string;field:T;options:Option<UiPreferences[T]>[]}){
 const {preferences,updatePreferences}=useUiPreferences();
 return <section className="settings-card"><header><div><h2>{title}</h2><p>{description}</p></div></header><div className="settings-options">{options.map((option)=>{const active=preferences[field]===option.value;return <button key={option.value} className={active?"active":""} aria-pressed={active} onClick={()=>updatePreferences({[field]:option.value} as Partial<UiPreferences>)}><span>{active?<Check/>:<i/>}</span><div><b>{option.label}</b><small>{option.hint}</small></div></button>})}</div></section>
}
export default function SettingsPage(){
 const {preferences,resetPreferences}=useUiPreferences();
 return <LoraniqShell active="settings"><main id="main-content" className="main-content settings-page">
  <section className="settings-hero"><div><span className="settings-kicker"><WandSparkles/> Personalization system</span><h1>ظاهر و رفتار لورانیک را مثل یک محصول enterprise تنظیم کن.</h1><p>تنظیمات در کل پنل ذخیره می‌شوند و روی تم، جهت، تراکم، skin، عرض محتوا، sidebar و motion اثر واقعی دارند.</p><div className="settings-summary"><span><Contrast/> {preferences.skin==="soft"?"Soft skin":"Bordered skin"}</span><span><Gauge/> {preferences.density==="comfortable"?"Comfortable":"Compact"}</span><span><MoveHorizontal/> {preferences.contentWidth==="fluid"?"Fluid":"Boxed"}</span></div></div><div className="settings-preview" aria-label="پیش‌نمایش تنظیمات"><div className="preview-shell"><aside><i/><i/><i/><i/></aside><section><header/><div className="preview-grid"><article/><article/><article/></div><div className="preview-chart"><span/><span/><span/><span/><span/></div></section></div><small>Live preference preview</small></div></section>
  <div className="settings-grid">
   <Choice title="حالت رنگ" description="Light، Dark یا هماهنگ با سیستم." field="theme" options={[{value:"light",label:"روشن",hint:"سطوح سفید و کنتراست نرم"},{value:"dark",label:"تیره",hint:"Dark مستقل و کم‌درخشش"},{value:"system",label:"سیستم",hint:"هماهنگ با تنظیم دستگاه"}]}/>
   <Choice title="جهت رابط" description="RTL و LTR واقعی در تمام layout." field="direction" options={[{value:"rtl",label:"RTL / فارسی",hint:"پیش‌فرض محصول"},{value:"ltr",label:"LTR / English",hint:"جهت چپ به راست"}]}/>
   <Choice title="تراکم" description="برای مانیتورهای مدیریتی یا کار روزانه." field="density" options={[{value:"comfortable",label:"راحت",hint:"فضای تنفس بیشتر"},{value:"compact",label:"فشرده",hint:"داده بیشتر در viewport"}]}/>
   <Choice title="Skin" description="کنترل عمق بصری کارت‌ها و مرزها." field="skin" options={[{value:"soft",label:"Soft",hint:"سایه بسیار نرم"},{value:"bordered",label:"Bordered",hint:"مرز واضح‌تر و سایه کمتر"}]}/>
   <Choice title="عرض محتوا" description="برای داشبورد عریض یا تمرکز بیشتر." field="contentWidth" options={[{value:"fluid",label:"Fluid",hint:"استفاده حداکثری از فضا"},{value:"boxed",label:"Boxed",hint:"حداکثر عرض کنترل‌شده"}]}/>
   <Choice title="Sidebar" description="ناوبری کامل یا حالت فشرده." field="sidebar" options={[{value:"full",label:"کامل",hint:"آیکن و عنوان"},{value:"compact",label:"Compact",hint:"تمرکز روی آیکن‌ها"}]}/>
   <Choice title="Motion" description="انیمیشن‌های هدفمند با احترام به ترجیح کاربر." field="motion" options={[{value:"full",label:"Full motion",hint:"transition و entrance نرم"},{value:"reduced",label:"Reduced",hint:"حداقل حرکت ممکن"}]}/>
   <section className="settings-card settings-reset"><header><div><h2>بازنشانی</h2><p>همه ترجیحات به حالت استاندارد لورانیک برمی‌گردند.</p></div><Sparkles/></header><Button variant="outline" onClick={resetPreferences}><RotateCcw/> بازنشانی تنظیمات</Button></section>
  </div>
  <section className="settings-benchmark"><div><span><LayoutGrid/> Layout intelligence</span><h2>Customizer بدون وابستگی به سرویس یا افزونه خارجی</h2><p>تنظیمات به‌صورت type-safe و persistent در خود محصول مدیریت می‌شوند؛ هدف، پوشش عمق تنظیمات رقبا بدون کپی‌کردن UI یا معماری آن‌هاست.</p></div><div className="settings-benchmark-icons"><span><Sun/></span><span><Moon/></span><span><Monitor/></span><span><PanelLeft/></span></div></section>
 </main></LoraniqShell>
}
