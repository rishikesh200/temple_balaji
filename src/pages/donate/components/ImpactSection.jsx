import React from "react"
import { useLanguage } from "../../../contexts/LanguageContext"
import { Users, Sparkles, GraduationCap } from "lucide-react"

const IMPACT_SECTION_TRANSLATIONS = {
  en: {
    sectionLabel: "Where Your Contribution Goes",
    title: "Spiritual Significance & Impact",
    card1Title: "Community Support",
    card1Body: "Extending divine care beyond the temple walls through free meal drives (Annadanam), local medical aid initiatives, and supporting under-served families during major festivals.",
    card2Title: "Spiritual Preservation",
    card2Body: "Sustaining the regular conduction of authentic Vedic alankarams, dynamic daily pujas, specialized Homams, and the master craftsmanship needed to preserve sacred temple architecture.",
    card3Title: "Vedic Education",
    card3Body: "Sponsoring the temple Pathashala where bright young scholars study the ancient Vedas, Upanishads, and Agamas under classical Gurukul systems led by experienced shastris.",
  },
  ta: {
    sectionLabel: "உங்கள் பங்களிப்பு எங்கு செல்கிறது",
    title: "ஆன்மீக முக்கியத்துவம் மற்றும் தாக்கம்",
    card1Title: "சமூகவாழ்வு ஆதரவு",
    card1Body: "அன்னதானம், உள்ளூர்மருந்து உதவி திட்டங்கள் மற்றும் முக்கிய திருவிழாக்களின் போது ஆதரவற்ற குடும்பங்களுக்கு ஆதரவாக கோயில் சுவர்களை கடந்து தெய்வீக பராமரிப்பை விரிவாக்குகிறது.",
    card2Title: "ஆன்மீக பராமரிப்பு",
    card2Body: "உண்மையான வேத அலங்காரங்கள், தினசரி பூஜைகள், சிறப்பு ஹோமங்கள் மற்றும் திரிபுர கட்டிடக்கலை பாதுகாப்புக்கான நிபுணர் வேலைகளை தொடர்ந்து நிலைநாட்டுகிறது.",
    card3Title: "வேத கல்வி",
    card3Body: "பழங்கால பாடசாலை முறையில் அனுபவமிக்க சாஸ்திரர்கள் வழிகாட்டும் பாடசாலையில் பிரகாசமான மாணவர்கள் வேதங்கள், உபநिषदுகள் மற்றும் ஆகமங்களை പഠிக்கும் கோயிலுக்கு உதவி செய்கிறது.",
  },
}

export default function ImpactSection() {
  const { lang } = useLanguage()
  const t = IMPACT_SECTION_TRANSLATIONS[lang] || IMPACT_SECTION_TRANSLATIONS.en

  return (
    <section className="py-16 md:py-24 bg-gray-warm-light parchment-bg relative overflow-hidden animate-fade-in" id="impact">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-maroon text-xs font-semibold uppercase tracking-widest block mb-2">
            {t.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark">
            {t.title}
          </h2>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          
          {/* Card 1: Community Support */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-border-warm text-center relative group hover:border-gold/60 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-parchment border border-border-warm rounded-full flex items-center justify-center mx-auto mb-6 text-maroon shadow-xs group-hover:scale-105 transition-transform">
              <Users className="w-8 h-8 text-maroon" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-earth-dark mb-4">{t.card1Title}</h3>
            <p className="text-earth-medium text-xs md:text-sm leading-relaxed font-medium">
              {t.card1Body}
            </p>
          </div>

          {/* Card 2: Spiritual Preservation */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-border-warm text-center relative group hover:border-gold/60 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-parchment border border-border-warm rounded-full flex items-center justify-center mx-auto mb-6 text-maroon shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-8 h-8 text-maroon" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-earth-dark mb-4">{t.card2Title}</h3>
            <p className="text-earth-medium text-xs md:text-sm leading-relaxed font-medium">
              {t.card2Body}
            </p>
          </div>

          {/* Card 3: Vedic Education */}
          <div className="bg-white rounded-3xl p-8 shadow-xs border border-border-warm text-center relative group hover:border-gold/60 hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-parchment border border-border-warm rounded-full flex items-center justify-center mx-auto mb-6 text-maroon shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-8 h-8 text-maroon" aria-hidden />
            </div>
            <h3 className="font-serif text-xl font-bold text-earth-dark mb-4">{t.card3Title}</h3>
            <p className="text-earth-medium text-xs md:text-sm leading-relaxed font-medium">
              {t.card3Body}
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
