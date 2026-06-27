import { useState } from "react"
import HeroSection from "./components/HeroSection"
import TypesSection from "./components/TypesSection"
import BookingSection from "./components/BookingSection"
import GuidelinesSection from "./components/GuidelinesSection"
import DonateCTA from "../../components/DonateCTA"
import BookingGuidelinesSection from "../pooja/components/BookingGuidelinesSection"

export default function DarshanPage() {
  const [selectedType, setSelectedType] = useState("special") // default to Special Darshan (₹250)

  return (
    <div className="min-h-screen bg-parchment">
      <main className="parchment-bg">
        <HeroSection />
        <TypesSection onSelectType={setSelectedType} />
        <BookingSection selectedType={selectedType} onSelectType={setSelectedType} />
        {/* <GuidelinesSection /> */}
        <BookingGuidelinesSection />
        <DonateCTA />
      </main>
    </div>
  )
}
