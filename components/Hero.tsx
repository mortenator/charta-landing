"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import WaitlistForm from "@/components/WaitlistForm";

/* ─── Frame config ──────────────────────────────────────────────── */
const FRAME_COUNT = 101;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`
);

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  /* Draw a single frame (cover-fit) */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawW: number, drawH: number, drawX: number, drawY: number;
    if (imgAspect > canvasAspect) {
      drawH = h; drawW = h * imgAspect;
      drawX = (w - drawW) / 2; drawY = 0;
    } else {
      drawW = w; drawH = w / imgAspect;
      drawX = 0; drawY = (h - drawH) / 2;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  /* Preload all frames */
  useEffect(() => {
    FRAMES.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[i] = img;
        setLoadedCount((c) => c + 1);
        if (i === 0) { setFirstFrameReady(true); drawFrame(0); }
      };
    });
  }, [drawFrame]);

  /* Draw frame 0 once canvas is mounted */
  useEffect(() => {
    if (firstFrameReady) drawFrame(0);
  }, [firstFrameReady, drawFrame]);

  /* Scroll → frame */
  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const wrap = scrollWrapRef.current;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const scrolled = -rect.top;
        const maxScroll = wrap.offsetHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
        const frameIndex = Math.min(Math.floor(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafRef.current); };
  }, [drawFrame]);

  /* Redraw on resize */
  useEffect(() => {
    const onResize = () => drawFrame(Math.max(0, currentFrameRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  const loadPercent = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    /*
     * STRUCTURE:
     * - scrollWrap: tall div (280vh) — provides scroll travel
     * - stickyPane: position:sticky top:0 height:100vh — BOTH columns live here
     *   so left text stays visible for the full 280vh scroll
     * - inside: 2-col grid, left = hero text, right = canvas
     */
    <div ref={scrollWrapRef} className="relative" style={{ height: "280vh" }}>
      {/* ── Sticky pane — both columns stay in view ── */}
      <div
        className="sticky top-0 flex items-center px-6"
        style={{ height: "100vh" }}
      >
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center"
          style={{ paddingTop: "64px" /* navbar */ }}>

          {/* ── Left: hero text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="shimmer-border inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/60 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#9281F7" }} />
              Google Workspace Add-on · Now in Beta
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-normal leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              <span className="text-gradient-heading">ThinkCell-quality</span><br />
              <span className="text-gradient-heading">charts. Inside</span><br />
              <span className="text-gradient-purple">Google Slides.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/55 max-w-lg mb-4 leading-relaxed"
            >
              Waterfall charts, Mekko charts, stacked bars — built in seconds,
              right where your team already works. No PowerPoint. No exports. No compromises.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm text-white/35 max-w-md mb-10 leading-relaxed italic"
            >
              Used by consultants, product teams, and analysts who switched to
              Slides and refused to downgrade their charts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <WaitlistForm className="w-full max-w-md" />
              <a href="#demo" className="glass-button px-6 py-3.5 rounded-2xl text-sm font-medium text-white/70 hover:text-white transition-all">
                See how it works ↓
              </a>
            </motion.div>
          </div>

          {/* ── Right: canvas ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full">
              {/* Canvas card */}
              <div
                className="shimmer-border relative w-full overflow-hidden"
                style={{ borderRadius: "12px", aspectRatio: "1400 / 726", background: "#0a0a0a" }}
              >
                {/* Loading bar */}
                {!firstFrameReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="text-xs text-white/25 font-mono">Loading {loadPercent}%</div>
                    <div className="rounded-full overflow-hidden" style={{ width: "80px", height: "2px", background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full transition-all duration-200"
                        style={{ width: `${loadPercent}%`, background: "linear-gradient(to right, #9281F7, #C4B5FD)" }} />
                    </div>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ opacity: firstFrameReady ? 1 : 0, transition: "opacity 0.3s ease" }}
                />
              </div>

              {/* Scroll hint */}
              {firstFrameReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="mt-3 flex items-center justify-center gap-2"
                >
                  <span className="text-[11px] text-white/20 font-mono tracking-wider">scroll to explore</span>
                  <span className="text-white/20 text-xs animate-bounce">↓</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
