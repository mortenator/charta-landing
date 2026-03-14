"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: [
      "5 AI credits/day",
      "All chart types",
      "Unlimited manual edits",
      "Google Slides only",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$9",
    period: "/mo",
    features: [
      "20 AI credits/day",
      "Priority AI generation",
      "Sheets integration",
      "Email support",
    ],
    cta: "Get Plus",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    features: [
      "Unlimited AI credits",
      "Team sharing (coming soon)",
      "Sheets import",
      "Slides API access",
    ],
    cta: "Get Business",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-px" style={{ width: "400px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-white/25 text-xs font-mono uppercase tracking-[0.15em] mb-3">
            PRICING
          </p>
          {/* H2 — Geist Sans, font-normal (400), gradient text */}
          <h2
            className="text-4xl md:text-5xl font-normal mb-4"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <span className="text-gradient-heading">Simple pricing</span>
          </h2>
          <p className="text-lg text-white/50">
            Free to start. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${tier.highlighted ? "shimmer-border-purple" : "shimmer-border"} rounded-2xl p-8 flex flex-col`}
              style={{
                borderRadius: "12px",
              }}
            >
              <div className="mb-6">
                <p className="text-sm font-normal text-white/60 mb-2">
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-normal text-gradient-heading">
                    {tier.price}
                  </span>
                  <span className="text-white/40 text-sm">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <Check
                      size={15}
                      style={{
                        color: tier.highlighted ? "#9281F7" : "#4ade80",
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-sm text-white/65">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://workspace.google.com/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-2xl text-sm font-normal text-center transition-all hover:scale-[1.02] block ${tier.highlighted ? "glass-button-purple" : "glass-button"}`}
                style={
                  tier.highlighted
                    ? { boxShadow: "0 0 24px rgba(146,129,247,0.2)" }
                    : {}
                }
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
