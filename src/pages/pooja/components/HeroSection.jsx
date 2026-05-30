import { ArrowDown } from "lucide-react"
import { useLanguage } from "../../../contexts/LanguageContext"
import { t } from "../../../utils/i18n"

const TR = {
  eyebrow:     { en: "DIVINE SERVICES",                                                                                                      ta: "தெய்வீக சேவைகள்" },
  heading:     { en: "Offer Your Prayers & Receive Divine Blessings",                                                                        ta: "உங்கள் பிரார்த்தனைகளை செலுத்தி தெய்வீக ஆசிர்வாதங்களைப் பெறுங்கள்" },
  sub:         { en: "Participate in sacred daily rituals and special sevas conducted with Vedic authenticity to seek the grace of Lord Venkateswara.", ta: "வேத முறைப்படி நடத்தப்படும் தினசரி சடங்குகள் மற்றும் சிறப்பு சேவைகளில் பங்கேற்று ஸ்ரீ வெங்கடேஸ்வர அருளைப் பெறுங்கள்." },
  viewPoojas:  { en: "View Daily Poojas",                                                                                                    ta: "தினசரி பூஜைகளை காண்க" },
}

export default function HeroSection() {
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-[500px] md:h-[614px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" aria-hidden />
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP6ScT029uCPPF2C8V-mAgC976uX7z9R-6AAvVxq9qsZnuXPuouC0qfyOHgKt2XXV7acNqG6Y_buxiY3ehrEaxesDj55_Xr3rsr_9x-NeX4ocrT5KQP3tsraOiWA0R6djRvVQNddIQEWWtzcHs89g8NBnJu2V8X3kJFm1oAQ-Y6CkCJHqmlYER7X9aCr_GdJt2ozxaiVu_oqlRn-5r99tf9tOo9y1cUwsYELsFTQ7m3gS2kJfoH2yLRLN16xYfbntHigPAZPAfwjE"
        alt="Spiritual Sanctuary - Temple Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full text-center">
        <span className="text-[#D4A853] tracking-widest text-xs sm:text-sm font-semibold uppercase mb-4 block">
          {t(TR.eyebrow, lang)}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          {t(TR.heading, lang)}
        </h1>
        <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          {t(TR.sub, lang)}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#daily-poojas"
            className="bg-[#D4A853] text-[#2D1810] px-8 py-3 rounded-lg font-bold hover:bg-[#C49640] transition-all flex items-center gap-2 text-sm md:text-base"
          >
            {t(TR.viewPoojas, lang)}
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
