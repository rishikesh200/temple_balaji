import { Calendar, Heart, Phone, Sparkles, Video } from "lucide-react"
import Concave from "../../../components/Concave"
import templeicon from "../../../assets/images/temple.png"
import poojaicon from "../../../assets/images/pooja.png"
import darshanicon from "../../../assets/images/calendar.png"
import liveicon from "../../../assets/images/live.png"
import contacticon from "../../../assets/images/konark-sun-temple.png"
import { useLanguage } from "../../../contexts/LanguageContext"

const QUICK_ACTIONS_TRANSLATIONS = {
  donate: {
    en: "Donate",
    ta: "நன்கொடை அளிக்கவும்"
  },
  supportTemple: {
    en: "Support the Temple",
    ta: "கோவிலுக்கு ஆதரவளிக்கவும்"
  },
  bookDarshan: {
    en: "Book Darshan",
    ta: "தரிசனம் முன்பதிவு செய்யுங்கள்"
  },
  reserveSlot: {
    en: "Reserve Your Slot",
    ta: "உங்கள் இடத்தை முன்பதிவு செய்யுங்கள்"
  },
  bookPooja: {
    en: "Book Pooja",
    ta: "பூஜை முன்பதிவு செய்யுங்கள்"
  },
  performSevas: {
    en: "Perform Sevas",
    ta: "சேவைகளை செய்யுங்கள்"
  },
  liveDarshan: {
    en: "Live Darshan",
    ta: "நேரலை தரிசனம்"
  },
  watchLive: {
    en: "Watch Live",
    ta: "நேரலையில் பார்க்கவும்"
  },
  contactTemple: {
    en: "Contact Temple",
    ta: "கோவிலை தொடர்பு கொள்ளுங்கள்"
  },
  getInTouch: {
    en: "Get in Touch",
    ta: "எங்களை தொடர்பு கொள்ளுங்கள்"
  }
}

const getActionsData = (lang) => [
  {
    icon: templeicon,
    title: QUICK_ACTIONS_TRANSLATIONS.donate[lang],
    subtitle: QUICK_ACTIONS_TRANSLATIONS.supportTemple[lang],
  },
  {
    icon: darshanicon,
    title: QUICK_ACTIONS_TRANSLATIONS.bookDarshan[lang],
    subtitle: QUICK_ACTIONS_TRANSLATIONS.reserveSlot[lang],
  },
  {
    icon: poojaicon,
    title: QUICK_ACTIONS_TRANSLATIONS.bookPooja[lang],
    subtitle: QUICK_ACTIONS_TRANSLATIONS.performSevas[lang],
  },
  {
    icon: liveicon,
    title: QUICK_ACTIONS_TRANSLATIONS.liveDarshan[lang],
    subtitle: QUICK_ACTIONS_TRANSLATIONS.watchLive[lang],
  },
  {
    icon: contacticon,
    title: QUICK_ACTIONS_TRANSLATIONS.contactTemple[lang],
    subtitle: QUICK_ACTIONS_TRANSLATIONS.getInTouch[lang],
  },
]

export default function QuickActions() {
  const { lang } = useLanguage()
  const actions = getActionsData(lang)
  
  return (
    <div className="relative z-10 -mt-7 ">
      <div className="max-w-6xl mx-auto px-4 [filter:drop-shadow(4px_6px_14px_rgba(0,0,0,0.18))_drop-shadow(1px_2px_4px_rgba(0,0,0,0.08))]">
        <Concave
          borderRadius="18px"
          concave="15px"
          className="bg-parchment-soft border border-border-warm overflow-hidden px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-5  px-4">
            {actions.map((action, index) => {
              const insetRule =
                index > 0
                  ? [
                      "before:pointer-events-none before:absolute before:left-0 before:top-[22%] before:bottom-[22%] before:w-px before:bg-gray-warm-light before:content-['']",
                      index % 2 === 0 ? "max-md:before:hidden" : "",
                    ].join(" ")
                  : ""
              return (
              <button
                key={action.title}
                type="button"
                className={`relative flex flex-row items-center justify-center gap-3 py-5 px-4 md:px-3 text-left hover:bg-peach-light/80 transition-colors group ${insetRule}`}
              >
                <img src={action.icon} alt={action.title} className="h-10 w-10 shrink-0 text-maroon-hover md:h-7 md:w-7" />
                 
                <div className="min-w-0 flex flex-col gap-0.5">
                  <span className="font-serif text-sm font-bold leading-tight text-earth-dark md:text-[0.95rem]">
                    {action.title}
                  </span>
                  <span className="text-xs leading-tight text-gray-warm-medium">{action.subtitle}</span>
                </div>
              </button>
              )
            })}
          </div>
        </Concave>
      </div>
    </div>
  )
}

