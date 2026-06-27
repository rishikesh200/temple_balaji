import heroImg from "../../../assets/images/hero-balaji.jpg"
import { useLanguage } from "../../../contexts/LanguageContext"
import { t } from "../../../utils/i18n"
import { motion } from "framer-motion"

const TR = {
  eyebrow:      { en: "OM NAMO VENKATESAYA",                                                                                          ta: "ஓம் நமோ வேங்கடேசாய" },
  heading:      { en: "Seek the Blessings of Balaji",                                                                                 ta: "பாலாஜியின் ஆசிர்வாதத்தை நாடுங்கள்" },
  sub:          { en: "Experience the divine presence of Lord Venkateswara through our sacred Darshan services. Reserve your slot for a peaceful spiritual journey.", ta: "எங்கள் புனித தரிசன சேவைகள் மூலம் ஸ்ரீ வெங்கடேஸ்வரனின் தெய்வீக சன்னிதியை அனுபவியுங்கள். ஆன்மீக பயணத்திற்கு உங்கள் இடத்தை முன்பதிவு செய்யுங்கள்." },
  viewTypes:    { en: "View Darshan Types",                                                                                           ta: "தரிசன வகைகளை காண்க" },
  checkAvail:   { en: "Check Availability",                                                                                          ta: "கிடைப்பதை சரிபார்க்கவும்" },
}

export default function HeroSection() {
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-[500px] md:h-[614px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" aria-hidden />
      <motion.img
        src={heroImg}
        alt="Paruthipattu Balaji Temple gopuram"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }} animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      />
      <div className="relative z-20 text-center px-4">
        <motion.span className="text-gold tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase mb-4 block"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          {t(TR.eyebrow, lang)}
        </motion.span>
        <motion.h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight"
          initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}>
          {t(TR.heading, lang)}
        </motion.h1>
        <motion.p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
          {t(TR.sub, lang)}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#types"
            className="bg-btn-bg text-btn-text px-8 py-3 rounded-lg text-sm font-semibold hover:bg-btn-bg-hover transition-all shadow-lg"
          >
            {t(TR.viewTypes, lang)}
          </a>
          <a
            href="#booking"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all"
          >
            {t(TR.checkAvail, lang)}
          </a>
        </div>
      </div>
    </section>
  )
}

