import { Link } from "react-router-dom"
import { nerthikadans, slugify } from "../../../data/poojaData"
import { Scale, Scissors, Smile, Flame } from "lucide-react"

// Map icon strings to actual Lucide components
const iconMap = {
  Scale: Scale,
  Scissors: Scissors,
  Smile: Smile,
  Flame: Flame,
}

export default function NerthikadanSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="nerthikadans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-sans text-xs md:text-sm text-[#8B1A1A] uppercase tracking-widest font-semibold">
            Sacred Offerings
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mt-2 mb-3">
            Nerthikadans & Vows
          </h2>
          <p className="text-[#6B4423] max-w-2xl mx-auto text-sm md:text-base">
            Fulfill your vows and seek divine blessings through traditional offerings and ceremonies.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-[#D4A853] text-xl">✨</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {nerthikadans.map((item) => {
            const Icon = iconMap[item.icon] || Smile
            
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center bg-[#FDF8F3] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-[#E5D5C5] group"
              >
                <Link to={`/pooja/${slugify(item.name)}`} className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-[#E5D5C5] group-hover:bg-[#8B1A1A] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#D4A853] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </Link>
                
                <Link to={`/pooja/${slugify(item.name)}`} className="block group-hover:text-[#8B1A1A] transition-colors">
                  <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-3 group-hover:text-[#8B1A1A] transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <p className="text-[#6B4423] text-sm mb-6 flex-grow">
                  {item.description}
                </p>
                
                <div className="w-full pt-4 border-t border-[#E5D5C5] flex flex-col gap-3">
                  <span className="font-serif text-lg font-bold text-[#8B1A1A]">
                    ₹ {item.price.toLocaleString()}
                  </span>
                  <Link
                    to={`/pooja/${slugify(item.name)}`}
                    className="w-full bg-[#8B1A1A] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#6B1414] transition-colors inline-block text-center shadow-xs"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
