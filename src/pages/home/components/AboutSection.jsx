import { Heart, Landmark, Sparkles, Utensils } from "lucide-react"
import abtImg from "../../../assets/images/hero-balaji.jpg"

export default function AboutSection() {
  return (
    <section className="py-12 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#8B1A1A] text-sm font-medium mb-2">About Our Temple</p>
            <h2 className="font-serif text-3xl font-bold text-[#2D1810] mb-4">
              A Timeless Abode of Divine Grace
            </h2>
            <p className="text-[#6B4423] text-sm mb-6 leading-relaxed">
              Paruthipattu Balaji Temple is a revered shrine dedicated to Lord Venkateswara. This
              sacred place brings peace, prosperity and spiritual upliftment to devotees.
              Experience the divine presence and be blessed.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">Ancient Heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">Annadhanam & Seva</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">Daily Poojas & Rituals</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">Spiritual & Cultural Programs</span>
              </div>
            </div>

            <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors">
              Know More About Temple
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img
              src={abtImg}
              alt="Paruthipattu Balaji Temple"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

