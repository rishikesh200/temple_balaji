import React from "react"
import HeroSection from "./components/HeroSection"
import CausesSection from "./components/CausesSection"
import ImpactSection from "./components/ImpactSection"
import SecurePaymentsSection from "./components/SecurePaymentsSection"
import TaxExemptSection from "./components/TaxExemptSection"
import Footer from "../home/components/Footer"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <main>
        <HeroSection />
        <CausesSection />
        <ImpactSection />
        <SecurePaymentsSection />
        <TaxExemptSection />
      </main>
    </div>
  )
}
