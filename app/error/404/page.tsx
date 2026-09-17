import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function Error404Page(){return <AuthShell eyebrow="404 · Route missing" title="این مسیر دیگر اینجا نیست." description="صفحه خطای مستقل با همان زبان بصری لورانیک؛ بدون Sidebar و بدون حواس‌پرتی."><div className="auth-card utility-card"><div className="utility-code">404</div><h2>صفحه پیدا نشد</h2><p className="auth-help">ممکن است آدرس تغییر کرده باشد یا صفحه حذف شده باشد.</p><div className="utility-actions"><Link href="/"><Button><Home/> داشبورد</Button></Link><Link href="/search/"><Button variant="outline"><SearchX/> جستجو</Button></Link></div></div></AuthShell>}
