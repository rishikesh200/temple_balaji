import { dailyPoojas } from "../../../data/poojaData"

export default function PoojaCardsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FDF8F3]" id="daily-poojas">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-3">
            Daily Pooja Services
          </h2>
          <p className="text-[#6B4423] max-w-2xl mx-auto text-sm md:text-base">
            Sacred rituals performed every day to maintain the temple's sanctity and invoke blessings for the universe.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-[#D4A853] text-xl">🪷</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dailyPoojas.map((pooja) => (
            <div
              key={pooja.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#E5D5C5] group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pooja.image}
                  alt={pooja.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#D4A853] text-[#2D1810] font-bold px-3 py-1 rounded-lg text-xs md:text-sm">
                  ₹ {pooja.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2D1810] mb-2">
                  {pooja.name}
                </h3>
                <p className="text-[#6B4423] text-sm md:text-base mb-6 line-clamp-2">
                  {pooja.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-medium text-[#8B1A1A]">
                    {pooja.time}
                  </span>
                  <button
                    type="button"
                    className="bg-[#8B1A1A] text-white px-4 md:px-5 py-2 rounded-lg font-bold text-xs md:text-sm hover:bg-[#6B1414] transition-colors"
                  >
                    Book Now
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
