"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/[0.06]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* Premium dark icon — inspired by high-end dev tool app icons */}
          <div
            className="relative flex items-center justify-center overflow-hidden shrink-0"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              background: "linear-gradient(145deg, #1e1e22 0%, #0b0b0e 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Bottom purple glow — the "rim light" effect */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                bottom: "-6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "28px",
                height: "18px",
                background:
                  "radial-gradient(ellipse at center, rgba(146,129,247,0.7) 0%, transparent 70%)",
                filter: "blur(5px)",
              }}
            />
            {/* Top edge highlight */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.13) 50%, transparent 90%)",
              }}
            />
            {/* Bar chart SVG */}
            <svg
              width="16"
              height="13"
              viewBox="0 0 16 13"
              fill="none"
              className="relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bar-nav" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CBC2FF" />
                  <stop offset="100%" stopColor="#9281F7" />
                </linearGradient>
              </defs>
              <rect x="0"    y="7" width="3.5" height="6"  rx="1" fill="url(#bar-nav)" opacity="0.9"/>
              <rect x="4.5"  y="4" width="3.5" height="9"  rx="1" fill="url(#bar-nav)" opacity="0.92"/>
              <rect x="9"    y="0" width="3.5" height="13" rx="1" fill="url(#bar-nav)"/>
              <rect x="13"   y="4" width="3"   height="9"  rx="1" fill="url(#bar-nav)" opacity="0.65"/>
            </svg>
          </div>
          <span className="font-normal text-white text-[15px]">Charta</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Why Charta", href: "#features" },
            { label: "See it work", href: "#demo" },
            { label: "Plans", href: "#pricing" },
            { label: "Developers", href: "/developers" },
            { label: "Blog", href: "/blog" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA — Resend glass button */}
        <a
          href="https://workspace.google.com/marketplace"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button px-4 py-2 rounded-2xl text-sm font-normal transition-all hover:scale-[1.03]"
        >
          Get early access →
        </a>
      </div>
    </motion.nav>
  );
}
