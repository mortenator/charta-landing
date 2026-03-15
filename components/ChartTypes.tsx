"use client";

import { motion } from "framer-motion";
import {
  ChartBar,
  ChartLine,
  ChartPie,
  Donut,
  ChartColumnDecreasing,
  ChartScatter,
  ChartArea,
  ChartNoAxesCombined,
  ChartGantt,
  LayoutGrid,
  Radar,
  Grid3x3,
  ChartColumnStacked,
  Bubbles,
} from "lucide-react";

const chartTypes = [
  { label: "Bar", icon: ChartBar },
  { label: "Line", icon: ChartLine },
  { label: "Pie", icon: ChartPie },
  { label: "Donut", icon: Donut },
  { label: "Waterfall", icon: ChartColumnDecreasing },
  { label: "Scatter", icon: ChartScatter },
  { label: "Area", icon: ChartArea },
  { label: "Combo", icon: ChartNoAxesCombined },
  { label: "Gantt", icon: ChartGantt },
  { label: "Mekko", icon: LayoutGrid },
  { label: "Radar", icon: Radar },
  { label: "Heatmap", icon: Grid3x3 },
  { label: "Stacked Bar", icon: ChartColumnStacked },
  { label: "Bubble", icon: Bubbles },
];

export default function ChartTypes() {
  return (
    <section className="relative py-24 px-6">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-white/25 text-xs font-mono uppercase tracking-[0.15em] mb-3">
            CHART LIBRARY
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal mb-4"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <span className="text-gradient-heading">Every chart type your deck needs</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {chartTypes.map((ct, i) => (
            <motion.div
              key={ct.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex flex-col items-center gap-2 cursor-default group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(146,129,247,0.4)";
                  el.style.background = "rgba(146,129,247,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "#111111";
                }}
              >
                <ct.icon size={20} className="text-white/50 group-hover:text-white/70 transition-colors" />
              </div>
              <span className="text-xs text-white/50 font-medium text-center leading-tight max-w-[56px]">
                {ct.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
