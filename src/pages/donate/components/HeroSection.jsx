import React from "react"
import { Sparkles } from "lucide-react"
import { useLanguage } from "../../../contexts/LanguageContext"
import heroImg from "../../../assets/images/hero-balaji.jpg"
import { motion } from "framer-motion"

const HERO_TRANSLATIONS = {
  en: {
    eyebrow: "Sacred Charity & Support",
    titleLine1: "Sustain Sacred Traditions &",
    titleLine2: "Empower Divine Community",
    description: "Participate in the upkeep of our temple, support free meal distribution (Annadanam), promote Vedic education, and preserve ancient spiritual heritage for generations to come.",
    chooseCause: "Choose a Sacred Cause",
    seeImpact: "See Our Impact",
  },
  ta: {
    eyebrow: "பூஜை நன்கொடைகள் & ஆதரவு",
    titleLine1: "ஆவாரமான பாரம்பரியங்களை பராமரிக்கவும் &",
    titleLine2: "தெய்வீக சமூகத்தை பலப்படுத்தவும்",
    description: "எங்கள் கோயிலை பராமரிக்க உள்பட, உணவளிப்பு (அன்னதானம்), வேதப் கல்வி மற்றும் பழமையான ஆன்மீக பாரம்பரியத்தை தொடர்ந்து பராமரிக்க பங்கேற்கவும்.",
    chooseCause: "ஒரு புனித காரணத்தை தேர்வு செய்யவும்",
    seeImpact: "எங்கள் தாக்கத்தை பார்க்கவும்",
  },
}

export default function HeroSection() {
  const { lang } = useLanguage()
  const t = HERO_TRANSLATIONS[lang] || HERO_TRANSLATIONS.en
  return (
    <header className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Lord Balaji Temple Sanctum"
          className="w-full h-full object-cover opacity-95 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/65 via-maroon-dark/35 to-parchment" />
      </div>
      <div className="relative z-10 text-center max-w-3xl px-4 pt-8 pb-12">
        <motion.span className="text-gold text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 block flex items-center justify-center gap-1.5 justify-center"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Sparkles className="w-4 h-4 text-gold" /> {t.eyebrow}
        </motion.span>
        <motion.h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>
          {t.titleLine1}
          <br />
          {t.titleLine2}
        </motion.h1>
        <motion.p className="text-white/85 max-w-2xl mx-auto mb-10 text-xs sm:text-sm md:text-base leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          {t.description}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#causes"
            className="inline-flex items-center gap-2 bg-gold text-earth-dark px-8 py-3.5 rounded-xl text-xs font-bold hover:bg-gold-deep hover:-translate-y-0.5 transition-all shadow-lg border border-gold"
          >
            <span>{t.chooseCause}</span>
            <span aria-hidden className="text-sm">
              ↓
            </span>
          </a>
          <a
            href="#impact"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-xl text-xs font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all"
          >
            {t.seeImpact}
          </a>
        </div>
      </div>
    </header>
  )
}
