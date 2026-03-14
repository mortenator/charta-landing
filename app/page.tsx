import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import Features from "@/components/Features";
import ChartTypes from "@/components/ChartTypes";
import Pricing from "@/components/Pricing";
import SecondaryHero from "@/components/SecondaryHero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: "#000000", overflowX: "clip" }}>
      {/* Single focused hero glow */}
      <div
        className="fixed inset-x-0 top-0 h-[600px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(146,129,247,0.12), transparent)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Navbar />
      <Hero />
      <Demo />
      <Features />
      <ChartTypes />
      <Pricing />
      <SecondaryHero />
      <Footer />
    </div>
  );
}
