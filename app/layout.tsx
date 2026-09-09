import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./font-fallback.css";

export const metadata: Metadata = {
  title: "لورانیک | قالب پنل مدیریت فارسی و راست‌چین",
  description: "لورانیک؛ پنل مدیریت مدرن، حرفه‌ای و کاملاً راست‌چین برای ساخت محصولات فارسی.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
