"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function NavigationBridge() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button) return;

      const label = button.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (label === "تحلیل داده" || label === "Analytics") {
        event.preventDefault();
        router.push("/analytics/");
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
