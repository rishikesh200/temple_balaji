import React from "react"
import { Users, Sparkles, GraduationCap } from "lucide-react"

export default function ImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F6F3F2] parchment-bg relative overflow-hidden animate-fade-in" id="impact">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-[#8B1A1A] text-xs font-semibold uppercase tracking-widest block mb-2">
            Where Your Contribution Goes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810]">
            Spiritual Significance &amp; Impact
          </h2>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          
          {/* Card 1: Community Support */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#E5D5C5] text-center relative group hover:border-[#D4A853]/60 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-[#FDF8F3] border border-[#E5D5C5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8B1A1A] shadow-xs group-hover:scale-105 transition-transform">
              <Users className="w-8 h-8 text-[#8B1A1A]" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Community Support</h3>
            <p className="text-[#6B4423] text-xs md:text-sm leading-relaxed font-medium">
              Extending divine care beyond the temple walls through free meal drives (Annadanam), local medical aid initiatives, and supporting under-served families during major festivals.
            </p>
          </div>

          {/* Card 2: Spiritual Preservation */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#E5D5C5] text-center relative group hover:border-[#D4A853]/60 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-[#FDF8F3] border border-[#E5D5C5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8B1A1A] shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-8 h-8 text-[#8B1A1A]" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Spiritual Preservation</h3>
            <p className="text-[#6B4423] text-xs md:text-sm leading-relaxed font-medium">
              Sustaining the regular conduction of authentic Vedic alankarams, dynamic daily pujas, specialized Homams, and the master craftsmanship needed to preserve sacred temple architecture.
            </p>
          </div>

          {/* Card 3: Vedic Education */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#E5D5C5] text-center relative group hover:border-[#D4A853]/60 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-[#FDF8F3] border border-[#E5D5C5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8B1A1A] shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-8 h-8 text-[#8B1A1A]" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Vedic Education</h3>
            <p className="text-[#6B4423] text-xs md:text-sm leading-relaxed font-medium">
              Sponsoring the temple Pathashala where bright young scholars study the ancient Vedas, Upanishads, and Agamas under classical Gurukul systems led by experienced shastris.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
