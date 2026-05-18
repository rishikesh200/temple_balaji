import React, { useState } from "react"
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
import { donationCauses } from "../../../data/donationCauses"

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
  const CtaIcon = ctaIcons[cause.ctaIcon] ?? Heart

  const displayAmount =
    cause.inputMode === "presets"
      ? cause.presetAmounts[selectedPreset]
      : Number(customAmount) || ""


  return (
    <article className="bg-white border border-[#E5D5C5]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ring-1 ring-black/5">
      <div className="h-48 overflow-hidden relative border-b border-[#E5D5C5]/30">
        <img
          src={cause.image}
          alt={cause.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-bold text-[#2D1810] mb-2 group-hover:text-[#8B1A1A] transition-colors">{cause.title}</h3>
        <p className="text-xs text-[#6B4423] mb-6 flex-grow leading-relaxed font-medium">{cause.description}</p>
        <div className="space-y-4 mt-auto">
          {cause.inputMode === "presets" ? (
            <div className="flex justify-between gap-2 bg-[#FDF8F3] p-1.5 rounded-xl border border-[#E5D5C5]">
              {cause.presetAmounts.map((amt, i) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedPreset(i)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    selectedPreset === i
                      ? "bg-[#8B1A1A] text-white shadow-xs"
                      : "text-[#8B4513] hover:text-[#8B1A1A] hover:bg-white"
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
                placeholder="Enter custom amount (₹)"
                className="w-full bg-[#FDF8F3]/50 border border-[#E5D5C5] rounded-xl py-2 px-4 text-xs font-bold text-[#2D1810] placeholder:text-[#6B4423]/70 focus:outline-none focus:border-[#8B1A1A] transition-colors"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => onDonateSelect(cause.id, displayAmount ? Number(displayAmount) : '')}
            className="w-full bg-[#8B1A1A] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#6B1414] border border-[#D4A853] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CtaIcon className="w-4 h-4 text-[#D4A853]" aria-hidden />
            <span>Donate Now</span>
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
  return (
    <section className="py-16 md:py-20 bg-[#FDF8F3]" id="causes">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#8B1A1A] mb-4">
            Sacred Contributions
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-4">Choose a Sacred Cause</h2>
          <div className="divine-divider mb-6">
            <Sparkles className="w-6 h-6 text-[#D4A853] shrink-0 mx-auto" aria-hidden />
          </div>
          <p className="text-[#6B4423] max-w-2xl mx-auto text-sm font-medium">
            Every contribution, no matter the size, helps sustain the daily rituals, Vedic pathashala operations, and charitable services of the temple.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {donationCauses.map((cause) => (
            <DonationCauseCard key={cause.id} cause={cause} onDonateSelect={onDonateSelect} />
          ))}
        </div>
      </div>
    </section>
  )
}
