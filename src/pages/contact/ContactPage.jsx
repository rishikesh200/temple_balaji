import { useState } from "react"
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"
import heroImg from "../../assets/images/hero-balaji.jpg"

const CONTACT_TRANSLATIONS = {
  en: {
    heading: "Get in Touch",
    subtitle: "Send a message directly to the Temple Trust office",
    formLabels: {
      name: "Devotee Name",
      email: "Email Address",
      phone: "Phone Number",
      message: "Message / Query",
    },
    placeholders: {
      name: "Enter full name",
      email: "email@example.com",
      phone: "10-digit number",
      message: "Share your spiritual query or booking message...",
    },
    submit: "Submit Message",
    submitting: "Submitting...",
    successTitle: "Message Sent Successfully",
    successCopy: "Thank you for reaching out to the Paruthipattu Balaji Temple Trust. Your details have been recorded, and our administrative office will contact you shortly.",
    sendAnother: "Send Another Message",
    hero: {
      eyebrow: "OM NAMO VENKATESAYA",
      title: "Connect with the Divine",
      description: "Take the first step toward a blissful pilgrimage. The administrative committee and trust of the Paruthipattu Balaji Temple welcome your queries regarding daily Pujas, Seva bookings, contributions, and community services.",
    },
    contactCards: {
      location: "Temple Location",
      helpline: "Helpline Numbers",
      officialEmail: "Official Email",
      timings: "Temple Timings",
      reportingTime: "Reporting time: 30 mins before Pooja.",
    },
    quoteLabel: "Om Namo Venkatesaya",
    quote: "May Lord Venkateswara shower His divine grace and peace upon you and your family.",
  },
  ta: {
    heading: "தொடர்பு கொள்ளவும்",
    subtitle: "கோயில் நம்பிக்கை அலுவலகத்துடனான நேரடி செய்தியை அனுப்பவும்",
    formLabels: {
      name: "பக்தி பெயர்",
      email: "மின்னஞ்சல் முகவரி",
      phone: "தொடர்பு எண்",
      message: "செய்தி / குறிப்பு",
    },
    placeholders: {
      name: "முழு பெயரை உள்ளிடவும்",
      email: "email@example.com",
      phone: "10 இலக்க எண்",
      message: "உங்கள் ஆன்மீக கேள்வி அல்லது பதிவு செய்தியை பகிர்ந்து கொள்ளவும்...",
    },
    submit: "செய்தியை சமர்ப்பிக்கவும்",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",
    successTitle: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது",
    successCopy: "பாருதிப்பட்டு பாலாஜி கோவில் நம்பிக்கை நிறுவனத்தை அணுகியதற்கு நன்றி. உங்கள் விவரங்கள் பதிவு செய்யப்பட்டுள்ளன, நமது நிர்வாக அலுவலகம் விரைவில் உங்களை தொடர்பு கொள்ளும்.",
    sendAnother: "மறு செய்தியை அனுப்பவும்",
    hero: {
      eyebrow: "ஓம் நாம் வெங்கடேசாயா",
      title: "தெய்வத்துடன் தொடர்பு கொள்ளவும்",
      description: "ஒரு ஆனந்தமான யாத்திரையின் முதல் படியை எடுத்துக் கொள்ளுங்கள். பாருதிப்பட்டு பாலாஜி கோவில் நிர்வாகக் குழுமம் தின பஜைகள், சேவை பதிவுகள், கொடுப்பனவுகள் மற்றும் சமூக சேவைகள் பற்றிய உங்கள் கேள்விகளுக்கு வரவேற்கிறது.",
    },
    contactCards: {
      location: "கோயில் இடம்",
      helpline: "தொடர்புச் எண்கள்",
      officialEmail: "அங்கீகாரம் பெற்ற மின்னஞ்சல்",
      timings: "கோயில் நேரம்",
      reportingTime: "அறிக்கை நேரம்: பூஜைக்கு 30 நிமிடங்களுக்கு முன்.",
    },
    quoteLabel: "ஓம் நாம் வெங்கடேசாயா",
    quote: "வெங்கடேஸ்வரர் தமது தெய்வ கிருபையையும், அமைதியையும் உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தாருங்கள்.",
  },
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { lang } = useLanguage()
  const t = CONTACT_TRANSLATIONS[lang] || CONTACT_TRANSLATIONS.en

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate premium API request submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", phone: "", message: "" })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#120502] relative overflow-hidden flex flex-col justify-between">
      {/* Dynamic Background Image & Warm Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Paruthipattu Balaji Temple"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1E0803]/70 via-[#3D0C02]/35 to-[#1F0C07]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#120502_100%)] opacity-50" />
      </div>

      {/* Decorative Traditional Border Accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A853] via-[#8B1A1A] to-[#D4A853] z-10" />

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24 flex-grow flex items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Glassmorphism Contact Form */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:border-white/20">
              
              {/* Gold Filigree Corner Ornaments for Premium Temple Feel */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4A853]/40 rounded-tl" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4A853]/40 rounded-tr" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4A853]/40 rounded-bl" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4A853]/40 rounded-br" />

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      {t.heading}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-2">
                      {t.subtitle}
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent mx-auto mt-4" />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D4A853] font-semibold block mb-1.5">
                      {t.formLabels.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="w-full bg-black/30 border border-white/15 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D4A853] font-semibold block mb-1.5">
                        {t.formLabels.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder={t.placeholders.email}
                        className="w-full bg-black/30 border border-white/15 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#D4A853] font-semibold block mb-1.5">
                        {t.formLabels.phone}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder={t.placeholders.phone}
                        className="w-full bg-black/30 border border-white/15 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D4A853] font-semibold block mb-1.5">
                      {t.formLabels.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={t.placeholders.message}
                      className="w-full bg-black/30 border border-white/15 focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative bg-[#8B1A1A] hover:bg-[#6B1414] border border-[#D4A853]/45 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 tracking-widest text-sm uppercase duration-300 disabled:opacity-75 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#D4A853]" />
                        {t.submit}
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Transition State Card */
                <div className="text-center py-8 px-4 animate-fade-in flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-9 h-9 text-green-400" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">
                    {t.successTitle}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-8">
                    {t.successCopy}
                  </p>
                  <div className="w-full p-4 bg-white/5 border border-white/10 rounded-xl mb-8">
                    <span className="text-[#D4A853] text-xs font-semibold block uppercase tracking-wider mb-1">
                      {t.quoteLabel}
                    </span>
                    <span className="text-white/60 text-xs italic">
                      "{t.quote}"
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="border border-white/20 text-white/90 hover:text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-white/5 transition-all uppercase tracking-wider"
                  >
                    {t.sendAnother}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Text & Details */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-7 order-1 lg:order-2 text-white">
            <span className="text-[#D4A853] tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase mb-4 block animate-pulse">
              {t.hero.eyebrow}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
              {t.hero.title}
            </h1>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
              {t.hero.description}
            </p>

            {/* Structured Contact Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
              
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-white/10 group">
                <div className="w-10 h-10 bg-[#8B1A1A]/55 border border-[#D4A853]/30 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4A853] font-bold mb-1">
                    {t.contactCards.location}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Paruthipattu, Avadi,
                    <br />
                    Chennai, Tamil Nadu – 602105
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-white/10 group">
                <div className="w-10 h-10 bg-[#8B1A1A]/55 border border-[#D4A853]/30 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4A853] font-bold mb-1">
                    {t.contactCards.helpline}
                  </h4>
                  <p className="text-white/80 text-sm">
                    +91 123456789
                    <br />
                    +91 987654321
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-white/10 group">
                <div className="w-10 h-10 bg-[#8B1A1A]/55 border border-[#D4A853]/30 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4A853] font-bold mb-1">
                    {t.contactCards.officialEmail}
                  </h4>
                  <p className="text-white/80 text-sm truncate max-w-[200px] sm:max-w-none">
                    info@paruthipattubalajitemple.org
                    <br />
                    trust@paruthipattubalajitemple.org
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-white/10 group">
                <div className="w-10 h-10 bg-[#8B1A1A]/55 border border-[#D4A853]/30 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4A853] font-bold mb-1">
                    {t.contactCards.timings}
                  </h4>
                  <p className="text-white/80 text-sm">
                    05:00 AM – 12:00 PM
                    <br />
                    04:00 PM – 09:00 PM (Daily)
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Paruthipattu+Avadi+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#D4A853]/45 bg-[#8B1A1A]/30 hover:bg-[#8B1A1A]/50 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md"
              >
                <MapPin className="w-4 h-4 text-[#D4A853]" />
                Get Directions on Map
              </a>
              <a
                href="tel:+91123456789"
                className="inline-flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              >
                Call Office Instantly
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
