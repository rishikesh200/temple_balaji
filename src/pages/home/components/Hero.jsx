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
import visaIcon from "../../../assets/icons/Visa.svg";
import mastercardIcon from "../../../assets/icons/Mastercard.svg";
import upiIcon from "../../../assets/icons/upi.svg";
import { useLanguage } from "../../../contexts/LanguageContext";

import balaji1 from './../../../assets/images/hero/balaji1.png';
import balaji2 from './../../../assets/images/hero/balaji2.png';
import balaji3 from './../../../assets/images/hero/balaji3.png';
import balaji4 from './../../../assets/images/hero/balaji4.jpeg';
import balaji5 from './../../../assets/images/hero/balaji5.jpeg';
const HERO_TRANSLATIONS = {
  seekBlessings: {
    en: "Seek Blessings.",
    ta: "அருள் பெறுங்கள்."
  },
  findPeace: {
    en: "Find Peace.",
    ta: "அமைதி பெறுங்கள்."
  },
  experience: {
    en: "Experience",
    ta: "அனுபவியுங்கள்"
  },
  divineGrace: {
    en: "the Divine Grace",
    ta: "தெய்வீக அருள்"
  },
  ofBalaji: {
    en: "of Balaji",
    ta: "பாலாஜியின்"
  },
  description: {
    en: "Surrender to Lord Venkateswara and receive His endless blessings, prosperity and protection.",
    ta: "பகவான் வெங்கடேஸ்வரரிடம் சரணடைந்து அவரது எல்லையற்ற அருளையும், செழிப்பையும், பாதுகாப்பையும் பெறுங்கள்."
  },
  trustedOfficial: {
    en: "Trusted Official",
    ta: "நம்பகமான அதிகாரப்பூர்வ"
  },
  templeWebsite: {
    en: "Temple Website",
    ta: "கோவில் வலைத்தளம்"
  },
  secureDonations: {
    en: "Secure Donations",
    ta: "பாதுகாப்பான நன்கொடைகள்"
  },
  transparent100: {
    en: "100% Transparent",
    ta: "100% வெளிப்படையானது"
  },
  servingDevotees: {
    en: "Serving Devotees",
    ta: "பக்தர்களுக்கு சேவை"
  },
  withDevotion: {
    en: "with Devotion",
    ta: "பக்தியுடன்"
  },
  supportTemple: {
    en: "Support the Temple",
    ta: "கோவிலுக்கு ஆதரவளிக்கவும்"
  },
  donationBlessing: {
    en: "Your Donation, Their Blessing",
    ta: "உங்கள் நன்கொடை, அவர்களின் ஆசி"
  },
  contributionHelp: {
    en: "Every contribution helps in temple maintenance, annadhanam and seva.",
    ta: "ஒவ்வொரு பங்களிப்பும் கோவில் பராமரிப்பு, அன்னதானம் மற்றும் சேவைகளுக்கு உதவுகிறது."
  },
  donateNow: {
    en: "DONATE NOW",
    ta: "இப்போது நன்கொடை அளிக்கவும்"
  },
  acceptedPayments: {
    en: "Accepted Payment Methods",
    ta: "ஏற்கொள்ளப்பட்ட கட்டண முறைகள்"
  },
  taxExemption: {
    en: "All donations are eligible for 80G Tax Exemption",
    ta: "அனைத்து நன்கொடைகளும் 80G வரி விலக்கிற்கு தகுதியானவை"
  }
};

const Hero = () => {
  const { lang } = useLanguage();
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
            <p className="text-[#D4A853] text-sm mb-2">{HERO_TRANSLATIONS.seekBlessings[lang]}</p>
            <p className="text-[#D4A853] text-sm mb-4">{HERO_TRANSLATIONS.findPeace[lang]}</p>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {HERO_TRANSLATIONS.experience[lang]}<br />
              {HERO_TRANSLATIONS.divineGrace[lang]}<br />
              <span className="text-[#D4A853]">{HERO_TRANSLATIONS.ofBalaji[lang]}</span>
            </h1>

            <p className="text-white/90 text-sm mb-8 max-w-md">
              {HERO_TRANSLATIONS.description[lang]}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#D4A853]">{HERO_TRANSLATIONS.trustedOfficial[lang]}</p>
                  <p className="text-[10px] text-white/70">{HERO_TRANSLATIONS.templeWebsite[lang]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#D4A853]">{HERO_TRANSLATIONS.secureDonations[lang]}</p>
                  <p className="text-[10px] text-white/70">{HERO_TRANSLATIONS.transparent100[lang]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#D4A853]">{HERO_TRANSLATIONS.servingDevotees[lang]}</p>
                  <p className="text-[10px] text-white/70">{HERO_TRANSLATIONS.withDevotion[lang]}</p>
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
                <h3 className="text-[#8B1A1A] font-serif text-2xl font-bold">{HERO_TRANSLATIONS.supportTemple[lang]}</h3>
                <p className="text-[#8B1A1A] text-sm font-medium mt-1">{HERO_TRANSLATIONS.donationBlessing[lang]}</p>
                <p className="text-[#6B4423] text-xs mt-1">
                  {HERO_TRANSLATIONS.contributionHelp[lang]}
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
                {/* {HERO_TRANSLATIONS.donateNow[lang]} */}
                Donate Now
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </Link>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-[10px] text-gray-500 text-center mb-1">{HERO_TRANSLATIONS.acceptedPayments[lang]}</p>
                <div className="flex items-center flex-wrap justify-center gap-x-1 gap-y-1 flex-wrap px-1">
                  <img src={upiIcon} alt="UPI" className="h-8 w-auto  object-contain opacity-90" loading="lazy" />
                  <img src={googlePayIcon} alt="Google Pay" className="h-10 w-auto object-contain opacity-90" loading="lazy" />
                  <img src={phonepeIcon} alt="PhonePe" className="h-16 w-auto  object-contain opacity-90" loading="lazy" />
                  <img src={paytmIcon} alt="Paytm" className="h-10 w-auto  object-contain" loading="lazy" />
                  <img src={visaIcon} alt="Visa" className="h-10 w-auto  object-contain" loading="lazy" />
                  <img src={mastercardIcon} alt="Mastercard" className="h-10 w-auto    object-contain" loading="lazy" />
                </div>
                <p className="text-[10px] text-[#8B1A1A] text-center mt-2">
                  {HERO_TRANSLATIONS.taxExemption[lang]}
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