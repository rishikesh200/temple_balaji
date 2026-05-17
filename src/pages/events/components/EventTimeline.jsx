import { Link } from "react-router-dom"
import { 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  Sparkles, 
  Flame, 
  Heart,
  ChevronRight,
  ArrowRight
} from "lucide-react"

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

function EventCard({ event, index }) {
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
        <span className="bg-[#8B1A1A] text-white border border-[#D4A853] px-3.5 py-1.5 rounded-xl font-mono uppercase text-xs tracking-wider shadow-xs font-bold mb-3.5 inline-block">
          {event.date}
        </span>
        
        {/* Event Image Box */}
        <div className="w-full h-56 rounded-2xl overflow-hidden shadow-md border-2 border-[#E5D5C5] group relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#8B1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#D4A853]/30">
            {event.category === "upcoming" ? "Festival" : "Community Drive"}
          </span>
        </div>
      </div>

      {/* 2. central vertical timeline node marker (glowing icon badge) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-[#8B1A1A] border-2 border-[#D4A853] flex items-center justify-center shadow-lg ring-4 ring-[#FDF8F3] hover:scale-110 transition-transform">
          {getCategoryIcon(event.category)}
        </div>
      </div>

      {/* 3. Event Details Content Card (Occupies opposite 45% on desktop) */}
      <div className={`w-full md:w-[45%] mt-6 md:mt-0 ${
        isEven ? "md:pr-8 pl-12 md:pl-0" : "md:pl-8 pl-12"
      }`}>
        <div className="bg-white rounded-3xl p-6 border border-[#E5D5C5] shadow-xs relative overflow-hidden group hover:border-[#D4A853]/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-[#D4A853]/15">
          {/* Gold bottom trim */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B1A1A]" />

          {/* Event Title */}
          <h3 className="text-xl md:text-2xl font-serif text-[#2D1810] font-bold group-hover:text-[#8B1A1A] transition-colors leading-snug mb-3">
            {event.title}
          </h3>
          
          {/* Details Paragraph */}
          <p className="text-[#6B4423] text-xs md:text-sm leading-relaxed mb-5 font-medium">
            {event.details}
          </p>

          {/* Event Metadata row (Location, Time, etc.) */}
          <div className="space-y-2 border-t border-[#F5E6D3] pt-4 mb-5 text-[11px] md:text-xs text-[#6B4423] font-semibold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4A853] shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4A853] shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D4A853] shrink-0" />
              <span>{event.participants}</span>
            </div>
          </div>

          {/* Volunteering/Sponsorship Action CTA */}
          <Link
            to={event.ctaLink}
            className="inline-flex items-center gap-1.5 bg-[#8B1A1A] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#6B1414] transition-all border border-[#D4A853] shadow-xs"
          >
            <span>{event.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4A853]" />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default function EventTimeline({ events = [] }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#E5D5C5] p-8">
        <Sparkles className="w-12 h-12 text-[#D4A853] mx-auto mb-4" />
        <h3 className="font-serif text-lg font-bold text-[#2D1810]">No Events Scheduled</h3>
        <p className="text-xs text-[#6B4423] mt-1">There are no temple events scheduled matching the selected filter category.</p>
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
      <div className="absolute left-9 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4A853] via-[#8B1A1A] to-[#D4A853]" aria-hidden />

      <div className="relative space-y-2 md:space-y-0">
        {events.map((ev, idx) => (
          <EventCard key={ev.id} event={ev} index={idx} />
        ))}
      </div>
    </section>
  )
}
