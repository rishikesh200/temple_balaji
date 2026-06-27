import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import { getT, t } from "../../../utils/i18n"

const TR = {
  label:   { en: "Service Offerings",                                                                  ta: "சேவை வகைகள்" },
  heading: { en: "Types of Darshan",                                                                   ta: "தரிசன வகைகள்" },
  sub:     { en: "Choose the darshan experience that best suits your requirements and spiritual focus.", ta: "உங்கள் தேவைகளுக்கு மிகவும் பொருத்தமான தரிசன அனுபவத்தை தேர்ந்தெடுங்கள்." },
  free:    { en: "FREE",                                                                                ta: "இலவசம்" },
}

function DarshanTypeCard({ option, onSelectType, lang }) {
  return (
    <div className={option.featured ? "pt-5 sm:pt-6" : undefined}>
      <article
        className={`group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col bg-gray-warm-light h-full ${
          option.featured
            ? "border-2 border-gold/50 shadow-md md:scale-[1.02] z-10"
            : "border-border-warm/50"
        }`}
      >
        {option.featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-earth-dark px-6 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-md z-20 whitespace-nowrap">
            Most Preferred
          </div>
        )}
        <div className="h-64 overflow-hidden relative">
          {(option.imageUrl || option.image) ? (
            <img
              src={option.imageUrl || option.image}
              alt={option.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={e => { e.target.style.display = 'none' }}
            />
          ) : null}
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded text-sm font-bold ${
              option.bookingType === 'free' || option.badge === "FREE"
                ? "bg-white/90 backdrop-blur-sm text-maroon"
                : "bg-gold text-earth-dark"
            }`}
          >
            {option.bookingType === 'free' ? t(TR.free, lang) : option.badge}
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-earth-dark mb-3">
            {getT(option, 'title', lang)}
          </h3>
          <p className="text-sm text-earth-medium mb-6 flex-grow leading-relaxed">
            {getT(option, 'description', lang)}
          </p>
          <div className="flex items-center justify-between mt-auto gap-3 flex-wrap">
            <span className="text-earth-medium font-bold text-sm">{getT(option, 'tagline', lang)}</span>
            <button
              type="button"
              onClick={() => {
                if (onSelectType) onSelectType(option.id)
                document.getElementById("darshan-booking-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                option.primaryCta
                  ? "bg-btn-bg text-btn-text hover:bg-btn-bg-hover"
                  : "bg-earth-medium text-white hover:bg-earth-dark"
              }`}
            >
              {option.ctaLabel}
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function TypesSection({ onSelectType }) {
  const { activeDarshan: darshanTypes } = useAdminData()
  const { lang } = useLanguage()
  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto" id="types">
      <div className="text-center mb-16">
        <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-earth-medium mb-4">
          {t(TR.label, lang)}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark mb-4">
          {t(TR.heading, lang)}
        </h2>
        <p className="text-earth-medium max-w-2xl mx-auto text-base">
          {t(TR.sub, lang)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {darshanTypes.map((option) => (
          <DarshanTypeCard key={option.id} option={option} onSelectType={onSelectType} lang={lang} />
        ))}
      </div>
    </section>
  )
}

