import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"

const FOOTER_TRANSLATIONS = {
  en: {
    templeName: "Paruthipattu Balaji Temple",
    quickLinks: "Quick Links",
    importantLinks: "Important Links",
    findUs: "Find Us",
    getDirections: "Get Directions",
    aboutUs: "About Us",
    history: "History",
    timings: "Temple Timings",
    darshan: "Darshan & Book",
    rules: "Rules & Guidelines",
    donate: "Donate",
    contact: "Contact Us",
    hrce: "HR&CE Department",
    tnTemples: "TN Temples",
    onlineServices: "Online Services",
    feedback: "Feedback",
    helpSupport: "Help & Support",
    privacy: "Privacy Policy",
    copyright: "© 2025 Paruthipattu Balaji Temple. All Rights Reserved.",
    designedWith: "Designed with ♥ for Devotees",
  },
  ta: {
    templeName: "பாருதிப்பட்டு பாலாஜி கோயில்",
    quickLinks: "மேல்நோக்கி இணைப்புகள்",
    importantLinks: "முக்கிய இணைப்புகள்",
    findUs: "எங்களை கண்டறிய",
    getDirections: "வழி காண்க",
    aboutUs: "எங்களைப் பற்றி",
    history: "வரலாறு",
    timings: "கோயில் நேரம்",
    darshan: "தர்ஷன் & பதிவு",
    rules: "வேள்வி விதிகள்",
    donate: "தர்ப்பணம்",
    contact: "தொடர்பு",
    hrce: "HR&CE துறை",
    tnTemples: "TN கோயில்கள்",
    onlineServices: "ஆன்லைன் சேவைகள்",
    feedback: "பின்விளைவுகள்",
    helpSupport: "உதவி & ஆதரவு",
    privacy: "தனியுரிமைக் கொள்கை",
    copyright: "© 2025 பாருதிப்பட்டு பாலாஜி கோவில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    designedWith: "அர்ப்பணிப்புடன் வடிவமைக்கப்பட்டது ♥ பக்தர்களுக்காக",
  },
}

function Link({ href, ...props }) {
  if (href && href.startsWith("/") && !href.startsWith("//")) {
    return <RouterLink to={href} {...props} />
  }
  return <a href={href} {...props} />
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = FOOTER_TRANSLATIONS[lang] || FOOTER_TRANSLATIONS.en

  return (
    <footer className="bg-[#4A0000] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.templeName}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4A853]" />
                <span className="text-white/80">
                  Paruthipattu , Avadi,
                  <br />
                  Chennai, Tamil Nadu – 602105
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A853]" />
                <span className="text-white/80">+91 123456789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A853]" />
                <span className="text-white/80">info@paruthipattubalajitemple.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A853]" />
                <span className="text-white/80">05:00 AM – 09:00 PM (Daily)</span>
              </div>
            </div>
            <button className="mt-4 border border-[#D4A853] text-[#D4A853] px-4 py-2 rounded-full text-sm hover:bg-[#D4A853] hover:text-[#2D1810] transition-colors">
              {t.getDirections}
            </button>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#D4A853]">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-white/80 hover:text-[#D4A853]">
                  {t.history}
                </Link>
              </li>
              <li>
                <Link href="/timings" className="text-white/80 hover:text-[#D4A853]">
                  {t.timings}
                </Link>
              </li>
              <li>
                <Link href="/darshan" className="text-white/80 hover:text-[#D4A853]">
                  {t.darshan}
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-white/80 hover:text-[#D4A853]">
                  {t.rules}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 hover:text-[#D4A853]">
                  {t.donate}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#D4A853]">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.importantLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hrce" className="text-white/80 hover:text-[#D4A853]">
                  {t.hrce}
                </Link>
              </li>
              <li>
                <Link href="/tn-temples" className="text-white/80 hover:text-[#D4A853]">
                  {t.tnTemples}
                </Link>
              </li>
              <li>
                <Link href="/online-services" className="text-white/80 hover:text-[#D4A853]">
                  {t.onlineServices}
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-white/80 hover:text-[#D4A853]">
                  {t.feedback}
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white/80 hover:text-[#D4A853]">
                  {t.helpSupport}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-[#D4A853]">
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.findUs}</h3>
            <div className="rounded-lg overflow-hidden border border-[#D4A853]/30">
              <div className="h-36 bg-[#F5E6D3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7088.694756533519!2d80.10780180454753!3d13.094263049551655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52630024c3c203%3A0x4edbbe8a2cea12fd!2sAVADI%20TIRUPATHI%20SRIVARI%20TEMPLE!5e1!3m2!1sen!2sus!4v1779014462236!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  
                />
                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-[#2D1810] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8B1A1A]" />
                  Paruthipattu Balaji Temple
                </div>
              </div>
              <button className="w-full bg-[#8B1A1A] text-white py-2 text-sm hover:bg-[#6B1414] transition-colors">
                View on Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
            <p>{t.copyright}</p>
            <p className="mt-2 md:mt-0">
              {t.designedWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

