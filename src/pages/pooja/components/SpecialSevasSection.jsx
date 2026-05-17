import { Clock, Music } from "lucide-react"
import { specialSevas } from "../../../data/poojaData"

export default function SpecialSevasSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-sans text-xs md:text-sm text-[#8B1A1A] uppercase tracking-widest font-semibold">
              Auspicious Offerings
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mt-2">
              Special Sevas & Utsavams
            </h2>
            <p className="text-[#6B4423] text-sm md:text-base mt-4 max-w-2xl">
              Celebrate significant life events or special occasions by booking these elaborate religious ceremonies performed by head priests.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#8B1A1A] font-bold cursor-pointer group whitespace-nowrap">
            <span className="text-xs md:text-sm font-medium">View Full Schedule</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Special Sevas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {specialSevas.map((seva) => (
            <div
              key={seva.id}
              className="flex flex-col sm:flex-row bg-[#FDF8F3] rounded-2xl overflow-hidden border border-[#E5D5C5] hover:shadow-lg transition-all group"
            >
              {/* Image */}
              <div className="w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden">
                <img
                  src={seva.image}
                  alt={seva.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2D1810] mb-3">
                    {seva.name}
                  </h3>
                  <p className="text-[#6B4423] text-sm md:text-base mb-6 line-clamp-3">
                    {seva.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-[#8B1A1A] mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-medium">{seva.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-medium">{seva.participation}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#E5D5C5] pt-4">
                  <span className="font-serif text-lg md:text-2xl font-bold text-[#8B1A1A]">
                    ₹ {seva.price.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    className="bg-[#8B1A1A] text-white px-4 md:px-6 py-2 rounded-lg font-bold text-xs md:text-sm hover:bg-[#6B1414] transition-colors"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
