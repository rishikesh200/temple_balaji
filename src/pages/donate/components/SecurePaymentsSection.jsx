import React from "react"
import { useLanguage } from "../../../contexts/LanguageContext"
import { ShieldCheck, Lock } from "lucide-react"

// Import custom color SVG icons
import GooglePayIcon from "../../../assets/icons/Google_Pay.svg"
import PhonePeIcon from "../../../assets/icons/PhonePe.svg"
import PaytmIcon from "../../../assets/icons/Paytm.svg"
import UpiIcon from "../../../assets/icons/upi.svg"
import VisaIcon from "../../../assets/icons/Visa.svg"
import MastercardIcon from "../../../assets/icons/Mastercard.svg"

const SECURE_PAYMENTS_TRANSLATIONS = {
  en: {
    sectionLabel: "Secure Payment Gateways",
    title: "Safe, Instant & Encrypted Transactions",
    description: "Fulfill your offerings instantly using any preferred mobile payment, card, or direct UPI.",
    sslLabel: "256-Bit SSL Secured",
    taxLabel: "80G Tax Exemption Certified",
  },
  ta: {
    sectionLabel: "பாதுகாப்பான கட்டண வாயில்கள்",
    title: "இலவசம், உடனடி மற்றும் குறியாக்கப்பட்ட பரிவர்த்தனைகள்",
    description: "எந்த முறையை விரும்பினாலும் மொபைல் கட்டணம், கார்டு அல்லது நேரடி UPI மூலம் உங்கள் அர்ப்பணிப்புகளை உடனடியாக பூர்த்தி செய்க.",
    sslLabel: "256-பிட் SSL பாதுகாக்கப்பட்டது",
    taxLabel: "80G வரி விலக்கு சான்றிதழ்",
  },
}

export default function SecurePaymentsSection() {
  const { lang } = useLanguage()
  const t = SECURE_PAYMENTS_TRANSLATIONS[lang] || SECURE_PAYMENTS_TRANSLATIONS.en
  const paymentIcons = [
    { name: "UPI", icon: UpiIcon, height: "h-9" },
    { name: "Google Pay", icon: GooglePayIcon, height: "h-10" },
    { name: "PhonePe", icon: PhonePeIcon, height: "h-10" },
    { name: "Paytm", icon: PaytmIcon, height: "h-8" },
    { name: "Visa", icon: VisaIcon, height: "h-8" },
    { name: "Mastercard", icon: MastercardIcon, height: "h-12" },
  ]

  return (
    <section className="py-12 md:py-16 bg-parchment border-b border-border-warm/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        
        {/* Section titles */}
        <div className="mb-8">
          <span className="text-maroon text-xs font-bold tracking-[0.2em] uppercase block mb-2">
            {t.sectionLabel}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-earth-dark">
            {t.title}
          </h3>
          <p className="text-earth-medium/80 text-xs font-medium mt-1">
            {t.description}
          </p>
        </div>

        {/* Elevated Colored Gateway Cards Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 max-w-5xl mx-auto">
          {paymentIcons.map((gateway, idx) => (
            <div 
              key={idx} 
              className="bg-white px-6 py-3 rounded-2xl border border-border-warm shadow-xs flex items-center justify-center hover:shadow-md hover:border-gold hover:-translate-y-0.5 transition-all duration-300 h-16 w-40 cursor-pointer ring-1 ring-black/5"
            >
              <img 
                src={gateway.icon} 
                alt={gateway.name} 
                className={`${gateway.height} w-auto object-contain`} 
              />
            </div>
          ))}
        </div>

        {/* Security Stamp Indicator */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3.5 bg-green-50 px-6 py-2.5 rounded-full border border-green-200 text-green-800 text-xs font-bold shadow-2xs">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-green-700 shrink-0" />
            <span>{t.sslLabel}</span>
          </div>
          <span className="hidden sm:inline text-green-300">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-green-700 shrink-0" />
            <span>{t.taxLabel}</span>
          </div>
        </div>

      </div>
    </section>
  )
}
