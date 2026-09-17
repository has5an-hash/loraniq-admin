import type { Metadata } from "next";
import { NavigationBridge } from "@/components/navigation-bridge";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Loraniq Admin — داشبورد مدیریتی حرفه‌ای",
  description: "قالب پنل مدیریت حرفه‌ای، فارسی و RTL-first برای محصولات مدرن.",
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl" suppressHydrationWarning><body><NavigationBridge />{children}</body></html>;
}
