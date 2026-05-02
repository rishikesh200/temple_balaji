import AboutSection from "./components/AboutSection"
import DarshanSection from "./components/DarshanSection"
import DonationSection from "./components/DonationSection"
import Events from "./components/Events"
import Footer from "./components/Footer"
import Gallery from "./components/Gallery"
import Header from "./components/Header"
import Hero from "./components/Hero"
import PoojaGrid from "./components/PoojaGrid"
import QuickActions from "./components/QuickActions"
import TrustBadges from "./components/TrustBadges"

const Home = () => {
  return (
    <div className="">
      <Header />
      <Hero/>
      <QuickActions />
      <AboutSection/>
      <DarshanSection />
      <PoojaGrid />
      <DonationSection />
      <Events />
      <Gallery />
      <TrustBadges />
      <Footer />
    </div>
  )
}

export default Home