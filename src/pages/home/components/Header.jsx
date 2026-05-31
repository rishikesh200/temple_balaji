import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import logo from './../../../assets/images/konark-sun-temple.png'
import { useLanguage } from "../../../contexts/LanguageContext"
import { useAdminData } from "../../../admin/contexts/AdminDataContext"
import { t } from "../../../utils/i18n"

const TR = {
  officialSite: { en: "Official Website of Paruthipattu Balaji Temple", ta: "பருத்திப்பட்டு பாலாஜி கோயிலின் அதிகாரப்பூர்வ இணையதளம்" },
  certified:    { en: "Certified",    ta: "சான்றிதழ் பெற்றது" },
  templeTitle:  { en: "Paruthipattu Balaji Temple", ta: "பருத்திப்பட்டு பாலாஜி கோயில்" },
  language:     { en: "Language",     ta: "மொழி" },
  donateNow:    { en: "Donate Now",   ta: "நன்கொடை" },
  nav: {
    home:      { en: "Home",       ta: "முகப்பு" },
    darshan:   { en: "Darshans",   ta: "தரிசனம்" },
    pooja:     { en: "Poojas",     ta: "பூஜைகள்" },
    events:    { en: "Events",     ta: "நிகழ்வுகள்" },
    gallery:   { en: "Gallery",    ta: "படக்காட்சி" },
    contact:   { en: "Contact Us", ta: "தொடர்பு கொள்ளுங்கள்" },
    donate:    { en: "Donate",     ta: "நன்கொடை" },
  },
}

export default function Header() {
  const { lang, setLang } = useLanguage()
  const { templeSettings } = useAdminData()

  // Only show each item when explicitly enabled in admin settings
  const officialTagline = templeSettings?.showOfficialTagline === true && templeSettings?.officialTagline
    ? templeSettings.officialTagline : null
  const trustReg = templeSettings?.showTrustReg === true && templeSettings?.trustRegNo
    ? `Trust Reg No: ${templeSettings.trustRegNo}` : null
  const show80G  = templeSettings?.show80G === true
  const gstin    = templeSettings?.showGstin === true && templeSettings?.gstin
    ? `GSTIN: ${templeSettings.gstin}` : null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  const navItems = [
    { label: t(TR.nav.home,    lang), to: "/" },
    { label: t(TR.nav.darshan, lang), to: "/darshan" },
    { label: t(TR.nav.pooja,   lang), to: "/pooja" },
    { label: t(TR.nav.events,  lang), to: "/events" },
    { label: t(TR.nav.gallery, lang), to: "/gallery" },
    { label: t(TR.nav.contact, lang), to: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > window.innerHeight && currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => { setMobileMenuOpen(false) }, [location.pathname])

  return (
    <header className={`w-full sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

      {/* ── Top Bar ── */}
      <div className="bg-[#8B1A1A] text-white text-xs py-1.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {officialTagline && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                {officialTagline}
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {trustReg && <span>{trustReg}</span>}
            {show80G && (
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[10px]">80G</span>
                {t(TR.certified, lang)}
              </span>
            )}
            {gstin && <span>{gstin}</span>}

            {/* Social icons */}
            <div className="flex items-center gap-2 ml-4">
              <a href="#" className="hover:text-[#D4A853]" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#D4A853]" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#D4A853]" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>

            {/* Language switcher */}
            <select
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="bg-transparent text-white border-0 cursor-pointer focus:ring-0 text-xs py-0.5 ml-2 font-medium hover:text-[#D4A853] transition-colors focus:outline-none"
              aria-label="Select language"
            >
              <option value="en" className="text-black">English</option>
              <option value="ta" className="text-black">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Main Nav Bar ── */}
      <div className="bg-[#FDF8F3] border-b border-[#E5D5C5]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            {/* Logo + Title */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img src={logo} alt="Temple Logo" />
              </div>
              <div>
                <h1 className="text-[#8B1A1A] font-serif text-xl font-bold leading-tight">
                  {t(TR.templeTitle, lang)}
                </h1>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `font-medium text-sm transition-colors ${
                      isActive
                        ? "text-[#8B1A1A] border-b-2 border-[#8B1A1A] pb-0.5"
                        : "text-[#2D1810] hover:text-[#8B1A1A]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/donate" className="text-[#2D1810] font-medium text-sm hover:text-[#8B1A1A] transition-colors">
                {t(TR.nav.donate, lang)}
              </Link>
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                to="/donate"
                className="hidden sm:flex items-center gap-2 bg-[#8B1A1A] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#6B1414] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {t(TR.donateNow, lang)}
              </Link>

              <button
                type="button"
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* ── Mobile Menu ── */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 py-4 border-t border-[#E5D5C5]">
              <div className="flex flex-col gap-3">
                {navItems.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `text-[#2D1810] font-medium py-2 transition-colors ${isActive ? 'text-[#8B1A1A]' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <NavLink to="/donate" className="text-[#2D1810] font-medium py-2 hover:text-[#8B1A1A] transition-colors">
                  {t(TR.nav.donate, lang)}
                </NavLink>

                {/* Language picker in mobile */}
                <div className="flex items-center justify-between py-2 border-t border-b border-[#E5D5C5] my-2">
                  <span className="text-sm font-medium text-[#2D1810]">
                    {t(TR.language, lang)} / மொழி
                  </span>
                  <select
                    value={lang}
                    onChange={e => setLang(e.target.value)}
                    className="bg-transparent text-[#8B1A1A] border border-[#8B1A1A] rounded px-2 py-1 text-xs font-semibold focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="ta">தமிழ்</option>
                  </select>
                </div>

                <Link
                  to="/donate"
                  className="flex items-center justify-center gap-2 bg-[#8B1A1A] text-white px-5 py-2.5 rounded-full text-sm font-medium mt-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {t(TR.donateNow, lang)}
                </Link>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
