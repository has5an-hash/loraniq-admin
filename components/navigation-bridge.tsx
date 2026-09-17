"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function NavigationBridge() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button) return;

      const label = button.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (label === "تحلیل داده" || label === "Analytics") {
        event.preventDefault();
        window.location.assign(`${basePath}/analytics/`);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
