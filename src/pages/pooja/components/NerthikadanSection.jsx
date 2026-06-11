import { Link } from "react-router-dom"
import { slugify } from "../../../data/poojaData"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import { getT, t } from "../../../utils/i18n"
import { Scale, Scissors, Smile, Flame } from "lucide-react"

const TR = {
  label:   { en: "Sacred Offerings",                                                                          ta: "புனித காணிக்கைகள்" },
  heading: { en: "Nerthikadans & Vows",                                                                       ta: "நேர்த்திக்கடன்கள் & நேர்மொழிகள்" },
  sub:     { en: "Fulfill your vows and seek divine blessings through traditional offerings and ceremonies.", ta: "பாரம்பரிய காணிக்கைகள் மற்றும் சடங்குகள் மூலம் உங்கள் நேர்த்திக்கடன்களை நிறைவேற்றுங்கள்." },
  bookNow: { en: "Book Now",                                                                                   ta: "இப்போது பதிவு செய்யுங்கள்" },
  free:    { en: "Free",                                                                                       ta: "இலவசம்" },
}

// Map icon strings to actual Lucide components
const iconMap = {
  Scale: Scale,
  Scissors: Scissors,
  Smile: Smile,
  Flame: Flame,
}

export default function NerthikadanSection() {
  const { activeNerthikadans: nerthikadans } = useAdminData()
  const { lang } = useLanguage()
  return (
    <section className="py-16 md:py-24 bg-white" id="nerthikadans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-sans text-xs md:text-sm text-maroon uppercase tracking-widest font-semibold">
            {t(TR.label, lang)}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark mt-2 mb-3">
            {t(TR.heading, lang)}
          </h2>
          <p className="text-earth-medium max-w-2xl mx-auto text-sm md:text-base">
            {t(TR.sub, lang)}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xl">✨</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {nerthikadans.map((item) => {
            const Icon = iconMap[item.icon] || Smile
            
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center bg-parchment p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-border-warm group"
              >
                <Link to={`/pooja/${slugify(item.name)}`} className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-border-warm group-hover:bg-maroon transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gold group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </Link>
                
                <Link to={`/pooja/${slugify(item.name)}`} className="block group-hover:text-maroon transition-colors">
                  <h3 className="font-serif text-xl font-bold text-earth-dark mb-3 group-hover:text-maroon transition-colors">
                    {getT(item, 'name', lang)}
                  </h3>
                </Link>

                <p className="text-earth-medium text-sm mb-6 flex-grow">
                  {getT(item, 'description', lang)}
                </p>

                <div className="w-full pt-4 border-t border-border-warm flex flex-col gap-3">
                  <span className="font-serif text-lg font-bold text-maroon">
                    {item.bookingType === 'free' ? t(TR.free, lang) : `₹ ${item.price.toLocaleString()}`}
                  </span>
                  <Link
                    to={`/pooja/${slugify(item.name)}`}
                    className="w-full bg-btn-bg text-btn-text px-4 py-2 rounded-lg font-bold text-sm hover:bg-btn-bg-hover transition-colors inline-block text-center shadow-xs"
                  >
                    {t(TR.bookNow, lang)}
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

