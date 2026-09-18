import type { Metadata } from "next";
import localFont from "next/font/local";
import { UiPreferencesProvider } from "@/components/ui-preferences-provider";
import { NotificationsProvider } from "@/components/notifications-provider";
import "./globals.css";
import "./system-premium.css";
import "./typography-premium.css";
import "./a11y-polish.css";
import "./astra-reference.css";
import "./astra-apps.css";
import "./accents.css";
import "./premium-final-polish.css";
import "./loraniq-vuexy-final-polish.css";
import "./loraniq-feature-showcase-polish.css";
import "./loraniq-marketing-conversion-polish.css";
import "./header-premium.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const vazirmatn = localFont({src:"./fonts/Vazirmatn.woff2",display:"swap",variable:"--font-vazirmatn",preload:true});
export const metadata:Metadata={title:"Loraniq Admin — داشبورد مدیریتی حرفه‌ای",description:"قالب پنل مدیریت حرفه‌ای، فارسی و RTL-first برای محصولات مدرن.",icons:{icon:`${basePath}/favicon.svg`,shortcut:`${basePath}/favicon.svg`}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="fa" dir="rtl" suppressHydrationWarning><body className={`${vazirmatn.className} ${vazirmatn.variable}`}><UiPreferencesProvider><NotificationsProvider>{children}</NotificationsProvider></UiPreferencesProvider></body></html>}
