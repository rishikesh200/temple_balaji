import { Link } from "react-router-dom"
import { slugify } from "../../../data/poojaData"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import { getT, t } from "../../../utils/i18n"

const TR = {
  heading:    { en: "Daily Pooja Services",           ta: "தினசரி பூஜை சேவைகள்" },
  subheading: { en: "Sacred rituals performed every day to maintain the temple's sanctity and invoke blessings for the universe.", ta: "கோயிலின் புனிதத்தை பேணவும் பிரபஞ்சத்திற்கு ஆசிர்வாதம் வேண்டவும் தினமும் நிறைவேற்றப்படும் புனித சடங்குகள்." },
  bookNow:    { en: "Book Now",                       ta: "இப்போது பதிவு செய்யுங்கள்" },
  free:       { en: "Free",                           ta: "இலவசம்" },
}

export default function PoojaCardsSection() {
  const { activeDailyPoojas: dailyPoojas } = useAdminData()
  const { lang } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-[#FDF8F3]" id="daily-poojas">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-3">
            {t(TR.heading, lang)}
          </h2>
          <p className="text-[#6B4423] max-w-2xl mx-auto text-sm md:text-base">
            {t(TR.subheading, lang)}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-[#D4A853] text-xl">🪷</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dailyPoojas.map((pooja) => (
            <div key={pooja.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#E5D5C5] group flex flex-col justify-between">
              <div>
                <Link to={`/pooja/${slugify(pooja.name)}`} className="block relative h-56 overflow-hidden">
                  <img src={pooja.image} alt={getT(pooja, 'name', lang)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-[#D4A853] text-[#2D1810] font-bold px-3 py-1 rounded-lg text-xs md:text-sm border border-white/20">
                    {pooja.bookingType === 'free' ? t(TR.free, lang) : `₹ ${pooja.price}`}
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/pooja/${slugify(pooja.name)}`} className="block group-hover:text-[#8B1A1A] transition-colors">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2D1810] mb-2 group-hover:text-[#8B1A1A] transition-colors">
                      {getT(pooja, 'name', lang)}
                    </h3>
                  </Link>
                  <p className="text-[#6B4423] text-sm md:text-base mb-6 line-clamp-2">
                    {getT(pooja, 'description', lang)}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#FDF8F3] mt-auto">
                <span className="text-xs md:text-sm font-medium text-[#8B1A1A]">
                  {getT(pooja, 'time', lang)}
                </span>
                <Link to={`/pooja/${slugify(pooja.name)}`}
                  className="bg-[#8B1A1A] text-white px-4 md:px-5 py-2 rounded-lg font-bold text-xs md:text-sm hover:bg-[#6B1414] transition-colors inline-block text-center shadow-xs">
                  {t(TR.bookNow, lang)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
