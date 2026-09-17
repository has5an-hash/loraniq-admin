import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loraniq Admin — داشبورد مدیریتی حرفه‌ای",
  description: "قالب پنل مدیریت حرفه‌ای، فارسی و RTL-first برای محصولات مدرن.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl" suppressHydrationWarning><body>{children}</body></html>;
}
