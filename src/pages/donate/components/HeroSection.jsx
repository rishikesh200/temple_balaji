import React from "react"
import { Sparkles } from "lucide-react"
import heroImg from "../../../assets/images/hero-balaji.jpg"

export default function HeroSection() {
  return (
    <header className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Lord Balaji Temple Sanctum"
          className="w-full h-full object-cover opacity-95 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A0A0A]/65 via-[#3A0A0A]/35 to-[#FDF8F3]" />
      </div>
      <div className="relative z-10 text-center max-w-3xl px-4 pt-8 pb-12">
        <span className="text-[#D4A853] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block flex items-center justify-center gap-1.5 justify-center">
          <Sparkles className="w-4 h-4 text-[#D4A853]" /> Sacred Charity & Support
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          Sustain Sacred Traditions &amp;
          <br />
          Empower Divine Community
        </h1>
        <p className="text-white/85 max-w-2xl mx-auto mb-10 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
          Participate in the upkeep of our temple, support free meal distribution (Annadanam), promote Vedic education, and preserve ancient spiritual heritage for generations to come.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#causes"
            className="inline-flex items-center gap-2 bg-[#D4A853] text-[#2D1810] px-8 py-3.5 rounded-xl text-xs font-bold hover:bg-[#c49b2e] hover:-translate-y-0.5 transition-all shadow-lg border border-[#D4A853]"
          >
            <span>Choose a Sacred Cause</span>
            <span aria-hidden className="text-sm">
              ↓
            </span>
          </a>
          <a
            href="#impact"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-xl text-xs font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all"
          >
            See Our Impact
          </a>
        </div>
      </div>
    </header>
  )
}
