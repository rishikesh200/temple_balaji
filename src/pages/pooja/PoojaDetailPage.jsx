import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Check, 
  AlertCircle, 
  CheckCircle,
  Printer,
  X,
  FileText,
  Shirt,
  Package,
  CameraOff,
  Sparkles,
  Heart,
  Share2,
  ChevronRight,
  ShieldCheck,
  Flame,
  ArrowRight
} from "lucide-react"
import { slugify, bookingGuidelines } from "../../data/poojaData"
import { paymentAPI, loadRazorpayScript } from "../../services/api"
import { useAdminData } from "../../admin/contexts/AdminDataContext"
import { useLanguage } from "../../contexts/LanguageContext"
import { getT, t } from "../../utils/i18n"

const TR = {
  home:           { en: "Home",                              ta: "முகப்பு" },
  poojas:         { en: "Poojas",                            ta: "பூஜைகள்" },
  sacredService:  { en: "🪷 Sacred Service",                 ta: "🪷 புனித சேவை" },
  offeringPrice:  { en: "Offering Price",                    ta: "காணிக்கை தொகை" },
  perDevotee:     { en: "/ Devotee",                         ta: "/ பக்தர்" },
  noFees:         { en: "* Zero extra booking taxes or platform fees", ta: "* கூடுதல் கட்டணம் இல்லை" },
  bookNow:        { en: "Book This Seva Now",                ta: "இப்போது பதிவு செய்யுங்கள்" },
  saved:          { en: "Saved",                             ta: "சேமிக்கப்பட்டது" },
  save:           { en: "Save Offering",                     ta: "சேமிக்கவும்" },
  copied:         { en: "Copied!",                           ta: "நகலெடுக்கப்பட்டது!" },
  share:          { en: "Share Seva",                        ta: "பகிரவும்" },
  sanctum:        { en: "Sanctum Sanctorum",                 ta: "கர்ப்பகிரஹம்" },
  prasadam:       { en: "Prasadam & Threads Included",       ta: "பிரசாதம் உள்ளடங்கும்" },
  significance:   { en: "Sacred Ritual Significance",        ta: "புனித சடங்கின் முக்கியத்துவம்" },
  blessings:      { en: "Divine Blessings & Benefits",       ta: "தெய்வீக ஆசிர்வாதங்கள் & பலன்கள்" },
  benefitsSub:    { en: "Spiritual benefits accrued by devotees performing this auspicious offering.", ta: "இந்த மங்களகரமான சேவையை செய்யும் பக்தர்களுக்கு கிடைக்கும் ஆன்மீக பலன்கள்." },
  timeline:       { en: "Seva Timeline Checklist",           ta: "சேவை கட்ட அட்டவணை" },
  timelineSub:    { en: "Detailed procedural stages of the offering conducted inside the sanctum.", ta: "கர்ப்பகிரஹத்தில் நடத்தப்படும் சடங்கின் விரிவான நிலைகள்." },
  notes:          { en: "Logistical Notes & Guidelines",     ta: "வழிகாட்டுதல்கள் & குறிப்புகள்" },
  schedule:       { en: "Schedule",                          ta: "நேர அட்டவணை" },
  devoteeInfo:    { en: "Devotee Info",                      ta: "பக்தர் விவரங்கள்" },
  free:           { en: "Free",                              ta: "இலவசம்" },
  payOnline:      { en: "💳 Pay Online",                     ta: "💳 ஆன்லைன் பணம்" },
  paySpot:        { en: "🏛️ Pay at Temple",                  ta: "🏛️ கோயிலில் பணம்" },
  confirmFree:    { en: "🆓 Confirm Free Booking",           ta: "🆓 இலவச பதிவை உறுதி செய்யுங்கள்" },
  confirmSpot:    { en: "🏛️ Confirm — Pay at Temple",        ta: "🏛️ உறுதி செய்யுங்கள் — கோயிலில் பணம்" },
  confirmPay:     { en: "💳 Confirm & Pay",                  ta: "💳 உறுதி & பணம் செலுத்தவும்" },
  processing:     { en: "Processing...",                     ta: "செயலில் உள்ளது..." },
  back:           { en: "Back",                              ta: "திரும்பு" },
  visRepresent:   { en: "Visual representation of performing priests", ta: "அர்ச்சகர்கள் நிறைவேற்றும் காட்சி" },
  payAtTemple:    { en: "(at temple)",                       ta: "(கோயிலில்)" },
  sevaTicket:     { en: "Seva Ticket Amount:",               ta: "சேவை தொகை:" },
  netPayable:     { en: "Net Payable:",                      ta: "செலுத்த வேண்டிய தொகை:" },
  chooseBooking:  { en: "Choose Booking Option",             ta: "பதிவு விருப்பத்தை தேர்ந்தெடுங்கள்" },
  payOnlineAmt:   { en: "Pay Online",                        ta: "ஆன்லைன் பணம்" },
  freeBooking:    { en: "Free Booking",                      ta: "இலவச பதிவு" },
  amountLabel:    { en: "Amount:",                           ta: "தொகை:" },
  pricePaid:      { en: "Price Paid:",                       ta: "செலுத்திய தொகை:" },
  payAtTempleL:   { en: "Pay at Temple:",                    ta: "கோயிலில் செலுத்தவும்:" },
}

// Map icon names to Lucide icons for guidelines
const iconMap = {
  Clock: Clock,
  Shirt: Shirt,
  Package: Package,
  FileText: FileText,
  CameraOff: CameraOff,
}

export default function PoojaDetailPage() {
  const { poojaName } = useParams()
  const { activePoojas } = useAdminData()
  const { lang } = useLanguage()
  const pooja = activePoojas.find(p =>
    p.id?.toLowerCase() === poojaName?.toLowerCase() ||
    slugify(p.name) === poojaName?.toLowerCase()
  ) || null
  const formRef = useRef(null)

  // bookingType from admin: 'payment' | 'free' | 'both'
  const bookingType = pooja?.bookingType || 'payment'
  // When 'both', user picks their preferred mode: 'payment' or 'free'
  const [chosenMode, setChosenMode] = useState(bookingType === 'both' ? null : bookingType)

  // Form Stepper States
  const [step, setStep] = useState(1) // 1: Schedule & Slots, 2: Devotee Info

  // Form input states
  const [date, setDate] = useState("")
  const [activeTab, setActiveTab] = useState("morning") // morning vs evening
  const [slot, setSlot] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")
  
  // Interaction states
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [isShared, setIsShared] = useState(false)

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [poojaName])

  // Preload Razorpay script on mount for instant payment trigger
  useEffect(() => {
    loadRazorpayScript().catch((err) => {
      console.error("Failed to preload Razorpay script:", err)
    })
  }, [])


  // Handle slot categories
  const morningSlots = ["07:00 AM", "08:00 AM", "09:00 AM"]
  const eveningSlots = ["05:00 PM", "06:00 PM", "07:00 PM"]

  if (!pooja) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] py-24 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <AlertCircle className="w-16 h-16 text-[#8B1A1A] mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-[#2D1810] mb-3">
            Pooja Not Found
          </h2>
          <p className="text-[#6B4423] mb-8">
            The pooja or seva you are looking for does not exist or has been relocated.
          </p>
          <Link
            to="/pooja"
            className="inline-flex items-center gap-2 bg-[#8B1A1A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6B1414] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Poojas
          </Link>
        </div>
      </div>
    )
  }

  // Split benefits title and subtext
  const formattedBenefits = pooja.benefits.map((b) => {
    const parts = b.split(":")
    return {
      title: parts[0]?.trim() || "",
      subtext: parts[1]?.trim() || "",
    }
  })

  // Determine Category for Badges
  const getPoojaCategory = () => {
    if (pooja.time.toLowerCase().includes("daily")) return "Daily Pooja"
    if (pooja.time.toLowerCase().includes("friday") || pooja.price > 1000) return "Special Seva"
    return "Vow Offering"
  }

  // Smooth scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  // Validate step 1
  const validateStep1 = () => {
    const tempErrors = {}
    if (!date) tempErrors.date = "Please select a booking date"
    if (!slot) tempErrors.slot = "Please choose a time slot"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // Validate step 2
  const validateStep2 = () => {
    const tempErrors = {}
    if (!name.trim()) tempErrors.name = "Full name is required"
    if (!phone.trim()) {
      tempErrors.phone = "Phone number is required"
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(phone)) {
      tempErrors.phone = "Please enter a valid phone number"
    }
    if (!email.trim()) {
      tempErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email address"
    }
    if (!address.trim()) tempErrors.address = "Residential address is required"

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // Go to step 2
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
      setErrors({})
    }
  }

  // Handle Form Submit
  const handleBooking = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return

    setIsSubmitting(true)

    // Spot / Free booking — no Razorpay needed
    const effectiveMode = chosenMode || bookingType
    if (effectiveMode === 'spot' || effectiveMode === 'free') {
      setTimeout(() => {
        setBookingRef(`PJ-${Date.now().toString().slice(-8)}`)
        setBookingSuccess(true)
        setIsSubmitting(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 600)
      return
    }

    try {
      await loadRazorpayScript()

      const order = await paymentAPI.createPoojaOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        poojaType: pooja.name,
        date,
        time: slot,
        amount: pooja.price,
        numberOfPriests: 1,
        location: 'temple',
      })

      if (!order.success) {
        window.alert(order.message || order.error || 'Unable to create booking order.')
        setIsSubmitting(false)
        return
      }

      const options = {
        key: order.data.razorpayKeyId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: pooja.name,
        description: `Booking for ${pooja.name}`,
        order_id: order.data.orderId,
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          paymentType: 'pooja',
          poojaType: pooja.name,
          date,
          time: slot,
        },
        theme: {
          color: '#8B1A1A',
        },
        handler: async (response) => {
          const verify = await paymentAPI.verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            paymentType: 'pooja',
          })

          if (verify.success) {
            setBookingRef(response.razorpay_payment_id)
            setBookingSuccess(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            window.alert(verify.message || 'Payment verification failed.')
          }
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      window.alert('Unable to complete booking at this time.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Steps timeline definitions
  const timelineSteps = [
    { title: "Sankalpam", desc: "A personal prayer vow taken by priests chanting your name, Nakshatra, and Gotra before the deity." },
    { title: "Archana", desc: "Recitation of the sacred names of the Lord accompanied by offering fresh flowers and Tulasi leaves." },
    { title: "Maha Arati", desc: "Lighting of camphor and ghee lamps inside the sanctum to offer prayers and catch divine visual darsan." },
    { title: "Prasadam", desc: "Blessed temple sweet laddu, sacred thread, and Kumkum prasadam handed over directly to you." }
  ]

  return (
    <div className="min-h-screen bg-[#FDF8F3] pb-24 font-sans selection:bg-[#8B1A1A] selection:text-white">
      
      {/* 1. DYNAMIC DIVINE HEADER BANNER (Full-width, royal colors based on reference) */}
      <section className="relative bg-gradient-to-r from-[#3A0A0A] via-[#521010] to-[#6E1A1A] text-white overflow-hidden py-16 md:py-20 border-b border-[#D4A853]">
        
        {/* Subtle background glow graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Breadcrumb row */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-[#E5D5C5] mb-8 font-medium">
            <Link to="/" className="hover:text-[#D4A853] transition-colors">{t(TR.home, lang)}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/pooja" className="hover:text-[#D4A853] transition-colors">{t(TR.poojas, lang)}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D4A853] font-semibold">{getT(pooja, 'name', lang)}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Header Content (7 cols on lg) */}
            <div className="lg:col-span-7">
              {/* Double pill badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[#E8C86A] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  {t(TR.sacredService, lang)}
                </span>
                <span className="bg-[#D4A853]/25 backdrop-blur-md border border-[#D4A853]/40 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-xs">
                  {getPoojaCategory()}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-sm leading-tight">
                {getT(pooja, 'name', lang)}
              </h1>

              <p className="text-[#E5CFC0] text-sm md:text-base lg:text-lg leading-relaxed font-normal mb-8 max-w-3xl">
                {getT(pooja, 'description', lang)}
              </p>

              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs md:text-sm text-white/95 font-medium border-t border-white/10 pt-5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4.5 h-4.5 text-[#D4A853]" />
                  {getT(pooja, 'time', lang)}
                </span>
                <span className="w-1.5 h-1.5 bg-[#D4A853] rounded-full hidden sm:inline" />
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-[#D4A853]" />
                  {t(TR.sanctum, lang)}
                </span>
                <span className="w-1.5 h-1.5 bg-[#D4A853] rounded-full hidden sm:inline" />
                <span className="flex items-center gap-1.5">
                  <Package className="w-4.5 h-4.5 text-[#D4A853]" />
                  {t(TR.prasadam, lang)}
                </span>
              </div>
            </div>

            {/* Header Floating Glass Card (5 cols on lg) */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-sm flex flex-col gap-5 hover:border-white/30 transition-all duration-300">
                
                <div>
                  <span className="text-[10px] md:text-xs text-[#E5D5C5] font-bold uppercase tracking-widest block mb-1">
                    {t(TR.offeringPrice, lang)}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                      {bookingType === 'free' ? t(TR.free, lang) : `₹ ${pooja.price.toLocaleString()}`}
                    </span>
                    {bookingType !== 'free' && <span className="text-white/60 text-xs md:text-sm font-medium">{t(TR.perDevotee, lang)}</span>}
                  </div>
                  <span className="text-[11px] text-[#D4A853] block mt-1.5 font-semibold">
                    {t(TR.noFees, lang)}
                  </span>
                </div>

                {/* Big Button scrolls to form */}
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="w-full bg-white text-[#3A0A0A] py-3.5 rounded-2xl font-bold text-sm md:text-base border border-[#D4A853] shadow-lg hover:bg-[#FDF8F3] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-[#8B1A1A] animate-pulse" />
                  {t(TR.bookNow, lang)}
                </button>

                {/* Save and share rows */}
                <div className="flex items-center justify-around border-t border-white/10 pt-4 text-xs font-semibold text-white/80">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSaved(!isSaved)
                      setIsShared(false)
                    }}
                    className={`flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ${isSaved ? "text-[#D4A853]" : ""}`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-[#D4A853]" : ""}`} />
                    <span>{isSaved ? t(TR.saved, lang) : t(TR.save, lang)}</span>
                  </button>
                  <span className="w-px h-4 bg-white/10" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsShared(true)
                      setTimeout(() => setIsShared(false), 2000)
                    }}
                    className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{isShared ? t(TR.copied, lang) : t(TR.share, lang)}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BODY SPLIT SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: About, Benefits, Image, Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Main Image with decreased height (low-profile & elegant) */}
            <div className="relative h-64 md:h-72 w-full rounded-3xl overflow-hidden shadow-md border-2 border-[#D4A853]/25 group">
              <img
                src={pooja.image}
                alt={pooja.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 text-white font-serif text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4A853]" />
                {t(TR.visRepresent, lang)}
              </div>
            </div>

            {/* About the Seva */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5D5C5] shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#8B1A1A]" />
              <h3 className="font-serif text-2xl font-bold text-[#2D1810] mb-4 flex items-center gap-2">
                <span className="text-[#D4A853]">🪷</span> {t(TR.significance, lang)}
              </h3>
              <p className="text-[#6B4423] text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                {getT(pooja, 'about', lang)}
              </p>
            </div>

            {/* Expanded Premium Benefits Grid */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5D5C5] shadow-xs">
              <div className="mb-6 pb-2 border-b border-[#F5E6D3]">
                <h3 className="font-serif text-2xl font-bold text-[#2D1810] flex items-center gap-2">
                  <span className="text-[#D4A853]">✨</span> {t(TR.blessings, lang)}
                </h3>
                <p className="text-xs text-[#6B4423] mt-1">{t(TR.benefitsSub, lang)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formattedBenefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-[#FDF8F3] border border-[#E5D5C5]/60 flex gap-4 hover:border-[#D4A853]/60 hover:shadow-xs transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#8B1A1A]/10 border border-[#D4A853] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#8B1A1A]" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#2D1810] mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-[#6B4423] leading-relaxed font-normal">
                        {benefit.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Ritual Timeline */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5D5C5] shadow-xs">
              <div className="mb-6 pb-2 border-b border-[#F5E6D3]">
                <h3 className="font-serif text-2xl font-bold text-[#2D1810] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4A853]" /> {t(TR.timeline, lang)}
                </h3>
                <p className="text-xs text-[#6B4423] mt-1">{t(TR.timelineSub, lang)}</p>
              </div>

              <div className="relative pl-6 border-l-2 border-[#D4A853]/40 space-y-6 ml-2">
                {timelineSteps.map((stepItem, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <span className="absolute -left-[31px] top-0 w-4.5 h-4.5 rounded-full bg-[#8B1A1A] border-2 border-[#D4A853] flex items-center justify-center text-[9px] font-bold text-white shadow-xs group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#2D1810]">
                        {stepItem.title}
                      </h4>
                      <p className="text-xs text-[#6B4423] mt-1 leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Specific Instructions */}
            {pooja.other && (
              <div className="bg-[#FFFDFB] p-6 md:p-8 rounded-3xl border border-[#D4A853]/30 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2.5 h-full bg-[#D4A853]" />
                <h3 className="font-serif text-lg font-bold text-[#2D1810] mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#8B1A1A]" /> {t(TR.notes, lang)}
                </h3>
                <p className="text-[#6B4423] text-xs leading-relaxed whitespace-pre-line font-medium">
                  {getT(pooja, 'other', lang)}
                </p>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Advanced Multi-step Booking Widget (5 cols) */}
          <div ref={formRef} className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-[#E5D5C5] shadow-xl p-6 md:p-8 relative overflow-hidden ring-1 ring-[#D4A853]/25">
              
              {/* Elegant glow shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A853]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8B1A1A]/5 rounded-full blur-2xl pointer-events-none" />

              {/* Progress Stepper bar */}
              <div className="flex items-center justify-between mb-8 border-b border-[#F5E6D3] pb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 1 
                      ? "bg-[#8B1A1A] text-white ring-2 ring-[#D4A853]" 
                      : "bg-green-600 text-white"
                  }`}>
                    {step === 1 ? "1" : <Check className="w-4 h-4" />}
                  </span>
                  <span className={`text-xs font-bold ${step === 1 ? "text-[#8B1A1A]" : "text-green-600"}`}>{t(TR.schedule, lang)}</span>
                </div>
                <div className="flex-1 h-0.5 bg-[#E5D5C5] mx-4" />
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 2 
                      ? "bg-[#8B1A1A] text-white ring-2 ring-[#D4A853]" 
                      : "bg-[#FDF8F3] text-[#6B4423] border border-[#E5D5C5]"
                  }`}>
                    2
                  </span>
                  <span className={`text-xs font-bold ${step === 2 ? "text-[#8B1A1A]" : "text-[#6B4423]"}`}>{t(TR.devoteeInfo, lang)}</span>
                </div>
              </div>

              {/* STEP 1: Date and Slots selection */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h4 className="font-serif text-lg font-bold text-[#2D1810]">Select Date & Timing Slot</h4>
                  <p className="text-xs text-[#6B4423] -mt-4">Pick an auspicious calendar date and your slot timing to continue.</p>

                  {/* 1. Date Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#2D1810] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#8B1A1A]" /> Choose Booking Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value)
                        if (errors.date) setErrors({ ...errors, date: null })
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.date ? "border-red-500 bg-red-50/10" : "border-[#E5D5C5] focus:border-[#8B1A1A]"} bg-[#FDF8F3]/50 focus:outline-none transition-colors text-[#2D1810] text-sm font-bold`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                      </p>
                    )}
                  </div>

                  {/* 2. Advanced Segmented Tab Slot Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#2D1810] mb-3 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#8B1A1A]" /> Timing Schedule *
                    </label>

                    {/* Segmented Tab controls */}
                    <div className="bg-[#FDF8F3] p-1 rounded-xl border border-[#E5D5C5] flex mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("morning")
                          setSlot("") // reset
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          activeTab === "morning"
                            ? "bg-[#8B1A1A] text-white shadow-xs"
                            : "text-[#6B4423] hover:text-[#8B1A1A]"
                        }`}
                      >
                        ☀️ Morning Session
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("evening")
                          setSlot("") // reset
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          activeTab === "evening"
                            ? "bg-[#8B1A1A] text-white shadow-xs"
                            : "text-[#6B4423] hover:text-[#8B1A1A]"
                        }`}
                      >
                        🌙 Evening Session
                      </button>
                    </div>

                    {/* Slots Tiles Grid */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {(activeTab === "morning" ? morningSlots : eveningSlots).map((timeStr) => (
                        <button
                          key={timeStr}
                          type="button"
                          onClick={() => {
                            setSlot(timeStr)
                            if (errors.slot) setErrors({ ...errors, slot: null })
                          }}
                          className={`py-3.5 px-1.5 text-xs font-bold rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            slot === timeStr
                              ? "bg-[#8B1A1A] text-white border-[#8B1A1A] ring-2 ring-[#D4A853] shadow-md"
                              : "bg-[#FDF8F3]/50 text-[#2D1810] border-[#E5D5C5] hover:border-[#8B1A1A] hover:bg-white"
                          }`}
                        >
                          <span className="text-[10px] opacity-75 font-semibold">Available</span>
                          <span className="text-sm font-bold font-mono">{timeStr.split(" ")[0]}</span>
                          <span className="text-[9px] uppercase tracking-wider">{timeStr.split(" ")[1]}</span>
                        </button>
                      ))}
                    </div>

                    {errors.slot && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.slot}
                      </p>
                    )}
                  </div>

                  {/* Actions buttons step 1 */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-[#8B1A1A] text-white py-3.5 rounded-xl font-bold text-sm md:text-base border border-[#D4A853] shadow-md hover:bg-[#6B1414] hover:translate-x-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Proceed to Devotee Info</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A853]" />
                  </button>
                </div>
              )}

              {/* STEP 2: Devotee Personal Information */}
              {step === 2 && (
                <form onSubmit={handleBooking} className="space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg font-bold text-[#2D1810]">Devotee Details</h4>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-[#8B1A1A] hover:underline"
                    >
                      ← Change Schedule
                    </button>
                  </div>

                  {/* Personal detail inputs with integrated left icons */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#2D1810] mb-1.5">
                        Primary Devotee Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <User className="w-4 h-4 text-[#8B1A1A]" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value)
                            if (errors.name) setErrors({ ...errors, name: null })
                          }}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.name ? "border-red-500 bg-red-50/10" : "border-[#E5D5C5] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]"} bg-[#FDF8F3]/50 focus:outline-none transition-all text-[#2D1810] text-sm font-medium`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                    </div>

                    {/* Phone & Email (Responsive Split) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2D1810] mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Phone className="w-4 h-4 text-[#8B1A1A]" />
                          </div>
                          <input
                            type="tel"
                            placeholder="Mobile number"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                              if (errors.phone) setErrors({ ...errors, phone: null })
                            }}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.phone ? "border-red-500 bg-red-50/10" : "border-[#E5D5C5] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]"} bg-[#FDF8F3]/50 focus:outline-none transition-all text-[#2D1810] text-sm font-medium`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2D1810] mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Mail className="w-4 h-4 text-[#8B1A1A]" />
                          </div>
                          <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (errors.email) setErrors({ ...errors, email: null })
                            }}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? "border-red-500 bg-red-50/10" : "border-[#E5D5C5] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]"} bg-[#FDF8F3]/50 focus:outline-none transition-all text-[#2D1810] text-sm font-medium`}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Residential Address */}
                    <div>
                      <label className="block text-xs font-bold text-[#2D1810] mb-1.5">
                        Residential Address *
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-3.5 pointer-events-none">
                          <MapPin className="w-4 h-4 text-[#8B1A1A]" />
                        </div>
                        <textarea
                          rows={2}
                          placeholder="Enter house details and street address..."
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value)
                            if (errors.address) setErrors({ ...errors, address: null })
                          }}
                          className={`w-full pl-10 pr-4 py-2 rounded-xl border ${errors.address ? "border-red-500 bg-red-50/10" : "border-[#E5D5C5] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]"} bg-[#FDF8F3]/50 focus:outline-none transition-all text-[#2D1810] text-sm resize-none`}
                        />
                      </div>
                      {errors.address && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.address}</p>}
                    </div>

                    {/* Gotra / Nakshatra Optional */}
                    <div>
                      <label className="block text-xs font-bold text-[#2D1810] mb-1.5 flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-[#8B1A1A]" /> Gotra / Nakshatra / Custom Prayers (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Gotra name, birth star or special prayer notes..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-[#E5D5C5] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A] bg-[#FDF8F3]/50 focus:outline-none transition-all text-[#2D1810] text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Premium Live Billing Invoice Calculator Card */}
                  <div className="p-4 bg-[#FDF8F3] rounded-2xl border border-[#E5D5C5] space-y-2 mt-6">
                    <span className="text-[10px] font-bold text-[#8B1A1A] uppercase tracking-wider block border-b border-[#E5D5C5] pb-1">Billing Summary</span>
                    <div className="flex justify-between text-xs text-[#6B4423] font-medium">
                      <span>{t(TR.sevaTicket, lang)}</span>
                      <span className="font-bold text-[#2D1810]">{bookingType === 'free' ? t(TR.free, lang) : `₹ ${pooja.price}`}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#6B4423] font-medium">
                      <span>Dakshina / Inclusions:</span>
                      <span className="text-green-700 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#6B4423] font-medium">
                      <span>Prasadam Delivery:</span>
                      <span className="text-green-700 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#2D1810] font-bold border-t border-[#E5D5C5] pt-2 mt-1">
                      <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#8B1A1A]" /> {t(TR.netPayable, lang)}</span>
                      <span className="font-serif text-[#8B1A1A] text-lg">
                        {bookingType === 'free' ? t(TR.free, lang) : bookingType === 'spot' ? `₹ ${pooja.price} (${t(TR.payAtTemple, lang)})` : `₹ ${pooja.price}`}
                      </span>
                    </div>
                  </div>

                  {/* Booking mode picker — shown when admin set bookingType = 'both' */}
                  {bookingType === 'both' && (
                    <div className="rounded-xl border border-[#E5D5C5] bg-[#FDF8F3] p-4">
                      <p className="text-sm font-semibold text-[#2D1810] mb-3">{t(TR.chooseBooking, lang)}</p>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setChosenMode('payment')}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition ${chosenMode === 'payment' ? 'bg-[#8B1A1A] text-white border-[#8B1A1A]' : 'bg-white text-[#8B1A1A] border-[#8B1A1A] hover:bg-red-50'}`}>
                          {t(TR.payOnline, lang)} — ₹{pooja?.price}
                        </button>
                        <button type="button" onClick={() => setChosenMode('spot')}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition ${chosenMode === 'spot' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-amber-700 border-amber-600 hover:bg-amber-50'}`}>
                          {t(TR.paySpot, lang)}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Multi-action submit controls */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStep(1)}
                      className="w-1/3 bg-[#FDF8F3] border border-[#E5D5C5] text-[#2D1810] py-3.5 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-50 flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      {t(TR.back, lang)}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || (bookingType === 'both' && !chosenMode)}
                      className={`w-2/3 bg-[#8B1A1A] text-white py-3.5 rounded-xl font-bold text-xs md:text-sm border border-[#D4A853] shadow-md hover:bg-[#6B1414] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${(isSubmitting || (bookingType === 'both' && !chosenMode)) ? "opacity-75 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t(TR.processing, lang)}</span>
                        </>
                      ) : (
                        <span>
                          {(chosenMode || bookingType) === 'free' ? t(TR.confirmFree, lang)
                          : (chosenMode || bookingType) === 'spot' ? t(TR.confirmSpot, lang)
                          : t(TR.confirmPay, lang)}
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* 3. GENERAL GUIDELINES CARD GRID (Bottom) */}
        <section className="bg-white rounded-3xl border border-[#E5D5C5] p-6 md:p-10 shadow-xs mt-16">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <span className="text-xs text-[#8B1A1A] font-semibold uppercase tracking-widest">
              Important Instructions
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1810] mt-1 mb-2">
              General Booking Guidelines
            </h2>
            <p className="text-[#6B4423] text-xs md:text-sm">
              Please review these official guidelines to ensure a sacred, peaceful, and smooth visual darshan of the Lord.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {bookingGuidelines.map((guideline) => {
              const Icon = iconMap[guideline.icon] || FileText
              return (
                <div 
                  key={guideline.id} 
                  className="bg-[#FDF8F3] p-5 rounded-2xl border border-[#E5D5C5] flex flex-col items-center text-center hover:shadow-md hover:border-[#D4A853]/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 border border-[#E5D5C5] shadow-xs group-hover:bg-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#D4A853] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#2D1810] mb-2">
                    {guideline.title}
                  </h4>
                  <p className="text-[#6B4423] text-xs leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

      </div>

      {/* 4. PREMIUM CONFIRMATION VOUCHER MODAL (Temple Pass ticket styled with tear-off lines) */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border-2 border-[#D4A853] shadow-2xl relative animate-scale-up max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#8B1A1A] text-white p-6 text-center border-b-2 border-dashed border-[#D4A853] relative">
              <button
                type="button"
                onClick={() => setBookingSuccess(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-md border border-[#D4A853]">
                <CheckCircle className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-wide">CONFIRMED SEVA PASS</h3>
              <p className="text-[#E8C86A] text-xs font-semibold uppercase tracking-widest mt-1">Paruthipattu Balaji Temple</p>
            </div>

            {/* Modal Body / Ticket Details */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow bg-[#FDF8F3]/50">
              
              {/* Receipt Reference Bar */}
              <div className="flex items-center justify-between bg-white border border-[#E5D5C5] p-3.5 rounded-2xl shadow-2xs">
                <div>
                  <span className="text-[10px] text-[#6B4423] font-bold uppercase tracking-wider block">Booking Reference</span>
                  <span className="font-mono text-sm font-bold text-[#8B1A1A]">{bookingRef}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#6B4423] font-bold uppercase tracking-wider block">Pass Status</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-green-200 inline-block">Confirmed</span>
                </div>
              </div>

              {/* Seva Ticket Details */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5D5C5] space-y-3 shadow-2xs">
                <h4 className="font-serif text-sm font-bold text-[#2D1810] border-b border-[#F5E6D3] pb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4A853]" /> Seva Scheduling Information
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-[#6B4423]">
                  <div>
                    <span className="block font-medium text-black">Seva Name:</span>
                    <span className="font-bold text-[#8B1A1A]">{pooja.name}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">
                      {bookingType === 'free' ? t(TR.amountLabel, lang) : bookingType === 'spot' ? t(TR.payAtTempleL, lang) : t(TR.pricePaid, lang)}
                    </span>
                    <span className="font-bold text-black font-serif text-sm">
                      {bookingType === 'free' ? t(TR.free, lang) : `₹ ${pooja.price}`}
                    </span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Service Date:</span>
                    <span className="font-semibold text-black">{new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Timing Slot:</span>
                    <span className="font-bold text-white bg-[#8B1A1A] px-2.5 py-0.5 rounded-md inline-block mt-0.5 font-mono text-[10px] border border-[#D4A853]">{slot}</span>
                  </div>
                </div>
              </div>

              {/* Devotee Info */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5D5C5] space-y-3 shadow-2xs">
                <h4 className="font-serif text-sm font-bold text-[#2D1810] border-b border-[#F5E6D3] pb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#D4A853]" /> Devotee Information
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-[#6B4423]">
                  <div>
                    <span className="block font-medium text-black">Primary Devotee:</span>
                    <span className="font-bold text-black">{name}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Contact Phone:</span>
                    <span className="font-semibold text-black">{phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-medium text-black">Email Address:</span>
                    <span className="font-semibold text-black">{email}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-medium text-black">Postal Address:</span>
                    <span className="font-normal text-black block max-w-sm whitespace-pre-wrap leading-relaxed">{address}</span>
                  </div>
                  {message.trim() && (
                    <div className="col-span-2">
                      <span className="block font-medium text-black">Prayer Notes / Gotra:</span>
                      <span className="italic text-[#6B4423] block leading-relaxed">{message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Guidelines Notice banner */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[#8B1A1A] text-[11px] leading-relaxed font-medium">
                <strong>💡 Quick Tip:</strong> Please arrive 30 minutes before your slot ({slot}) at the Special Seva gate. Ensure the traditional dress code (Dhoti/Lungi with Angavastram for men, Saree/Chudidhar for women) is followed.
              </div>

            </div>

            {/* Modal Footer Controls (Tear-off ticket style divider) */}
            <div className="bg-[#8B1A1A]/5 border-t-2 border-dashed border-[#D4A853] p-5 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-white border border-[#E5D5C5] text-[#2D1810] py-3.5 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-50 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#8B1A1A]" />
                Print Seva Pass
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookingSuccess(false)
                  setStep(1)
                  setDate("")
                  setSlot("")
                  setName("")
                  setPhone("")
                  setEmail("")
                  setAddress("")
                  setMessage("")
                }}
                className="flex-1 bg-[#8B1A1A] text-white py-3.5 rounded-xl font-bold text-xs md:text-sm border border-[#D4A853] hover:bg-[#6B1414] flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                Done & Continue
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
