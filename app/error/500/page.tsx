import Link from "next/link";
import { Home, RefreshCcw, ServerCrash } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function Error500Page(){return <AuthShell eyebrow="500 · Server state" title="خطا رخ داده؛ مسیر بازیابی روشن است." description="Error state حرفه‌ای برای خطاهای سمت سرور؛ نمایش UI مستقل از لاگ و recovery واقعی backend است."><div className="auth-card utility-card"><span className="auth-card-head"><span><ServerCrash/></span></span><div className="utility-code">500</div><h2>خطای داخلی سرور</h2><p className="auth-help">در محصول واقعی، خطا باید log شود و شناسه رخداد برای پشتیبانی ثبت شود.</p><div className="utility-actions"><Button><RefreshCcw/> تلاش دوباره</Button><Link href="/"><Button variant="outline"><Home/> داشبورد</Button></Link></div></div></AuthShell>}
