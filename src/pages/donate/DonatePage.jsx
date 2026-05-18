import React, { useState } from "react"
import HeroSection from "./components/HeroSection"
import DonateFormSection from "./components/DonateFormSection"
import CausesSection from "./components/CausesSection"
import ImpactSection from "./components/ImpactSection"
import SecurePaymentsSection from "./components/SecurePaymentsSection"
import TaxExemptSection from "./components/TaxExemptSection"
import Footer from "../home/components/Footer"
import { donationCauses } from "../../data/donationCauses"

export default function DonatePage() {
  const [selectedCauseId, setSelectedCauseId] = useState(donationCauses[0]?.id || 'general')
  const [selectedAmount, setSelectedAmount] = useState('')

  const handleDonateSelect = (causeId, amount) => {
    setSelectedCauseId(causeId)
    setSelectedAmount(amount || '')
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <main>
        <HeroSection />
        
        <CausesSection onDonateSelect={handleDonateSelect} />
        <DonateFormSection
          selectedCause={selectedCauseId}
          selectedAmount={selectedAmount}
        />
        <ImpactSection />
        <SecurePaymentsSection />
        <TaxExemptSection />
      </main>
    </div>
  )
}
