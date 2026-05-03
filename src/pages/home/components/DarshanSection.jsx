import { ArrowRight } from "lucide-react"
import Img1 from "../../../assets/images/hero-balaji.jpg"
import Img2 from "../../../assets/images/darshan.jpg"
import Img3 from "../../../assets/images/temple-gopuram.jpg"
import icon from "../../../assets/images/konark-sun-temple.png"

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

              

              <div className="relative p-6 pt-32">
                <img src={icon} alt={option.title} className="w-10 h-8 object-cover mb-2" />
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
          <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors">
            View All Darshan Options
          </button>
        </div>
      </div>
    </section>
  )
}

