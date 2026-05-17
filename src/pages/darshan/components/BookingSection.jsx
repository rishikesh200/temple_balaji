import { Bus, Clock, ExternalLink, PartyPopper } from "lucide-react"

export default function BookingSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F6F3F2] relative overflow-hidden" id="booking">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#6B4423] mb-4">
            Plan Your Visit
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-4">
            Experience the Divine with Ease
          </h2>
          <p className="text-[#6B4423] max-w-2xl mx-auto">
            To ensure a soulful and peaceful pilgrimage, we have curated essential information to help you plan
            your journey to Paruthipattu Balaji Temple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5D5C5]/50 flex flex-col">
            <div className="w-12 h-12 bg-[#ffdad4]/80 flex items-center justify-center rounded-full mb-6">
              <Clock className="w-6 h-6 text-[#8B1A1A]" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Best Times to Visit</h3>
            <ul className="space-y-4 flex-grow text-sm text-[#6B4423]">
              <li className="flex items-start gap-3">
                <span className="text-[#D4A853] font-bold">•</span>
                <span>
                  <strong className="text-[#2D1810]">Quiet Hours:</strong> Weekdays between 10:00 AM and 4:00 PM
                  are generally less crowded.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A853] font-bold">•</span>
                <span>
                  <strong className="text-[#2D1810]">Peak Hours:</strong> Weekends, public holidays, and early
                  mornings (6:00 AM - 9:00 AM) see higher footfall.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A853] font-bold">•</span>
                <span>
                  <strong className="text-[#2D1810]">Evening Grace:</strong> The evening Arathi (around 7:00 PM)
                  offers a particularly serene atmosphere.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5D5C5]/50 flex flex-col">
            <div className="w-12 h-12 bg-[#ffdad4]/80 flex items-center justify-center rounded-full mb-6">
              <PartyPopper className="w-6 h-6 text-[#8B1A1A]" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Awaited Festivals</h3>
            <ul className="space-y-4 flex-grow text-sm">
              <li className="flex items-center justify-between border-b border-[#E5D5C5]/50 pb-2">
                <span className="font-bold text-[#2D1810]">Brahmotsavam</span>
                <span className="text-[#8B4513] text-xs font-semibold uppercase">Oct 12 - Oct 20</span>
              </li>
              <li className="flex items-center justify-between border-b border-[#E5D5C5]/50 pb-2">
                <span className="font-bold text-[#2D1810]">Vaikunta Ekadasi</span>
                <span className="text-[#8B4513] text-xs font-semibold uppercase">Dec 23</span>
              </li>
              <li className="flex items-center justify-between border-b border-[#E5D5C5]/50 pb-2">
                <span className="font-bold text-[#2D1810]">New Year Pooja</span>
                <span className="text-[#8B4513] text-xs font-semibold uppercase">Jan 01</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-bold text-[#2D1810]">Sravanam Nakshatra</span>
                <span className="text-[#8B4513] text-xs font-semibold uppercase">Monthly</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5D5C5]/50 flex flex-col">
            <div className="w-12 h-12 bg-[#ffdad4]/80 flex items-center justify-center rounded-full mb-6">
              <Bus className="w-6 h-6 text-[#8B1A1A]" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Travel &amp; Connectivity</h3>
            <div className="space-y-4 text-sm text-[#6B4423] flex-grow">
              <p>
                <strong className="text-[#2D1810]">Public Transport:</strong> Frequent buses available from Avadi
                and Poonamallee bus terminus. The nearest local railway station is Avadi.
              </p>
              <p>
                <strong className="text-[#2D1810]">By Car:</strong> Ample parking space is available within the
                temple premises for devotees arriving by private vehicles.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  className="flex items-center gap-2 text-[#8B1A1A] font-bold hover:underline"
                >
                  Get Directions on Maps
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
