import { useLanguage } from "../contexts/LanguageContext"

const DONATE_CTA_TRANSLATIONS = {
  en: {
    label: "Support the Sacred Traditions",
    title: "Support the Sacred Traditions",
    description: "Your contributions help us maintain the temple's daily rituals, community services, and architectural heritage for future generations.",
    button: "Donate Now",
  },
  ta: {
    label: "புனித பாரம்பரியங்களை ஆதரிக்கவும்",
    title: "புனித பாரம்பரியங்களை ஆதரிக்கவும்",
    description: "உங்கள் பங்களிப்புகள் கோயில் தினசரி வழிபாடுகள், சமூகம் சேவைகள் மற்றும் கட்டிட பாரம்பரியத்தை எதிர்கால தலைமுறைகளுக்காக பராமரிக்க உதவுகின்றன.",
    button: "இப்போது தர்ப்பண செய்யவும்",
  },
}

export default function DonateCTA() {
  const { lang } = useLanguage()
  const t = DONATE_CTA_TRANSLATIONS[lang] || DONATE_CTA_TRANSLATIONS.en

  return (
    <section className=" bg-[#FDF8F3] px-6 py-12 text-center border-y border-[#E5D5C5] sm:px-12 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="mx-auto mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#8B1A1A]">
          Support the Sacred Traditions
        </p>
        <h2 className="font-serif text-3xl font-bold leading-tight text-[#2D1810] sm:text-4xl">
          Support the Sacred Traditions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-[#6B4423]">
          Your contributions help us maintain the temple's daily rituals, community services, and architectural heritage for future generations.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/donate"
            className="inline-flex items-center justify-center bg-[#8B1A1A] px-8 py-3 text-sm md:text-base font-bold text-white rounded-lg shadow-md transition hover:bg-[#6B1414]"
          >
            Donate Now
          </a>
        </div>
      </div>
    </section>
  )
}
