import { useState } from "react"
import {
  BookOpen,
  Building2,
  CreditCard,
  Download,
  Flame,
  GraduationCap,
  Heart,
  HeartHandshake,
  Landmark,
  Receipt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react"
import { donationCauses } from "../../data/donationCauses"
import Footer from "../home/components/Footer"
import Header from "../home/components/Header"
import heroImg from "../../assets/images/hero-balaji.jpg"

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

function DonationCauseCard({ cause }) {
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [customAmount, setCustomAmount] = useState("")
  const CtaIcon = ctaIcons[cause.ctaIcon] ?? Heart

  const displayAmount =
    cause.inputMode === "presets"
      ? cause.presetAmounts[selectedPreset]
      : Number(customAmount) || ""

  return (
    <article className="bg-white border border-[#E5D5C5]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group">
      <div className="h-48 overflow-hidden">
        <img
          src={cause.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-2">{cause.title}</h3>
        <p className="text-sm text-[#6B4423] mb-6 flex-grow leading-relaxed">{cause.description}</p>
        <div className="space-y-4 mt-auto">
          {cause.inputMode === "presets" ? (
            <div className="flex justify-between gap-2">
              {cause.presetAmounts.map((amt, i) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedPreset(i)}
                  className={`flex-1 py-2 border rounded-lg text-xs font-semibold transition-colors ${
                    selectedPreset === i
                      ? "border-[#8B1A1A] bg-[#8B1A1A] text-white"
                      : "border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
                  }`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="number"
              min={1}
              step={1}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter custom amount"
              className="w-full bg-[#FDF8F3] border border-[#E5D5C5] rounded-lg py-2 px-4 text-sm text-[#2D1810] placeholder:text-[#6B4423]/70 focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/40"
            />
          )}
          <button
            type="button"
            className="w-full bg-[#8B1A1A] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#6B1414] transition-colors flex items-center justify-center gap-2"
          >
            <CtaIcon className="w-[18px] h-[18px]" aria-hidden />
            Donate Now
            {displayAmount ? (
              <span className="opacity-90 font-normal">· ₹{Number(displayAmount).toLocaleString("en-IN")}</span>
            ) : null}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <Header />
      <main>
        <header className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt=""
              className="w-full h-full object-cover opacity-95 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#660000]/55 via-[#660000]/25 to-[#FDF8F3]" />
          </div>
          <div className="relative z-10 text-center max-w-3xl px-4 pt-8 pb-12">
            <span className="text-[#D4A853] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Divine Services
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Offer Your Prayers &amp;
              <br />
              Receive Divine Blessings
            </h1>
            <p className="text-white/85 max-w-2xl mx-auto mb-10 text-base">
              Participate in sacred daily rituals and special sevas conducted with Vedic authenticity to seek the grace of
              Lord Venkateswara.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#causes"
                className="inline-flex items-center gap-2 bg-[#D4A853] text-[#2D1810] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#c49b2e] transition-all shadow-lg"
              >
                Choose a Cause
                <span aria-hidden className="text-lg leading-none">
                  ↓
                </span>
              </a>
              <a
                href="#impact"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all"
              >
                See Impact
              </a>
            </div>
          </div>
        </header>

        <section className="py-16 md:py-20 bg-[#FDF8F3]" id="causes">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] mb-4">Choose a Sacred Cause</h2>
              <div className="divine-divider mb-6">
                <Sparkles className="w-6 h-6 text-[#D4A853] shrink-0 mx-auto" aria-hidden />
              </div>
              <p className="text-[#6B4423] max-w-2xl mx-auto">
                Every contribution, no matter the size, helps sustain the traditions, architecture, and service of the
                temple for future generations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {donationCauses.map((cause) => (
                <DonationCauseCard key={cause.id} cause={cause} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F6F3F2] parchment-bg relative overflow-hidden" id="impact">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <span className="text-[#8B4513] text-xs font-semibold uppercase tracking-widest block mb-2">
                Where Your Contribution Goes
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810]">
                Spiritual Significance &amp; Impact
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[#8B1A1A]">
                  <Users className="w-8 h-8" aria-hidden />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Community Support</h3>
                <p className="text-[#6B4423] text-sm leading-relaxed">
                  Extending support beyond the temple walls through free meal programs, local charity initiatives, and
                  assisting the needy during festivals.
                </p>
              </div>
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[#8B1A1A]">
                  <Sparkles className="w-8 h-8" aria-hidden />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Spiritual Preservation</h3>
                <p className="text-[#6B4423] text-sm leading-relaxed">
                  Ensuring the continuity of ancient Vedic rituals, daily pujas, and the upkeep of sacred architecture
                  and artifacts.
                </p>
              </div>
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[#8B1A1A]">
                  <GraduationCap className="w-8 h-8" aria-hidden />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-4">Vedic Education</h3>
                <p className="text-[#6B4423] text-sm leading-relaxed">
                  Supporting the temple Pathashala where the next generation learns Vedas, Agamas, and scriptures under
                  expert guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#6B4423] text-xs font-semibold tracking-widest mb-8 opacity-70">SECURE PAYMENT OPTIONS</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-[#2D1810]">
              <div className="flex items-center gap-2 font-semibold">
                <Smartphone className="w-10 h-10" aria-hidden />
                <span>UPI</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <CreditCard className="w-10 h-10" aria-hidden />
                <span>Cards</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Landmark className="w-10 h-10" aria-hidden />
                <span>Net Banking</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-10 h-10" aria-hidden />
                <span>80G Tax Exempt</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#F6F3F2] border-y border-[#E5D5C5]/80">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#8B1A1A]">
                  <ShieldCheck className="w-6 h-6" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-widest">Tax Exemptions</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810]">
                  Your Contributions are Tax Exempt
                </h2>
                <p className="text-[#6B4423] text-base leading-relaxed">
                  All donations made to Paruthipattu Balaji Temple are eligible for tax deduction under Section 80G of the
                  Income Tax Act, 1961.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 p-4 bg-white rounded-lg border border-[#E5D5C5]/50 shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-[#8B1A1A] shrink-0" aria-hidden />
                    <div>
                      <h4 className="font-semibold text-[#2D1810] text-sm">Section 80G Certified</h4>
                      <p className="text-sm text-[#6B4423] mt-1">
                        Maximize your impact while saving on taxes. We provide official certificates for every donation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-white rounded-lg border border-[#E5D5C5]/50 shadow-sm">
                    <Receipt className="w-6 h-6 text-[#8B1A1A] shrink-0" aria-hidden />
                    <div>
                      <h4 className="font-semibold text-[#2D1810] text-sm">Transparent Accounting</h4>
                      <p className="text-sm text-[#6B4423] mt-1">
                        Donations are utilized for intended temple activities and social causes as communicated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#E5D5C5]/50">
                <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-6">How to Get Your Receipt</h3>
                <ol className="space-y-6 text-sm text-[#6B4423]">
                  <li className="flex gap-4">
                    <span className="flex-none w-8 h-8 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <p>Complete your donation via any of our secure payment gateways.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-none w-8 h-8 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <p>A digital receipt will be generated and sent to your registered email address.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-none w-8 h-8 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <p>Log in to your profile at any time to download consolidated 80G certificates for the financial year.</p>
                  </li>
                </ol>
                <button
                  type="button"
                  className="w-full mt-8 py-3 border-2 border-[#8B1A1A] text-[#8B1A1A] rounded-lg text-sm font-semibold hover:bg-[#8B1A1A] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" aria-hidden />
                  Download Previous Receipts
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
