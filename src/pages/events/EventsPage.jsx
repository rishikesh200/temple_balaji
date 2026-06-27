import React, { useState } from "react"
import EventTimeline from "./components/EventTimeline"
import DonateCTA from "../../components/DonateCTA"
import eventImg1 from "../../assets/images/festival.jpg"
import eventImg2 from "../../assets/images/temple-gopuram.jpg"
import eventImg3 from "../../assets/images/gallery-1.jpg"
import eventImg4 from "../../assets/images/darshan.jpg"
import { Sparkles, Flame, Heart } from "lucide-react"
import { useAdminData } from "../../admin/contexts/AdminDataContext"
import { useLanguage } from "../../contexts/LanguageContext"
import { t } from "../../utils/i18n"
import { motion } from "framer-motion"
import { FadeUp } from "../../components/Motion"

const TR = {
  label:      { en: "Temple Calendar & Happenings",                                                                                   ta: "கோயில் நிகழ்வு அட்டவணை" },
  heading:    { en: "Sacred Celebrations & Milestones",                                                                               ta: "புனித கொண்டாட்டங்கள் & நிகழ்வுகள்" },
  sub:        { en: "Explore the vibrant spiritual calendar, grand chariot festivals, and food drives that bring our community together.", ta: "தெய்வீக அட்டவணை, தேர் விழாக்கள் மற்றும் அன்னதான நிகழ்வுகளை ஆராயுங்கள்." },
  all:        { en: "All Happenings",   ta: "அனைத்து நிகழ்வுகள்" },
  festivals:  { en: "Festivals & Celebrations", ta: "திருவிழாக்கள்" },
  community:  { en: "Community Seva",   ta: "சமூக சேவை" },
}

const IMAGE_MAP = { festival: eventImg1, gopuram: eventImg2, gallery1: eventImg3, darshan: eventImg4 }

export default function EventsPage() {
  const { activeEvents } = useAdminData()
  const { lang } = useLanguage()
  const [activeFilter, setActiveFilter] = useState("all")

  // Map admin events → format expected by EventTimeline
  const eventsData = activeEvents.map(e => ({
    ...e,
    image: e.imageUrl || IMAGE_MAP[e.imageKey] || eventImg1,
  }))

  const filteredEvents = eventsData.filter(event => {
    if (activeFilter === "all") return true
    return event.category === activeFilter
  })

  return (
    <div className="min-h-screen bg-parchment">
      {/* 1. Gorgeous Divine Gradient Header */}
      <header className="relative py-16 bg-gradient-to-r from-maroon-dark to-maroon text-white border-b-4 border-gold text-center overflow-hidden">
        {/* Divine Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.span className="text-gold tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase mb-4 block flex items-center justify-center gap-1.5"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Sparkles className="w-4 h-4 text-gold" /> Temple Calendar & Happenings
          </motion.span>
          <motion.h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}>
            {t(TR.heading, lang)}
          </motion.h1>
          <motion.p className="text-white/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            {t(TR.sub, lang)}
          </motion.p>
        </div>
      </header>

      {/* 2. Page Content Column */}
      <div className="max-w-6xl mx-auto px-4 py-12 parchment-bg">
        
        {/* Interactive Filter Pills bar */}
        <div className="flex justify-center items-center gap-2.5 sm:gap-3 flex-wrap mb-12">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              activeFilter === "all"
                ? "bg-btn-bg text-btn-text border-maroon ring-2 ring-gold shadow-md"
                : "bg-white text-earth-medium border-border-warm hover:border-maroon"
            }`}
          >
            {t(TR.all, lang)} ({eventsData.length})
          </button>

          <button type="button" onClick={() => setActiveFilter("upcoming")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "upcoming"
                ? "bg-btn-bg text-btn-text border-maroon ring-2 ring-gold shadow-md"
                : "bg-white text-earth-medium border-border-warm hover:border-maroon"
            }`}>
            <Flame className="w-3.5 h-3.5" />
            {t(TR.festivals, lang)} ({eventsData.filter(e => e.category === "upcoming").length})
          </button>

          <button type="button" onClick={() => setActiveFilter("community")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "community"
                ? "bg-btn-bg text-btn-text border-maroon ring-2 ring-gold shadow-md"
                : "bg-white text-earth-medium border-border-warm hover:border-maroon"
            }`}>
            <Heart className="w-3.5 h-3.5" />
            {t(TR.community, lang)} ({eventsData.filter(e => e.category === "community").length})
          </button>
        </div>

        <EventTimeline events={filteredEvents} lang={lang} />

        {/* Divine Donate CTA Spacer */}
        <div className="mt-16">
          <DonateCTA />
        </div>

      </div>
    </div>
  )
}

