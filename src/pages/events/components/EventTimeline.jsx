import { Link } from "react-router-dom"
import { Clock, MapPin, Users, Calendar, Sparkles, Flame, Heart, ChevronRight, ArrowRight } from "lucide-react"
import { useLanguage } from "../../../contexts/LanguageContext"
import { getT, t } from "../../../utils/i18n"

const TR = {
  festival:  { en: "Festival",       ta: "திருவிழா" },
  community: { en: "Community Drive", ta: "சமூக சேவை" },
}

// Helper to resolve custom category icons
const getCategoryIcon = (category) => {
  switch (category) {
    case "upcoming":
      return <Flame className="w-5 h-5 text-white" />
    case "community":
      return <Heart className="w-5 h-5 text-white" />
    default:
      return <Sparkles className="w-5 h-5 text-white" />
  }
}

function EventCard({ event, index, lang }) {
  const isEven = index % 2 === 0

  return (
    <div className={`relative mb-12 flex flex-col md:flex-row items-center justify-between w-full ${
      isEven ? "md:flex-row-reverse" : ""
    }`}>
      
      {/* 1. Date & Image Section (Occupies left/right 45% on desktop) */}
      <div className={`w-full md:w-[45%] flex flex-col ${
        isEven ? "md:items-start md:pl-8" : "md:items-end md:pr-8"
      }`}>
        {/* Modern Date Badge */}
        <span className="bg-btn-bg text-btn-text border border-gold px-3.5 py-1.5 rounded-xl font-mono uppercase text-xs tracking-wider shadow-xs font-bold mb-3.5 inline-block">
          {event.date}
        </span>
        
        {/* Event Image Box */}
        <div className="w-full h-56 rounded-2xl overflow-hidden shadow-md border-2 border-border-warm group relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-maroon text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-gold/30">
            {event.category === "upcoming" ? t(TR.festival, lang) : t(TR.community, lang)}
          </span>
        </div>
      </div>

      {/* 2. central vertical timeline node marker (glowing icon badge) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-maroon border-2 border-gold flex items-center justify-center shadow-lg ring-4 ring-parchment hover:scale-110 transition-transform">
          {getCategoryIcon(event.category)}
        </div>
      </div>

      {/* 3. Event Details Content Card (Occupies opposite 45% on desktop) */}
      <div className={`w-full md:w-[45%] mt-6 md:mt-0 ${
        isEven ? "md:pr-8 pl-12 md:pl-0" : "md:pl-8 pl-12"
      }`}>
        <div className="bg-white rounded-3xl p-6 border border-border-warm shadow-xs relative overflow-hidden group hover:border-gold/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-gold/15">
          {/* Gold bottom trim */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-maroon" />

          {/* Event Title */}
          <h3 className="text-xl md:text-2xl font-serif text-earth-dark font-bold group-hover:text-maroon transition-colors leading-snug mb-3">
            {getT(event, 'title', lang)}
          </h3>

          <p className="text-earth-medium text-xs md:text-sm leading-relaxed mb-5 font-medium">
            {getT(event, 'details', lang)}
          </p>

          <div className="space-y-2 border-t border-parchment-soft pt-4 mb-5 text-[11px] md:text-xs text-earth-medium font-semibold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>{getT(event, 'location', lang)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold shrink-0" />
              <span>{event.participants}</span>
            </div>
          </div>

          {/* Volunteering/Sponsorship Action CTA */}
          <Link
            to={event.ctaLink}
            className="inline-flex items-center gap-1.5 bg-btn-bg text-btn-text px-4 py-2 rounded-xl text-xs font-bold hover:bg-btn-bg-hover transition-all border border-gold shadow-xs"
          >
            <span>{event.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default function EventTimeline({ events = [], lang = 'en' }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-border-warm p-8">
        <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
        <h3 className="font-serif text-lg font-bold text-earth-dark">No Events Scheduled</h3>
        <p className="text-xs text-earth-medium mt-1">There are no temple events scheduled matching the selected filter category.</p>
      </div>
    )
  }

  return (
    <section className="relative py-8">
      {/* 
        Central Vertical Timeline Line 
        - Centered on md and up
        - Positioned to the left (pl-4) on small screens to match nodes
      */}
      <div className="absolute left-9 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-maroon to-gold" aria-hidden />

      <div className="relative space-y-2 md:space-y-0">
        {events.map((ev, idx) => (
          <EventCard key={ev.id} event={ev} index={idx} lang={lang} />
        ))}
      </div>
    </section>
  )
}

