import AboutSection from "./components/AboutSection"
import DarshanSection from "./components/DarshanSection"
import DonationSection from "./components/DonationSection"
import Events from "./components/Events"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
import PoojaGrid from "./components/PoojaGrid"
import QuickActions from "./components/QuickActions"
import Stream from "./components/Stream"
import TrustBadges from "./components/TrustBadges"

const Home = () => {
  return (
    <div>
      <Hero />
      <QuickActions />
      <AboutSection />
      <Events />
      <DonationSection />
      <DarshanSection />
      <PoojaGrid />
      <Gallery />
      <Stream />
      <TrustBadges />
    </div>
  )
}

export default Home
