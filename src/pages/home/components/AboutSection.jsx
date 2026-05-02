import { Heart, Landmark, Play, Sparkles, Utensils } from "lucide-react"
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

            <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B1414] transition-colors">
              Know More About Temple
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img src={abtImg} alt="Temple" className="w-full h-[300px] object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                type="button"
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Play className="w-8 h-8 text-[#8B1A1A] ml-1" />
              </button>
            </div>
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
              LIVE
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-center font-medium">
                Live Darshan – Experience the Divine
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

