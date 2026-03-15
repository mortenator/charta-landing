"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type ChartType = "bar" | "line" | "pie" | "waterfall";

interface BarDatum {
  label: string;
  value: number;
}

interface WaterfallDatum {
  label: string;
  value: number;
  isTotal?: boolean;
}

// ─── Chart type detection ────────────────────────────────────────────────────

function detectChartType(prompt: string): ChartType {
  const p = prompt.toLowerCase();
  if (/user|mau|dau|growth|trend|over.*month|traffic|visit/.test(p))
    return "line";
  if (
    /share|portion|breakdown|split|composition|percent|pie|donut|segment/.test(
      p
    )
  )
    return "pie";
  if (/waterfall|bridge|variance|change|delta|arr/.test(p)) return "waterfall";
  return "bar";
}

// ─── Chart datasets ──────────────────────────────────────────────────────────

const DATASETS: Record<
  string,
  { barData?: BarDatum[]; lineData?: BarDatum[]; pieData?: BarDatum[]; waterfallData?: WaterfallDatum[]; title: string }
> = {
  bar_default: {
    title: "Q1 Revenue by Region",
    barData: [
      { label: "NA", value: 4200 },
      { label: "EMEA", value: 3100 },
      { label: "APAC", value: 2800 },
      { label: "LATAM", value: 1400 },
      { label: "CA", value: 900 },
    ],
  },
  bar_headcount: {
    title: "Headcount by Department",
    barData: [
      { label: "Eng", value: 42 },
      { label: "Sales", value: 28 },
      { label: "Mktg", value: 15 },
      { label: "Design", value: 8 },
      { label: "HR", value: 6 },
    ],
  },
  line: {
    title: "Monthly Active Users",
    lineData: [
      { label: "Jan", value: 24000 },
      { label: "Feb", value: 28000 },
      { label: "Mar", value: 31000 },
      { label: "Apr", value: 35000 },
      { label: "May", value: 38000 },
      { label: "Jun", value: 42000 },
    ],
  },
  pie: {
    title: "Market Share by Product",
    pieData: [
      { label: "Product A", value: 35 },
      { label: "Product B", value: 25 },
      { label: "Product C", value: 20 },
      { label: "Product D", value: 12 },
      { label: "Other", value: 8 },
    ],
  },
  waterfall: {
    title: "ARR Bridge Q4 to Q1",
    waterfallData: [
      { label: "Q4 ARR", value: 4200, isTotal: true },
      { label: "New Biz", value: 800 },
      { label: "Expansion", value: 400 },
      { label: "Churn", value: -300 },
      { label: "Q1 ARR", value: 5100, isTotal: true },
    ],
  },
};

// ─── SVG chart helpers ───────────────────────────────────────────────────────

const CHART_COLORS = ["#9281F7", "#a78bfa", "#38bdf8", "#4ade80", "#f472b6"];
const CL = 52; // chart left
const CT = 20; // chart top
const CR = 388; // chart right
const CB = 185; // chart bottom
const CW = CR - CL; // 336
const CH = CB - CT; // 165

// ─── Bar Chart ───────────────────────────────────────────────────────────────

function BarChart({ data, title }: { data: BarDatum[]; title: string }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const n = data.length;
  const barW = Math.min(52, Math.floor((CW - (n - 1) * 12) / n));
  const step = n > 1 ? (CW - barW) / (n - 1) : 0;

  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" aria-label={title}>
      <text x="200" y="14" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="600">
        {title}
      </text>

      {/* Y-axis gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = CB - pct * CH;
        const val = Math.round(pct * maxVal);
        const label = val >= 1000 ? `${(val / 1000).toFixed(1)}k` : String(val);
        return (
          <g key={pct}>
            <line x1={CL} y1={y} x2={CR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={CL - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8">
              {label}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const barH = (d.value / maxVal) * CH;
        const x = CL + i * step;
        const y = CB - barH;
        return (
          <g key={d.label}>
            <motion.rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={3}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1, originY: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              style={{ transformOrigin: `${x + barW / 2}px ${CB}px` }}
            />
            <text
              x={x + barW / 2}
              y={CB + 12}
              textAnchor="middle"
              fill="rgba(255,255,255,0.45)"
              fontSize="9"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Line Chart ──────────────────────────────────────────────────────────────

function LineChart({ data, title }: { data: BarDatum[]; title: string }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const n = data.length;

  const pts = data.map((d, i) => ({
    x: CL + (i / (n - 1)) * CW,
    y: CB - (d.value / maxVal) * CH,
  }));

  // Smooth cubic bezier path
  const pathD = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = pts[i - 1];
    const cpx = (prev.x + pt.x) / 2;
    return `${acc} C ${cpx} ${prev.y}, ${cpx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  // Area fill path
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${CB} L ${pts[0].x} ${CB} Z`;

  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" aria-label={title}>
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9281F7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9281F7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <text x="200" y="14" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="600">
        {title}
      </text>

      {/* Y-axis gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = CB - pct * CH;
        const val = Math.round(pct * maxVal);
        const label = val >= 1000 ? `${(val / 1000).toFixed(0)}k` : String(val);
        return (
          <g key={pct}>
            <line x1={CL} y1={y} x2={CR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={CL - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8">
              {label}
            </text>
          </g>
        );
      })}

      {/* Area */}
      <motion.path
        d={areaD}
        fill="url(#lineGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#9281F7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* Points + labels */}
      {pts.map((pt, i) => (
        <g key={data[i].label}>
          <motion.circle
            cx={pt.x}
            cy={pt.y}
            r={4}
            fill="#9281F7"
            stroke="#0a0a0a"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
            style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
          />
          <text x={pt.x} y={CB + 12} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
            {data[i].label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Pie Chart ───────────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

function PieChart({ data, title }: { data: BarDatum[]; title: string }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = 130;
  const cy = 108;
  const r = 72;

  let cumulative = 0;
  const slices = data.map((d) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    return { ...d, startAngle, endAngle };
  });

  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" aria-label={title}>
      <text x="200" y="14" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="600">
        {title}
      </text>

      {/* Slices */}
      {slices.map((s, i) => (
        <motion.path
          key={s.label}
          d={arcPath(cx, cy, r, s.startAngle, s.endAngle)}
          fill={CHART_COLORS[i % CHART_COLORS.length]}
          stroke="#0a0a0a"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: "backOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Legend */}
      {data.map((d, i) => (
        <g key={d.label}>
          <rect
            x={268}
            y={40 + i * 28}
            width={10}
            height={10}
            rx={2}
            fill={CHART_COLORS[i % CHART_COLORS.length]}
          />
          <text x={284} y={40 + i * 28 + 9} fill="rgba(255,255,255,0.6)" fontSize="9">
            {d.label}
          </text>
          <text x={388} y={40 + i * 28 + 9} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="9">
            {d.value}%
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Waterfall Chart ─────────────────────────────────────────────────────────

function WaterfallChart({ data, title }: { data: WaterfallDatum[]; title: string }) {
  const maxVal = 5600; // headroom above 5400 peak
  const n = data.length;
  const barW = 42;
  const step = CW / n;

  // Compute bar bounds
  let running = 0;
  const bars = data.map((d) => {
    let barStart: number;
    let barEnd: number;

    if (d.isTotal) {
      barStart = 0;
      barEnd = d.value;
      running = d.value;
    } else {
      barStart = running;
      barEnd = running + d.value;
      running = barEnd;
    }
    return { ...d, barStart, barEnd };
  });

  const toY = (val: number) => CB - (val / maxVal) * CH;

  const barColor = (d: WaterfallDatum & { barStart: number; barEnd: number }) => {
    if (d.isTotal) return "#9281F7";
    if (d.value > 0) return "#4ade80";
    return "#f87171";
  };

  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" aria-label={title}>
      <text x="200" y="14" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="600">
        {title}
      </text>

      {/* Y-axis gridlines */}
      {[0, 1500, 3000, 4500, 6000].map((v) => {
        const y = toY(v);
        if (y < CT || y > CB + 5) return null;
        return (
          <g key={v}>
            <line x1={CL} y1={y} x2={CR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={CL - 6} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8">
              ${(v / 1000).toFixed(1)}M
            </text>
          </g>
        );
      })}

      {/* Connector lines between bars */}
      {bars.map((b, i) => {
        if (i === 0) return null;
        const prevBar = bars[i - 1];
        const prevRightX = CL + (i - 1) * step + (step - barW) / 2 + barW;
        const currLeftX = CL + i * step + (step - barW) / 2;
        const connY = toY(b.isTotal ? b.barEnd : b.barStart);
        const prevTopY = toY(Math.max(prevBar.barStart, prevBar.barEnd));
        const connectorY = b.isTotal ? prevTopY : connY;
        return (
          <line
            key={`conn-${i}`}
            x1={prevRightX}
            y1={connectorY}
            x2={currLeftX}
            y2={connectorY}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            strokeDasharray="3,2"
          />
        );
      })}

      {/* Bars */}
      {bars.map((b, i) => {
        const topY = toY(Math.max(b.barStart, b.barEnd));
        const botY = toY(Math.min(b.barStart, b.barEnd));
        const barH = Math.max(2, botY - topY);
        const x = CL + i * step + (step - barW) / 2;
        const valLabel =
          b.isTotal
            ? `$${(b.barEnd / 1000).toFixed(1)}M`
            : b.value > 0
            ? `+$${(b.value / 1000).toFixed(1)}M`
            : `-$${(Math.abs(b.value) / 1000).toFixed(1)}M`;

        return (
          <g key={b.label}>
            <motion.rect
              x={x}
              y={topY}
              width={barW}
              height={barH}
              rx={3}
              fill={barColor(b)}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
              style={{ transformOrigin: `${x + barW / 2}px ${b.value >= 0 || b.isTotal ? botY : topY}px` }}
            />
            <text x={x + barW / 2} y={CB + 12} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">
              {b.label}
            </text>
            <text
              x={x + barW / 2}
              y={topY - 4}
              textAnchor="middle"
              fill={barColor(b)}
              fontSize="8"
              fontWeight="600"
            >
              {valLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Chart renderer ──────────────────────────────────────────────────────────

function ChartRenderer({ chartType, prompt }: { chartType: ChartType; prompt: string }) {
  const p = prompt.toLowerCase();
  const isHeadcount = /headcount|team|hire|employee|staff|department/.test(p);

  if (chartType === "line") {
    const ds = DATASETS.line;
    return <LineChart data={ds.lineData!} title={ds.title} />;
  }
  if (chartType === "pie") {
    const ds = DATASETS.pie;
    return <PieChart data={ds.pieData!} title={ds.title} />;
  }
  if (chartType === "waterfall") {
    const ds = DATASETS.waterfall;
    return <WaterfallChart data={ds.waterfallData!} title={ds.title} />;
  }
  // bar
  const ds = isHeadcount ? DATASETS.bar_headcount : DATASETS.bar_default;
  return <BarChart data={ds.barData!} title={ds.title} />;
}

// ─── Main Demo component ─────────────────────────────────────────────────────

const SUGGESTIONS = [
  "A bar chart showing Q1 revenue by region",
  "Monthly active users over the last 6 months",
  "Market share comparison for our top 5 products",
];

export default function Demo() {
  const [prompt, setPrompt] = useState(SUGGESTIONS[0]);
  const [activePrompt, setActivePrompt] = useState(SUGGESTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(true);
  const [chartKey, setChartKey] = useState(0);

  const generate = useCallback(
    (p = prompt) => {
      if (!p.trim() || loading) return;
      setLoading(true);
      setGenerated(false);
      setActivePrompt(p);
      setTimeout(() => {
        setLoading(false);
        setGenerated(true);
        setChartKey((k) => k + 1);
      }, 1200);
    },
    [prompt, loading]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") generate();
  };

  const chartType = detectChartType(activePrompt);

  return (
    <section id="demo" className="relative py-24 px-6">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-4">
            <span className="text-gradient-heading">Try it now</span>
          </h2>
          <p className="text-lg text-white/50">
            Describe a chart. Watch it appear.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2 text-sm text-white/50 mb-1">
              <Sparkles size={14} style={{ color: "#9281F7" }} />
              <span>Describe your chart</span>
            </div>

            {/* Input */}
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="e.g. Show an ARR bridge from Q4 to Q1"
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#9281F7]/50 transition-colors pr-12"
              />
            </div>

            {/* Generate button */}
            <button
              onClick={() => generate()}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#9281F7",
                boxShadow: "0 0 20px rgba(124,92,252,0.3)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Generating...
                </>
              ) : generated ? (
                <>
                  <RefreshCw size={15} />
                  Regenerate
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Generate chart
                </>
              )}
            </button>

            {/* Suggestions */}
            <div>
              <p className="text-xs text-white/30 mb-3">Try these prompts:</p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setPrompt(s);
                      generate(s);
                    }}
                    className="text-left text-xs text-white/50 hover:text-white/80 glass rounded-lg px-3 py-2.5 transition-all hover:border-white/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Chart preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl overflow-hidden"
            style={{ minHeight: "360px" }}
          >
            {/* Preview header */}
            <div
              className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-white/30 ml-2">Chart Preview</span>
              {generated && (
                <span
                  className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    color: "#4ade80",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  Ready
                </span>
              )}
            </div>

            {/* Chart area */}
            <div className="flex items-center justify-center p-6" style={{ minHeight: "300px" }}>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <Loader2
                      size={32}
                      className="animate-spin"
                      style={{ color: "#9281F7" }}
                    />
                    <p className="text-sm text-white/40">Building chart...</p>
                  </motion.div>
                ) : generated ? (
                  <motion.div
                    key={`chart-${chartKey}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    <ChartRenderer chartType={chartType} prompt={activePrompt} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <p className="text-white/25 text-sm">
                      Enter a prompt and click Generate
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
