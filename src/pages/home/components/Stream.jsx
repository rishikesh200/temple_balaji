import { Play } from "lucide-react"
import streamImg from "../../../assets/images/hero-balaji.jpg"
import { useLanguage } from "../../../contexts/LanguageContext"

const STREAM_TRANSLATIONS = {
  divineConnect: {
    en: "Divine Connect",
    ta: "தெய்வீக संयोग"
  },
  liveDarshan: {
    en: "Live Darshan",
    ta: "நேரலை தரிசனம்"
  },
  joinDevotees: {
    en: "Join devotees from afar and experience the sanctum in real time",
    ta: "வெகு தூரத்தில் இருந்து பக்தர்களுடன் சேர்ந்து நேரலையில் ஆலயத்தை அனுபவிக்கவும்"
  },
  liveText: {
    en: "Live Darshan – Experience the Divine",
    ta: "நேரலை தரிசனம் – தெய்வீகத்தை அனுபவிக்கவும்"
  },
  live: {
    en: "LIVE",
    ta: "நேரலை"
  }
}

export default function Stream() {
  const { lang } = useLanguage()
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-maroon text-sm font-medium mb-2">{STREAM_TRANSLATIONS.divineConnect[lang]}</p>
          <h2 className="font-serif text-3xl font-bold text-earth-dark">{STREAM_TRANSLATIONS.liveDarshan[lang]}</h2>
          <p className="text-sm text-earth-medium mt-2 max-w-xl mx-auto">
            — {STREAM_TRANSLATIONS.joinDevotees[lang]} —
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
                <Play className="w-8 h-8 text-maroon ml-1" />
              </button>
            </div>
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
              {STREAM_TRANSLATIONS.live[lang]}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-center font-medium">
                {STREAM_TRANSLATIONS.liveText[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
