import React from "react"
import { ShieldCheck, Receipt, Download, Sparkles } from "lucide-react"

export default function TaxExemptSection() {
  return (
    <section className="py-16 md:py-20 bg-[#F6F3F2] border-y border-[#E5D5C5]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE: Exemption legal details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#8B1A1A]">
              <ShieldCheck className="w-6 h-6 text-[#8B1A1A]" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-widest">Tax Exemption Certifications</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2D1810] leading-tight">
              Your Contributions are Tax Exempt (Sec 80G)
            </h2>
            
            <p className="text-[#6B4423] text-sm md:text-base leading-relaxed font-medium">
              All financial offerings and grocery sponsorships made to Paruthipattu Balaji Temple are eligible for official income tax deduction under Section 80G of the Income Tax Act, 1961.
            </p>

            <div className="flex flex-col gap-4">
              {/* Point 1: 80G Certified */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-[#E5D5C5]/60 shadow-xs hover:shadow-sm hover:border-[#D4A853]/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#FDF8F3] border border-[#E5D5C5] flex items-center justify-center text-[#8B1A1A] shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#8B1A1A]" aria-hidden />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2D1810]">Section 80G Legal Protection</h4>
                  <p className="text-xs text-[#6B4423] mt-1 font-semibold leading-relaxed">
                    Maximize your charity impact while claiming statutory tax credits. We provide automated legal certificates for every transaction.
                  </p>
                </div>
              </div>

              {/* Point 2: Transparent Accounting */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-[#E5D5C5]/60 shadow-xs hover:shadow-sm hover:border-[#D4A853]/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#FDF8F3] border border-[#E5D5C5] flex items-center justify-center text-[#8B1A1A] shrink-0">
                  <Receipt className="w-5 h-5 text-[#8B1A1A]" aria-hidden />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2D1810]">Transparent Audited Accounts</h4>
                  <p className="text-xs text-[#6B4423] mt-1 font-semibold leading-relaxed">
                    100% of all public contributions are strictly tracked and audited by certified accounting panels, utilized only for designated alankaram, gurukul, and food drives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Receipt download helper card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[#E5D5C5] relative ring-1 ring-black/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A853]/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-serif text-xl font-bold text-[#2D1810] mb-6 flex items-center gap-2 pb-3 border-b border-[#F5E6D3]">
              <Sparkles className="w-5 h-5 text-[#D4A853]" /> Devotee Receipt Dispatch System
            </h3>
            
            <ol className="space-y-6 text-xs md:text-sm text-[#6B4423] font-medium">
              <li className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full bg-[#8B1A1A] border border-[#D4A853] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                  1
                </span>
                <div>
                  <strong className="text-[#2D1810] block mb-0.5">Secure Transaction Complete</strong>
                  <p className="text-xs leading-relaxed">Make your online donation via any of our 256-bit SSL secured gateways (UPI, Netbanking, Cards).</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full bg-[#8B1A1A] border border-[#D4A853] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                  2
                </span>
                <div>
                  <strong className="text-[#2D1810] block mb-0.5">Instant Email PDF Dispatch</strong>
                  <p className="text-xs leading-relaxed">An automated digital receipt voucher containing the 80G reference details is instantly dispatched to your mail inbox.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full bg-[#8B1A1A] border border-[#D4A853] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                  3
                </span>
                <div>
                  <strong className="text-[#2D1810] block mb-0.5">Consolidated Annual Certificate</strong>
                  <p className="text-xs leading-relaxed">Log into the devotee profile portal anytime to retrieve consolidated annual tax exemption certificates for filing.</p>
                </div>
              </li>
            </ol>

            <button
              type="button"
              className="w-full mt-8 py-3.5 border-2 border-[#8B1A1A] text-[#8B1A1A] rounded-xl text-xs font-bold hover:bg-[#8B1A1A] hover:text-white shadow-2xs hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden />
              Download Consolidated Receipts
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
