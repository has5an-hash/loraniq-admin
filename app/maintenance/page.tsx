import Link from "next/link";
import { Clock3, Home, Wrench } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function MaintenancePage(){return <AuthShell eyebrow="Planned maintenance" title="چند دقیقه برای یک نسخه بهتر." description="Maintenance state مستقل برای deployهای برنامه‌ریزی‌شده با پیشرفت، زمان تقریبی و مسیر بازگشت."><div className="auth-card utility-card"><div className="auth-card-head"><span><Wrench/></span><h2>در حال نگهداری برنامه‌ریزی‌شده</h2><p>بخش اصلی سرویس موقتاً در دسترس نیست.</p></div><div className="maintenance-progress" aria-label="۷۲ درصد پیشرفت"><i/></div><p className="auth-help"><Clock3 style={{display:"inline",width:13,verticalAlign:"middle"}}/> زمان تقریبی باقی‌مانده: ۱۸ دقیقه</p><div className="utility-actions"><Link href="/"><Button variant="outline"><Home/> بازگشت به داشبورد</Button></Link></div></div></AuthShell>}
