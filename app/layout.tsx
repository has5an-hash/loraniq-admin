import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./visual-reset.css";
import "./executive-premium.css";
import "./flagship-polish.css";
import "./ecommerce-premium.css";
import "./crm-premium.css";
import "./finance-premium.css";
import "./healthcare-premium.css";
import "./tables-premium.css";
import "./forms-premium.css";
import "./calendar-premium.css";
import "./projects-premium.css";
import "./chat-premium.css";
import "./email-premium.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const vazirmatn = localFont({src:"./fonts/Vazirmatn.woff2",display:"swap",variable:"--font-vazirmatn",preload:true});
export const metadata:Metadata={title:"Loraniq Admin — داشبورد مدیریتی حرفه‌ای",description:"قالب پنل مدیریت حرفه‌ای، فارسی و RTL-first برای محصولات مدرن.",icons:{icon:`${basePath}/favicon.svg`,shortcut:`${basePath}/favicon.svg`}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="fa" dir="rtl" suppressHydrationWarning><body className={vazirmatn.className}>{children}</body></html>}
