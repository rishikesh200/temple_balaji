import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { darshanTypes } from "../../../data/darshanTypes"
import icon from "../../../assets/images/konark-sun-temple.png"

export default function DarshanSection() {
  return (
    <section className="py-10 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#2D1810]">Darshan & Booking</h2>
          <p className="text-sm text-[#6B4423] mt-1">
            — Choose your preferred darshan experience —
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {darshanTypes.map((option) => (
            <div key={option.id} className="relative rounded-xl overflow-hidden group">
              <div className="absolute inset-0">
                <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="relative p-6 pt-32">
                <img src={icon} alt="" className="w-10 h-8 object-cover mb-2" />
                <h3 className="text-[#D4A853] font-serif text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-white/80 text-sm mb-4">{option.summary}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[#D4A853] font-bold text-lg">{option.priceLabel}</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#D4A853] transition-colors"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/darshan"
            className="inline-flex bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors"
          >
            View All Darshan Options
          </Link>
        </div>
      </div>
    </section>
  )
}
