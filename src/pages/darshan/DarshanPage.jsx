import {
  Bus,
  CameraOff,
  Clock,
  Download,
  ExternalLink,
  Hand,
  Info,
  PartyPopper,
  PhoneOff,
  Shirt,
} from "lucide-react"
import { darshanTypes } from "../../data/darshanTypes"
import Footer from "../home/components/Footer"
import Header from "../home/components/Header"
import heroImg from "../../assets/images/hero-balaji.jpg"

export default function DarshanPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <Header />
      <main className="parchment-bg">
        <section className="relative min-h-[500px] md:h-[614px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" aria-hidden />
          <img
            src={heroImg}
            alt="Paruthipattu Balaji Temple gopuram"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 text-center px-4">
            <span className="text-[#D4A853] tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase mb-4 block">
              OM NAMO VENKATESAYA
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Seek the Blessings of Balaji
            </h1>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-10">
              Experience the divine presence of Lord Venkateswara through our sacred Darshan services.
              Reserve your slot for a peaceful spiritual journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#types"
                className="bg-[#8B1A1A] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#6B1414] transition-all shadow-lg"
              >
                View Darshan Types
              </a>
              <a
                href="#booking"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all"
              >
                Check Availability
              </a>
            </div>
          </div>
        </section>

        <section
          className="py-16 md:py-24 px-4 max-w-7xl mx-auto"
          id="types"
        >
          <div className="text-center mb-16">
            <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#6B4423] mb-4">
              Service Offerings
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-4">
              Types of Darshan
            </h2>
            <p className="text-[#6B4423] max-w-2xl mx-auto text-base">
              Choose the darshan experience that best suits your requirements and spiritual focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {darshanTypes.map((option) => (
              <div key={option.id} className={option.featured ? "pt-5 sm:pt-6" : undefined}>
                <article
                  className={`group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col bg-[#F6F3F2] h-full ${
                    option.featured
                      ? "border-2 border-[#D4A853]/50 shadow-md md:scale-[1.02] z-10"
                      : "border-[#E5D5C5]/50"
                  }`}
                >
                  {option.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A853] text-[#2D1810] px-6 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-md z-20 whitespace-nowrap">
                      Most Preferred
                    </div>
                  )}
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded text-sm font-bold ${
                        option.badge === "FREE"
                          ? "bg-white/90 backdrop-blur-sm text-[#8B1A1A]"
                          : "bg-[#D4A853] text-[#2D1810]"
                      }`}
                    >
                      {option.badge}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2D1810] mb-3">
                      {option.title}
                    </h3>
                    <p className="text-sm text-[#6B4423] mb-6 flex-grow leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto gap-3 flex-wrap">
                      <span className="text-[#8B4513] font-bold text-sm">{option.tagline}</span>
                      <button
                        type="button"
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                          option.primaryCta
                            ? "bg-[#8B1A1A] text-white hover:bg-[#6B1414]"
                            : "bg-[#6B4423] text-white hover:bg-[#2D1810]"
                        }`}
                      >
                        {option.ctaLabel}
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

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

        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
          <div className="bg-[#660000] text-white rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4A853]/10 rounded-full translate-y-1/2 -translate-x-1/2"
              aria-hidden
            />
            <div className="relative z-10 lg:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Guidelines for Devotees</h2>
              <p className="text-white/80 mb-8 text-base">
                To maintain the sanctity of the temple and ensure a smooth experience for all, we kindly request you to
                follow these guidelines.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Shirt className="w-6 h-6 text-[#D4A853] shrink-0" aria-hidden />
                  <span className="text-sm font-medium">Traditional Dress Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <CameraOff className="w-6 h-6 text-[#D4A853] shrink-0" aria-hidden />
                  <span className="text-sm font-medium">No Photography Inside</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneOff className="w-6 h-6 text-[#D4A853] shrink-0" aria-hidden />
                  <span className="text-sm font-medium">Phones on Silent</span>
                </div>
                <div className="flex items-center gap-3">
                  <Hand className="w-6 h-6 text-[#D4A853] shrink-0" aria-hidden />
                  <span className="text-sm font-medium">Maintain Cleanliness</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 lg:w-1/2 bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 w-full">
              <h4 className="font-bold text-[#D4A853] mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" aria-hidden />
                Important Rules
              </h4>
              <ul className="space-y-4 text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A853]">•</span>
                  <span>Devotees are requested to arrive at least 30 minutes before their scheduled slot.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A853]">•</span>
                  <span>Proof of identity (Aadhar, Voter ID, etc.) is mandatory for paid darshan bookings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A853]">•</span>
                  <span>
                    Consumption of non-vegetarian food, alcohol, or smoking within temple premises is strictly
                    prohibited.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A853]">•</span>
                  <span>Cooperate with the security personnel for checks and queue management.</span>
                </li>
              </ul>
              <button
                type="button"
                className="mt-8 text-[#D4A853] font-bold flex items-center gap-2 hover:underline"
              >
                Download Full Guidelines PDF
                <Download className="w-5 h-5" aria-hidden />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
