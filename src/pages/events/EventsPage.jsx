import React, { useState } from "react"
import EventTimeline from "./components/EventTimeline"
import DonateCTA from "../../components/DonateCTA"
import eventImg1 from "../../assets/images/festival.jpg"
import eventImg2 from "../../assets/images/temple-gopuram.jpg"
import eventImg3 from "../../assets/images/gallery-1.jpg"
import eventImg4 from "../../assets/images/darshan.jpg"
import { Sparkles, Flame, Heart } from "lucide-react"

const eventsData = [
  {
    id: 1,
    title: "Sahasra Kalashabhishekam (Temple Anniversary)",
    category: "upcoming",
    date: "May 22, 2026",
    time: "05:00 AM - 09:00 PM",
    location: "Main Sanctum Sanctorum & Temple Hall",
    participants: "Open for all devotees (Abhishekam Sankalpam available)",
    image: eventImg1,
    details: "Celebrate the grand annual anniversary of Paruthipattu Srivari Temple. The day begins with specialized Sahasra Kalashabhishekam performed by chief Vedic priests, followed by cultural Carnatic recitals, community bhajans, and full-day grand Prasadam distribution for thousands of visiting pilgrims.",
    ctaText: "Sponsor Annadanam",
    ctaLink: "/donate"
  },
  {
    id: 2,
    title: "Heritage Walk & Scholar Discourse",
    category: "community",
    date: "June 10, 2026",
    time: "07:30 AM - 10:00 AM",
    location: "Temple Outer Praharam & Corridors",
    participants: "Free Participation (Prior Check-In Recommended)",
    image: eventImg2,
    details: "Discover the architectural, cultural, and spiritual history of the Avadi Tirupathi Srivari Temple. Led by renowned historians and senior temple elders, this guided walk explores the stone inscriptions, the Gopuram carvings, and the historical records of the deity's presence in the region.",
    ctaText: "Register Interest",
    ctaLink: "/contact"
  },
  {
    id: 3,
    title: "Srivari Chariot Procession (Rath Yatra)",
    category: "upcoming",
    date: "June 27, 2026",
    time: "04:00 PM - 08:00 PM",
    location: "Avadi Chariot Road Path & Environs",
    participants: "Volunteer registrations active (Age 18+)",
    image: eventImg3,
    details: "Witness the spectacular procession of Lord Balaji riding His colossal golden chariot through the streets. Thousands of devotees gather to pull the holy ropes, chanting Vedic mantras and receiving direct blessings. Volunteers are requested to register early to assist in crowd coordination and water drives.",
    ctaText: "Register as Volunteer",
    ctaLink: "/contact"
  },
  {
    id: 4,
    title: "Pure Satvik Annadanam Food Drive",
    category: "community",
    date: "July 12, 2026",
    time: "11:30 AM - 03:00 PM",
    location: "Temple Annadanam Seva Hall",
    participants: "Sponsors & Seva volunteers needed",
    image: eventImg4,
    details: "Fulfill the sacred act of feeding others through our monthly community food drive. Healthy, fresh, hot traditional meals are served to local residents, pilgrims, and the needy. Devotees are invited to sponsor groceries, cook with pure devotion, or assist in serving.",
    ctaText: "Sponsor Pure Groceries",
    ctaLink: "/donate"
  }
]

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredEvents = eventsData.filter(event => {
    if (activeFilter === "all") return true
    return event.category === activeFilter
  })

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* 1. Gorgeous Divine Gradient Header */}
      <header className="relative py-16 bg-gradient-to-r from-[#3A0A0A] to-[#6E1A1A] text-white border-b-4 border-[#D4A853] text-center overflow-hidden">
        {/* Divine Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[#D4A853] tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase mb-4 block flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4A853]" /> Temple Calendar & Happenings
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Sacred Celebrations & Milestones
          </h1>
          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Explore the vibrant spiritual calendar, historic anniversaries, grand chariot festivals, and food drives that bring our community together in pure devotion.
          </p>
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
                ? "bg-[#8B1A1A] text-white border-[#8B1A1A] ring-2 ring-[#D4A853] shadow-md"
                : "bg-white text-[#6B4423] border-[#E5D5C5] hover:border-[#8B1A1A]"
            }`}
          >
            All Happenings ({eventsData.length})
          </button>
          
          <button
            type="button"
            onClick={() => setActiveFilter("upcoming")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "upcoming"
                ? "bg-[#8B1A1A] text-white border-[#8B1A1A] ring-2 ring-[#D4A853] shadow-md"
                : "bg-white text-[#6B4423] border-[#E5D5C5] hover:border-[#8B1A1A]"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Festivals & Celebrations ({eventsData.filter(e => e.category === "upcoming").length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("community")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "community"
                ? "bg-[#8B1A1A] text-white border-[#8B1A1A] ring-2 ring-[#D4A853] shadow-md"
                : "bg-white text-[#6B4423] border-[#E5D5C5] hover:border-[#8B1A1A]"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Community Seva ({eventsData.filter(e => e.category === "community").length})
          </button>
        </div>

        {/* Dynamic Timeline Component */}
        <EventTimeline events={filteredEvents} />

        {/* Divine Donate CTA Spacer */}
        <div className="mt-16">
          <DonateCTA />
        </div>

      </div>
    </div>
  )
}
