import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "لورانیک | قالب پنل مدیریت فارسی و راست‌چین", description: "لورانیک؛ پنل مدیریت مدرن، حرفه‌ای و کاملاً راست‌چین برای ساخت محصولات فارسی.", icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fa" dir="rtl"><body>{children}</body></html>; }
