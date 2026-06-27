import { Link } from "react-router-dom"
import { HandHeart, Flame, Landmark, Star } from "lucide-react"
import vilakuImg from "../../../assets/images/vilaku.jpeg"
import { useLanguage } from "../../../contexts/LanguageContext"
import { FadeUp, FadeRight, BlurReveal, StaggerContainer, StaggerItem, ZoomIn } from "../../../components/Motion"

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

const tiers = (lang) => [
  { amount: "₹250",   description: DONATION_TRANSLATIONS.feeds5People[lang],     Icon: HandHeart },
  { amount: "₹1000",  description: DONATION_TRANSLATIONS.supportsPoojas[lang],   Icon: Flame },
  { amount: "₹5000",  description: DONATION_TRANSLATIONS.helpsMaintenance[lang], Icon: Landmark },
  { amount: "₹21000", description: DONATION_TRANSLATIONS.supportsFestivals[lang], Icon: Star },
]

export default function DonationSection() {
  const { lang } = useLanguage()
  
  return (
    <section className="bg-maroon-dark py-0 text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row lg:items-stretch lg:min-h-[320px]">
        {/* Left — lamp with glow */}
        <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden px-6 py-6 lg:w-[min(32%,320px)] lg:min-h-0 lg:py-0">
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
            className="relative z-10 max-h-[160px] w-auto object-contain drop-shadow-[0_0_28px_rgba(212,175,55,0.35)] lg:max-h-[min(280px,85%)]"
          />
        </div>

        {/* Middle — heading + tiers */}
        <div className="flex flex-1 flex-col justify-center px-4 py-6 lg:border-l lg:border-white/[0.08] lg:px-8 lg:py-10">
          <BlurReveal><h2 className="mb-6 flex items-center justify-center gap-3 text-center font-serif text-section-title font-bold text-gold">
            <Flourish className="h-8 w-5 shrink-0 rotate-180 opacity-90" />
            <span className="leading-tight">{DONATION_TRANSLATIONS.yourContribution[lang]}</span>
            <Flourish className="h-8 w-5 shrink-0 opacity-90" />
          </h2></BlurReveal>

          <StaggerContainer className="grid grid-cols-4 gap-0">
            {tiers(lang).map(({ amount, description, Icon }, i) => (
              <StaggerItem key={amount} className={`flex flex-col items-center px-1 py-3 text-center lg:px-4 rounded-xl transition-all duration-300 hover:bg-white/[0.05] hover:scale-105 cursor-default ${
                  i < tiers(lang).length - 1 ? "border-r border-white/[0.1]" : ""
                }`}>
                <Icon className="h-7 w-7 lg:h-9 lg:w-9 transition-transform duration-300" color={gold} strokeWidth={1.5} aria-hidden />
                <p className="mt-2 font-sans text-sm lg:text-amount-sm font-bold text-gold">
                  {amount}
                </p>
                <p className="mt-1 font-sans text-[10px] lg:text-caption text-white/80 leading-tight">
                  {description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right — fund + progress + CTA */}
        <FadeRight delay={0.3} className="flex w-full shrink-0 flex-col justify-center gap-4 border-t border-gold/25 px-4 py-6 lg:w-[min(28%,300px)] lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
          <div>
            <h3 className="font-serif text-fund-title font-semibold text-gold">
              {DONATION_TRANSLATIONS.templeRenovation[lang]}
            </h3>
            <p className="mt-2 font-sans text-progress font-bold text-gold/90 tracking-wide">{DONATION_TRANSLATIONS.percentCompleted[lang]}</p>
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
        </FadeRight>
      </div>
    </section>
  )
}
