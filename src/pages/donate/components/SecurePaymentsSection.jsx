import React from "react"
import { ShieldCheck, Lock } from "lucide-react"

// Import custom color SVG icons
import GooglePayIcon from "../../../assets/icons/Google_Pay.svg"
import PhonePeIcon from "../../../assets/icons/PhonePe.svg"
import PaytmIcon from "../../../assets/icons/Paytm.svg"
import UpiIcon from "../../../assets/icons/upi.svg"
import VisaIcon from "../../../assets/icons/Visa.svg"
import MastercardIcon from "../../../assets/icons/Mastercard.svg"

export default function SecurePaymentsSection() {
  const paymentIcons = [
    { name: "UPI", icon: UpiIcon, height: "h-9" },
    { name: "Google Pay", icon: GooglePayIcon, height: "h-10" },
    { name: "PhonePe", icon: PhonePeIcon, height: "h-10" },
    { name: "Paytm", icon: PaytmIcon, height: "h-8" },
    { name: "Visa", icon: VisaIcon, height: "h-8" },
    { name: "Mastercard", icon: MastercardIcon, height: "h-12" },
  ]

  return (
    <section className="py-12 md:py-16 bg-[#FDF8F3] border-b border-[#E5D5C5]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        
        {/* Section titles */}
        <div className="mb-8">
          <span className="text-[#8B1A1A] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
            Secure Payment Gateways
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D1810]">
            Safe, Instant & Encrypted Transactions
          </h3>
          <p className="text-[#6B4423]/80 text-xs font-medium mt-1">
            Fulfill your offerings instantly using any preferred mobile payment, card, or direct UPI.
          </p>
        </div>

        {/* Elevated Colored Gateway Cards Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 max-w-5xl mx-auto">
          {paymentIcons.map((gateway, idx) => (
            <div 
              key={idx} 
              className="bg-white px-6 py-3 rounded-2xl border border-[#E5D5C5] shadow-xs flex items-center justify-center hover:shadow-md hover:border-[#D4A853] hover:-translate-y-0.5 transition-all duration-300 h-16 w-40 cursor-pointer ring-1 ring-black/5"
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
            <span>256-Bit SSL Secured</span>
          </div>
          <span className="hidden sm:inline text-green-300">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-green-700 shrink-0" />
            <span>80G Tax Exemption Certified</span>
          </div>
        </div>

      </div>
    </section>
  )
}
