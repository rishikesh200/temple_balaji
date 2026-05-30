import { Heart, Landmark, Sparkles, Utensils } from "lucide-react"
import abtImg from "../../../assets/images/hero-balaji.jpg"
import { useLanguage } from "../../../contexts/LanguageContext"

const ABOUT_TRANSLATIONS = {
  aboutOurTemple: {
    en: "About Our Temple",
    ta: "எங்கள் கோவிலைப் பற்றி"
  },
  timelessAbode: {
    en: "A Timeless Abode of Divine Grace",
    ta: "தெய்வீக அருளின் நிரந்தர வாசஸ்தலம்"
  },
  description: {
    en: "Paruthipattu Balaji Temple is a revered shrine dedicated to Lord Venkateswara. This sacred place brings peace, prosperity and spiritual upliftment to devotees. Experience the divine presence and be blessed.",
    ta: "பாரூத்திப்பட்டு பாலாஜி கோவில் பகவான் வெங்கடேஸ்வரருக்கு அர்ப்பணிக்கப்பட்ட ஒரு கண்ணியமான தலம். இந்த புனிதமான இடம் பக்தர்களுக்கு சாந்தி, செழிப்பு மற்றும் ஆன்மீக உன்னதத்தை கொண்டு வருகிறது. தெய்வீக பிரசன்னத்தை அனுபவிக்கவும் மற்றும் ஆசிர்வாதம் பெறவும்."
  },
  ancientHeritage: {
    en: "Ancient Heritage",
    ta: "பண்டைய பரம்பரை"
  },
  annadhanam: {
    en: "Annadhanam & Seva",
    ta: "அன்னதானம் & சேவை"
  },
  dailyPoojas: {
    en: "Daily Poojas & Rituals",
    ta: "தினசரி பூஜைகள் & சடங்குகள்"
  },
  spiritualPrograms: {
    en: "Spiritual & Cultural Programs",
    ta: "ஆன்மீக & கலாச்சார நிகழ்ச்சிகள்"
  },
  knowMore: {
    en: "Know More About Temple",
    ta: "கோவில் பற்றி மேலும் அறிய"
  }
}

export default function AboutSection() {
  const { lang } = useLanguage()
  return (
    <section className="py-12 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#8B1A1A] text-sm font-medium mb-2">{ABOUT_TRANSLATIONS.aboutOurTemple[lang]}</p>
            <h2 className="font-serif text-3xl font-bold text-[#2D1810] mb-4">
              {ABOUT_TRANSLATIONS.timelessAbode[lang]}
            </h2>
            <p className="text-[#6B4423] text-sm mb-6 leading-relaxed">
              {ABOUT_TRANSLATIONS.description[lang]}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">{ABOUT_TRANSLATIONS.ancientHeritage[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">{ABOUT_TRANSLATIONS.annadhanam[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">{ABOUT_TRANSLATIONS.dailyPoojas[lang]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-sm text-[#2D1810]">{ABOUT_TRANSLATIONS.spiritualPrograms[lang]}</span>
              </div>
            </div>

            <button className="bg-[#8B1A1A] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#6B1414] transition-colors">
              {ABOUT_TRANSLATIONS.knowMore[lang]}
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img
              src={abtImg}
              alt="Paruthipattu Balaji Temple"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

