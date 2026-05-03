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
import Stream from "./components/Stream"
import TrustBadges from "./components/TrustBadges"

const Home = () => {
  return (
    <div className="">
      <Header />
      <Hero/>
      <QuickActions />
     
      <AboutSection />
   
      <Events />
      <DonationSection />
      <DarshanSection />
     
      <PoojaGrid />
    
      
      <Gallery />
      <Stream />
      <TrustBadges />
      <Footer />
    </div>
  )
}

export default Home