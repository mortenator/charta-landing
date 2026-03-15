import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12 px-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#9281F7" }}
          >
            <BarChart3 size={14} color="white" />
          </div>
          <span className="font-semibold text-white text-[14px]">Charta</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-white/50">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <a
            href="mailto:support@getcharta.ai"
            className="hover:text-white transition-colors"
          >
            Support
          </a>
          <a
            href="/llms.txt"
            className="hover:text-white transition-colors font-mono text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            llms.txt
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Charta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
