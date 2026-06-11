import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"
import { useLanguage } from "../../../contexts/LanguageContext"

const FOOTER_TRANSLATIONS = {
  templeName: {
    en: "Paruthipattu Balaji Temple",
    ta: "பாருதிப்பட்டு பாலாஜி கோயில்",
  },
  quickLinks: {
    en: "Quick Links",
    ta: "மேல்நோக்கி இணைப்புகள்",
  },
  importantLinks: {
    en: "Important Links",
    ta: "முக்கிய இணைப்புகள்",
  },
  home: {
    en: "Home",
    ta: "முகப்பு",
  },
  pooja: {
    en: "Pooja",
    ta: "பூஜை",
  },
  events: {
    en: "Events",
    ta: "நிகழ்வுகள்",
  },
  gallery: {
    en: "Gallery",
    ta: "படக்காட்சி",
  },
  findUs: {
    en: "Find Us",
    ta: "எங்களை கண்டறிய",
  },
  getDirections: {
    en: "Get Directions",
    ta: "வழி காண்க",
  },
  aboutUs: {
    en: "About Us",
    ta: "எங்களைப் பற்றி",
  },
  history: {
    en: "History",
    ta: "வரலாறு",
  },
  timings: {
    en: "Temple Timings",
    ta: "கோயில் நேரம்",
  },
  darshan: {
    en: "Darshan & Book",
    ta: "தர்ஷன் & பதிவு",
  },
  rules: {
    en: "Rules & Guidelines",
    ta: "வேள்வி விதிகள்",
  },
  donate: {
    en: "Donate",
    ta: "தர்ப்பணம்",
  },
  contact: {
    en: "Contact Us",
    ta: "தொடர்பு",
  },
  hrce: {
    en: "HR&CE Department",
    ta: "HR&CE துறை",
  },
  tnTemples: {
    en: "TN Temples",
    ta: "TN கோயில்கள்",
  },
  onlineServices: {
    en: "Online Services",
    ta: "ஆன்லைன் சேவைகள்",
  },
  feedback: {
    en: "Feedback",
    ta: "பின்விளைவுகள்",
  },
  helpSupport: {
    en: "Help & Support",
    ta: "உதவி & ஆதரவு",
  },
  privacy: {
    en: "Privacy Policy",
    ta: "தனியுரிமைக் கொள்கை",
  },
  terms: {
    en: "Terms & Conditions",
    ta: "விதிமுறைகள் & நிபந்தனைகள்",
  },
  refundPolicy: {
    en: "Refund Policy",
    ta: "மீள்பணம் கொள்கை",
  },
  copyright: {
    en: "© 2025 Paruthipattu Balaji Temple. All Rights Reserved.",
    ta: "© 2025 பாருதிப்பட்டு பாலாஜி கோவில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
  designedWith: {
    en: "Designed with ♥ for Devotees",
    ta: "அர்ப்பணிப்புடன் வடிவமைக்கப்பட்டது ♥ பக்தர்களுக்காக",
  },
}

function translate(key, lang) {
  const entry = FOOTER_TRANSLATIONS[key]
  return entry?.[lang] ?? entry?.en ?? key
}

function Link({ href, ...props }) {
  if (href && href.startsWith("/") && !href.startsWith("//")) {
    return <RouterLink to={href} {...props} />
  }
  return <a href={href} {...props} />
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = Object.fromEntries(
    Object.keys(FOOTER_TRANSLATIONS).map((key) => [key, translate(key, lang)])
  )

  return (
    <footer className="bg-maroon-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.templeName}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                <span className="text-white/80">
                  Paruthipattu , Avadi,
                  <br />
                  Chennai, Tamil Nadu – 602105
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-white/80">+91 123456789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-white/80">info@paruthipattubalajitemple.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <span className="text-white/80">05:00 AM – 09:00 PM (Daily)</span>
              </div>
            </div>
            <button className="mt-4 border border-gold text-gold px-4 py-2 rounded-full text-sm hover:bg-gold hover:text-earth-dark transition-colors">
              {t.getDirections}
            </button>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-gold">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/darshan" className="text-white/80 hover:text-gold">
                  {t.darshan}
                </Link>
              </li>
              <li>
                <Link href="/pooja" className="text-white/80 hover:text-gold">
                  {t.pooja}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/80 hover:text-gold">
                  {t.events}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-gold">
                  {t.gallery}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-gold">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 hover:text-gold">
                  {t.donate}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.importantLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-white/80 hover:text-gold">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-gold">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-white/80 hover:text-gold">
                  {t.refundPolicy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">{t.findUs}</h3>
            <div className="rounded-lg overflow-hidden border border-gold/30">
              <div className="h-36 bg-parchment-soft relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7088.694756533519!2d80.10780180454753!3d13.094263049551655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52630024c3c203%3A0x4edbbe8a2cea12fd!2sAVADI%20TIRUPATHI%20SRIVARI%20TEMPLE!5e1!3m2!1sen!2sus!4v1779014462236!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  
                />
                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-earth-dark flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-maroon" />
                  Paruthipattu Balaji Temple
                </div>
              </div>
              <button className="w-full bg-btn-bg text-btn-text py-2 text-sm hover:bg-btn-bg-hover transition-colors">
                View on Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-white/50">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">{t.privacy}</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-gold transition-colors">{t.terms}</Link>
            <span>·</span>
            <Link href="/refund-policy" className="hover:text-gold transition-colors">{t.refundPolicy}</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-gold transition-colors">{t.contact}</Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
            <p>{t.copyright}</p>
            <p className="mt-1 md:mt-0">{t.designedWith}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


