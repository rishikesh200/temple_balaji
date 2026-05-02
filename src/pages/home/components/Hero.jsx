import { Shield, Lock, Heart } from "lucide-react"
import heroImg from "../../../assets/images/hero-balaji.jpg"
import googlePayIcon from "simple-icons/icons/googlepay.svg?url"
import phonepeIcon from "simple-icons/icons/phonepe.svg?url"
import paytmIcon from "simple-icons/icons/paytm.svg?url"
import visaIcon from "simple-icons/icons/visa.svg?url"
import mastercardIcon from "simple-icons/icons/mastercard.svg?url"

const Hero = () => {
  return (
    <section className="relative min-h-[500px] lg:min-h-[550px]">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt=""
        className="h-full w-full object-cover"
        style={{ objectPosition: "center" }}
      />
      {/* left-side dark/tint only (match reference) */}
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
        <div className="lg:justify-self-end">
          <div className="bg-[#FDF8F3] rounded-[28px] shadow-2xl border border-[#E5D5C5] p-6 max-w-sm">
            <div className="text-center mb-4">
              <h3 className="text-[#8B1A1A] font-serif text-xl font-bold">Support the Temple</h3>
              <p className="text-[#8B1A1A] text-sm font-medium mt-1">Your Donation, Their Blessing</p>
              <p className="text-[#6B4423] text-xs mt-1">
                Every contribution helps in temple<br />maintenance, annadhanam and seva.
              </p>
            </div>
            
            {/* Donation Amount Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {["₹100", "₹500", "₹1000"].map((amount) => (
                <button 
                  key={amount}
                  className="border-2 border-[#8B1A1A] text-[#8B1A1A] rounded-lg py-2 text-sm font-medium hover:bg-[#8B1A1A] hover:text-white transition-colors"
                >
                  {amount}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["₹2500", "₹5000", "Other"].map((amount) => (
                <button 
                  key={amount}
                  className="border-2 border-[#8B1A1A] text-[#8B1A1A] rounded-lg py-2 text-sm font-medium hover:bg-[#8B1A1A] hover:text-white transition-colors"
                >
                  {amount}
                </button>
              ))}
            </div>
            
            {/* Donate Now Button */}
            <button className="w-full bg-[#8B1A1A] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#6B1414] transition-colors">
              DONATE NOW
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            
            {/* Payment Methods */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-[10px] text-gray-500 text-center mb-2">Accepted Payment Methods</p>
              <div className="flex items-center justify-center gap-x-3 gap-y-2 flex-wrap px-1">
                <div
                  className="flex items-center gap-0.5 shrink-0 h-6"
                  role="img"
                  aria-label="UPI"
                >
                  <span className="text-[12px] font-black italic text-zinc-700 tracking-tight leading-none">
                    UPI
                  </span>
                  <span className="flex gap-px h-[11px] self-center">
                    <span className="w-[2px] rounded-[1px] bg-[#097939]" />
                    <span className="w-[2px] rounded-[1px] bg-[#E87722]" />
                  </span>
                </div>
                <img
                  src={googlePayIcon}
                  alt="Google Pay"
                  className="h-5 w-auto max-w-[52px] object-contain opacity-90"
                  loading="lazy"
                />
                <img
                  src={phonepeIcon}
                  alt="PhonePe"
                  className="h-5 w-auto max-w-[72px] object-contain opacity-90"
                  loading="lazy"
                />
                <img
                  src={paytmIcon}
                  alt="Paytm"
                  className="h-4 w-auto max-w-[48px] object-contain"
                  loading="lazy"
                />
                <img
                  src={visaIcon}
                  alt="Visa"
                  className="h-3.5 w-auto max-w-[40px] object-contain"
                  loading="lazy"
                />
                <img
                  src={mastercardIcon}
                  alt="Mastercard"
                  className="h-5 w-auto max-w-[36px] object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] text-[#8B1A1A] text-center mt-2">All donations are eligible for 80G Tax Exemption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero