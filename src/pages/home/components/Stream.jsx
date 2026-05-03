import { Play } from "lucide-react"
import streamImg from "../../../assets/images/hero-balaji.jpg"

export default function Stream() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-[#8B1A1A] text-sm font-medium mb-2">Divine Connect</p>
          <h2 className="font-serif text-3xl font-bold text-[#2D1810]">Live Darshan</h2>
          <p className="text-sm text-[#6B4423] mt-2 max-w-xl mx-auto">
            — Join devotees from afar and experience the sanctum in real time —
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img src={streamImg} alt="Live temple darshan" className="w-full h-[300px] object-cover" />
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
