import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import HeroSection from "./components/HeroSection"
import DonateFormSection from "./components/DonateFormSection"
import CausesSection from "./components/CausesSection"
import ImpactSection from "./components/ImpactSection"
import SecurePaymentsSection from "./components/SecurePaymentsSection"
import TaxExemptSection from "./components/TaxExemptSection"
import Footer from "../home/components/Footer"
import { donationCauses } from "../../data/donationCauses"

export default function DonatePage() {
  const [searchParams] = useSearchParams()
  const [selectedCauseId, setSelectedCauseId] = useState(donationCauses[0]?.id || 'general')
  const [selectedAmount, setSelectedAmount] = useState('')

  useEffect(() => {
    const amountParam = searchParams.get("amount")
    if (amountParam !== null) {
      // Remove any currency symbol or non-numeric characters except decimals
      const cleanAmount = amountParam.replace(/[^0-9.]/g, "")
      setSelectedAmount(cleanAmount)
    }
    const causeParam = searchParams.get("cause")
    if (causeParam) {
      setSelectedCauseId(causeParam)
    }
  }, [searchParams])

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
