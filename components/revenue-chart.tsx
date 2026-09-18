"use client";

import { useState } from "react";
import { fa } from "@/lib/dashboard-data";

export default function RevenueChart({ values }: { values: number[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const x = (i: number) => 30 + (i * 580) / (values.length - 1);
  const y = (v: number) => 202 - v * 1.3;
  const points = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <div className="revenue-plot" dir="ltr">
      <svg
        viewBox="0 0 640 245"
        role="img"
        aria-label="نمودار نمونهٔ درآمد در دورهٔ انتخاب‌شده"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8974ed" stopOpacity=".2" />
            <stop offset="100%" stopColor="#8974ed" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[30, 85, 140, 195].map((p, i) => (
          <g key={p}>
            <line x1="30" y1={p} x2="610" y2={p} className="plot-grid" />
            <text x="4" y={p + 4}>{fa(150 - i * 50)}</text>
          </g>
        ))}

        <polyline points="30,193 140,169 255,158 370,120 495,112 610,75" className="plot-target" />
        <polygon points={`30,202 ${points} 610,202`} fill="url(#revenue-fill)" />
        <polyline points={points} className="plot-line" />

        {values.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r={selected === i ? 6 : 3} className="plot-point" />
            <circle
              tabIndex={0}
              role="button"
              aria-label={`نقطه ${fa(i + 1)}، درآمد ${fa(v)} میلیون تومان`}
              onFocus={() => setSelected(i)}
              onBlur={() => setSelected(null)}
              onMouseEnter={() => setSelected(i)}
              onMouseLeave={() => setSelected(null)}
              onClick={() => setSelected(i)}
              cx={x(i)}
              cy={y(v)}
              r="14"
              fill="transparent"
            />
          </g>
        ))}

        {["شروع دوره", "یک‌چهارم", "میانهٔ دوره", "سه‌چهارم", "پایان دوره"].map((v, i) => (
          <text key={v} x={45 + i * 140} y="234" textAnchor="middle">{v}</text>
        ))}
      </svg>

      <span className="chart-readout" aria-live="polite">
        {selected === null || selected >= values.length
          ? "برای جزئیات، نقطه‌ای را انتخاب کنید"
          : `${fa(values[selected])} میلیون تومان · دادهٔ نمونه`}
      </span>
    </div>
  );
}
