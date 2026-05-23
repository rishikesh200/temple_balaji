import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Shield, Lock, Heart } from "lucide-react"
import Concave from "../../../components/Concave"
import heroImg from "../../../assets/images/hero-balaji.jpg"
import darshanImg from "../../../assets/images/darshan.jpg"
import festivalImg from "../../../assets/images/festival.jpg"
import templeGopuramImg from "../../../assets/images/temple-gopuram.jpg"
import googlePayIcon from "../../../assets/icons/Google_Pay.svg"
import phonepeIcon from "../../../assets/icons/PhonePe.svg"
import paytmIcon from "../../../assets/icons/Paytm.svg"
import visaIcon from "../../../assets/icons/Visa.svg"
import mastercardIcon from "../../../assets/icons/Mastercard.svg"
import upiIcon from "../../../assets/icons/upi.svg"

import balaji1 from './../../../assets/images/hero/balaji1.png';
import balaji2 from './../../../assets/images/hero/balaji2.png';
import balaji3 from './../../../assets/images/hero/balaji3.png';
import balaji4 from './../../../assets/images/hero/balaji4.jpeg';
import balaji5 from './../../../assets/images/hero/balaji5.jpeg';
const Hero = () => {
  const bgImages = [balaji1, balaji2, balaji3, balaji4, balaji5];
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => {
        setPrevIndex(currentIndex)
        return (currentIndex + 1) % bgImages.length
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [bgImages.length])

  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        {bgImages.map((image, index) => {
          const isActive = index === activeIndex
          const isPrev = index === prevIndex
          const transformStyle = isActive
            ? "translateX(0)"
            : isPrev
            ? "translateX(-100%)"
            : "translateX(100%)"

          return (
            <img
              key={image}
              src={image}
              alt={`Temple background ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: "center",
                transform: transformStyle,
                opacity: isActive ? 1 : 0,
                transition: "transform 700ms ease-in-out, opacity 700ms ease-in-out",
              }}
            />
          )
        })}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full max-w-[62%] bg-gradient-to-r from-[rgba(0,0,0,0.90)] via-[rgba(45,24,16,0.82)] to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left Content */}
          <div className="text-white pt-4">
            <p className="text-[#D4A853] text-sm mb-2">Seek Blessings.</p>
            <p className="text-[#D4A853] text-sm mb-4">Find Peace.</p>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Experience<br />
              the Divine Grace<br />
              <span className="text-[#D4A853]">of Balaji</span>
            </h1>

            <p className="text-white/90 text-sm mb-8 max-w-md">
              Surrender to Lord Venkateswara and<br />
              receive His endless blessings, prosperity<br />
              and protection.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#D4A853]">Trusted Official</p>
                  <p className="text-[10px] text-white/70">Temple Website</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#D4A853]">Secure Donations</p>
                  <p className="text-[10px] text-white/70">100% Transparent</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#D4A853]">Serving Devotees</p>
                  <p className="text-[10px] text-white/70">with Devotion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Card */}
          <div className="lg:justify-self-end w-full md:max-w-sm">
            <Concave
              borderRadius="18px"
              concave="15px"
              className="bg-[#FDF8F3] shadow-2xl p-8 max-w-lg"
            >
              <div className="text-center mb-4">
                <h3 className="text-[#8B1A1A] font-serif text-2xl font-bold">Support the Temple</h3>
                <p className="text-[#8B1A1A] text-sm font-medium mt-1">Your Donation, Their Blessing</p>
                <p className="text-[#6B4423] text-xs mt-1">
                  Every contribution helps in temple<br />maintenance, annadhanam and seva.
                </p>
              </div>

              {/* Donation Amount Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3 ">
                                {["₹100", "₹500", "₹1000"].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`border-1 border-[#8B1A1A] text-[#8B1A1A] rounded-md py-2 text-sm font-medium transition-colors ${selectedAmount === amount ? 'bg-[#8B1A1A] text-white' : 'hover:bg-[#8B1A1A] hover:text-white'}`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 ">
                                {["₹2500", "₹5000", "Other"].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`border-1 border-[#8B1A1A] text-[#8B1A1A] rounded-md py-1 text-sm font-medium transition-colors ${selectedAmount === amount ? 'bg-[#8B1A1A] text-white' : 'hover:bg-[#8B1A1A] hover:text-white'}`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {/* Donate Now Button */}
              <Link
                  to={selectedAmount ? `/donate?amount=${selectedAmount}` : "/donate"}
                  className="w-[90%] mx-auto bg-[#8B1A1A] text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#6B1414] transition-colors"
                >
                DONATE NOW
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </Link>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-[10px] text-gray-500 text-center mb-1">Accepted Payment Methods</p>
                <div className="flex items-center flex-wrap justify-center gap-x-1 gap-y-1 flex-wrap px-1">
                  <img src={upiIcon} alt="UPI" className="h-8 w-auto  object-contain opacity-90" loading="lazy" />
                  <img src={googlePayIcon} alt="Google Pay" className="h-10 w-auto object-contain opacity-90" loading="lazy" />
                  <img src={phonepeIcon} alt="PhonePe" className="h-16 w-auto  object-contain opacity-90" loading="lazy" />
                  <img src={paytmIcon} alt="Paytm" className="h-10 w-auto  object-contain" loading="lazy" />
                  <img src={visaIcon} alt="Visa" className="h-10 w-auto  object-contain" loading="lazy" />
                  <img src={mastercardIcon} alt="Mastercard" className="h-10 w-auto    object-contain" loading="lazy" />
                </div>
                <p className="text-[10px] text-[#8B1A1A] text-center mt-2">
                  All donations are eligible for 80G Tax Exemption
                </p>
              </div>
            </Concave>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero