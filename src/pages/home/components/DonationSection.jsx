import { Link } from "react-router-dom"
import vilakuImg from "../../../assets/images/vilaku.jpeg"
import { useLanguage } from "../../../contexts/LanguageContext"

const gold = "var(--color-gold)"

const DONATION_TRANSLATIONS = {
  yourContribution: {
    en: "Your Contribution, Their Blessing",
    ta: "உங்கள் பங்களிப்பு, அவர்களின் ஆசி"
  },
  feeds5People: {
    en: "Feeds 5 People through Annadhanam",
    ta: "அன்னதானத்தின் மூலம் 5 பேரை உண்ணச் செய்கிறது"
  },
  supportsPoojas: {
    en: "Supports Daily Poojas & Rituals",
    ta: "தினசரி பூஜைகள் & சடங்குகளுக்கு ஆதரவளிக்கிறது"
  },
  helpsMaintenance: {
    en: "Helps in Temple Maintenance",
    ta: "கோவில் பராமரிப்பில் உதவுகிறது"
  },
  supportsFestivals: {
    en: "Supports Festivals & Annadhanam",
    ta: "விழாக்கள் & அன்னதானத்திற்கு ஆதரவளிக்கிறது"
  },
  templeRenovation: {
    en: "Temple Renovation Fund",
    ta: "கோவில் புனரமைப்பு நிதி"
  },
  percentCompleted: {
    en: "65% Completed",
    ta: "65% முடிந்துவிட்டது"
  },
  contributeNow: {
    en: "Contribute Now",
    ta: "இப்போது பங்களிக்கவும்"
  }
}

function Flourish({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2c-2 4-6 6-8 10 2 2 4 3 8 5m0-15c2 4 6 6 8 10-2 2-4 3-8 5M12 17v13"
        stroke={gold}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconAnnadhanam() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke={gold} strokeWidth="1.25">
      <path d="M10 38h28M14 38V22l10-8 10 8v16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 26h12M18 30h8" strokeLinecap="round" />
      <path d="M24 14v-4M20 12h8" strokeLinecap="round" />
    </svg>
  )
}

function IconRituals() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke={gold} strokeWidth="1.25">
      <circle cx="24" cy="20" r="6" />
      <path d="M24 14v-6M18 17l-5-3M30 17l5-3M17 23l-5 2M31 23l5 2M20 28l-3 5M28 28l3 5M24 30v6" strokeLinecap="round" />
    </svg>
  )
}

function IconMaintenance() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke={gold} strokeWidth="1.25">
      <path d="M14 12h20a2 2 0 012 2v22a2 2 0 01-2 2H14a2 2 0 01-2-2V14a2 2 0 012-2z" />
      <path d="M18 18h12M18 24h12M18 30h8" strokeLinecap="round" />
    </svg>
  )
}

function IconFestivals() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" stroke={gold} strokeWidth="1.25">
      <path d="M12 38h24M16 38V26l8-14 8 14v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 22h8M22 26h4" strokeLinecap="round" />
    </svg>
  )
}

const tiers = (lang) => [
  { amount: "₹250", description: DONATION_TRANSLATIONS.feeds5People[lang], Icon: IconAnnadhanam },
  { amount: "₹1000", description: DONATION_TRANSLATIONS.supportsPoojas[lang], Icon: IconRituals },
  { amount: "₹5000", description: DONATION_TRANSLATIONS.helpsMaintenance[lang], Icon: IconMaintenance },
  { amount: "₹21000", description: DONATION_TRANSLATIONS.supportsFestivals[lang], Icon: IconFestivals },
]

export default function DonationSection() {
  const { lang } = useLanguage()
  
  return (
    <section className="bg-maroon-dark py-0 text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row lg:items-stretch lg:min-h-[320px]">
        {/* Left — lamp with glow */}
        <div className="relative flex min-h-[220px] w-full shrink-0 items-center justify-center overflow-hidden px-6 py-10 lg:w-[min(32%,320px)] lg:min-h-0 lg:py-0">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 50% 55%, rgba(212,175,55,0.22) 0%, rgba(74,0,0,0) 65%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 50% 60%, rgba(255,200,120,0.15) 0%, transparent 50%)`,
            }}
          />
          <img
            src={vilakuImg}
            alt="Traditional oil lamp"
            className="relative z-10 max-h-[260px] w-auto object-contain drop-shadow-[0_0_28px_rgba(212,175,55,0.35)] lg:max-h-[min(280px,85%)]"
          />
        </div>

        {/* Middle — heading + tiers */}
        <div className="flex flex-1 flex-col justify-center border-t border-white/[0.06] px-5 py-8 lg:border-l lg:border-t-0 lg:border-white/[0.08] lg:px-8 lg:py-10">
          <h2 className="mb-8 flex items-center justify-center gap-3 text-center font-serif text-section-title font-bold text-gold">
            <Flourish className="h-8 w-5 shrink-0 rotate-180 opacity-90" />
            <span className="leading-tight">{DONATION_TRANSLATIONS.yourContribution[lang]}</span>
            <Flourish className="h-8 w-5 shrink-0 opacity-90" />
          </h2>

          <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
            {tiers(lang).map(({ amount, description, Icon }, i) => (
              <div
                key={amount}
                className={`flex flex-col items-center px-2 py-2 text-center sm:px-4 ${
                  i % 2 === 0 ? "border-r border-white/[0.1]" : ""
                } ${i < tiers(lang).length - 1 ? "lg:border-r lg:border-white/[0.12]" : ""}`}
              >
                <Icon />
                <p className="mt-4 font-serif text-amount-sm font-bold text-gold sm:text-amount">
                  {amount}
                </p>
                <p className="mt-2 max-w-[11rem] font-sans text-caption text-white/90">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — fund + progress + CTA */}
        <div className="flex w-full shrink-0 flex-col justify-center gap-5 border-t border-gold/25 px-6 py-8 sm:px-10 lg:w-[min(28%,300px)] lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
          <div>
            <h3 className="font-serif text-fund-title font-semibold text-gold">
              {DONATION_TRANSLATIONS.templeRenovation[lang]}
            </h3>
            <p className="mt-2 font-sans text-progress text-white/85">{DONATION_TRANSLATIONS.percentCompleted[lang]}</p>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/35 ring-1 ring-white/[0.06]">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-gold via-gold-light to-gold-deep shadow-[0_0_12px_rgba(212,175,55,0.35)]" />
          </div>

          <Link
            to="/donate"
            className="block w-full rounded-md bg-gradient-to-b from-gold-light via-gold to-gold-deep py-3 text-center font-sans text-btn font-semibold tracking-wide text-maroon-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition hover:brightness-105 active:brightness-95"
          >
            {DONATION_TRANSLATIONS.contributeNow[lang]}
          </Link>
        </div>
      </div>
    </section>
  )
}
