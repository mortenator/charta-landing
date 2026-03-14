"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartBar, Pencil, RefreshCw, Brain } from "lucide-react";

const features = [
  {
    icon: ChartBar,
    iconColor: "#9281F7",
    iconBg: "rgba(146,129,247,0.1)",
    iconBorder: "rgba(146,129,247,0.2)",
    // Aurora: purple glow, top-right
    auroraColor: "rgba(146,129,247,0.35)",
    auroraStyle: { right: "-8%", top: "-5%", width: "55%", height: "85%" },
    title: "The chart types you actually need",
    body: "Waterfall. Mekko. Stacked bar. Gantt. Bubble. Heatmap. The charts that make a slide say something — built natively in Google Slides.",
    // Bento: wide card on the left
    gridClass: "lg:col-span-2",
  },
  {
    icon: Pencil,
    iconColor: "#f472b6",
    iconBg: "rgba(244,114,182,0.1)",
    iconBorder: "rgba(244,114,182,0.2)",
    // Aurora: pink/red glow, top-right
    auroraColor: "rgba(244,114,182,0.35)",
    auroraStyle: { right: "-15%", top: "-15%", width: "80%", height: "80%" },
    title: "Without the PowerPoint tax",
    body: "ThinkCell costs $250–350/user/year and only works in PowerPoint. Charta is a Google Slides add-on. Install in 30 seconds.",
    // Bento: narrow card on the right
    gridClass: "lg:col-span-1",
  },
  {
    icon: RefreshCw,
    iconColor: "#38bdf8",
    iconBg: "rgba(56,189,248,0.1)",
    iconBorder: "rgba(56,189,248,0.2)",
    // Aurora: blue glow, bottom-left
    auroraColor: "rgba(56,189,248,0.35)",
    auroraStyle: { left: "-15%", bottom: "-15%", width: "80%", height: "80%" },
    title: "Sheets-connected, always fresh",
    body: "Pull from Google Sheets and your charts update when your data does.",
    // Bento: narrow card on the left
    gridClass: "lg:col-span-1",
  },
  {
    icon: Brain,
    iconColor: "#4ade80",
    iconBg: "rgba(74,222,128,0.1)",
    iconBorder: "rgba(74,222,128,0.2)",
    // Aurora: green glow, bottom-right (matching original)
    auroraColor: "rgba(74,222,128,0.35)",
    auroraStyle: { right: "-8%", top: "5%", width: "55%", height: "85%" },
    title: "AI helps when you're stuck",
    body: "Describe the chart you want — Charta builds it. Not sure what fits your data? Ask.",
    // Bento: wide card on the right
    gridClass: "lg:col-span-2",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-24 px-6">
      {/* Section-top shimmer line — Resend-style centered glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px"
        style={{
          width: "400px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-white/25 text-xs font-mono uppercase tracking-[0.15em] mb-3">
            WHAT YOU GET
          </p>
          <h2
            className="text-4xl md:text-5xl font-normal mb-4"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <span className="text-gradient-heading">Stop building slides twice.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Your team lives in Google Slides. Your charts shouldn&apos;t
            require a detour through PowerPoint.
          </p>
        </motion.div>

        {/* Bento grid: 3 columns, rows auto. Cards span differently for visual variety */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`shimmer-border relative overflow-hidden flex flex-col ${f.gridClass}`}
                style={{
                  borderRadius: "14px",
                  padding: "28px",
                  minHeight: "200px",
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Aurora / backlight glow — color matches icon, intensifies on hover */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    ...f.auroraStyle,
                    background: `radial-gradient(ellipse at center, ${f.auroraColor} 0%, transparent 70%)`,
                    filter: `blur(${isHovered ? 40 : 30}px)`,
                    opacity: isHovered ? 1 : 0.75,
                    borderRadius: "50%",
                    transition: "opacity 0.4s ease, filter 0.4s ease",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0 relative z-10"
                  style={{
                    background: f.iconBg,
                    border: `1px solid ${f.iconBorder}`,
                    transition: "border-color 0.3s ease, background 0.3s ease",
                    ...(isHovered && {
                      background: f.iconBg.replace("0.1", "0.18"),
                      borderColor: f.iconBorder.replace("0.2", "0.4"),
                    }),
                  }}
                >
                  <f.icon size={18} style={{ color: f.iconColor }} />
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-normal text-white/90 mb-2 relative z-10"
                  style={{ transition: "color 0.3s ease" }}
                >
                  {f.title}
                </h3>
                <p className="text-white/55 leading-relaxed text-sm flex-1 relative z-10">
                  {f.body}
                </p>
                <a
                  href="#demo"
                  className="mt-5 text-sm text-white/30 hover:text-white/70 transition-colors inline-block relative z-10"
                >
                  Learn more →
                </a>

                {/* Bottom fade — card dissolves into page (Resend pattern) */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: "45%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                    borderRadius: "0 0 14px 14px",
                    zIndex: 4,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
