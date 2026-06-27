import { useState, useEffect } from "react"
import { 
  Bus, 
  Clock, 
  ExternalLink, 
  PartyPopper, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  IdCard, 
  Check, 
  AlertCircle, 
  CheckCircle,
  Printer,
  X,
  ShieldCheck,
  Flame,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { paymentAPI, loadRazorpayScript } from "../../../services/api"

export default function BookingSection({ selectedType, onSelectType }) {
  const { activeDarshan: darshanTypes } = useAdminData()
  // Stepper state
  const [step, setStep] = useState(1) // 1: Schedule, 2: Devotee & ID details

  // Form input states
  const [date, setDate] = useState("")
  const [activeTab, setActiveTab] = useState("morning") // morning vs evening
  const [slot, setSlot] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [devoteesCount, setDevoteesCount] = useState(1)
  const [idType, setIdType] = useState("Aadhaar Card")
  const [idNumber, setIdNumber] = useState("")

  // Interaction states
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState("")
  const [paymentError, setPaymentError] = useState('')

  // Resolve current active Darshan type from admin data list
  const currentDarshan = darshanTypes.find(t => t.id === selectedType) || darshanTypes[0]
  const darshanBookingType = currentDarshan?.bookingType || 'payment'
  const [chosenDarshanMode, setChosenDarshanMode] = useState(null) // for 'both' type

  // Synchronize slot categories
  const morningSlots = ["06:00 AM", "08:00 AM", "10:00 AM"]
  const eveningSlots = ["02:00 PM", "04:00 PM", "06:00 PM"]

  // Dynamic cost calculation
  const getUnitPrice = () => {
    if (selectedType === "sarva") return 0
    if (selectedType === "vip") return 750
    return 250 // special
  }
  const totalAmount = getUnitPrice() * devoteesCount

  // Reset slot when timing category switches
  useEffect(() => {
    setSlot("")
  }, [activeTab])

  // Preload Razorpay script on mount for instant payment trigger
  useEffect(() => {
    loadRazorpayScript().catch((err) => {
      console.error("Failed to preload Razorpay script:", err)
    })
  }, [])


  // Validate step 1
  const validateStep1 = () => {
    const tempErrors = {}
    if (!date) tempErrors.date = "Please select a booking date"
    if (!slot) tempErrors.slot = "Please select a timing slot"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // Validate step 2
  const validateStep2 = () => {
    const tempErrors = {}
    if (!name.trim()) tempErrors.name = "Primary devotee name is required"
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
    if (!idNumber.trim()) {
      tempErrors.idNumber = "ID card number is mandatory for verification"
    } else if (idNumber.trim().length < 5) {
      tempErrors.idNumber = "Please enter a valid ID card number"
    }

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

  // Handle submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return

    setIsSubmitting(true)

    // Determine effective mode
    const effectiveMode = darshanBookingType === 'both'
      ? (chosenDarshanMode || 'spot')
      : darshanBookingType

    // spot = pay at temple; free = no payment — both skip Razorpay
    if (effectiveMode === 'spot' || effectiveMode === 'free' || totalAmount <= 0) {
      setTimeout(() => {
        setBookingRef(`DS-${Date.now().toString().slice(-8)}`)
        setBookingSuccess(true)
        setIsSubmitting(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 600)
      return
    }

    try {
      await loadRazorpayScript()

      const order = await paymentAPI.createDarshanOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        darshanType: selectedType,
        date,
        timeSlot: slot,
        numberOfPeople: devoteesCount,
        amount: totalAmount,
      })

      if (!order.success) {
        setPaymentError(order.message || order.error || 'Unable to create darshan order.')
        setIsSubmitting(false)
        return
      }

      const options = {
        key: order.data.razorpayKeyId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: currentDarshan.title,
        description: `Darshan booking for ${currentDarshan.title}`,
        order_id: order.data.orderId,
        prefill: {
          name,
          email,
          contact: phone,
        },
        notes: {
          paymentType: 'darshan',
          darshanType: selectedType,
          date,
          timeSlot: slot,
        },
        theme: {
          color: 'var(--color-maroon)', // Razorpay UI color (stays hex for SDK compat)
        },
        handler: async (response) => {
          const verify = await paymentAPI.verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            paymentType: 'darshan',
          })

          if (verify.success) {
            setBookingRef(response.razorpay_payment_id)
            setBookingSuccess(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            setPaymentError(verify.message || 'Payment verification failed.')
          }
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      setPaymentError('Unable to complete darshan booking at this time.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gray-warm-light relative overflow-hidden" id="darshan-booking-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="divine-divider text-xs sm:text-sm font-semibold uppercase tracking-widest text-maroon mb-4">
            Plan Your Visit
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark mb-4">
            Book Your Sacred Darshan Pass
          </h2>
          <p className="text-earth-medium max-w-2xl mx-auto text-sm md:text-base">
            Select your preferred Darshan category below and fill out the interactive booking schedule to secure a fast-track, peaceful, and blessed spiritual journey.
          </p>
        </div>

        {/* Dynamic 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Stepper Booking Form Widget (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-border-warm p-6 md:p-8 shadow-xl relative overflow-hidden ring-1 ring-gold/25">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-maroon/5 rounded-full blur-2xl pointer-events-none" />

            {/* Stepper Progress Indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-border-warm pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 1 
                    ? "bg-btn-bg text-btn-text ring-2 ring-gold" 
                    : "bg-green-600 text-white"
                }`}>
                  {step === 1 ? "1" : <Check className="w-4 h-4" />}
                </span>
                <span className={`text-xs font-bold ${step === 1 ? "text-maroon" : "text-green-600"}`}>Darshan & Slot</span>
              </div>
              <div className="flex-1 h-0.5 bg-border-warm mx-4" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 2 
                    ? "bg-btn-bg text-btn-text ring-2 ring-gold" 
                    : "bg-parchment text-earth-medium border border-border-warm"
                }`}>
                  2
                </span>
                <span className={`text-xs font-bold ${step === 2 ? "text-maroon" : "text-earth-medium"}`}>Devotees & Verification</span>
              </div>
            </div>

            {/* STEP 1: Darshan Type & Schedule Selection */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. Interactive Darshan Service Select Grid */}
                <div>
                  <label className="block text-xs font-bold text-earth-dark mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-maroon" /> 1. Select Darshan Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {darshanTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => onSelectType(type.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 cursor-pointer ${
                          selectedType === type.id
                            ? "bg-btn-bg text-btn-text border-maroon ring-2 ring-gold shadow-md"
                            : "bg-parchment/50 text-earth-dark border-border-warm hover:border-maroon hover:bg-white"
                        }`}
                      >
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                            selectedType === type.id ? "text-gold" : "text-maroon"
                          }`}>
                            {type.tagline}
                          </span>
                          <span className="text-sm font-bold block">{type.title}</span>
                        </div>
                        <span className="text-base font-serif font-bold mt-2">
                          {type.badge === "FREE" ? "FREE" : `₹ ${type.badge.replace("₹", "")}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Choose Date */}
                <div>
                  <label className="block text-xs font-bold text-earth-dark mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-maroon" /> 2. Choose Visit Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value)
                      if (errors.date) setErrors({ ...errors, date: null })
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.date ? "border-red-500 bg-red-50/10" : "border-border-warm focus:border-maroon"} bg-parchment/50 focus:outline-none transition-colors text-earth-dark text-sm font-bold`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                    </p>
                  )}
                </div>

                {/* 3. Session and Timing Picker */}
                <div>
                  <label className="block text-xs font-bold text-earth-dark mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-maroon" /> 3. Select Queue Timing Slot *
                  </label>

                  {/* Morning/Evening Sessions Selector */}
                  <div className="bg-parchment p-1 rounded-xl border border-border-warm flex mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("morning")}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                        activeTab === "morning"
                          ? "bg-btn-bg text-btn-text shadow-xs"
                          : "text-earth-medium hover:text-maroon"
                      }`}
                    >
                      ☀️ Morning Session
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("evening")}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                        activeTab === "evening"
                          ? "bg-btn-bg text-btn-text shadow-xs"
                          : "text-earth-medium hover:text-maroon"
                      }`}
                    >
                      🌙 Evening Session
                    </button>
                  </div>

                  {/* Timing Slots */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {(activeTab === "morning" ? morningSlots : eveningSlots).map((timeStr) => (
                      <button
                        key={timeStr}
                        type="button"
                        onClick={() => {
                          setSlot(timeStr)
                          if (errors.slot) setErrors({ ...errors, slot: null })
                        }}
                        className={`py-3 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          slot === timeStr
                            ? "bg-btn-bg text-btn-text border-maroon ring-2 ring-gold shadow-md"
                            : "bg-parchment/50 text-earth-dark border-border-warm hover:border-maroon hover:bg-white"
                        }`}
                      >
                        <span className="text-[9px] opacity-75 font-semibold">Queue Available</span>
                        <span className="text-xs font-mono font-bold">{timeStr.split(" ")[0]}</span>
                        <span className="text-[8px] uppercase tracking-wider">{timeStr.split(" ")[1]}</span>
                      </button>
                    ))}
                  </div>

                  {errors.slot && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.slot}
                    </p>
                  )}
                </div>

                {/* Continue button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-btn-bg text-btn-text py-3.5 rounded-xl font-bold text-sm border border-gold shadow-md hover:bg-btn-bg-hover hover:translate-x-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Proceed to Devotee Verification</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>

              </div>
            )}

            {/* STEP 2: Devotee & ID verification details */}
            {step === 2 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4 animate-fade-in">
                
                <div className="flex items-center justify-between border-b border-border-warm pb-2">
                  <h4 className="font-serif text-lg font-bold text-earth-dark">Devotee Verification Info</h4>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-maroon hover:underline"
                  >
                    ← Edit Schedule
                  </button>
                </div>

                {/* Devotees Count selector (Family booking) */}
                <div>
                  <label className="block text-xs font-bold text-earth-dark mb-2 flex items-center gap-1">
                    <Users className="w-4.5 h-4.5 text-maroon" /> Total Devotees count (Maximum 5 per booking) *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setDevoteesCount(cnt)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${
                          devoteesCount === cnt
                            ? "bg-btn-bg text-btn-text border-maroon ring-2 ring-gold"
                            : "bg-parchment text-earth-dark border-border-warm hover:border-maroon"
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Inputs */}
                <div className="space-y-3.5">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-earth-dark mb-1">
                      Primary Devotee Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-maroon" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter primary devotee full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (errors.name) setErrors({ ...errors, name: null })
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.name ? "border-red-500 bg-red-50/10" : "border-border-warm focus:border-maroon"} bg-parchment/50 focus:outline-none transition-all text-earth-dark text-sm`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Phone & Email (Responsive Row) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-earth-dark mb-1">
                        Contact Mobile *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Phone className="w-4 h-4 text-maroon" />
                        </div>
                        <input
                          type="tel"
                          placeholder="Devotee phone number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value)
                            if (errors.phone) setErrors({ ...errors, phone: null })
                          }}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.phone ? "border-red-500 bg-red-50/10" : "border-border-warm focus:border-maroon"} bg-parchment/50 focus:outline-none transition-all text-earth-dark text-sm`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-earth-dark mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Mail className="w-4 h-4 text-maroon" />
                        </div>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (errors.email) setErrors({ ...errors, email: null })
                          }}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? "border-red-500 bg-red-50/10" : "border-border-warm focus:border-maroon"} bg-parchment/50 focus:outline-none transition-all text-earth-dark text-sm`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Residential Address */}
                  <div>
                    <label className="block text-xs font-bold text-earth-dark mb-1">
                      Residential Address *
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none">
                        <MapPin className="w-4 h-4 text-maroon" />
                      </div>
                      <textarea
                        rows={1.5}
                        placeholder="Enter your current street address and state..."
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value)
                          if (errors.address) setErrors({ ...errors, address: null })
                        }}
                        className={`w-full pl-10 pr-4 py-2 rounded-xl border ${errors.address ? "border-red-500 bg-red-50/10" : "border-border-warm focus:border-maroon"} bg-parchment/50 focus:outline-none transition-all text-earth-dark text-sm resize-none`}
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.address}</p>}
                  </div>

                  {/* ID Proof Type & ID Card Number (Dynamic Split Row) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-parchment p-4 rounded-2xl border border-border-warm/80">
                    <div>
                      <label className="block text-xs font-bold text-earth-dark mb-1.5 flex items-center gap-1">
                        <IdCard className="w-4 h-4 text-maroon" /> Verification ID Type *
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-border-warm focus:border-maroon bg-white text-xs font-bold text-earth-dark focus:outline-none"
                      >
                        <option>Aadhaar Card</option>
                        <option>Voter ID Card</option>
                        <option>PAN Card</option>
                        <option>Passport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-earth-dark mb-1.5">
                        ID Card / Document Number *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter unique ID number"
                        value={idNumber}
                        onChange={(e) => {
                          setIdNumber(e.target.value)
                          if (errors.idNumber) setErrors({ ...errors, idNumber: null })
                        }}
                        className={`w-full px-3 py-2 rounded-xl border ${errors.idNumber ? "border-red-500" : "border-border-warm focus:border-maroon"} bg-white focus:outline-none text-xs font-medium text-earth-dark`}
                      />
                      {errors.idNumber && <p className="text-red-500 text-[9px] mt-1 font-semibold">{errors.idNumber}</p>}
                    </div>
                  </div>

                </div>

                {/* Live Invoice Breakdown Card */}
                <div className="p-4 bg-parchment rounded-2xl border border-border-warm space-y-2 mt-4">
                  <span className="text-[10px] font-bold text-maroon uppercase tracking-wider block border-b border-border-warm pb-1">Darshan Pass Calculations</span>
                  <div className="flex justify-between text-xs text-earth-medium font-medium">
                    <span>Darshan Category:</span>
                    <span className="font-bold text-earth-dark">{currentDarshan.title}</span>
                  </div>
                  <div className="flex justify-between text-xs text-earth-medium font-medium">
                    <span>Base Ticket Price:</span>
                    <span className="font-bold text-black font-mono">
                      {getUnitPrice() === 0 ? "FREE" : `₹ ${getUnitPrice()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-earth-medium font-medium">
                    <span>Devotees Count:</span>
                    <span className="font-bold text-earth-dark font-mono">{devoteesCount} Devotees</span>
                  </div>
                  <div className="flex justify-between text-sm text-earth-dark font-bold border-t border-border-warm pt-2 mt-1">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-4.5 h-4.5 text-maroon" /> Net Payable Amount:</span>
                    <span className="font-serif text-maroon text-lg font-mono">
                      {totalAmount === 0 ? "FREE" : `₹ ${totalAmount}`}
                    </span>
                  </div>
                </div>

                {/* Booking mode picker for 'both' type */}
                {darshanBookingType === 'both' && (
                  <div className="rounded-xl border border-border-warm bg-parchment p-4">
                    <p className="text-sm font-semibold text-earth-dark mb-3">How would you like to pay?</p>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setChosenDarshanMode('payment')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition ${chosenDarshanMode === 'payment' ? 'bg-btn-bg text-btn-text border-maroon' : 'bg-white text-maroon border-maroon hover:bg-red-50'}`}>
                        💳 Pay Online — ₹{totalAmount}
                      </button>
                      <button type="button" onClick={() => setChosenDarshanMode('spot')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition ${chosenDarshanMode === 'spot' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-amber-700 border-amber-600 hover:bg-amber-50'}`}>
                        🏛️ Pay on Spot at Temple
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions row */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-parchment border border-border-warm text-earth-dark py-3 rounded-xl font-bold text-xs hover:bg-gray-50 flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-2/3 bg-btn-bg text-btn-text py-3 rounded-xl font-bold text-xs border border-gold shadow-md hover:bg-btn-bg-hover hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Book Darshan Pass</span>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT COLUMN: Stacked Travel/Connectivity Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Best times to visit */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-border-warm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-maroon" />
              <div className="w-10 h-10 bg-maroon-light/80 flex items-center justify-center rounded-full mb-4">
                <Clock className="w-5 h-5 text-maroon" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth-dark mb-3">Best Times to Visit</h3>
              <ul className="space-y-3.5 text-xs text-earth-medium font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">•</span>
                  <span>
                    <strong className="text-earth-dark">Quiet Hours:</strong> Weekdays between 10:00 AM and 4:00 PM are generally peaceful and experience minimal queue waiting times.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">•</span>
                  <span>
                    <strong className="text-earth-dark">Peak Hours:</strong> Weekends, government holidays, and early mornings (6:00 AM - 9:00 AM) see large footfalls.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold font-bold mt-0.5">•</span>
                  <span>
                    <strong className="text-earth-dark">Evening Grace:</strong> Evening Maha Arathi performed daily at 7:00 PM provides an immersive, spiritual temple experience.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Travel & Connectivity */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-border-warm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
              <div className="w-10 h-10 bg-parchment flex items-center justify-center rounded-full mb-4 border border-border-warm">
                <Bus className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth-dark mb-3">Travel & Connectivity</h3>
              <div className="space-y-3 text-xs text-earth-medium font-medium">
                <p>
                  <strong className="text-earth-dark">Public Buses:</strong> High frequency direct buses are accessible from Avadi Bus Depot and Poonamallee Junction. Nearest local train station is Avadi.
                </p>
                <p>
                  <strong className="text-earth-dark">Private Vehicles:</strong> Spacious and secure parking zones are available inside the temple gate, completely free of cost for visiting pilgrims.
                </p>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-maroon font-bold hover:underline"
                  >
                    Open Location on Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Awaited Festivals */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-border-warm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-earth-medium" />
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full mb-4">
                <PartyPopper className="w-5 h-5 text-earth-medium" />
              </div>
              <h3 className="font-serif text-lg font-bold text-earth-dark mb-3">Important Annual Festivals</h3>
              <ul className="space-y-3.5 text-xs font-semibold">
                <li className="flex items-center justify-between border-b border-border-warm/40 pb-2">
                  <span className="text-earth-dark">Brahmotsavam Festival</span>
                  <span className="text-maroon text-[10px] font-bold uppercase">Oct 12 - Oct 20</span>
                </li>
                <li className="flex items-center justify-between border-b border-border-warm/40 pb-2">
                  <span className="text-earth-dark">Vaikunta Ekadasi</span>
                  <span className="text-maroon text-[10px] font-bold uppercase">Dec 23</span>
                </li>
                <li className="flex items-center justify-between border-b border-border-warm/40 pb-2">
                  <span className="text-earth-dark">New Year Special Arati</span>
                  <span className="text-maroon text-[10px] font-bold uppercase">Jan 01</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-earth-dark">Monthly Sravanam Alankaram</span>
                  <span className="text-maroon text-[10px] font-bold uppercase">Monthly</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMED DARSHAN PASS TICKET MODAL */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border-2 border-gold shadow-2xl relative animate-scale-up max-h-[90vh] flex flex-col">
            
            {/* Ticket Header */}
            <div className="bg-btn-bg text-btn-text p-6 text-center border-b-2 border-dashed border-gold relative">
              <button
                type="button"
                onClick={() => setBookingSuccess(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-md border border-gold">
                <CheckCircle className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-wide">SACRED DARSHAN PASS</h3>
              <p className="text-gold-light text-xs font-semibold uppercase tracking-widest mt-1">Paruthipattu Balaji Temple</p>
            </div>

            {/* Ticket Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-grow bg-parchment/50">
              
              {/* Reference number banner */}
              <div className="flex items-center justify-between bg-white border border-border-warm p-3.5 rounded-2xl shadow-2xs">
                <div>
                  <span className="text-[10px] text-earth-medium font-bold uppercase tracking-wider block">Pass Reference</span>
                  <span className="font-mono text-sm font-bold text-maroon">{bookingRef}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-earth-medium font-bold uppercase tracking-wider block">Darshan Status</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-green-200 inline-block">Active Pass</span>
                </div>
              </div>

              {/* Darshan Schedule Card */}
              <div className="bg-white p-4 rounded-2xl border border-border-warm space-y-2.5 shadow-2xs">
                <h4 className="font-serif text-sm font-bold text-earth-dark border-b border-border-warm pb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold" /> Scheduled Entry Details
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-earth-medium">
                  <div>
                    <span className="block font-medium text-black">Darshan Type:</span>
                    <span className="font-bold text-maroon">{currentDarshan.title}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Net Fee Paid:</span>
                    <span className="font-bold text-black font-serif text-sm">
                      {totalAmount === 0 ? "FREE" : `₹ ${totalAmount}`}
                    </span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Entry Date:</span>
                    <span className="font-semibold text-black">{new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Assigned Queue:</span>
                    <span className="font-bold text-white bg-maroon px-2.5 py-0.5 rounded-md inline-block mt-0.5 font-mono text-[10px] border border-gold">{slot}</span>
                  </div>
                </div>
              </div>

              {/* Devotees Verification details */}
              <div className="bg-white p-4 rounded-2xl border border-border-warm space-y-2.5 shadow-2xs">
                <h4 className="font-serif text-sm font-bold text-earth-dark border-b border-border-warm pb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gold" /> Registered Pilgrims
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-earth-medium">
                  <div>
                    <span className="block font-medium text-black">Primary Devotee:</span>
                    <span className="font-bold text-black">{name}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Devotees Count:</span>
                    <span className="font-bold text-maroon font-mono">{devoteesCount} Devotees</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">Registered ID Proof:</span>
                    <span className="font-semibold text-black">{idType}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-black">ID Document Code:</span>
                    <span className="font-bold text-black font-mono">{idNumber}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-medium text-black">Contact Mobile:</span>
                    <span className="font-semibold text-black">{phone} | {email}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-medium text-black">Home Address:</span>
                    <span className="font-normal text-black block max-w-sm whitespace-pre-wrap leading-relaxed">{address}</span>
                  </div>
                </div>
              </div>

              {/* Instructions banner */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-maroon text-[10.5px] leading-relaxed font-medium">
                <strong>⚠️ Mandates for Entry:</strong> Devotees must carry the original physical <strong>{idType}</strong> matching card registered above ({idNumber}). Please print or present this ticket pass at the Darshan Verification gate. traditional clothing guidelines are strictly observed.
              </div>

            </div>

            {/* Modal Footer Controls (Tear-off ticket style divider) */}
            <div className="bg-maroon/5 border-t-2 border-dashed border-gold p-5 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-white border border-border-warm text-earth-dark py-3.5 rounded-xl font-bold text-xs hover:bg-gray-50 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-maroon" />
                Print Darshan Pass
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
                  setDevoteesCount(1)
                  setIdNumber("")
                }}
                className="flex-1 bg-btn-bg text-btn-text py-3.5 rounded-xl font-bold text-xs border border-gold hover:bg-btn-bg-hover flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                Done & Continue
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

