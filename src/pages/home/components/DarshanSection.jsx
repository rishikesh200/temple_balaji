import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { getT } from "../../../utils/i18n"
import icon from "../../../assets/images/konark-sun-temple.png"
import { useLanguage } from "../../../contexts/LanguageContext"
import { BlurReveal, StaggerContainer, StaggerItem, FadeUp } from "../../../components/Motion"

const DARSHAN_TRANSLATIONS = {
  darshanBooking: {
    en: "Darshan & Booking",
    ta: "தரிசனம் & முன்பதிவு"
  },
  chooseExperience: {
    en: "Choose your preferred darshan experience",
    ta: "உங்கள் விரும்பிய தரிசன அभிज्ञতையை தேர்ந்தெடுக்கவும்"
  },
  bookNow: {
    en: "Book Now",
    ta: "இப்போது முன்பதிவு செய்யுங்கள்"
  },
  viewAll: {
    en: "View All Darshan Options",
    ta: "அனைத்து தரிசன விருப்பங்களைக் காணக்கள்"
  }
}

export default function DarshanSection() {
  const { lang } = useLanguage()
  const { homeDarshan: darshanTypes } = useAdminData()
  return (
    <section className="py-10 bg-parchment">
      <div className="max-w-7xl mx-auto px-4">
        <BlurReveal className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-earth-dark">{DARSHAN_TRANSLATIONS.darshanBooking[lang]}</h2>
          <p className="text-sm text-earth-medium mt-1">
            — {DARSHAN_TRANSLATIONS.chooseExperience[lang]} —
          </p>
        </BlurReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {darshanTypes.map((option) => (
            <StaggerItem key={option.id}>
            <div className="relative rounded-xl overflow-hidden group">
              <div className="absolute inset-0">
                <img src={option.imageUrl || option.image} alt={option.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="relative p-6 pt-32">
                <img src={icon} alt="" className="w-10 h-8 object-cover mb-2" />
                <h3 className="text-gold font-serif text-xl font-bold mb-2">{getT(option, 'title', lang)}</h3>
                <p className="text-white/80 text-sm mb-4">{getT(option, 'summary', lang)}</p>

                <div className="flex items-center justify-between">
                  <span className="text-gold font-bold text-lg">
                    {option.bookingType === 'free' ? 'Free' : option.priceLabel}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-white text-sm font-medium hover:text-gold transition-colors"
                  >
                    {DARSHAN_TRANSLATIONS.bookNow[lang]} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="text-center mt-8" delay={0.3}>
          <Link
            to="/darshan"
            className="inline-flex bg-btn-bg text-btn-text px-6 py-2.5 rounded-md text-sm font-medium hover:bg-btn-bg-hover transition-colors"
          >
            {DARSHAN_TRANSLATIONS.viewAll[lang]}
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

