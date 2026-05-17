import HeroSection from "./components/HeroSection"
import TypesSection from "./components/TypesSection"
import BookingSection from "./components/BookingSection"
import GuidelinesSection from "./components/GuidelinesSection"
import DonateCTA from "../../components/DonateCTA"
import BookingGuidelinesSection from "../pooja/components/BookingGuidelinesSection"

export default function DarshanPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <main className="parchment-bg">
        <HeroSection />
        <TypesSection />
        <BookingSection />
        {/* <GuidelinesSection /> */}
        <BookingGuidelinesSection />
        <DonateCTA />
      </main>
    </div>
  )
}
