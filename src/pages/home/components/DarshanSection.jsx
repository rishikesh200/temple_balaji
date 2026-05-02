import { ArrowRight } from "lucide-react"
import Img1 from "../../../assets/images/hero-balaji.jpg"
import Img2 from "../../../assets/images/darshan.jpg"
import Img3 from "../../../assets/images/temple-gopuram.jpg"

const darshanOptions = [
  {
    title: "Sarva Darshan",
    description: "General darshan for all devotees. Entry based on availability.",
    price: "FREE",
    image: Img1,
  },
  {
    title: "Special Darshan",
    description: "Faster access with special queue for a blessed experience.",
    price: "₹250",
    image: Img2,
  },
  {
    title: "VIP Darshan",
    description: "Personalized darshan with minimal waiting time.",
    price: "₹750",
    image: Img3,
  },
]

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

        <div className="grid md:grid-cols-3 gap-6">
          {darshanOptions.map((option) => (
            <div key={option.title} className="relative rounded-xl overflow-hidden group">
              <div className="absolute inset-0">
                <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l5.5 3.5v7l-5.5 3.5-5.5-3.5v-7L12 4.5z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <div className="relative p-6 pt-32">
                <h3 className="text-[#D4A853] font-serif text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-white/80 text-sm mb-4">{option.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[#D4A853] font-bold text-lg">{option.price}</span>
                  <button className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#D4A853] transition-colors">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B1414] transition-colors">
            View All Darshan Options
          </button>
        </div>
      </div>
    </section>
  )
}

