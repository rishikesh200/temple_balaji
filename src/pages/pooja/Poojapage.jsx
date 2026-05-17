import HeroSection from "./components/HeroSection"
import PoojaCardsSection from "./components/PoojaCardsSection"
import SpecialSevasSection from "./components/SpecialSevasSection"
import AnnadanamSection from "./components/AnnadanamSection"
import BookingGuidelinesSection from "./components/BookingGuidelinesSection"
import DonateCTA from "../../components/DonateCTA"
import NerthikadanSection from "./components/NerthikadanSection"

export default function Poojapage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <main>
        <HeroSection />
        <PoojaCardsSection />
        <SpecialSevasSection />
        <NerthikadanSection />
        {/* <AnnadanamSection /> */}
        <BookingGuidelinesSection />
        <DonateCTA />
      </main>
    </div>
  )
}