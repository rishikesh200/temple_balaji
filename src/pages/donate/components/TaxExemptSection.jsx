import React from "react"
import { useLanguage } from "../../../contexts/LanguageContext"
import { ShieldCheck, Receipt, Download, Sparkles } from "lucide-react"

const TAX_EXEMPT_TRANSLATIONS = {
  en: {
    sectionLabel: "Tax Exemption Certifications",
    title: "Your Contributions are Tax Exempt (Sec 80G)",
    description: "All financial offerings and grocery sponsorships made to Paruthipattu Balaji Temple are eligible for official income tax deduction under Section 80G of the Income Tax Act, 1961.",
    point1Title: "Section 80G Legal Protection",
    point1Body: "Maximize your charity impact while claiming statutory tax credits. We provide automated legal certificates for every transaction.",
    point2Title: "Transparent Audited Accounts",
    point2Body: "100% of all public contributions are strictly tracked and audited by certified accounting panels, utilized only for designated alankaram, gurukul, and food drives.",
    helperTitle: "Devotee Receipt Dispatch System",
    helperStep1: "Secure Transaction Complete",
    helperStep1Body: "Make your online donation via any of our 256-bit SSL secured gateways (UPI, Netbanking, Cards).",
    helperStep2: "Instant Email PDF Dispatch",
    helperStep2Body: "An automated digital receipt voucher containing the 80G reference details is instantly dispatched to your mail inbox.",
    helperStep3: "Consolidated Annual Certificate",
    helperStep3Body: "Log into the devotee profile portal anytime to retrieve consolidated annual tax exemption certificates for filing.",
    downloadButton: "Download Consolidated Receipts",
  },
  ta: {
    sectionLabel: "வரி விலக்கு சான்றிதழ்கள்",
    title: "உங்கள் תר்ப்பணங்கள் வரி விலக்கு பெறுகிறது (அலகு 80G)",
    description: "பருத்திபட்டு பாலாஜி கோயிலுக்கு செய்யப்பட்ட அனைத்து நிதி பூஜைகள் மற்றும் அன்னதான ஆதரிப்புகள் வரி சட்டம் 1961 இன் பிரிவு 80G படி அதிகாரப்பூர்வ வரி விலக்கு தகுதிகளுக்கு உட்படுகின்றன.",
    point1Title: "பிரிவு 80G சட்ட ரச்சனை அமர்வு",
    point1Body: "நீங்கள் தர்மத்தை அதிகரிக்கவும் மற்றும் சட்ட வரி நலன்களை பெறவும். ஒவ்வொரு பரிவர்த்தனையிற்கும் தானாகச் சட்ட சான்றிதழ்களை வழங்குகிறோம்.",
    point2Title: "பண்பற்ற கணக்குப் பதிவுகள்",
    point2Body: "அனைத்து பொது பங்களிப்புகளும் சான்றளிக்கப்பட்ட கணக்குத் துறையால் கடுமையாக கண்காணிக்கப்பட்டு, அலங்காரம், குருகுல் மற்றும் உணவு இயக்கங்களுக்கு மட்டுமே பயன்படுத்தப்படுகின்றன.",
    helperTitle: "மரியாதை பெறுநர் ரசீது அனுப்பும் அமைப்பு",
    helperStep1: "பாதுகாப்பான பரிவர்த்தனை முடிந்தது",
    helperStep1Body: "256-பிட் SSL பாதுகாக்கப்பட்ட எந்தவொரு கதவுகளிலும் (UPI, நெட்பேங்கிங், கார்டுகள்) உங்கள் ஆன்லைன் தர்ப்பகத்தை செய்யவும்.",
    helperStep2: "உடனடி மின்னஞ்சல் PDF அனுப்பு",
    helperStep2Body: "80G குறிப்பு விவரங்களுடன் கூடிய தானாக உருவாக்கப்பட்ட டிஜிட்டல் ரசீதுப் பத்திரம் உடனே உங்கள் மின்னஞ்சல் பெட்டிக்குத் தள்ளப்படுகிறது.",
    helperStep3: "ஒன்றிணைக்கப்பட்ட ஆண்டுவாரியான சான்றிதழ்",
    helperStep3Body: "பதிவிறக்கம் செய்ய பயன்பாட்டில் எப்பொழுதும் உள்நுழைந்து வரி விலக்கு சான்றிதழ்களைப் பெறலாம்.",
    downloadButton: "மொத்த ரசீதுகளை பதிவிறக்கவும்",
  },
}

export default function TaxExemptSection() {
  const { lang } = useLanguage()
  const t = TAX_EXEMPT_TRANSLATIONS[lang] || TAX_EXEMPT_TRANSLATIONS.en

  return (
    <section className="py-16 md:py-20 bg-gray-warm-light border-y border-border-warm/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE: Exemption legal details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-maroon">
              <ShieldCheck className="w-6 h-6 text-maroon" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-widest">{t.sectionLabel}</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-earth-dark leading-tight">
              {t.title}
            </h2>
            
            <p className="text-earth-medium text-sm md:text-base leading-relaxed font-medium">
              {t.description}
            </p>

            <div className="flex flex-col gap-4">
              {/* Point 1: 80G Certified */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-border-warm/60 shadow-xs hover:shadow-sm hover:border-gold/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-parchment border border-border-warm flex items-center justify-center text-maroon shrink-0">
                  <ShieldCheck className="w-5 h-5 text-maroon" aria-hidden />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-earth-dark">{t.point1Title}</h4>
                  <p className="text-xs text-earth-medium mt-1 font-semibold leading-relaxed">
                    {t.point1Body}
                  </p>
                </div>
              </div>

              {/* Point 2: Transparent Accounting */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-border-warm/60 shadow-xs hover:shadow-sm hover:border-gold/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-parchment border border-border-warm flex items-center justify-center text-maroon shrink-0">
                  <Receipt className="w-5 h-5 text-maroon" aria-hidden />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-earth-dark">{t.point2Title}</h4>
                  <p className="text-xs text-earth-medium mt-1 font-semibold leading-relaxed">
                    {t.point2Body}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Receipt download helper card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border-warm relative ring-1 ring-black/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-serif text-xl font-bold text-earth-dark mb-6 flex items-center gap-2 pb-3 border-b border-parchment-soft">
              <Sparkles className="w-5 h-5 text-gold" /> {t.helperTitle}
            </h3>
            
            <ol className="space-y-6 text-xs md:text-sm text-earth-medium font-medium">
              <li className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full bg-maroon border border-gold text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                  1
                </span>
                <div>
                  <strong className="text-earth-dark block mb-0.5">{t.helperStep1}</strong>
                  <p className="text-xs leading-relaxed">{t.helperStep1Body}</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full bg-maroon border border-gold text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                  2
                </span>
                <div>
                  <strong className="text-earth-dark block mb-0.5">{t.helperStep2}</strong>
                  <p className="text-xs leading-relaxed">{t.helperStep2Body}</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full bg-maroon border border-gold text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                  3
                </span>
                <div>
                  <strong className="text-earth-dark block mb-0.5">{t.helperStep3}</strong>
                  <p className="text-xs leading-relaxed">{t.helperStep3Body}</p>
                </div>
              </li>
            </ol>

            <button
              type="button"
              className="w-full mt-8 py-3.5 border-2 border-maroon text-maroon rounded-xl text-xs font-bold hover:bg-maroon hover:text-white shadow-2xs hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden />
              {t.downloadButton}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
