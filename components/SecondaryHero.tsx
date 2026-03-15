"use client";

import { motion } from "framer-motion";

export default function SecondaryHero() {
  return (
    <section className="relative py-24 px-6">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(146,129,247,0.25) 50%, transparent 100%)" }} />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shimmer-border-purple rounded-3xl p-12 md:p-16 text-center"
          style={{
            borderRadius: "24px",
          }}
        >
          <p className="text-white/25 text-xs font-mono uppercase tracking-[0.15em] mb-3">
            GET STARTED
          </p>
          {/* H2 — Geist Sans, font-normal, gradient text */}
          <h2
            className="text-4xl md:text-5xl font-normal mb-6 leading-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <span className="text-gradient-heading">Stop building slides twice.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your team lives in Google Slides. Your charts shouldn&apos;t require
            a detour through PowerPoint. Charta brings the full chart toolkit to
            Slides — with the polish your decks deserve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://workspace.google.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-purple px-8 py-3.5 rounded-2xl text-sm font-normal transition-all hover:scale-[1.02]"
            >
              Get early access — it&apos;s free
            </a>
            <p className="text-sm text-white/40">
              Free during beta · No credit card required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
