import { Link } from "react-router-dom"
import { Clock, Music } from "lucide-react"
import { slugify } from "../../../data/poojaData"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import { getT, t } from "../../../utils/i18n"

const TR = {
  label:    { en: "Auspicious Offerings",     ta: "மங்களகரமான காணிக்கைகள்" },
  heading:  { en: "Special Sevas & Utsavams", ta: "சிறப்பு சேவைகள் & உத்சவங்கள்" },
  sub:      { en: "Celebrate significant life events or special occasions by booking these elaborate religious ceremonies performed by head priests.", ta: "முக்கிய வாழ்க்கை நிகழ்வுகளை கொண்டாட தலைமை அர்ச்சகர்களால் நடத்தப்படும் இந்த விரிவான சடங்குகளை பதிவு செய்யுங்கள்." },
  schedule: { en: "View Full Schedule",        ta: "முழு அட்டவணை காண்க" },
  bookNow:  { en: "Book Now",                  ta: "இப்போது பதிவு செய்யுங்கள்" },
  free:     { en: "Free",                      ta: "இலவசம்" },
}

export default function SpecialSevasSection() {
  const { activeSpecialSevas: specialSevas } = useAdminData()
  const { lang } = useLanguage()
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-sans text-xs md:text-sm text-maroon uppercase tracking-widest font-semibold">
              {t(TR.label, lang)}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark mt-2">
              {t(TR.heading, lang)}
            </h2>
            <p className="text-earth-medium text-sm md:text-base mt-4 max-w-2xl">
              {t(TR.sub, lang)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-maroon font-bold cursor-pointer group whitespace-nowrap">
            <span className="text-xs md:text-sm font-medium">{t(TR.schedule, lang)}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Special Sevas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {specialSevas.map((seva) => (
            <div
              key={seva.id}
              className="flex flex-col sm:flex-row bg-parchment rounded-2xl overflow-hidden border border-border-warm hover:shadow-lg transition-all group"
            >
              {/* Image */}
              <Link to={`/pooja/${slugify(seva.name)}`} className="w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden block">
                <img
                  src={seva.image}
                  alt={seva.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Content */}
              <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <Link to={`/pooja/${slugify(seva.name)}`} className="block group-hover:text-maroon transition-colors">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-earth-dark mb-3 group-hover:text-maroon transition-colors">
                      {getT(seva, 'name', lang)}
                    </h3>
                  </Link>
                  <p className="text-earth-medium text-sm md:text-base mb-6 line-clamp-3">
                    {getT(seva, 'description', lang)}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-maroon mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-medium">{seva.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-medium">{seva.participation}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border-warm pt-4">
                  <span className="font-serif text-lg md:text-2xl font-bold text-maroon">
                    ₹ {seva.price.toLocaleString()}
                  </span>
                  <Link
                    to={`/pooja/${slugify(seva.name)}`}
                    className="bg-btn-bg text-btn-text px-4 md:px-6 py-2 rounded-lg font-bold text-xs md:text-sm hover:bg-btn-bg-hover transition-colors inline-block text-center shadow-xs"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

