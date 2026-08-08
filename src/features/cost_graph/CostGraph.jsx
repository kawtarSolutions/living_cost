import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const GAP_DEG = 2;

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, outerR, innerR, startDeg, endDeg) {
  const s1 = polarToCartesian(cx, cy, outerR, startDeg);
  const e1 = polarToCartesian(cx, cy, outerR, endDeg);
  const s2 = polarToCartesian(cx, cy, innerR, endDeg);
  const e2 = polarToCartesian(cx, cy, innerR, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y}`,
    "Z",
  ].join(" ");
}

function CostGraph({data}) {
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);
  const animRef = useRef(null);
  const containerRef = useRef(null);

  const NET_SALARY = useSelector(state => state.costOfLiving.net_salary.monthly_value);

  console.log(data);

  const CATEGORIES = [
    { name: "Bills & Fees",   value: parseFloat(data.bills_and_fees.monthly_average_cost),  color: "#AFDDFF" },
    { name: "Transportation", value: parseFloat(data.transportation.monthly_average_cost),  color: "#FD8A6B" },
    { name: "Accommodation",  value: parseFloat(data.accommodations.monthly_total_cost),  color: "#3F9AAE" },
    { name: "Entertainment",  value: parseFloat(data.entertainment.monthly_total_cost),     color: "#79C9C5" },
    { name: "Groceries",      value: parseFloat(data.groceries.monthly_average_cost),       color: "#78B3CE" },
    { name: "Remaining",      value: parseFloat(data.summary.remaining_income),             color: "#B8C4A9" },
  ];

  function computeSlices(categories, total, gap) {
    let cursor = 0;
    return categories.map((cat) => {
      const deg = (cat.value / total) * (360 - gap * categories.length);
      const start = cursor;
      const end = cursor + deg;
      cursor = end + gap;
      return { ...cat, start, end, pct: ((cat.value / total) * 100).toFixed(1) };
    });
  }

  useEffect(() => {
    setProgress(0);
    setSalaryCount(0);
    const duration = 1100;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setProgress(ease);
      setSalaryCount(Math.round(ease * NET_SALARY));
      if (t < 1) animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [NET_SALARY]);

  const slices = computeSlices(CATEGORIES, NET_SALARY, GAP_DEG);
  const CX = 160, CY = 160, OR = 140, IR = 90;

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-stone-100 rounded-lg border border-blue-100 shadow-md hover:shadow-lg 
      transition-shadow duration-300 select-none xl:p-4
       p-5 xl:w-160"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tooltip-card { animation: fadeIn 0.15s ease; }
      `}</style>

      {/* Title */}
      <h2 className="text-stone-800 text-lg font-semibold tracking-tight mb-6">
        Monthly Budget Breakdown
      </h2>

      <div className="flex flex-col sm:flex-row gap-1 items-center">

        {/* Donut SVG */}
        <div className="flex-shrink-0">
          <svg className="h-75 w-79">
            {slices.map((slice, i) => {
              const animatedEnd = slice.start + (slice.end - slice.start) * progress;
              const isHov = hovered === i;
              const scaledOR = isHov ? OR + 10 : OR;
              const path =
                animatedEnd > slice.start
                  ? arcPath(CX, CY, scaledOR, IR, slice.start, Math.min(animatedEnd, slice.end))
                  : "";
              return (
                <path
                  key={i}
                  d={path}
                  fill={slice.color}
                  style={{
                    cursor: "pointer",
                    opacity: hovered !== null && !isHov ? 0.3 : 1,
                    transition: "opacity 0.2s",
                    filter: isHov ? `drop-shadow(0 0 10px ${slice.color}99)` : "none",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

            {/* Center fill */}
            <circle cx={CX} cy={CY} r={IR - 4} fill="#f5f5f4" />

            <text x={CX} y={CY - 14} textAnchor="middle" fill="#a8a29e" fontSize={11}
            fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.08em">
              NET SALARY
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" fill="#1c1917" fontSize={22}
              fontWeight={500} fontFamily="ui-sans-serif, system-ui, sans-serif">
              ${salaryCount.toLocaleString()}
            </text>
            <text x={CX} y={CY + 34} textAnchor="middle" fill="#a8a29e" fontSize={10}
              fontFamily="ui-sans-serif, system-ui, sans-serif">
              per month
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1 sm:w-auto sm:flex-1">
          {slices.map((slice, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: hovered === i ? `${slice.color}18` : "transparent",
                border: `1px solid ${hovered === i ? slice.color + "55" : "transparent"}`,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm shrink-0 transition-all duration-200
                flex justify-between"
                style={{
                  background: slice.color,
                  boxShadow: hovered === i ? `0 0 8px ${slice.color}` : "none",
                }}
              />
              <span className="text-stone-600 text-sm w-50">{slice.name}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: slice.color }}>
                {slice.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Tooltip Card */}
      {hovered !== null && (() => {
        const s = slices[hovered];
        const cardW = 190;
        const contW = containerRef.current?.offsetWidth || 680;
        let left = mousePos.x + 14;
        let top = mousePos.y - 20;
        if (left + cardW > contW - 8) left = mousePos.x - cardW - 14;
        if (top < 8) top = 8;
        return (
          <div
            className="tooltip-card absolute pointer-events-none z-50 rounded-xl p-4 bg-white border shadow-xl"
            style={{
              left,
              top,
              width: cardW,
              borderColor: `${s.color}44`,
              boxShadow: `0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px ${s.color}22`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
              />
              <span className="text-stone-800 text-sm font-semibold">{s.name}</span>
            </div>
            <div className="flex justify-between mb-1.5">
              <span className="text-stone-400 text-xs">Amount</span>
              <span className="text-stone-800 text-sm font-bold">${s.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-stone-400 text-xs">Share</span>
              <span className="text-sm font-bold" style={{ color: s.color }}>{s.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.pct}%`,
                  background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                }}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default CostGraph;