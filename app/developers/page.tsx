"use client";

import { motion } from "framer-motion";
import {
  BarChart3, ArrowRight, Copy, Check,
  Bot, Layers, FileText, Zap,
  Terminal, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── Design tokens ──────────────────────────────────────────────── */
// Updated to match new design system
const PURPLE = "#9281F7";
const PURPLE_LIGHT = "#C4B5FD";
const BORDER_SUBTLE = "1px solid rgba(255,255,255,0.07)";
const SURFACE = "rgba(255,255,255,0.025)";
// Points to API access request until Marketplace listing is approved.
// Replace with: "https://workspace.google.com/marketplace/app/charta/XXXXXXXXXX"
const MARKETPLACE_URL = "mailto:support@getcharta.ai?subject=API%20Access%20Request";

/* ─── Code block ─────────────────────────────────────────────────── */
function Code({ code, lang = "bash" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div
      className="shimmer-border rounded-xl overflow-hidden relative"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      {/* Corner shimmer streaks — Resend-style diagonal light refraction */}
      <div className="code-shimmer-tr" />
      <div className="code-shimmer-bl" />

      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: BORDER_SUBTLE, background: SURFACE }}
      >
        <span className="text-white/25 text-[11px] font-mono">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/55 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-[13px] text-white/75 overflow-x-auto font-mono leading-[1.7] whitespace-pre">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

/* ─── Inline terminal pill ───────────────────────────────────────── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono"
      style={{
        color: PURPLE_LIGHT,
        background: "rgba(146,129,247,0.1)",
        border: "1px solid rgba(146,129,247,0.2)",
      }}
    >
      {children}
    </code>
  );
}

/* ─── Section divider ────────────────────────────────────────────── */
function Divider() {
  return (
    <div
      className="h-px w-full"
      style={{ background: "rgba(255,255,255,0.05)" }}
    />
  );
}

/* ─── Nav ────────────────────────────────────────────────────────── */
function DevNav() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "rgba(8,8,8,0.9)",
        borderBottom: BORDER_SUBTLE,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            {/* Premium dark icon — matches main navbar */}
            <div
              className="relative flex items-center justify-center overflow-hidden shrink-0"
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "7px",
                background: "linear-gradient(145deg, #1e1e22 0%, #0b0b0e 100%)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div aria-hidden="true" className="absolute pointer-events-none" style={{ bottom: "-4px", left: "50%", transform: "translateX(-50%)", width: "22px", height: "14px", background: "radial-gradient(ellipse at center, rgba(146,129,247,0.65) 0%, transparent 70%)", filter: "blur(4px)" }} />
              <div aria-hidden="true" className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "1px", background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.12) 50%, transparent 90%)" }} />
              <svg width="13" height="11" viewBox="0 0 16 13" fill="none" className="relative z-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bar-dev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CBC2FF" />
                    <stop offset="100%" stopColor="#9281F7" />
                  </linearGradient>
                </defs>
                <rect x="0"   y="7" width="3.5" height="6"  rx="1" fill="url(#bar-dev)" opacity="0.9"/>
                <rect x="4.5" y="4" width="3.5" height="9"  rx="1" fill="url(#bar-dev)" opacity="0.92"/>
                <rect x="9"   y="0" width="3.5" height="13" rx="1" fill="url(#bar-dev)"/>
                <rect x="13"  y="4" width="3"   height="9"  rx="1" fill="url(#bar-dev)" opacity="0.65"/>
              </svg>
            </div>
            <span className="text-white/80 font-normal text-sm">Charta</span>
          </Link>
          <span className="text-white/20 text-sm">/</span>
          <span className="text-white/50 text-sm">Developers</span>
          <div className="hidden md:flex items-center gap-5 ml-2">
            {["#quickstart", "#mcp", "#api", "#sdks", "#chart-types"].map(
              (href, i) => (
                <a
                  key={href}
                  href={href}
                  className="text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  {["Quickstart", "MCP", "API", "SDKs", "Chart types"][i]}
                </a>
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-white/35 hover:text-white/60 text-sm transition-colors hidden sm:block"
          >
            ← Site
          </Link>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button-purple flex items-center gap-1.5 px-3.5 py-1.5 font-normal rounded-2xl text-sm transition-all hover:scale-[1.03]"
          >
            Get API key
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Code snippets ──────────────────────────────────────────────── */
const HERO_CODE = `import { Charta } from '@charta/sdk'

const charta = new Charta({ apiKey: process.env.CHARTA_API_KEY })

const chart = await charta.generate({
  type: 'waterfall',
  data: [
    { label: 'Q4 ARR',    value: 4200, isTotal: true },
    { label: 'New Biz',   value:  980 },
    { label: 'Expansion', value:  540 },
    { label: 'Churn',     value: -310 },
    { label: 'Q1 ARR',    value: 5410, isTotal: true },
  ],
})

// chart.svg    → SVG string, embed anywhere
// chart.png    → PNG base64
// chart.chartId → insert into Google Slides`;

const MCP_CONFIG_JSON = `{
  "mcpServers": {
    "charta": {
      "command": "npx",
      "args": ["-y", "@charta/mcp"]
    }
  }
}`;

const MCP_PROMPT = `// Claude / Cursor / Windsurf can now call:
generate_chart({
  type: "waterfall",
  data: [
    { label: "Q4 ARR",    value: 4200, isTotal: true },
    { label: "New Biz",   value: 980 },
    { label: "Expansion", value: 540 },
    { label: "Churn",     value: -310 },
    { label: "Q1 ARR",    value: 5410, isTotal: true },
  ],
})
// → { svg: "...", chartId: "chart_abc123" }`;

const CURL_CODE = `curl -X POST https://api.getcharta.ai/v1/charts/generate \\
  -H "X-Charta-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "waterfall",
    "data": [
      { "label": "Q4 ARR",    "value": 4200, "isTotal": true },
      { "label": "New Biz",   "value": 980 },
      { "label": "Expansion", "value": 540 },
      { "label": "Churn",     "value": -310 },
      { "label": "Q1 ARR",    "value": 5410, "isTotal": true }
    ],
    "output": "svg"
  }'`;

const API_RESPONSE = `{
  "svg": "<svg viewBox=\\"0 0 400 220\\" ...>...</svg>",
  "chartId": "chart_k9x2m",
  "type": "waterfall"
}`;

const PYTHON_CODE = `from charta import Charta

client = Charta(api_key=os.environ["CHARTA_API_KEY"])

chart = client.generate(
    type="waterfall",
    data=[
        {"label": "Q4 ARR",    "value": 4200, "is_total": True},
        {"label": "New Biz",   "value": 980},
        {"label": "Expansion", "value": 540},
        {"label": "Churn",     "value": -310},
        {"label": "Q1 ARR",    "value": 5410, "is_total": True},
    ],
)

chart.save("arr_bridge.png")
chart.insert_to_slides(slides_id=DECK_ID, slide_index=3)`;

/* ─── Data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: Bot,
    label: "AI Agents",
    desc: "MCP server. Works in Claude, Cursor, Windsurf. One config block — no glue code.",
    color: PURPLE,
  },
  {
    Icon: Layers,
    label: "SaaS Products",
    desc: "REST API. POST data, get SVG or PNG back. Fits any backend pipeline.",
    color: "#38bdf8",
  },
  {
    Icon: FileText,
    label: "Report Automation",
    desc: "Query a DB, generate charts, insert into a Google Slides template. Schedule it.",
    color: "#4ade80",
  },
  {
    Icon: Zap,
    label: "No-code Workflows",
    desc: "Works as an HTTP node in Zapier, Make, or n8n. Input data → chart output.",
    color: "#f472b6",
  },
];

const CHART_TYPES = [
  ["waterfall",   "[{label, value, isTotal?}]",  "ARR bridge, P&L"],
  ["bar",         "[{label, value}]",             "Rankings, comparisons"],
  ["grouped-bar", "[{label, values[]}]",          "Multi-series"],
  ["stacked-bar", "[{label, values[]}]",          "Composition"],
  ["line",        "[{label, value}]",             "Trends over time"],
  ["area",        "[{label, value}]",             "Volume trends"],
  ["pie / donut", "[{label, value, color?}]",     "Market share"],
  ["scatter",     "[{x, y, label?}]",             "Correlations"],
  ["gantt",       "[{task, start, end}]",         "Timelines"],
  ["mekko",       "[{label, segments[]}]",        "Strategy charts"],
  ["radar",       "[{label, value}]",             "Multi-axis comparison"],
  ["heatmap",     "[{row, col, value}]",          "Matrices, cohorts"],
];

const MCP_TOOLS = [
  { name: "generate_chart",   desc: "Generate a chart — SVG string + chartId" },
  { name: "list_chart_types", desc: "All supported types with data shapes" },
  { name: "get_chart_schema", desc: "JSON schema for a specific chart type" },
  { name: "save_chart",       desc: "Write chart to disk as SVG or PNG" },
  { name: "describe_chart",   desc: "Recommend the best chart type for given data" },
];

/* ─── Main ───────────────────────────────────────────────────────── */
export default function DevelopersPage() {
  const [mcpTab, setMcpTab] = useState<"config" | "usage">("config");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fade = (delay = 0): any => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fadeIn = (delay = 0): any => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <main className="min-h-screen text-white" style={{ background: "#000000" }}>
      <DevNav />

      {/* ── Hero ── */}
      <section id="quickstart" className="relative pt-20 pb-16 px-5">
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(146,129,247,0.25) 50%, transparent 100%)" }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <motion.div {...fade(0)} className="flex items-center gap-2 mb-6">
              <span className="text-white/30 text-xs font-mono uppercase tracking-widest">
                Charta Developers
              </span>
            </motion.div>

            {/* H1 — Instrument Serif, font-normal, gradient text */}
            <motion.h1
              {...fade(0.05)}
              className="text-4xl md:text-5xl font-normal tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              <span className="text-gradient-heading">Build charts into</span>
              <br />
              <span className="text-gradient-purple">any product.</span>
            </motion.h1>

            <motion.p
              {...fade(0.1)}
              className="text-white/45 text-[17px] leading-relaxed mb-8 max-w-md"
            >
              REST API, MCP server, and typed SDKs for generating
              presentation-quality charts programmatically — from AI agents,
              pipelines, or SaaS products.
            </motion.p>

            {/* Use case cards — shimmer-border */}
            <motion.div
              {...fade(0.14)}
              className="grid grid-cols-2 gap-2 mb-8"
            >
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="shimmer-border flex items-start gap-2.5 p-3 rounded-xl"
                >
                  <f.Icon
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    strokeWidth={1.8}
                    style={{ color: f.color }}
                  />
                  <div>
                    <div className="text-white/90 text-sm font-normal leading-tight">
                      {f.label}
                    </div>
                    <div className="text-white/35 text-xs leading-relaxed mt-0.5">
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div {...fade(0.18)} className="flex items-center gap-3">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button-purple flex items-center gap-2 px-4 py-2.5 font-normal rounded-2xl text-sm transition-all hover:scale-[1.03]"
              >
                Get API key <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="#mcp"
                className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                MCP setup <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right — code */}
          <motion.div {...fade(0.08)}>
            <Code code={HERO_CODE} lang="typescript" />
            <div className="mt-3 flex items-center gap-4">
              <code className="text-white/25 text-xs font-mono">
                npm install @charta/sdk
              </code>
              <span className="text-white/15 text-xs">·</span>
              <code className="text-white/25 text-xs font-mono">
                pip install charta
              </code>
              <span className="text-white/15 text-xs">·</span>
              <code className="text-white/25 text-xs font-mono">
                npx @charta/mcp
              </code>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── MCP ── */}
      <section id="mcp" className="relative py-20 px-5">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div {...fadeIn()}>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-4 h-4" strokeWidth={1.8} style={{ color: PURPLE }} />
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: PURPLE }}
              >
                MCP Server
              </span>
            </div>
            <h2
              className="text-3xl font-normal tracking-tight mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="text-gradient-heading">Native tool for AI agents.</span>
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-6">
              <Pill>npx @charta/mcp</Pill> — no install, no auth setup. Add
              one config block and your AI agent can generate charts as a
              first-class tool.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Works with Claude Desktop, Cursor, Windsurf, Cline, Continue, and
              any MCP-compatible client. The agent picks the right chart type,
              handles the data, and returns SVG.
            </p>
            <div className="space-y-2">
              {MCP_TOOLS.map((t) => (
                <div
                  key={t.name}
                  className="shimmer-border flex items-center gap-3 py-2.5 px-3 rounded-xl"
                >
                  <code
                    className="text-xs font-mono w-40 flex-shrink-0"
                    style={{ color: PURPLE_LIGHT }}
                  >
                    {t.name}
                  </code>
                  <span className="text-white/35 text-xs">{t.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div {...fadeIn(0.08)} className="space-y-3">
            <div
              className="flex"
              style={{ borderBottom: BORDER_SUBTLE }}
            >
              {(["config", "usage"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMcpTab(tab)}
                  className={`relative px-4 py-2 text-xs font-mono transition-all rounded-lg mr-1 ${
                    mcpTab === tab
                      ? "text-white tab-active-3d"
                      : "text-white/35 hover:text-white/55"
                  }`}
                  style={
                    mcpTab === tab
                      ? {
                          background: "linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, rgba(0,0,0,0.6) 100%)",
                          boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
                        }
                      : {}
                  }
                >
                  {tab === "config"
                    ? "claude_desktop_config.json"
                    : "usage"}
                </button>
              ))}
            </div>
            <Code
              code={mcpTab === "config" ? MCP_CONFIG_JSON : MCP_PROMPT}
              lang={mcpTab === "config" ? "json" : "typescript"}
            />
            <p className="text-white/25 text-xs font-mono">
              Same config for Cursor (.cursor/mcp.json) and Windsurf
              (~/.codeium/windsurf/mcp_config.json)
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── REST API ── */}
      <section id="api" className="relative py-20 px-5">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — code */}
          <motion.div {...fadeIn()} className="space-y-3">
            <Code code={CURL_CODE} lang="bash" />
            <div className="flex items-center gap-2 px-1">
              <span className="text-white/20 text-xs font-mono">Response:</span>
            </div>
            <Code code={API_RESPONSE} lang="json" />
          </motion.div>

          {/* Right */}
          <motion.div {...fadeIn(0.08)}>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-[#38bdf8]" strokeWidth={1.8} />
              <span className="text-[#38bdf8] text-xs font-mono uppercase tracking-widest">
                REST API
              </span>
            </div>
            <h2
              className="text-3xl font-normal tracking-tight mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="text-gradient-heading">One request. One chart.</span>
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-6">
              POST your data. Get back SVG or PNG. No sessions, no SDKs
              required — works from any language, any pipeline.
            </p>
            <div className="space-y-0">
              {[
                { label: "Base URL", value: "https://api.getcharta.ai/v1" },
                { label: "Auth header", value: "X-Charta-Key: YOUR_API_KEY" },
                { label: "Output formats", value: "svg · png · slides_url" },
                {
                  label: "Rate limits",
                  value: "Free: 5/day · Plus: 20/day · Business: unlimited",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-start gap-4 py-3"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-white/30 text-xs w-28 flex-shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <code className="text-white/65 text-xs font-mono">
                    {row.value}
                  </code>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-normal transition-colors hover:opacity-80"
                style={{ color: PURPLE }}
              >
                Get API key <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SDKs ── */}
      <section id="sdks" className="relative py-20 px-5">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div {...fadeIn()}>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-[#34d399]" strokeWidth={1.8} />
              <span className="text-[#34d399] text-xs font-mono uppercase tracking-widest">
                SDKs
              </span>
            </div>
            <h2
              className="text-3xl font-normal tracking-tight mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="text-gradient-heading">Typed for your stack.</span>
            </h2>
            <p className="text-white/45 text-[15px] leading-relaxed mb-6">
              Full type coverage for all chart types and options. Autocomplete
              tells you exactly what data each chart expects.
            </p>
            <div className="space-y-2">
              {[
                { lang: "JavaScript", cmd: "npm install @charta/sdk" },
                { lang: "Python",     cmd: "pip install charta" },
                { lang: "MCP",        cmd: "npx @charta/mcp" },
              ].map((row) => (
                <div
                  key={row.lang}
                  className="shimmer-border flex items-center gap-3 p-3 rounded-xl"
                >
                  <span className="text-white/25 text-xs w-24 font-mono">
                    {row.lang}
                  </span>
                  <code className="text-white/60 text-xs font-mono">
                    {row.cmd}
                  </code>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div {...fadeIn(0.08)}>
            <Code code={PYTHON_CODE} lang="python" />
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── Chart types table ── */}
      <section id="chart-types" className="relative py-20 px-5">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn()} className="mb-10">
            <h2
              className="text-3xl font-normal tracking-tight mb-2"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="text-gradient-heading">Supported chart types</span>
            </h2>
            <p className="text-white/40 text-sm">
              12 types. All return valid SVG at configurable dimensions.
            </p>
          </motion.div>
          <motion.div
            {...fadeIn(0.06)}
            className="shimmer-border rounded-xl overflow-hidden relative"
          >
            <div className="code-shimmer-tr" />
            <div className="code-shimmer-bl" />
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    borderBottom: BORDER_SUBTLE,
                    background: SURFACE,
                  }}
                >
                  <th className="text-left px-5 py-3 text-white/30 text-xs font-normal">
                    type
                  </th>
                  <th className="text-left px-5 py-3 text-white/30 text-xs font-normal hidden md:table-cell">
                    data shape
                  </th>
                  <th className="text-left px-5 py-3 text-white/30 text-xs font-normal hidden lg:table-cell">
                    best for
                  </th>
                </tr>
              </thead>
              <tbody>
                {CHART_TYPES.map(([type, shape, use], i) => (
                  <tr
                    key={type}
                    style={{
                      borderBottom:
                        i < CHART_TYPES.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                    }}
                  >
                    <td className="px-5 py-3">
                      <code
                        className="font-mono text-xs"
                        style={{ color: PURPLE_LIGHT }}
                      >
                        {type}
                      </code>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <code className="text-white/35 font-mono text-xs">
                        {shape}
                      </code>
                    </td>
                    <td className="px-5 py-3 text-white/35 text-xs hidden lg:table-cell">
                      {use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── CTA ── */}
      <section className="relative py-20 px-5">
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(146,129,247,0.25) 50%, transparent 100%)" }} />
        <div className="max-w-6xl mx-auto">
          <div
            className="shimmer-border-purple rounded-2xl p-10 md:p-14"
            style={{ borderRadius: "16px" }}
          >
            <div className="max-w-xl">
              <h2
                className="text-3xl font-normal tracking-tight mb-3"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                <span className="text-gradient-heading">Start building today.</span>
              </h2>
              <p className="text-white/45 text-[15px] leading-relaxed mb-7">
                Free tier included — 5 AI credits/day, all chart types, no
                credit card required. Upgrade when you need more.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={MARKETPLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button-purple flex items-center gap-2 px-5 py-2.5 font-normal rounded-2xl text-sm transition-all hover:scale-[1.03]"
                >
                  Get API key — free{" "}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </a>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white/60 text-sm transition-colors"
                >
                  ← getcharta.ai
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-5 py-8"
        style={{ borderTop: BORDER_SUBTLE }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ backgroundColor: PURPLE }}
            >
              <BarChart3 className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white/30 text-sm">Charta</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-white/25">
            <Link
              href="/privacy"
              className="hover:text-white/50 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/50 transition-colors"
            >
              Terms
            </Link>
            <a
              href="mailto:support@getcharta.ai"
              className="hover:text-white/50 transition-colors"
            >
              Support
            </a>
            <a
              href="/llms.txt"
              className="hover:text-white/50 transition-colors font-mono"
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
