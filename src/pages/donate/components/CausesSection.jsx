import React, { useState } from "react"
import { BlurReveal, StaggerContainer, StaggerItem } from "../../../components/Motion"
import {
  BookOpen,
  Building2,
  Landmark,
  HeartHandshake,
  BookOpen as BookIcon,
  Sparkles,
  Flame,
  Users,
  Heart
} from "lucide-react"
import { useLanguage } from "../../../contexts/LanguageContext"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { getT } from "../../../utils/i18n"

const CAUSES_TRANSLATIONS = {
  en: {
    sectionLabel: "Sacred Contributions",
    title: "Choose a Sacred Cause",
    description: "Every contribution, no matter the size, helps sustain the daily rituals, Vedic pathashala operations, and charitable services of the temple.",
    donateNow: "Donate Now",
    customAmountPlaceholder: "Enter custom amount (₹)",
  },
  ta: {
    sectionLabel: "புனித நன்கொடைகள்",
    title: "ஒரு புனித காரணத்தை தேர்வு செய்யவும்",
    description: "எந்த அளவிலான கொடுப்பனவையும் மாத்திரையல்ல, நகர்ப்பெருங்கோயில் தினசரி வழிபாடுகள், வேதப் பாடசாலை செயல்பாடுகள், மற்றும் அறக்கட்டளை சேவைகளை பராமரிக்க உதவுகிறது.",
    donateNow: "இப்போதே தர்ப்பண செய்யவும்",
    customAmountPlaceholder: "இருப்பும் தொகையை உள்ளிடவும் (₹)",
  },
}

const ctaIcons = {
  heart: Heart,
  building: Building2,
  landmark: Landmark,
  heartHandshake: HeartHandshake,
  book: BookOpen,
  sparkles: Sparkles,
  flame: Flame,
  users: Users,
}

function DonationCauseCard({ cause, onDonateSelect }) {
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [customAmount, setCustomAmount] = useState("")
  const { lang } = useLanguage()
  const t = CAUSES_TRANSLATIONS[lang] || CAUSES_TRANSLATIONS.en
  const CtaIcon = ctaIcons[cause.ctaIcon] ?? Heart

  const displayAmount =
    cause.inputMode === "presets"
      ? cause.presetAmounts[selectedPreset]
      : Number(customAmount) || ""


  return (
    <article className="bg-white border border-border-warm/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ring-1 ring-black/5">
      <div className="h-48 overflow-hidden relative border-b border-border-warm/30">
        {(cause.imageUrl || cause.image) ? (
          <img
            src={cause.imageUrl || cause.image}
            alt={cause.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-bold text-earth-dark mb-2 group-hover:text-maroon transition-colors">{getT(cause, 'title', lang)}</h3>
        <p className="text-xs text-earth-medium mb-6 flex-grow leading-relaxed font-medium">{getT(cause, 'description', lang)}</p>
        <div className="space-y-4 mt-auto">
          {cause.inputMode === "presets" ? (
            <div className="flex justify-between gap-2 bg-parchment p-1.5 rounded-xl border border-border-warm">
              {cause.presetAmounts.map((amt, i) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedPreset(i)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    selectedPreset === i
                      ? "bg-btn-bg text-btn-text shadow-xs"
                      : "text-earth-medium hover:text-maroon hover:bg-white"
                  }`}
                >
                  ₹ {amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          ) : (
            <div className="relative">
              <input
                type="number"
                min={1}
                step={1}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={t.customAmountPlaceholder}
                className="w-full bg-parchment/50 border border-border-warm rounded-xl py-2 px-4 text-xs font-bold text-earth-dark placeholder:text-earth-medium/70 focus:outline-none focus:border-maroon transition-colors"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => onDonateSelect(cause.id, displayAmount ? Number(displayAmount) : '')}
            className="w-full bg-btn-bg text-btn-text py-3 rounded-xl text-xs font-bold hover:bg-btn-bg-hover border border-gold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CtaIcon className="w-4 h-4 text-gold" aria-hidden />
            <span>{t.donateNow}</span>
            {displayAmount ? (
              <span className="opacity-95 font-mono">· ₹ {Number(displayAmount).toLocaleString("en-IN")}</span>
            ) : null}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function CausesSection({ onDonateSelect }) {
  const { lang } = useLanguage()
  const { activeDonations: donationCauses } = useAdminData()
  const t = CAUSES_TRANSLATIONS[lang] || CAUSES_TRANSLATIONS.en

  return (
    <section className="py-16 md:py-20 bg-parchment" id="causes">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <BlurReveal>
          <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-maroon mb-4">
            {t.sectionLabel}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark mb-4">{t.title}</h2>
          </BlurReveal>
          <div className="divine-divider mb-6">
            <Sparkles className="w-6 h-6 text-gold shrink-0 mx-auto" aria-hidden />
          </div>
          <p className="text-earth-medium max-w-2xl mx-auto text-sm font-medium">
            {t.description}
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {donationCauses.map((cause) => (
            <StaggerItem key={cause.id}>
              <DonationCauseCard cause={cause} onDonateSelect={onDonateSelect} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

