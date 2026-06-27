import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import HeroSection from "./components/HeroSection"
import DonateFormSection from "./components/DonateFormSection"
import CausesSection from "./components/CausesSection"
import ImpactSection from "./components/ImpactSection"
import SecurePaymentsSection from "./components/SecurePaymentsSection"
import TaxExemptSection from "./components/TaxExemptSection"
import Footer from "../home/components/Footer"
import { useAdminData } from "../../admin/contexts/AdminDataContext"

export default function DonatePage() {
  const { activeDonations } = useAdminData()
  const [searchParams] = useSearchParams()
  const [selectedCauseId, setSelectedCauseId] = useState('')

  useEffect(() => {
    if (!selectedCauseId && activeDonations.length > 0) {
      setSelectedCauseId(activeDonations[0].id)
    }
  }, [activeDonations, selectedCauseId])
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
    <div className="min-h-screen bg-parchment">
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
